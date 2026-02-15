import Link from "next/link";

interface LogoProps {
    iconOnly?: boolean;
    className?: string;
}

export function Logo({ iconOnly = false, className }: LogoProps) {
    return (
        <div className={`flex items-center gap-3 ${className || ""}`}>
            {/* Geometric mark with aurora gradient */}
            <svg
                width="42"
                height="42"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
            >
                <defs>
                    <linearGradient id="aurora-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="50%" stopColor="#ec4899" />
                        <stop offset="100%" stopColor="#f97316" />
                    </linearGradient>
                    <filter id="glow-aurora" x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur stdDeviation="2.5" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                {/* Bold upward arrow — symbolizes "LIFT" / growth */}
                <g filter="url(#glow-aurora)">
                    <path
                        d="M50 10 L85 55 L65 55 L65 90 L35 90 L35 55 L15 55 Z"
                        fill="url(#aurora-grad)"
                    />
                </g>
            </svg>

            {!iconOnly && (
                <div className="flex flex-col leading-[0.9]">
                    <span className="text-xl md:text-2xl font-black tracking-tighter text-white uppercase">
                        HYPER<span className="gradient-text-aurora">LIFT</span>
                    </span>
                    <span className="text-[7px] md:text-[8px] font-bold tracking-[0.35em] text-zinc-500 uppercase">
                        UGC Performance
                    </span>
                </div>
            )}
        </div>
    );
}
