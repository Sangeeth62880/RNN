import * as tf from '@tensorflow/tfjs';

export class CharRNN {
    model: tf.Sequential | null = null;
    vocab: string[] = [];
    charToId: Map<string, number> = new Map();
    seqLength: number = 10;
    hiddenUnits: number = 32;
    lossHistory: { epoch: number; loss: number }[] = [];

    constructor(seqLength: number = 10, hiddenUnits: number = 32) {
        this.seqLength = seqLength;
        this.hiddenUnits = hiddenUnits;
    }

    prepareData(text: string) {
        const chars = Array.from(new Set(text.split(''))).sort();
        this.vocab = chars;
        this.charToId = new Map(chars.map((c, i) => [c, i]));
        return chars.length;
    }

    createModel() {
        this.lossHistory = [];
        const model = tf.sequential();

        // SimpleRNN layer
        model.add(tf.layers.simpleRNN({
            units: this.hiddenUnits,
            returnSequences: false,
            inputShape: [this.seqLength, this.vocab.length],
            activation: 'tanh' // Standard RNN activation
        }));

        // Dense output layer (softmax over vocab)
        model.add(tf.layers.dense({
            units: this.vocab.length,
            activation: 'softmax'
        }));

        const optimizer = tf.train.adam(0.001);
        // Gradient clipping is handled by the optimizer in some TF versions, 
        // but for simple RNN in browser, we can rely on Adam's adaptive nature 
        // or just lower LR which we did (0.001).

        model.compile({
            optimizer: optimizer,
            loss: 'categoricalCrossentropy'
        });

        this.model = model;
        return model;
    }

    encode(text: string): tf.Tensor3D {
        const buffer = new Float32Array(text.length * this.vocab.length);
        for (let i = 0; i < text.length; i++) {
            const charId = this.charToId.get(text[i]) || 0;
            buffer[i * this.vocab.length + charId] = 1;
        }
        return tf.tensor3d(buffer, [1, text.length, this.vocab.length]);
    }

    async train(text: string, epochs: number, onEpochEnd: (epoch: number, loss: number) => void) {
        if (!this.model) this.createModel();

        // Prepare dataset
        const xs = [];
        const ys = [];

        for (let i = 0; i < text.length - this.seqLength; i++) {
            const inputSeq = text.slice(i, i + this.seqLength);
            const targetChar = text[i + this.seqLength];

            // One-hot encode input sequence
            const xExample = [];
            for (let j = 0; j < this.seqLength; j++) {
                const vec = new Array(this.vocab.length).fill(0);
                vec[this.charToId.get(inputSeq[j])!] = 1;
                xExample.push(vec);
            }
            xs.push(xExample);

            // One-hot encode target
            const yExample = new Array(this.vocab.length).fill(0);
            yExample[this.charToId.get(targetChar)!] = 1;
            ys.push(yExample);
        }

        const xTensor = tf.tensor3d(xs, [xs.length, this.seqLength, this.vocab.length]);
        const yTensor = tf.tensor2d(ys, [ys.length, this.vocab.length]);

        await this.model!.fit(xTensor, yTensor, {
            epochs: epochs,
            batchSize: 32,
            shuffle: true,
            callbacks: {
                onEpochEnd: (epoch, logs) => {
                    const loss = logs?.loss || 0;
                    this.lossHistory.push({ epoch: epoch + 1, loss });
                    onEpochEnd(epoch + 1, loss);
                }
            }
        });

        xTensor.dispose();
        yTensor.dispose();
    }

    predict(seedText: string): { char: string; prob: number }[] {
        if (!this.model || seedText.length < this.seqLength) return [];

        const inputSeq = seedText.slice(-this.seqLength);
        // Construct tensor directly without using `encode` method 
        // because `encode` method expects full text, we just need the last `seqLength`.
        // Actually, we can reuse logic but let's be explicit and safe.

        const xExample = [];
        for (let j = 0; j < this.seqLength; j++) {
            const vec = new Array(this.vocab.length).fill(0);
            const char = inputSeq[j];
            if (this.charToId.has(char)) {
                vec[this.charToId.get(char)!] = 1;
            }
            xExample.push(vec);
        }

        const inputTensor = tf.tensor3d([xExample], [1, this.seqLength, this.vocab.length]);
        const prediction = this.model.predict(inputTensor) as tf.Tensor;
        const data = prediction.dataSync(); // Float32Array of probs
        inputTensor.dispose();
        prediction.dispose();

        // Return sorted probabilities
        return Array.from(data)
            .map((prob, i) => ({ char: this.vocab[i], prob }))
            .sort((a, b) => b.prob - a.prob);
    }
}
