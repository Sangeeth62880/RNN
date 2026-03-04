"use client";

import { motion } from "framer-motion";
import { Card } from "../ui/card";

interface PredictionVizProps {
    predictions: { char: string; prob: number }[];
}

export function PredictionViz({ predictions }: PredictionVizProps) {
    // Show top 5
    const topPreds = predictions.slice(0, 5);

    return (
        <Card className="p-6 bg-black/40 h-[400px] flex flex-col border-white/10">
            <div className="mb-4">
                <h3 className="text-lg font-bold">Next Character Prediction</h3>
                <p className="text-xs text-muted-foreground">What the model thinks comes next.</p>
            </div>

            <div className="flex-1 flex flex-col gap-3 justify-center">
                {topPreds.map((pred, i) => (
                    <div key={pred.char} className="flex items-center gap-3">
                        <div className="w-10 h-10 flex items-center justify-center font-mono text-lg font-bold bg-white/5 rounded-lg border border-white/10">
                            {pred.char === " " ? "␣" : pred.char}
                        </div>
                        <div className="flex-1 h-3 bg-white/5 rounded-full overflow-hidden relative">
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-purple-400"
                                initial={{ width: 0 }}
                                animate={{ width: `${pred.prob * 100}%` }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            />
                        </div>
                        <div className="w-16 text-right text-sm font-mono font-bold text-primary">
                            {(pred.prob * 100).toFixed(1)}%
                        </div>
                    </div>
                ))}

                {predictions.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground/30 text-sm gap-2">
                        <div className="animate-pulse">Waiting for model...</div>
                    </div>
                )}
            </div>
        </Card>
    );
}
