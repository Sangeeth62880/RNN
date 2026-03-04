import { Section } from "./ui/section";
import { Card } from "./ui/card";
import { ArrowDown, AlertTriangle, XCircle, CheckCircle } from "lucide-react";

export function GradientFlow() {
    return (
        <Section id="gradient" className="py-32">
            <div className="text-center mb-24 space-y-6">
                <span className="text-sm font-bold text-muted-foreground tracking-widest uppercase">The Training Bottleneck</span>
                <h2 className="text-4xl md:text-6xl font-bold">The Problem of Long-Term Memory</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Why standard RNNs fail to learn from information that happened far in the past.
                </p>
            </div>

            <div className="grid gap-24 max-w-6xl mx-auto">

                {/* --- SECTION 1: VANISHING GRADIENT --- */}
                <div className="space-y-12">
                    <div className="border-l-4 border-red-500 pl-8">
                        <h3 className="text-3xl font-bold text-white mb-4">1. The Vanishing Gradient Problem</h3>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
                            When training an RNN, we use <strong>Backpropagation Through Time (BPTT)</strong>.
                            The network calculates the error at the end and tries to send a signal vertically back through time to update the weights at the beginning.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <Card className="p-10 bg-black/40 border-white/10 shadow-2xl space-y-8">
                            <div>
                                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                                    <XCircle className="text-red-500 w-5 h-5" /> The Math Issue
                                </h4>
                                <p className="text-muted-foreground leading-relaxed">
                                    The gradient calculation involves the <strong>Chain Rule</strong>, which means multiplying derivatives together for every time step.
                                </p>
                            </div>

                            <div className="bg-white/5 p-6 rounded-xl font-mono text-sm md:text-base overflow-x-auto text-center border border-white/5">
                                <div className="text-muted-foreground mb-2">Gradient Chain:</div>
                                <span className="text-red-400">0.5</span> × <span className="text-red-400">0.5</span> × <span className="text-red-400">0.5</span> × <span className="text-red-400">0.5</span> ... ≈ <span className="text-red-500 font-bold">0.000</span>
                            </div>

                            <div>
                                <h4 className="font-bold text-white mb-2">The Consequence</h4>
                                <p className="text-muted-foreground leading-relaxed">
                                    If the weight or activation derivative is small (less than 1), repeated multiplication makes the signal shrink exponentially.
                                    The early layers (beginning of the sentence) receive a <strong>near-zero gradient</strong>.
                                </p>
                            </div>
                        </Card>

                        <div className="bg-red-900/10 border border-red-500/20 p-8 rounded-2xl">
                            <h4 className="font-bold text-red-400 text-xl mb-4">In Plain English:</h4>
                            <p className="text-lg text-red-200/80 leading-relaxed mb-6">
                                It's like a game of <strong>Telephone</strong>.
                                By the time the message (error signal) reaches the start of the line, it's so faint that it's completely lost.
                            </p>
                            <div className="bg-black/40 p-6 rounded-lg border border-red-500/10 text-center">
                                <strong className="text-red-400 block mb-2">Result:</strong>
                                The network "forgets" any context from the distant past. It only learns from recent local history.
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- SEPARATOR --- */}
                <div className="flex justify-center opacity-20">
                    <ArrowDown className="w-12 h-12" />
                </div>

                {/* --- SECTION 2: EXPLODING GRADIENT --- */}
                <div className="space-y-12">
                    <div className="border-l-4 border-amber-500 pl-8">
                        <h3 className="text-3xl font-bold text-white mb-4">2. The Exploding Gradient Problem</h3>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-4xl">
                            The opposite can also happen. If the weights are large, the signal doesn't vanish—it amplifies uncontrollably.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="bg-amber-900/10 border border-amber-500/20 p-8 rounded-2xl order-2 md:order-1">
                            <h4 className="font-bold text-amber-400 text-xl mb-4">The Butterfly Effect:</h4>
                            <p className="text-lg text-amber-200/80 leading-relaxed mb-6">
                                A tiny change at the start creates a massive change at the end.
                                The weights get pushed so hard they might result in <strong>NaN</strong> (Not a Number) errors, crashing the training.
                            </p>
                            <div className="bg-black/40 p-6 rounded-lg border border-amber-500/10 text-center">
                                <strong className="text-amber-400 block mb-2">Result:</strong>
                                Training becomes unstable. The loss function jumps around wildly and never converges.
                            </div>
                        </div>

                        <Card className="p-10 bg-black/40 border-white/10 shadow-2xl space-y-8 order-1 md:order-2">
                            <div>
                                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                                    <AlertTriangle className="text-amber-500 w-5 h-5" /> Exponential Growth
                                </h4>
                                <p className="text-muted-foreground leading-relaxed">
                                    If the derivatives are merely greater than 1, repeated multiplication causes them to blow up.
                                </p>
                            </div>

                            <div className="bg-white/5 p-6 rounded-xl font-mono text-sm md:text-base overflow-x-auto text-center border border-white/5">
                                <div className="text-muted-foreground mb-2">Gradient Chain:</div>
                                <span className="text-amber-400">2.0</span> × <span className="text-amber-400">2.0</span> × <span className="text-amber-400">2.0</span> × <span className="text-amber-400">2.0</span> ... = <span className="text-amber-500 font-bold">HUGE</span>
                            </div>

                            <div>
                                <h4 className="font-bold text-white mb-2">Why RNNs specifically?</h4>
                                <p className="text-muted-foreground leading-relaxed">
                                    Because RNNs use the <strong>exact same weight matrix</strong> ($W_h$) at every single step.
                                    This "power of matrix" effect ($W^{100}$) makes them uniquely sensitive to this problem.
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* --- SECTION 3: SOLUTIONS --- */}
                <div className="mt-12 bg-white/5 rounded-3xl p-12 border border-white/10">
                    <h3 className="text-2xl font-bold text-white mb-8 text-center">How do we fix this?</h3>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-4">
                            <h4 className="text-lg font-bold text-primary flex items-center gap-2">
                                <CheckCircle className="w-5 h-5" />
                                For Vanishing Gradients
                            </h4>
                            <p className="text-muted-foreground leading-relaxed">
                                We use modernized architectures like <strong>LSTMs (Long Short-Term Memory)</strong> or <strong>GRUs</strong>.
                                These have special "gates" that allow gradients to flow through time without being multiplied by partial derivatives &lt; 1.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h4 className="text-lg font-bold text-primary flex items-center gap-2">
                                <CheckCircle className="w-5 h-5" />
                                For Exploding Gradients
                            </h4>
                            <p className="text-muted-foreground leading-relaxed">
                                We use <strong>Gradient Clipping</strong>.
                                If the gradient vector norm exceeds a threshold (e.g., 5.0), we simply scale it down back to 5.0 before updating weights. It's a simple hack that works.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </Section>
    );
}
