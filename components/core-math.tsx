"use client";

import { useState } from "react";
import { Section } from "./ui/section";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { VectorView } from "./math-visualizer/vector-view";
import { TanhPlot } from "./math-visualizer/tanh-plot";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Play, Calculator, FunctionSquare, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

// Example data
const x_t = [0.2, 0.8, -0.4];
const h_prev = [0.5, -0.3, 0.9];
// Simplified weights for demonstration (normally matrices)
// We'll treat W and U as if they produce a 3-dim vector directly for simplicity in this visualizer
// or simulate matrix multiplication result.
// Let's pre-calculate some "results" to show flow, rather than full matrix math in browser for now, 
// to focus on concept.
const Wx_res = [0.5, -0.2, 0.1];
const Uh_res = [0.4, -0.1, 0.3];
const bias = [0.1, 0.1, 0.1];

const sum_res = [
    Wx_res[0] + Uh_res[0] + bias[0], // 1.0
    Wx_res[1] + Uh_res[1] + bias[1], // -0.2
    Wx_res[2] + Uh_res[2] + bias[2], // 0.5
];

const tanh_res = sum_res.map(Math.tanh);

const steps = [
    { id: "input", title: "1. The Inputs", desc: "The new word (Input) and the old memory (Prev State) meet." },
    { id: "mult", title: "2. Weighting", desc: "We decide how important the new word is vs. the old memory." },
    { id: "add", title: "3. Combining", desc: "We add them together. (New Info + Old Context)" },
    { id: "activ", title: "4. Squashing", desc: "We pass the sum through Tanh to keep numbers stable (-1 to 1)." },
    { id: "output", title: "5. New Memory", desc: "This becomes the new memory for the next step." },
];

export function CoreMath() {
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

    return (
        <Section id="core-math">
            <div className="text-center mb-24 space-y-8">
                <span className="text-sm font-bold text-muted-foreground tracking-widest uppercase">The Engine</span>
                <h2 className="text-4xl md:text-6xl font-bold">Inside the RNN Brain</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    How does it actually remember? It uses a simple but powerful math equation to update its memory state at every step.
                </p>

                {/* Equation Block - CENTERED AND ISOLATED */}
                <div className="mt-20 mb-20 relative">
                    <div className="absolute inset-x-0 top-1/2 h-px bg-white/5 -z-10"></div>
                    <div className="inline-block bg-[#0a0a0a] px-8 relative z-0 w-full max-w-5xl">
                        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-12 shadow-[0_0_50px_rgba(147,51,234,0.15)] backdrop-blur-sm">
                            <div className="text-center mb-12">
                                <code className="text-3xl md:text-6xl font-black text-primary block tracking-wider mb-4">
                                    h_t = tanh(W_x * x_t + W_h * h_{"{t-1}"} + b)
                                </code>
                                <div className="text-lg text-muted-foreground font-mono">
                                    New Memory = <span className="text-blue-400">Current Input</span> + <span className="text-purple-400">Past Memory</span> + Bias
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
                                <div className="bg-background/80 p-5 rounded-xl border border-white/10 hover:border-blue-400/50 transition-colors group">
                                    <span className="font-bold text-blue-400 text-xl block mb-2 font-mono group-hover:scale-105 transition-transform">x_t</span>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        <strong>Current Input</strong><br />
                                        The new information at time <em>t</em>.
                                    </p>
                                </div>
                                <div className="bg-background/80 p-5 rounded-xl border border-white/10 hover:border-blue-400/50 transition-colors group">
                                    <span className="font-bold text-blue-400 text-xl block mb-2 font-mono group-hover:scale-105 transition-transform">W_x</span>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        <strong>Input Weight</strong><br />
                                        How much the new input matters.
                                    </p>
                                </div>
                                <div className="bg-background/80 p-5 rounded-xl border border-white/10 hover:border-purple-400/50 transition-colors group">
                                    <span className="font-bold text-purple-400 text-xl block mb-2 font-mono group-hover:scale-105 transition-transform">h_{"{t-1}"}</span>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        <strong>Previous State</strong><br />
                                        The memory from the step before.
                                    </p>
                                </div>
                                <div className="bg-background/80 p-5 rounded-xl border border-white/10 hover:border-purple-400/50 transition-colors group">
                                    <span className="font-bold text-purple-400 text-xl block mb-2 font-mono group-hover:scale-105 transition-transform">W_h</span>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        <strong>Hidden Weight</strong><br />
                                        How much we trust the past memory.
                                    </p>
                                </div>
                                <div className="bg-background/80 p-5 rounded-xl border border-white/10 hover:border-white/50 transition-colors group">
                                    <span className="font-bold text-white text-xl block mb-2 font-mono group-hover:scale-105 transition-transform">b</span>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        <strong>Bias</strong><br />
                                        Shifts the activation to fit data better.
                                    </p>
                                </div>
                                <div className="bg-background/80 p-5 rounded-xl border border-white/10 hover:border-white/50 transition-colors group">
                                    <span className="font-bold text-white text-xl block mb-2 font-mono group-hover:scale-105 transition-transform">tanh</span>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        <strong>Activation</strong><br />
                                        Squashes values between -1 and 1.
                                    </p>
                                </div>
                                <div className="bg-background/80 p-5 rounded-xl border border-white/10 hover:border-primary/50 transition-colors group col-span-1 md:col-span-2 bg-primary/5">
                                    <span className="font-bold text-primary text-xl block mb-2 font-mono group-hover:scale-105 transition-transform">h_t</span>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        <strong>New Hidden State</strong><br />
                                        The updated memory sent to the next step.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-16 items-start">
                {/* Controls / Explainer */}
                <div className="lg:col-span-1 space-y-8 sticky top-32">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-primary" /> Step-by-Step Breakdown
                    </h3>
                    <div className="space-y-4">
                        {steps.map((step, idx) => (
                            <button
                                key={step.id}
                                onClick={() => setCurrentStep(idx)}
                                className={cn(
                                    "w-full text-left p-6 rounded-xl transition-all border relative overflow-hidden",
                                    currentStep === idx
                                        ? "bg-primary/10 border-primary text-foreground shadow-lg"
                                        : "bg-card/50 hover:bg-white/5 border-white/5 text-muted-foreground hover:border-white/10"
                                )}
                            >
                                {currentStep === idx && (
                                    <motion.div
                                        layoutId="activeStep"
                                        className="absolute left-0 top-0 bottom-0 w-1 bg-primary"
                                    />
                                )}
                                <div className="font-bold text-lg mb-1">{step.title}</div>
                                <div className="text-sm opacity-80 leading-relaxed font-light">{step.desc}</div>
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button onClick={prevStep} disabled={currentStep === 0} variant="secondary" className="px-6 h-12">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Prev
                        </Button>
                        <Button onClick={nextStep} disabled={currentStep === steps.length - 1} className="flex-1 h-12 text-lg bg-primary hover:bg-primary/90">
                            Next Step <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Visualization Area */}
                <Card className="lg:col-span-2 min-h-[600px] flex flex-col items-center justify-center p-12 bg-black/40 border-white/10 relative overflow-hidden shadow-2xl rounded-3xl">
                    <div className="absolute top-6 right-6 text-xs font-mono text-muted-foreground bg-white/5 px-3 py-1 rounded-full border border-white/5">
                        Interactive Matrix View
                    </div>

                    <AnimatePresence mode="wait">
                        {/* Step 0: Inputs */}
                        {currentStep === 0 && (
                            <motion.div
                                key="step0"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.1 }}
                                className="flex gap-16 items-center"
                            >
                                <VectorView label="Input (x_t)" values={x_t} color="blue" />
                                <div className="text-6xl text-muted-foreground font-thin">+</div>
                                <VectorView label="Prev State (h_{t-1})" values={h_prev} color="purple" />
                            </motion.div>
                        )}
                        {/* ... (Other steps omitted for brevity in prompt, but assuming they work similarly. I will keep the original logic for other steps but improve styling wrappers) */}

                        {/* Step 1: Multiplication */}
                        {currentStep === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col gap-12 items-center"
                            >
                                <div className="flex gap-12 opacity-40 scale-75 blur-[2px]">
                                    <VectorView label="x_t" values={x_t} />
                                    <VectorView label="h_{t-1}" values={h_prev} />
                                </div>
                                <ArrowRight className="rotate-90 text-muted-foreground w-8 h-8" />
                                <div className="flex gap-16 items-center bg-white/5 p-8 rounded-2xl border border-white/10">
                                    <div className="text-center">
                                        <div className="mb-4 text-lg font-bold text-blue-400">Wx_t</div>
                                        <VectorView values={Wx_res} />
                                    </div>
                                    <div className="h-20 w-px bg-white/10"></div>
                                    <div className="text-center">
                                        <div className="mb-4 text-lg font-bold text-purple-400">Uh_<span>{"{t-1}"}</span></div>
                                        <VectorView values={Uh_res} />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Addition */}
                        {currentStep === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col gap-12 items-center"
                            >
                                <div className="flex gap-6 items-center opacity-50 scale-75">
                                    <VectorView values={Wx_res} />
                                    <div className="text-2xl">+</div>
                                    <VectorView values={Uh_res} />
                                    <div className="text-2xl">+</div>
                                    <VectorView values={bias} label="bias" />
                                </div>
                                <ArrowRight className="rotate-90 text-muted-foreground w-8 h-8" />
                                <div className="bg-white/5 p-8 rounded-2xl border border-white/10 transform scale-125">
                                    <VectorView label="Sum (Pre-activation)" values={sum_res} color="white" />
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Activation */}
                        {currentStep === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col gap-12 items-center w-full"
                            >
                                <div className="grid grid-cols-3 gap-8 w-full justify-items-center">
                                    {sum_res.map((val, i) => (
                                        <div key={i} className="flex flex-col items-center bg-black/20 p-4 rounded-xl border border-white/5">
                                            <TanhPlot input={val} output={tanh_res[i]} />
                                        </div>
                                    ))}
                                </div>
                                <div className="text-base text-muted-foreground bg-white/5 px-6 py-2 rounded-full">
                                    Passing each element through <strong>tanh</strong>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 4: Output */}
                        {currentStep === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col gap-8 items-center"
                            >
                                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                                    New Hidden State (h_t)
                                </div>
                                <div className="transform scale-150 p-8 bg-primary/10 rounded-2xl border border-primary/20 shadow-[0_0_50px_rgba(147,51,234,0.2)]">
                                    <VectorView values={tanh_res} />
                                </div>
                                <div className="text-center text-muted-foreground max-w-sm text-lg leading-relaxed mt-4">
                                    This vector now carries the memory of both the <span className="text-blue-400">new input</span> AND the <span className="text-purple-400">past context</span>.
                                </div>
                                <Button onClick={() => setCurrentStep(0)} variant="outline" className="mt-8 px-8 border-white/10 hover:bg-white/5">
                                    <Play className="mr-2 h-4 w-4" /> Restart
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Card>
            </div>
        </Section>
    );
}
