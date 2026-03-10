import Link from "next/link";
import { Github, Linkedin, Twitter, Youtube } from "lucide-react";
import { NewsletterForm } from "./NewsletterForm";

export function Footer() {
    return (
        <footer className="border-t border-border bg-background py-8 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="sm:col-span-2 lg:col-span-1 lg:border-r border-border lg:pr-6">
                        <Link href="/" className="font-bold text-xl sm:text-2xl tracking-tight text-primary">
                            NavWith<span className="text-foreground">Nav</span>
                        </Link>
                        <p className="mt-4 text-sm text-muted-foreground">
                            Knowledge-sharing platform for Microsoft Dynamics Business Central developers, consultants, and ERP professionals.
                        </p>
                        <div className="mt-6 flex gap-4">
                            <a href="#" className="text-muted-foreground hover:text-primary"><Linkedin className="h-5 w-5" /></a>
                            <a href="#" className="text-muted-foreground hover:text-primary"><Github className="h-5 w-5" /></a>
                            <a href="#" className="text-muted-foreground hover:text-primary"><Youtube className="h-5 w-5" /></a>
                            <a href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                            <li><Link href="/series" className="hover:text-primary transition-colors">Series</Link></li>
                            <li><Link href="/videos" className="hover:text-primary transition-colors">Videos</Link></li>
                            <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="sm:col-span-2 lg:col-span-1">
                        <NewsletterForm />
                    </div>
                </div>

                <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
                    <p className="text-center sm:text-left">© {new Date().getFullYear()} NavWithNav. All rights reserved.</p>
                    <div className="flex gap-4 flex-wrap justify-center">
                        <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
