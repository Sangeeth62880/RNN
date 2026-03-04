"use client";

import { Section } from "./ui/section";
import { Card } from "./ui/card";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUp } from "lucide-react";

export function UnrolledView() {
    const timeSteps = [1, 2, 3, 4];

    return (
        <Section id="unrolled">
            <div className="text-center mb-24 space-y-6">
                <span className="text-sm font-bold text-muted-foreground tracking-widest uppercase">Time Dimensions</span>
                <h2 className="text-4xl md:text-6xl font-bold">Unrolling Through Time</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    An RNN is just unrelated copies of the same network, executed sequentially.
                </p>
            </div>

            <Card className="min-h-[500px] flex flex-col items-center justify-center p-12 overflow-x-auto bg-black/40 border-white/10 mt-12 mb-12 shadow-2xl">
                <div className="flex items-center gap-12 min-w-[900px] pt-16 pb-12 px-12">
                    {timeSteps.map((t, i) => (
                        <div key={t} className="flex items-center">
                            {/* The Cell */}
                            <div className="flex flex-col items-center gap-6 relative">
                                {/* Input x_t */}
                                <div className="flex flex-col items-center gap-3">
                                    <div className="font-mono text-sm text-muted-foreground font-bold">x_{t}</div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.2 }}
                                    >
                                        <ArrowUp className="text-blue-400 w-6 h-6" />
                                    </motion.div>
                                </div>

                                {/* RNN Cell Box */}
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: i * 0.2, type: "spring" }}
                                    className="w-28 h-28 rounded-3xl bg-primary/10 border-2 border-primary flex flex-col items-center justify-center relative z-10 bg-[#0a0a0a] shadow-[0_0_30px_rgba(147,51,234,0.2)]"
                                >
                                    <div className="font-bold text-2xl text-primary">A</div>
                                    <div className="text-xs text-muted-foreground mt-1 font-mono">tanh</div>

                                    {/* Shared Weights Indicators */}
                                    <div className="absolute -left-3 top-10 text-[10px] bg-background border border-purple-500/50 px-1.5 py-0.5 rounded text-purple-400 font-bold shadow-sm">U</div>
                                    <div className="absolute bottom-3 text-[10px] bg-background border border-blue-500/50 px-1.5 py-0.5 rounded text-blue-400 font-bold shadow-sm">W</div>
                                    <div className="absolute -top-3 text-[10px] bg-background border border-green-500/50 px-1.5 py-0.5 rounded text-green-400 font-bold shadow-sm">V</div>
                                </motion.div>

                                {/* Output y_t */}
                                <div className="flex flex-col items-center gap-3">
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.2 + 0.1 }}
                                    >
                                        <ArrowUp className="text-green-400 w-6 h-6" />
                                    </motion.div>
                                    <div className="font-mono text-sm text-muted-foreground font-bold">y_{t}</div>
                                </div>
                            </div>

                            {/* Connection to next step */}
                            {i < timeSteps.length - 1 && (
                                <div className="w-32 h-[120px] flex items-center justify-center relative -mx-6 -mt-[104px] z-0">
                                    <motion.div
                                        initial={{ width: 0, opacity: 0 }}
                                        whileInView={{ width: "100%", opacity: 1 }}
                                        transition={{ delay: i * 0.2 + 0.2, duration: 0.5 }}
                                        className="h-1.5 bg-purple-500/50 w-full relative rounded-full"
                                    >
                                        <ArrowRight className="absolute -right-3 -top-3.5 text-purple-500 w-8 h-8" />
                                        <motion.div
                                            className="absolute top-0 right-0 w-full h-full bg-purple-400 blur-md"
                                            animate={{ opacity: [0.2, 0.8, 0.2] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                    </motion.div>
                                    <div className="absolute top-1/2 -mt-8 font-mono text-xs text-purple-400 font-bold bg-background/50 px-2 rounded">h_{t}</div>
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Ellipsis for continuation */}
                    <div className="flex items-center pl-10 -mt-[100px]">
                        <div className="text-5xl text-muted-foreground tracking-widest opacity-30">...</div>
                    </div>
                </div>
            </Card>

            <div className="mt-20 grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                <div className="bg-white/5 p-8 rounded-2xl border border-white/10 space-y-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <span className="text-primary">01.</span> Same Brain, Different Time
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                        It's not 4 different networks. It's the <strong>exact same network</strong> (same clone) being used 4 times in a row.
                    </p>
                </div>
                <div className="bg-primary/5 p-8 rounded-2xl border border-primary/20 space-y-4">
                    <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                        <span className="text-white">02.</span> Shared Weights (Key Concept)
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                        The weights <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30 font-mono text-sm">W</span> and <span className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30 font-mono text-sm">U</span> are the <strong>same</strong> at every step. This means the model learns <em>general rules</em> for time, rather than specific rules for "step 3".
                    </p>
                </div>
            </div>
        </Section>
    );
}
