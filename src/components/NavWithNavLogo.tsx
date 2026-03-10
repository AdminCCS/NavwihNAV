"use client";

import { useEffect, useState } from "react";

export function NavWithNavLogo({ className = "" }: { className?: string }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[800px] opacity-10 pointer-events-none flex items-center justify-center ${className}`}>
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 240 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="overflow-visible"
            >
                {/* Animated Background Glow */}
                <circle cx="120" cy="60" r="60" fill="var(--color-primary)" className="opacity-20 blur-3xl animate-pulse" />

                {/* Left Brace < */}
                <path
                    d="M 60 20 L 20 60 L 60 100"
                    stroke="var(--color-primary)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-[draw_3s_ease-out_forwards] [stroke-dasharray:150] [stroke-dashoffset:150]"
                />

                {/* Central 'N' */}
                <path
                    d="M 90 100 L 90 20 L 150 100 L 150 20"
                    stroke="currentColor"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-foreground animate-[draw_3.5s_ease-out_forwards_0.5s] [stroke-dasharray:300] [stroke-dashoffset:300]"
                />

                {/* Right Brace > */}
                <path
                    d="M 180 20 L 220 60 L 180 100"
                    stroke="var(--color-primary)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-[draw_3s_ease-out_forwards_1s] [stroke-dasharray:150] [stroke-dashoffset:150]"
                />
            </svg>

            <style jsx>{`
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
        </div>
    );
}
