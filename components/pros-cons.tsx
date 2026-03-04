"use client";

import { Section } from "./ui/section";
import { Card } from "./ui/card";
import { motion } from "framer-motion";
import { Check, X, AlertTriangle } from "lucide-react";

const pros = [
    { text: "Handles sequential data of varying lengths", desc: "Unlike standard NNs which need fixed input size." },
    { text: "Parameter Sharing", desc: "Uses the same weights at every time step, reducing model size." },
    { text: "Context Awareness", desc: "Memory of previous inputs influences current processing." },
];

const cons = [
    { text: "Vanishing Gradient Problem", desc: "Difficulty learning long-range dependencies." },
    { text: "Slow Training (Sequential)", desc: "Cannot parallelize hidden state computation like Transformers." },
    { text: "Short-term Memory Bias", desc: "Tends to forget earlier inputs in long sequences." },
];

export function ProsCons() {
    return (
        <Section id="pros-cons">
            <div className="text-center mb-24 space-y-6">
                <span className="text-sm font-bold text-muted-foreground tracking-widest uppercase">Evaluation</span>
                <h2 className="text-4xl md:text-6xl font-bold">Strengths & Weaknesses</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Every architecture has trade-offs. Here's exactly what you need to know.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
                {/* Pros */}
                <div className="space-y-8">
                    <h3 className="text-3xl font-bold text-center text-green-400 mb-8 border-b border-green-500/20 pb-4">Advantages</h3>
                    {pros.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="p-8 border-green-500/20 bg-green-500/5 flex gap-6 items-start hover:bg-green-500/10 transition-colors">
                                <div className="p-3 bg-green-500/20 rounded-full mt-1 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                                    <Check className="w-6 h-6 text-green-500" />
                                </div>
                                <div className="space-y-2">
                                    <div className="font-bold text-xl">{item.text}</div>
                                    <div className="text-muted-foreground text-base leading-relaxed">{item.desc}</div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Cons */}
                <div className="space-y-8">
                    <h3 className="text-3xl font-bold text-center text-red-400 mb-8 border-b border-red-500/20 pb-4">Challenges</h3>
                    {cons.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Card className="p-8 border-red-500/20 bg-red-500/5 flex gap-6 items-start hover:bg-red-500/10 transition-colors">
                                <div className="p-3 bg-red-500/20 rounded-full mt-1 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                                    {i === 0 ? <AlertTriangle className="w-6 h-6 text-red-500" /> : <X className="w-6 h-6 text-red-500" />}
                                </div>
                                <div className="space-y-2">
                                    <div className="font-bold text-xl">{item.text}</div>
                                    <div className="text-muted-foreground text-base leading-relaxed">{item.desc}</div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
