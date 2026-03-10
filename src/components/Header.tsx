'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { MobileMenu } from "./MobileMenu";
import { Menu, Home } from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
    { name: "Series", href: "/series" },
    { name: "Videos", href: "/videos" },
    { name: "About", href: "/about" },
];

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-border bg-primary/10 backdrop-blur">
                <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4 sm:gap-6 md:gap-10">
                        <nav className="hidden lg:flex gap-6 items-center">
                            {!isHomePage && (
                                <Link
                                    href="/"
                                    className="text-sm font-medium text-primary hover:text-primary/80 transition-colors py-2 flex items-center gap-2"
                                >
                                    <Home className="h-4 w-4" />
                                    Home
                                </Link>
                            )}
                            {NAV_LINKS.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <ThemeToggle />
                        <button 
                            className="lg:hidden p-2 hover:bg-muted rounded-md transition-colors"
                            onClick={() => setMobileMenuOpen(true)}
                            aria-label="Open menu"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </header>
            <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} isHomePage={isHomePage} />
        </>
    );
}
