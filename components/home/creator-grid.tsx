"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const CREATORS = [
    { id: 1, name: "Alex", img: "/creator_new_portrait_1_1771031474451.png", delay: 0 },
    { id: 2, name: "Maria", img: "/ugc_creator_girl_v2_1771029978654.png", delay: 0.1 },
    { id: 3, name: "Chris", img: "/ugc_creator_boy_v2_1771029993194.png", delay: 0.2 },
    { id: 4, name: "Julia", img: "/grid_maria_new_1771030524055.png", delay: 0.3 },
    { id: 5, name: "Dmitry", img: "/creator_portrait_1_1771031547964.png", delay: 0.4 },
    { id: 6, name: "Ksenia", img: "/grid_alex_new_1771030508020.png", delay: 0.5 },
];

export function CreatorGrid({ content }: { content: any }) {
    const gridData = content?.homeImages?.grid || CREATORS;
    const creators = [...gridData, ...CREATORS].slice(0, 6);

    return (
        <div className="relative w-full min-h-[400px] lg:h-[600px] select-none pointer-events-none mt-12 lg:mt-0">
            <div className="grid grid-cols-2 gap-4 md:gap-6 pointer-events-none">
                {/* Left Column */}
                <div className="space-y-4 md:space-y-6 lg:pt-20">
                    {creators.slice(0, 3).map((creator: any, i: number) => (
                        <motion.div
                            key={creator.id || i}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="relative aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden border border-purple-500/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] bg-zinc-900 group"
                        >
                            <Image
                                src={creator.img}
                                alt={creator.name}
                                fill
                                priority={i < 2}
                                sizes="(max-width: 768px) 50vw, 33vw"
                                className="object-cover opacity-70"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0118] via-transparent to-transparent" />
                            {/* Hover glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-t from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6 glass px-3 py-1.5 lg:px-4 lg:py-2 rounded-xl lg:rounded-2xl text-[8px] lg:text-[10px] font-bold uppercase tracking-widest text-[#A78BFA]">
                                @{creator.name.toLowerCase()}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Right Column */}
                <div className="space-y-4 md:space-y-6">
                    {creators.slice(3, 6).map((creator: any, i: number) => (
                        <motion.div
                            key={creator.id || i + 3}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: (i * 0.1) + 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="relative aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden border border-purple-500/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] bg-zinc-900 group"
                        >
                            <Image
                                src={creator.img}
                                alt={creator.name}
                                fill
                                sizes="(max-width: 768px) 50vw, 33vw"
                                className="object-cover opacity-70"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0118] via-transparent to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-t from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6 glass px-3 py-1.5 lg:px-4 lg:py-2 rounded-xl lg:rounded-2xl text-[8px] lg:text-[10px] font-bold uppercase tracking-widest text-[#A78BFA]">
                                @{creator.name.toLowerCase()}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Floating Status Badge */}
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 -left-6 lg:-left-12 z-30 glass px-4 py-2 lg:px-6 lg:py-4 rounded-2xl lg:rounded-3xl border-purple-500/20 shadow-2xl shadow-purple-500/5 min-w-[140px] lg:min-w-[180px]"
            >
                <div className="flex items-center space-x-2 lg:space-x-3">
                    <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-[#A78BFA] animate-pulse" />
                    <div className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-[#A78BFA]">Live Now</div>
                </div>
                <div className="mt-1 text-xs lg:text-sm font-bold opacity-80 text-white">Viral Glow Campaign</div>
            </motion.div>
        </div>
    );
}
