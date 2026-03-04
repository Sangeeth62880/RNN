"use client";

import { useState } from "react";
import { Section } from "./ui/section";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Shuffle, RefreshCcw, ArrowRight, Grid3X3, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function SequentialVsSpatial() {
    const originalSentence = ["I", "am", "not", "happy"];
    const shuffledSentence = ["happy", "not", "I", "am"];
    const [isShuffled, setIsShuffled] = useState(false);

    // CNN Grid Data
    const gridPoints = Array.from({ length: 9 }, (_, i) => i);

    return (
        <Section id="sequential-vs-spatial" className="py-32">

            {/* --- PART 1: SEQUENTIAL DATA --- */}
            <div className="text-center mb-24 space-y-6">
                <span className="text-sm font-bold text-muted-foreground tracking-widest uppercase">Fundamental Concept</span>
                <h2 className="text-4xl md:text-6xl font-bold">What is Sequential Data?</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    Data where <span className="text-primary font-bold">order matters</span> and each element depends on the previous ones.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
                <Card className="min-h-[400px] flex flex-col justify-center items-center p-12 bg-black/40 border-white/10 shadow-2xl backdrop-blur-sm">
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <AnimatePresence mode="popLayout">
                            {(isShuffled ? shuffledSentence : originalSentence).map((word, index) => (
                                <motion.div
                                    key={word} // Key is the word itself to track it
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ type: "spring", damping: 20, stiffness: 120 }}
                                    className={cn(
                                        "text-2xl md:text-4xl font-mono font-bold px-6 py-3 rounded-xl border-2 transition-colors duration-500",
                                        isShuffled
                                            ? "bg-red-500/10 border-red-500/30 text-red-400"
                                            : "bg-green-500/10 border-green-500/30 text-green-400"
                                    )}
                                >
                                    {word}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <div className="flex flex-col items-center gap-6">
                        <div className={cn(
                            "text-lg font-bold transition-colors duration-500",
                            isShuffled ? "text-red-400" : "text-green-400"
                        )}>
                            Meaning: {isShuffled ? "😕 Confusing / Nonsense" : "😞 Sadness"}
                        </div>

                        <Button
                            onClick={() => setIsShuffled(!isShuffled)}
                            size="lg"
                            variant={isShuffled ? "default" : "outline"}
                            className="text-lg px-8 h-14"
                        >
                            {isShuffled ? <RefreshCcw className="mr-2 w-5 h-5" /> : <Shuffle className="mr-2 w-5 h-5" />}
                            {isShuffled ? "Restore Order" : "Shuffle Words"}
                        </Button>
                    </div>
                </Card>

                <div className="space-y-8">
                    <div className="bg-white/5 border-l-4 border-primary p-8 rounded-r-2xl space-y-4">
                        <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                            <span className="p-2 bg-primary/20 rounded-lg"><ArrowRight className="w-6 h-6 text-primary" /></span>
                            Order = Meaning
                        </h3>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            If you change the order of pixels in an image (slightly), it's still a cat.
                            But if you change the order of words, the meaning breaks completely.
                        </p>
                    </div>

                    <div className="grid gap-4">
                        <div className="bg-black/40 p-6 rounded-xl border border-white/5">
                            <h4 className="font-bold text-white mb-2">Common Examples:</h4>
                            <ul className="space-y-3 text-muted-foreground">
                                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> Text & Speech</li>
                                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> Stock Prices (Time Series)</li>
                                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> DNA Sequences</li>
                                <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> Weather Data</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- PART 2: SPATIAL DATA (CNN) --- */}
            <div className="mb-32">
                <div className="text-center mb-16 space-y-4">
                    <span className="text-sm font-bold text-muted-foreground tracking-widest uppercase">The Opposite Approach</span>
                    <h3 className="text-3xl md:text-5xl font-bold text-white">How CNNs Process spatial Data</h3>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-center flex-row-reverse">
                    <div className="space-y-8 order-2 lg:order-1">
                        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl space-y-4">
                            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                                <span className="p-2 bg-blue-500/20 rounded-lg"><Grid3X3 className="w-6 h-6 text-blue-400" /></span>
                                Spatial Patterns
                            </h3>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                A Convolutional Neural Network (CNN) looks for features (edges, textures) anywhere in the image.
                                It doesn't care about "time". It cares about <strong>space</strong>.
                            </p>
                        </div>
                        <div className="bg-black/40 p-6 rounded-xl border border-white/5 text-muted-foreground">
                            <p>
                                When a CNN looks at a photo, it sees the whole grid at once.
                                It processes the inputs <strong>independently</strong>.
                                It has no memory of the previous image it saw.
                            </p>
                        </div>
                    </div>

                    <Card className="min-h-[400px] flex flex-col justify-center items-center p-12 bg-black/40 border-white/10 shadow-2xl order-1 lg:order-2">
                        <div className="relative">
                            {/* Simple Grid Graphic */}
                            <div className="grid grid-cols-3 gap-2 mb-8 relative">
                                {gridPoints.map((i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0.5 }}
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                                        className="w-16 h-16 bg-blue-500/20 border border-blue-500/40 rounded-lg"
                                    />
                                ))}
                                {/* Scanning Window Animation */}
                                <motion.div
                                    animate={{
                                        x: [0, 72, 144, 0, 72, 144, 0, 72, 144],
                                        y: [0, 0, 0, 72, 72, 72, 144, 144, 144]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear", times: [0, 0.1, 0.2, 0.35, 0.45, 0.55, 0.7, 0.8, 1] }}
                                    className="absolute w-16 h-16 border-4 border-yellow-400/80 rounded-lg shadow-[0_0_20px_rgba(250,204,21,0.4)] z-10"
                                />
                            </div>
                            <div className="text-center font-mono text-sm text-yellow-500">
                                Scanning... No Memory Required
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* --- PART 3: COMPARISON SUMMARY --- */}
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <div className="bg-blue-900/10 border border-blue-500/20 p-8 rounded-2xl text-center space-y-6">
                    <h3 className="text-2xl font-bold text-blue-400">CNN (Images)</h3>
                    <ul className="space-y-4 text-left inline-block">
                        <li className="flex items-center gap-3">
                            <span className="p-1 rounded bg-blue-500/20 text-blue-400 text-xs font-mono">DATA</span>
                            Spatial (Height x Width)
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="p-1 rounded bg-blue-500/20 text-blue-400 text-xs font-mono">MEMORY</span>
                            None (Independent)
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="p-1 rounded bg-blue-500/20 text-blue-400 text-xs font-mono">DEPENDENCY</span>
                            Pixels near each other
                        </li>
                    </ul>
                </div>

                <div className="bg-primary/10 border border-primary/20 p-8 rounded-2xl text-center space-y-6">
                    <h3 className="text-2xl font-bold text-primary">RNN (Sequences)</h3>
                    <ul className="space-y-4 text-left inline-block">
                        <li className="flex items-center gap-3">
                            <span className="p-1 rounded bg-primary/20 text-primary text-xs font-mono">DATA</span>
                            Temporal (Time Steps)
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="p-1 rounded bg-primary/20 text-primary text-xs font-mono">MEMORY</span>
                            Hidden State (Context)
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="p-1 rounded bg-primary/20 text-primary text-xs font-mono">DEPENDENCY</span>
                            Previous time steps
                        </li>
                    </ul>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-24 text-center"
            >
                <div className="inline-block bg-gradient-to-r from-primary/20 to-purple-500/20 p-[1px] rounded-full">
                    <div className="bg-black/80 backdrop-blur-xl rounded-full px-8 py-4 border border-white/10 flex items-center gap-4">
                        <span className="text-lg text-white">Because order matters...</span>
                        <ArrowRight className="w-5 h-5 text-primary" />
                        <span className="text-lg font-bold text-primary">We need a model that REMEMBERS.</span>
                    </div>
                </div>
                <div className="mt-8">
                    <ArrowDown className="w-6 h-6 text-muted-foreground mx-auto animate-bounce" />
                </div>
            </motion.div>

        </Section>
    );
}
