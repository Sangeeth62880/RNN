"use client";

import { NeuralNetworkBackground } from "./neural-network-background";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";

export function Hero() {
    const scrollToStart = () => {
        const el = document.getElementById("intro");
        el?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
            <NeuralNetworkBackground />

            <div className="z-10 text-center px-6 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8"
                >
                    <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm text-muted-foreground uppercase tracking-widest">
                        Interactive Visual Guide
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-6xl md:text-9xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/60 mb-10"
                >
                    Recurrent
                    <br />
                    Neural Networks
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-2xl md:text-3xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light mb-12"
                >
                    How machines understand <span className="text-primary font-normal">time</span>, <span className="text-primary font-normal">context</span>, and <span className="text-primary font-normal">memory</span>.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex flex-col items-center gap-12"
                >
                    <Button
                        size="lg"
                        onClick={scrollToStart}
                        className="rounded-full px-8 text-lg"
                    >
                        Start Learning
                        <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
                    </Button>

                    <div className="grid md:grid-cols-3 gap-6 text-left max-w-4xl w-full bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-md">
                        <div className="space-y-2">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-400" /> Sequence
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Unlike standard AI, RNNs process data <strong>step-by-step</strong>, not all at once.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-purple-400" /> Memory
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                They maintain a <strong>Hidden State</strong> that remembers what happened in previous steps.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-400" /> Loops
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                The output of one step becomes the input for the next. That's why it's <strong>"Recurrent"</strong>.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
