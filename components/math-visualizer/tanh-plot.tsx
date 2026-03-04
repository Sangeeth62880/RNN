"use client";

import { motion } from "framer-motion";

interface TanhPlotProps {
    input: number;
    output: number;
}

export function TanhPlot({ input, output }: TanhPlotProps) {
    // SVG coordinate system
    const width = 200;
    const height = 150;
    const padding = 20;

    // Map data coordinates to SVG coordinates
    // X range: [-3, 3] -> [padding, width - padding]
    // Y range: [-1.2, 1.2] -> [height - padding, padding]

    const xScale = (x: number) => {
        return padding + ((x + 3) / 6) * (width - 2 * padding);
    };

    const yScale = (y: number) => {
        return height - padding - ((y + 1.2) / 2.4) * (height - 2 * padding);
    };

    // Generate path
    const points = [];
    for (let x = -3; x <= 3; x += 0.1) {
        points.push(`${xScale(x)},${yScale(Math.tanh(x))}`);
    }
    const pathData = `M ${points.join(" L ")}`;

    // Clamp input visualization to visible range
    const clampedInput = Math.max(-3, Math.min(3, input));
    const pointX = xScale(clampedInput);
    const pointY = yScale(output);

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="relative">
                <svg width={width} height={height} className="overflow-visible">
                    {/* Axes */}
                    <line x1={xScale(-3)} y1={yScale(0)} x2={xScale(3)} y2={yScale(0)} stroke="currentColor" strokeOpacity={0.2} />
                    <line x1={xScale(0)} y1={yScale(-1.2)} x2={xScale(0)} y2={yScale(1.2)} stroke="currentColor" strokeOpacity={0.2} />

                    {/* Tanh Curve */}
                    <path d={pathData} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />

                    {/* Current Point */}
                    <motion.circle
                        cx={pointX}
                        cy={pointY}
                        r={6}
                        fill="white"
                        stroke="hsl(var(--primary))"
                        strokeWidth="2"
                        animate={{ cx: pointX, cy: pointY }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    />

                    {/* Dashed lines to axes */}
                    <motion.line
                        x1={pointX} y1={pointY} x2={pointX} y2={yScale(0)}
                        stroke="white" strokeDasharray="4" strokeOpacity={0.5}
                        animate={{ x1: pointX, y1: pointY, x2: pointX }}
                    />
                    <motion.line
                        x1={pointX} y1={pointY} x2={xScale(0)} y2={pointY}
                        stroke="white" strokeDasharray="4" strokeOpacity={0.5}
                        animate={{ x1: pointX, y1: pointY, y2: pointY }}
                    />
                </svg>
                <div className="absolute top-0 right-0 text-xs text-muted-foreground p-1 bg-black/50 rounded">
                    tanh(x)
                </div>
            </div>
            <div className="flex gap-4 text-xs font-mono">
                <div>in: <span className="text-foreground">{input.toFixed(2)}</span></div>
                <div>out: <span className="text-primary font-bold">{output.toFixed(2)}</span></div>
            </div>
        </div>
    );
}
