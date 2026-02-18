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
        <div className="relative py-8 md:py-12 overflow-hidden z-40 select-none">
            <div
                className="flex items-center w-[120%] -ml-[10%] rotate-[-1deg] md:rotate-[-1.5deg] scale-[1.01] transform-gpu"
                style={{
                    background: "linear-gradient(135deg, #a855f7 0%, #ec4899 40%, #f97316 80%, #eab308 100%)",
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    backfaceVisibility: "hidden",
                }}
            >
                <motion.div
                    initial={{ x: direction === "left" ? 0 : "-50%" }}
                    animate={{ x: direction === "left" ? "-50%" : 0 }}
                    transition={{
                        duration: speed,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="flex whitespace-nowrap py-4 md:py-6 transform-gpu will-change-transform"
                    style={{ transform: "translateZ(0)" }}
                >
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex items-center">
                            {items.map((item, index) => (
                                <div key={index} className="flex items-center">
                                    <span className="text-white text-2xl md:text-3xl font-black uppercase tracking-[0.05em] mx-6 md:mx-10" style={{ fontFamily: "var(--font-display)" }}>
                                        {item}
                                    </span>
                                    <span className="text-white/40 text-2xl md:text-4xl mx-3">✦</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
