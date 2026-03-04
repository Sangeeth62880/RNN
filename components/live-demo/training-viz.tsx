"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "../ui/card";

interface TrainingVizProps {
    lossData: { epoch: number; loss: number }[];
}

export function TrainingViz({ lossData }: TrainingVizProps) {
    return (
        <Card className="p-6 bg-black/40 h-[400px] flex flex-col border-white/10">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h3 className="text-lg font-bold">Training Loss</h3>
                    <p className="text-xs text-muted-foreground">Lower is better. Flat line = stuck.</p>
                </div>
                {lossData.length > 0 && (
                    <div className="text-xs font-mono bg-white/5 px-2 py-1 rounded">
                        Current Loss: <span className="text-red-400 font-bold">{lossData[lossData.length - 1].loss.toFixed(4)}</span>
                    </div>
                )}
            </div>

            <div className="flex-1 w-full min-h-0 relative">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={lossData}>
                        <XAxis
                            dataKey="epoch"
                            stroke="#525252"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                            label={{ value: 'Epoch', position: 'insideBottomRight', offset: -5, fill: '#525252', fontSize: 10 }}
                        />
                        <YAxis
                            stroke="#525252"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                            domain={['auto', 'auto']}
                            width={30}
                        />
                        <Tooltip
                            contentStyle={{ backgroundColor: "#09090b", border: "1px solid #27272a", borderRadius: "8px" }}
                            itemStyle={{ color: "#ef4444" }}
                        />
                        <Line
                            type="monotone"
                            dataKey="loss"
                            stroke="#ef4444"
                            strokeWidth={3}
                            dot={false}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                            animationDuration={500}
                        />
                    </LineChart>
                </ResponsiveContainer>

                {lossData.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 text-sm">
                        Waiting for training to start...
                    </div>
                )}
            </div>
        </Card>
    );
}
