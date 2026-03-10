"use client";

import { Zap, PlayCircle } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ApiTesterPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-5xl flex-1">
            <Link href="/tools" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Tools
            </Link>

            <div className="mb-10">
                <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
                    <Zap className="h-8 w-8 text-primary" /> BC API Tester (Preview)
                </h1>
                <p className="text-muted-foreground">
                    Simulate OAuth2 and basic auth requests to your Business Central Sandbox environments.
                </p>
            </div>

            <div className="bg-muted/30 p-8 rounded-xl border border-border text-center flex flex-col items-center justify-center min-h-[400px]">
                <PlayCircle className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
                <h2 className="text-xl font-semibold mb-2">Tool in Development</h2>
                <p className="text-muted-foreground max-w-md">
                    This feature is currently being built. It will allow you to safely run mock API requests against your standard BC APIs without leaving the browser.
                </p>
                <button className="mt-8 bg-primary text-primary-foreground px-6 py-2 rounded-md text-sm font-medium opacity-50 cursor-not-allowed">
                    Notify Me Upon Release
                </button>
            </div>
        </div>
    );
}
