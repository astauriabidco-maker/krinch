"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

interface InsightIAProps {
    dict: any;
}

export default function InsightIA({ dict }: InsightIAProps) {
    const [insight, setInsight] = useState("");

    useEffect(() => {
        const facts = dict.insights.facts;
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        setInsight(randomFact);
    }, [dict.insights.facts]);

    if (!insight) return null;

    return (
        <div className="max-w-md mx-auto mt-20 p-8 bg-white border border-secondary/20 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 text-secondary/10 group-hover:text-secondary/20 transition-colors">
                <Sparkles size={60} />
            </div>

            <div className="relative z-10">
                <h4 className="flex items-center gap-3 text-secondary text-xs font-bold uppercase tracking-[0.3em] mb-6">
                    <span className="w-8 h-px bg-secondary" />
                    {dict.insights.title}
                </h4>
                <p className="text-primary/80 font-serif italic text-lg leading-relaxed">
                    "{insight}"
                </p>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
        </div>
    );
}
