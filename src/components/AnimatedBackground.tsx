"use client";

import React, { useEffect, useState } from "react";

export function AnimatedBackground() {
    const [elements, setElements] = useState<{ id: number; char: string; left: string; duration: string; delay: string; opacity: number; size: number }[]>([]);

    useEffect(() => {
        // IT / Developer themed symbols
        const chars = ["< >", "{ }", "[ ]", "/", "0", "1", ";", "++", "#"];

        // Generate random elements only on the client side to avoid hydration mismatches
        const newElems = Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            char: chars[Math.floor(Math.random() * chars.length)],
            left: `${Math.random() * 100}%`,
            duration: `${Math.random() * 25 + 30}s`, // slow floating
            delay: `${Math.random() * -50}s`, // negative delay so they start already on screen
            opacity: Math.random() * 0.15 + 0.05, // subtle opacity
            size: Math.random() * 1.5 + 0.5,
        }));

        setElements(newElems);
    }, []);

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
            {/* Animated IT Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_60%,transparent_100%)]"></div>

            {/* Floating Developer Symbols */}
            {elements.map((el) => (
                <div
                    key={el.id}
                    className="absolute text-primary font-mono select-none"
                    style={{
                        left: el.left,
                        bottom: "-100px", // start below screen
                        opacity: el.opacity,
                        animation: `float ${el.duration} linear infinite`,
                        animationDelay: el.delay,
                        fontSize: `${el.size}rem`,
                    }}
                >
                    {el.char}
                </div>
            ))}
        </div>
    );
}
