'use client';

import Link from "next/link";
import { X, Home } from "lucide-react";

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    isHomePage?: boolean;
}

const NAV_LINKS = [
    { name: "Series", href: "/series" },
    { name: "Videos", href: "/videos" },
    { name: "About", href: "/about" },
];

export function MobileMenu({ isOpen, onClose, isHomePage = false }: MobileMenuProps) {
    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
                onClick={onClose}
            />

            {/* Menu Panel */}
            <div className="fixed top-0 right-0 bottom-0 w-[280px] sm:w-[320px] bg-background border-l border-border z-50 lg:hidden overflow-y-auto">
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <Link href="/" className="font-bold text-xl tracking-tight text-primary" onClick={onClose}>
                        NavWith<span className="text-foreground">Nav</span>
                    </Link>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-muted rounded-md transition-colors"
                        aria-label="Close menu"
                    >
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <nav className="p-4 space-y-1">
                    {!isHomePage && (
                        <Link
                            href="/"
                            onClick={onClose}
                            className="flex items-center gap-2 px-4 py-3 text-base font-medium text-primary hover:bg-muted rounded-lg transition-colors"
                        >
                            <Home className="h-5 w-5" />
                            Home
                        </Link>
                    )}
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={onClose}
                            className="block px-4 py-3 text-base font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </div>
        </>
    );
}
