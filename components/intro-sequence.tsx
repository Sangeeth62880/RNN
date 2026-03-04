"use client";

import { useState } from "react";
import { Section } from "./ui/section";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";

export function IntroSequence() {
    const sentence = ["The", "movie", "was", "not", "good"];
    const [step, setStep] = useState(0);

    const nextStep = () => {
        if (step < sentence.length) {
            setStep(step + 1);
        }
    };

    const reset = () => {
        setStep(0);
    };

    return (
        <Section id="intro">
            <div className="text-center mb-24 space-y-6">
                <span className="text-sm font-bold text-muted-foreground tracking-widest uppercase">The Problem</span>
                <h2 className="text-4xl md:text-6xl font-bold">Why Sequence Matters</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Feedforward networks process inputs independently. <br />
                    They have no concept of <span className="text-foreground font-semibold">"order"</span> or <span className="text-foreground font-semibold">"memory"</span>.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
                <div className="space-y-10 top-24 sticky">
                    <Card className="min-h-[400px] flex flex-col justify-center items-center space-y-12 bg-black/40 border-white/10 p-12 backdrop-blur-sm">
                        <div className="flex flex-wrap justify-center gap-4">
                            {sentence.map((word, index) => (
                                index < step && (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        className={`text-3xl md:text-5xl font-mono font-bold px-6 py-3 rounded-xl border-2 ${word === "not"
                                            ? "bg-red-500/10 text-red-500 border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.2)]"
                                            : word === "good"
                                                ? "bg-green-500/10 text-green-500 border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.2)]"
                                                : "bg-white/5 border-white/10"
                                            }`}
                                    >
                                        {word}
                                    </motion.div>
                                )
                            ))}
                        </div>

                        {step === sentence.length && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center space-y-3 bg-black/80 p-8 rounded-2xl border border-white/10 shadow-2xl"
                            >
                                <div className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-2">Model Prediction</div>
                                <div className="text-5xl font-bold text-red-500 tracking-tight">NEGATIVE</div>
                                <p className="text-base text-muted-foreground mt-4 max-w-xs mx-auto border-t border-white/10 pt-4">
                                    Why? Because it remembered <strong className="text-white">"not"</strong>!
                                </p>
                            </motion.div>
                        )}
                    </Card>

                    <div className="flex justify-center gap-6">
                        <Button
                            onClick={nextStep}
                            disabled={step === sentence.length}
                            size="lg"
                            className={step === sentence.length ? "opacity-50" : "bg-primary text-lg h-14 px-8"}
                        >
                            <Play className="mr-3 h-5 w-5" />
                            {step === 0 ? "Start Reading" : "Next Word"}
                        </Button>
                        <Button onClick={reset} variant="outline" size="lg" className="h-14 px-8">
                            <RotateCcw className="mr-3 h-5 w-5" />
                            Reset
                        </Button>
                    </div>
                </div>

                <div className="space-y-16">
                    <div className="space-y-6">
                        <h3 className="text-3xl font-bold text-white">Why Does This Matter?</h3>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            Imagine reading a book. You don't understand the story by looking at one word at a time in isolation.
                            You understand it by relating the current word to everything you've read before.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-red-500/5 p-10 rounded-2xl border border-red-500/10 space-y-6">
                            <h4 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-red-500/20 text-sm">✕</span>
                                The Problem with Standard AI
                            </h4>
                            <ul className="space-y-6">
                                <li className="flex gap-4 items-start">
                                    <span className="text-red-400 font-bold mt-1 text-xl">•</span>
                                    <span className="text-muted-foreground text-lg">Standard networks forget the past immediately (Amnesia).</span>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <span className="text-red-400 font-bold mt-1 text-xl">•</span>
                                    <span className="text-muted-foreground text-lg">They see "good" and think "POSITIVE", totally ignoring "not".</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-green-500/5 p-10 rounded-2xl border border-green-500/10 space-y-6">
                            <h4 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/20 text-sm">✓</span>
                                The RNN Solution
                            </h4>
                            <ul className="space-y-6">
                                <li className="flex gap-4 items-start">
                                    <span className="text-green-500 font-bold mt-1 text-xl">•</span>
                                    <span className="text-foreground text-lg">
                                        RNNs have a <strong>"Hidden State"</strong>.
                                        <div className="text-base text-muted-foreground mt-1 bg-black/20 p-2 rounded border border-white/5">
                                            Think of this as a <strong>running summary</strong> of everything the network has seen so far.
                                        </div>
                                    </span>
                                </li>
                                <li className="flex gap-4 items-start">
                                    <span className="text-green-500 font-bold mt-1 text-xl">•</span>
                                    <span className="text-foreground text-lg">They pass this memory forward, allowing them to connect <strong>"not"</strong> with <strong>"good"</strong>.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
