"use client";

export function AnimatedLogo() {
    return (
        <div className="w-full max-w-xs mx-auto animate-[fadeIn_1s_ease-out_forwards]">
            <svg
                width="100%"
                height="auto"
                viewBox="0 0 400 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="drop-shadow-2xl"
            >
                {/* Animated Background Glow */}
                <circle cx="200" cy="100" r="80" fill="var(--color-primary)" className="opacity-30 blur-3xl animate-pulse" />

                {/* Left Brace < */}
                <path
                    d="M 80 40 L 30 100 L 80 160"
                    stroke="var(--color-primary)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-[draw_2s_ease-out_forwards] [stroke-dasharray:200] [stroke-dashoffset:200]"
                />

                {/* Central 'N' */}
                <path
                    d="M 140 160 L 140 40 L 260 160 L 260 40"
                    stroke="currentColor"
                    strokeWidth="18"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-foreground animate-[draw_2.5s_ease-out_forwards_0.3s] [stroke-dasharray:400] [stroke-dashoffset:400]"
                />

                {/* Right Brace > */}
                <path
                    d="M 320 40 L 370 100 L 320 160"
                    stroke="var(--color-primary)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-[draw_2s_ease-out_forwards_0.5s] [stroke-dasharray:200] [stroke-dashoffset:200]"
                />

                {/* NavWithNav Text */}
                <text
                    x="200"
                    y="190"
                    fontSize="28"
                    fontWeight="bold"
                    textAnchor="middle"
                    className="fill-primary opacity-0 animate-[fadeIn_1s_ease-out_forwards_1.5s]"
                >
                    NavWith<tspan className="fill-current">Nav</tspan>
                </text>
            </svg>
        </div>
    );
}
