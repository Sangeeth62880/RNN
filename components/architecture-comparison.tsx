"use client";

import { useState, useEffect } from "react";
import { Section } from "./ui/section";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RefreshCw, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function ArchitectureComparison() {
    const sequence = ["The", "movie", "was", "amazing"];
    const [step, setStep] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isPlaying) {
            interval = setInterval(() => {
                setStep((prev) => {
                    if (prev >= sequence.length) {
                        setIsPlaying(false);
                        return prev;
                    }
                    return prev + 1;
                });
            }, 1200);
        }
        return () => clearInterval(interval);
    }, [isPlaying, sequence.length]);

    const reset = () => {
        setStep(0);
        setIsPlaying(false);
    };

    return (
        <Section id="comparison" className="space-y-32">
            <div className="text-center space-y-10">
                <span className="text-sm font-bold text-muted-foreground tracking-widest uppercase">The Core Difference</span>
                <h2 className="text-4xl md:text-6xl font-bold">The Memory Gap</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Why do standard networks fail at stories, while RNNs thrive?
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-stretch">
                {/* Standard Network (Feedforward) */}
                <Card className="p-12 md:p-14 space-y-16 bg-black/40 border-white/10 relative overflow-hidden flex flex-col shadow-2xl">
                    <div className="flex justify-between items-center border-b border-white/5 pb-6">
                        <h3 className="text-2xl font-bold text-muted-foreground">Standard Network</h3>
                        <div className="text-xs uppercase tracking-wider font-bold bg-white/10 px-3 py-1.5 rounded text-muted-foreground">No Memory</div>
                    </div>

                    <div className="flex-1 flex flex-col justify-between gap-16">
                        {/* Visualization */}
                        <div className="flex justify-between items-center px-2 relative min-h-[160px]">
                            {sequence.map((word, i) => {
                                const isActive = step === i + 1;
                                const isPast = step > i + 1;

                                return (
                                    <div key={i} className="flex flex-col items-center gap-6 relative z-10 w-24">
                                        {/* Input Word */}
                                        <motion.div
                                            animate={{ opacity: isActive ? 1 : 0.2, y: isActive ? 0 : -10 }}
                                            className="text-base font-mono text-muted-foreground h-8"
                                        >
                                            {word}
                                        </motion.div>

                                        {/* Processing Node */}
                                        <motion.div
                                            animate={{
                                                scale: isActive ? 1.2 : 1,
                                                backgroundColor: isActive ? "#ffffff" : isPast ? "#333333" : "#1a1a1a",
                                                borderColor: isActive ? "#ffffff" : "#333333"
                                            }}
                                            className="w-16 h-16 rounded-full border-2 flex items-center justify-center transition-colors duration-300 shadow-lg"
                                        >
                                            {isPast ? <X className="text-muted-foreground/30 w-8 h-8" /> : null}
                                        </motion.div>

                                        {/* Output */}
                                        <motion.div
                                            animate={{ opacity: isActive ? 1 : 0 }}
                                            className="text-sm font-bold text-white h-6 transition-opacity"
                                        >
                                            Out
                                        </motion.div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="bg-white/5 p-8 rounded-xl text-base text-muted-foreground text-center border border-white/5 leading-relaxed">
                            <strong className="block text-white mb-2 uppercase tracking-wider text-xs">Analogy: Amnesia</strong>
                            Like reading a page but forgetting every word as soon as you read it.
                            They see "<span className="text-white">{sequence[Math.max(0, step - 1)]}</span>" but have forgotten the context.
                        </div>
                    </div>
                </Card>

                {/* RNN */}
                <Card className="p-12 md:p-14 space-y-16 bg-primary/5 border-primary/20 relative overflow-hidden flex flex-col shadow-[0_0_50px_rgba(147,51,234,0.1)]">
                    <div className="flex justify-between items-center border-b border-primary/20 pb-6">
                        <h3 className="text-2xl font-bold text-primary">Recurrent Neural Network</h3>
                        <div className="text-xs uppercase tracking-wider font-bold bg-primary/20 px-3 py-1.5 rounded text-primary border border-primary/30">Has Memory</div>
                    </div>

                    <div className="flex-1 flex flex-col justify-between gap-16">
                        {/* Visualization */}
                        <div className="flex justify-between items-center px-2 relative min-h-[160px]">
                            {/* Connecting Line (Hidden State) */}
                            <div className="absolute top-[4.5rem] left-10 right-10 h-1.5 bg-primary/20 z-0 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary shadow-[0_0_20px_rgba(147,51,234,0.8)]"
                                    initial={{ width: "0%" }}
                                    animate={{
                                        width: step === 0 ? "0%" : `${Math.min(100, (step / sequence.length) * 100)}%`
                                    }}
                                    transition={{ duration: 0.5, ease: "linear" }}
                                />
                            </div>

                            {sequence.map((word, i) => {
                                const isActive = step === i + 1;
                                const isPast = step > i + 1;
                                const isFuture = step <= i;

                                return (
                                    <div key={i} className="flex flex-col items-center gap-6 relative z-10 w-24">
                                        {/* Input Word */}
                                        <motion.div
                                            animate={{
                                                opacity: isActive ? 1 : isPast ? 0.5 : 0.2,
                                                y: isActive ? 0 : 0
                                            }}
                                            className={cn(
                                                "text-base font-mono h-8 font-bold",
                                                isActive ? "text-primary" : "text-muted-foreground"
                                            )}
                                        >
                                            {word}
                                        </motion.div>

                                        {/* Processing Node */}
                                        <motion.div
                                            animate={{
                                                scale: isActive ? 1.3 : 1,
                                                backgroundColor: isFuture ? "#1a1a1a" : "#9333ea", // Primary color hex
                                                borderColor: isFuture ? "#333333" : "#c084fc",
                                                boxShadow: isActive || isPast ? "0 0 30px rgba(147,51,234,0.5)" : "none"
                                            }}
                                            className="w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 relative z-20"
                                        >
                                            {(isActive || isPast) && (
                                                <div className="absolute inset-0 rounded-full border border-white/30 animate-ping" />
                                            )}
                                        </motion.div>

                                        {/* Output - Context accumulation */}
                                        <motion.div
                                            animate={{ opacity: isActive || isPast ? 1 : 0 }}
                                            className="text-xs font-bold text-primary h-6 transition-opacity uppercase tracking-wider"
                                        >
                                            {isActive ? "Mixing..." : isPast ? "Stored" : ""}
                                        </motion.div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="bg-primary/10 border border-primary/20 p-8 rounded-xl text-base text-foreground text-center leading-relaxed">
                            <strong className="block text-primary mb-2 uppercase tracking-wider text-xs">Analogy: Reading a Story</strong>
                            Each word mixes with the <span className="text-primary font-bold">memory</span> of the past.
                            Now "<span className="text-white">{sequence[Math.max(0, step - 1)]}</span>" actually means something!
                        </div>
                    </div>
                </Card>
            </div>

            <div className="flex flex-col items-center gap-8 mt-24">
                <div className="flex gap-6">
                    <Button
                        onClick={() => setIsPlaying(!isPlaying)}
                        disabled={step >= sequence.length}
                        size="lg"
                        className={cn(
                            "h-16 px-8 text-lg font-bold transition-all hover:scale-105",
                            isPlaying ? "bg-secondary" : "bg-primary shadow-[0_0_30px_rgba(147,51,234,0.4)]"
                        )}
                    >
                        {isPlaying ? "Pause Simulation" : step === 0 ? "Start Comparison" : "Resume Simulation"}
                    </Button>
                    <Button
                        onClick={reset}
                        variant="outline"
                        size="lg"
                        className="h-16 px-8 text-lg border-white/10 hover:bg-white/5"
                    >
                        <RefreshCw className="mr-2 h-5 w-5" />
                        Reset
                    </Button>
                </div>
                <AnimatePresence>
                    {step === sequence.length && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="text-2xl font-bold text-green-400 mt-8 bg-green-500/10 px-8 py-4 rounded-full border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.2)]"
                        >
                            Conclusion: RNN retained the full context!
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Section>
    );
}
