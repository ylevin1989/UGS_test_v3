"use client";

import { motion } from "framer-motion";

interface MarqueeTickerProps {
    items: string[];
    direction?: "left" | "right";
    speed?: number;
}

export function MarqueeTicker({
    items,
    direction = "left",
    speed = 40,
}: MarqueeTickerProps) {
    return (
        <div className="relative flex overflow-x-hidden py-4 md:py-5 select-none rotate-[-1deg] md:rotate-[-1.5deg] scale-[1.02] z-40"
            style={{
                background: "linear-gradient(135deg, #a855f7 0%, #ec4899 40%, #f97316 80%, #eab308 100%)",
                boxShadow: "0 10px 40px -10px rgba(168, 85, 247, 0.4), 0 -4px 20px rgba(236, 72, 153, 0.2)",
            }}
        >
            <motion.div
                initial={{ x: direction === "left" ? 0 : "-100%" }}
                animate={{ x: direction === "left" ? "-100%" : 0 }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear",
                }}
                className="flex whitespace-nowrap"
            >
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center">
                        {items.map((item, index) => (
                            <div key={index} className="flex items-center">
                                <span className="text-white text-2xl md:text-4xl font-black uppercase tracking-tighter mx-4 md:mx-8 drop-shadow-md" style={{ fontFamily: "var(--font-display)" }}>
                                    {item}
                                </span>
                                <span className="text-white/30 text-3xl md:text-5xl mx-2">✦</span>
                            </div>
                        ))}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
