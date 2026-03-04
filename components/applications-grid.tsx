"use client";

import { Section } from "./ui/section";
import { Card } from "./ui/card";
import { motion } from "framer-motion";
import { MessageSquare, Mic, TrendingUp, Globe } from "lucide-react";

const apps = [
    {
        icon: Globe,
        title: "Natural Language Processing",
        desc: "Machine Translation, Sentiment Analysis, Text Generation.",
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20"
    },
    {
        icon: Mic,
        title: "Speech Recognition",
        desc: "Converting spoken language into text (Siri, Google Assistant).",
        color: "text-green-400",
        bg: "bg-green-500/10",
        border: "border-green-500/20"
    },
    {
        icon: TrendingUp,
        title: "Time Series Forecasting",
        desc: "Stock prices, weather prediction, energy consumption.",
        color: "text-purple-400",
        bg: "bg-purple-500/10",
        border: "border-purple-500/20"
    },
    {
        icon: MessageSquare,
        title: "Chatbots & Assistants",
        desc: "Conversational agents that remember context (like this one!).",
        color: "text-orange-400",
        bg: "bg-orange-500/10",
        border: "border-orange-500/20"
    },
];

export function ApplicationsGrid() {
    return (
        <Section id="applications">
            <div className="text-center mb-24 space-y-6">
                <span className="text-sm font-bold text-muted-foreground tracking-widest uppercase">Impact</span>
                <h2 className="text-4xl md:text-6xl font-bold">Real-World Applications</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Where Sequence Modeling Changed the Game
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
                {apps.map((app, i) => (
                    <Card
                        key={i}
                        className={`flex flex-col gap-6 p-10 transition-all duration-300 hover:scale-[1.02] cursor-default bg-black/40 border-white/5 hover:border-white/20 hover:shadow-2xl group ${app.border}`}
                    >
                        <div className="flex items-center gap-6">
                            <div className={`p-4 rounded-2xl bg-black/40 ${app.color} group-hover:scale-110 transition-transform duration-300`}>
                                <app.icon size={40} />
                            </div>
                            <h3 className="text-2xl font-bold">{app.title}</h3>
                        </div>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {app.desc}
                        </p>
                    </Card>
                ))}
            </div>
        </Section>
    );
}
