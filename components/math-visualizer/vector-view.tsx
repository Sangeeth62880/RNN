"use client";

import { motion } from "framer-motion";

interface VectorViewProps {
    label?: string;
    values: number[];
    color?: string; // Tailwind color class prefix (e.g., 'primary', 'blue')
    horizontal?: boolean;
}

export function VectorView({ label, values, color = "primary", horizontal = false }: VectorViewProps) {
    return (
        <div className="flex flex-col items-center gap-2">
            {label && <div className="text-sm font-bold text-muted-foreground">{label}</div>}
            <div
                className={`flex ${horizontal ? "flex-row" : "flex-col"} gap-1 p-2 rounded-lg bg-background/50 border border-white/10 shadow-inner`}
            >
                {values.map((val, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className={`
              w-12 h-10 flex items-center justify-center rounded text-sm font-mono font-bold
              ${val > 0 ? "bg-green-500/20 text-green-400" : val < 0 ? "bg-red-500/20 text-red-400" : "bg-white/5 text-muted-foreground"}
            `}
                    >
                        {val.toFixed(2)}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
