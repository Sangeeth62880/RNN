"use client";

import { useState, useRef, useEffect } from "react";
import { Section } from "@/components/ui/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CharRNN } from "./rnn-model";
import { TrainingViz } from "./training-viz";
import { PredictionViz } from "./prediction-viz";
import { cn } from "@/lib/utils";
import { Play, RotateCcw, BrainCircuit, Loader2 } from "lucide-react";

export function LiveDemo() {
    const [inputText, setInputText] = useState("hello world from rnn");
    const [trainingData, setTrainingData] = useState<{ epoch: number; loss: number }[]>([]);
    const [isTraining, setIsTraining] = useState(false);
    const [predictions, setPredictions] = useState<{ char: string; prob: number }[]>([]);
    const [status, setStatus] = useState("Ready to train");

    const rnnRef = useRef<CharRNN | null>(null);

    useEffect(() => {
        // Initialize model instance on mount (but don't create tensors yet)
        rnnRef.current = new CharRNN(5, 16); // seqLen 5, hidden 16
    }, []);

    const handleTrain = async () => {
        if (!rnnRef.current || inputText.length < 6) {
            setStatus("Text too short (need > 5 chars)");
            return;
        }

        setIsTraining(true);
        setStatus("Preparing data...");
        setTrainingData([]); // Clear previous training data

        rnnRef.current.prepareData(inputText);
        rnnRef.current.createModel();

        setStatus("Training...");

        await rnnRef.current.train(inputText, 50, (epoch, loss) => {
            setTrainingData(prev => [...prev, { epoch, loss }]);

            // Update prediction live during training
            if (epoch % 5 === 0) {
                // We need to handle async prediction carefully if needed, 
                // but sync predict is fine for small models.
                const preds = rnnRef.current?.predict(inputText) || [];
                setPredictions(preds);
            }
        });

        setIsTraining(false);
        setStatus("Training Complete!");

        // Final prediction
        const preds = rnnRef.current.predict(inputText);
        setPredictions(preds);
    };

    const handleRetry = () => {
        setTrainingData([]);
        setPredictions([]);
        setStatus("Ready to train");
        if (rnnRef.current) {
            rnnRef.current.model = null; // Reset model
        }
    };

    const handlePredict = () => {
        if (!rnnRef.current || !rnnRef.current.model) return;
        const preds = rnnRef.current.predict(inputText);
        setPredictions(preds);
    };

    // Update prediction when typing if model is ready
    useEffect(() => {
        if (rnnRef.current?.model && !isTraining) {
            handlePredict();
        }
    }, [inputText, isTraining]);

    return (
        <Section id="demo">
            <div className="text-center mb-20 space-y-6">
                <span className="text-sm font-bold text-muted-foreground tracking-widest uppercase">Interactive Sandbox</span>
                <h2 className="text-4xl md:text-6xl font-bold">Live Character RNN</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Train a tiny Recurrent Neural Network right here in your browser to predict the next character.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-16 items-start">
                {/* Controls */}
                <Card className="p-10 space-y-8 lg:col-span-1 bg-black/40 border-white/10 shadow-xl sticky top-32">
                    <div className="space-y-4">
                        <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Training Data</label>
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            className="w-full h-40 bg-secondary/30 rounded-xl p-4 text-base font-mono border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-all focus:bg-secondary/50"
                            placeholder="Type some text here to train on..."
                        />
                        <div className="text-xs text-muted-foreground flex justify-between">
                            <span>Min 6 characters.</span>
                            <span>{inputText.length} chars</span>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <Button
                                onClick={handleTrain}
                                disabled={isTraining || inputText.length < 6}
                                size="lg"
                                className={cn(
                                    "flex-1 h-14 text-lg font-bold shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all",
                                    isTraining ? "bg-secondary" : "bg-primary hover:bg-primary/90 hover:scale-[1.02]"
                                )}
                            >
                                {isTraining ? <Loader2 className="mr-3 h-5 w-5 animate-spin" /> : <BrainCircuit className="mr-3 h-5 w-5" />}
                                {isTraining ? "Training..." : "Train Model"}
                            </Button>

                            <Button
                                onClick={handleRetry}
                                disabled={isTraining}
                                variant="outline"
                                size="lg"
                                className="h-14 px-4 border-white/10 hover:bg-white/5"
                                title="Reset Model"
                            >
                                <RotateCcw className="h-5 w-5" />
                            </Button>
                        </div>

                        <div className="bg-black/40 p-4 rounded-xl border border-white/5 space-y-2">
                            <div className="text-xs text-muted-foreground uppercase tracking-widest font-bold">System Status</div>
                            <div className={cn(
                                "font-bold text-lg animate-pulse",
                                status === "Training Complete!" ? "text-green-400" : "text-primary"
                            )}>
                                {status}
                            </div>
                        </div>

                        <div className="bg-white/5 p-6 rounded-xl border border-white/5 text-sm space-y-3">
                            <h4 className="font-bold text-white">How it works:</h4>
                            <p className="text-muted-foreground">
                                1. It reads your text one char at a time.<br />
                                2. It updates its <strong>Hidden State</strong>.<br />
                                3. It tries to predict the next char.<br />
                                4. It compares prediction vs reality (Loss).<br />
                                5. It uses <strong>Backpropagation</strong> to improve.
                            </p>
                            <p className="text-xs text-red-400 pt-2 border-t border-white/5">
                                *Longer sequences harder to learn due to Vanishing Gradient!
                            </p>
                        </div>
                    </div>
                </Card>

                {/* Visualizations */}
                <div className="lg:col-span-2 space-y-12">
                    <TrainingViz lossData={trainingData} />
                    <PredictionViz predictions={predictions} />
                </div>
            </div>
        </Section>
    );
}
