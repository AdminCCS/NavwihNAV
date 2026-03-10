import { Database, Code, Zap, FileJson } from "lucide-react";
import Link from "next/link";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
    title: "Free Developer Tools for Business Central",
    description: "Useful free developer tools for the Business Central community including AL snippet generators, API testers, and code utilities.",
    url: "/tools",
    keywords: ["Business Central tools", "AL code generator", "BC API tester", "NAV developer tools", "free ERP tools"],
});

export default function ToolsPage() {
    const tools = [
        {
            title: "AL Code Snippet Generator",
            description: "Generate boilerplate code for tables, pages, and codeunits quickly.",
            icon: <Code className="h-8 w-8 text-primary" />,
            href: "/tools/snippet-generator",
            status: "Available",
        },
        {
            title: "Business Central API Tester",
            description: "Test and mock OData and REST APIs connected to your BC SaaS sandbox.",
            icon: <Zap className="h-8 w-8 text-green-500" />,
            href: "/tools/api-tester",
            status: "Available",
        },
        {
            title: "AL Trigger Reference Guide",
            description: "A quick lookup for execution order of page and table triggers.",
            icon: <Database className="h-8 w-8 text-blue-500" />,
            href: "#",
            status: "Coming Soon",
        },
        {
            title: "Integration Templates",
            description: "Pre-built JSON payloads and Postman collections for standard integrations.",
            icon: <FileJson className="h-8 w-8 text-orange-500" />,
            href: "#",
            status: "Coming Soon",
        }
    ];

    return (
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16 max-w-5xl flex-1">
            <div className="mb-8 sm:mb-12 text-center max-w-3xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 sm:mb-4">
                    Free Tools for Developers
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground">
                    Accelerate your daily AL development workflow with our suite of custom-built tools designed specifically for the Business Central community.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {tools.map((tool) => (
                    <Link
                        key={tool.title}
                        href={tool.href}
                        className={`group rounded-xl border border-border bg-background p-4 sm:p-6 transition-colors ${tool.status === 'Available' ? 'hover:border-primary/50 cursor-pointer block' : 'opacity-70 cursor-not-allowed pointer-events-none'}`}
                    >
                        <div className="flex justify-between items-start mb-3 sm:mb-4">
                            <div className="p-2 sm:p-3 bg-muted rounded-lg inline-flex">
                                {tool.icon}
                            </div>
                            <span className={`text-xs font-semibold px-2 sm:px-2.5 py-0.5 rounded-full ${tool.status === 'Available' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                {tool.status}
                            </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                            {tool.title}
                        </h3>
                        <p className="text-muted-foreground text-xs sm:text-sm">
                            {tool.description}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
