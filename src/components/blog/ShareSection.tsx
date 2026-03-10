"use client";

import { useEffect, useState } from "react";
import { Facebook, Linkedin, Mail, Twitter } from "lucide-react";

export function ShareSection({ url, title }: { url: string; title: string }) {
    const [currentUrl, setCurrentUrl] = useState(url);

    useEffect(() => {
        if (typeof window !== "undefined" && !url) {
            setCurrentUrl(window.location.href);
        }
    }, [url]);

    const encodedUrl = encodeURIComponent(currentUrl);
    const encodedTitle = encodeURIComponent(title);

    return (
        <div className="py-6 border-t border-b border-border my-8">
            <h3 className="text-lg font-semibold mb-4">Share this Article</h3>
            <div className="flex flex-wrap gap-3">
                <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                    target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
                >
                    <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
                <a
                    href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                    target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-md transition-colors"
                >
                    <Twitter className="h-4 w-4" /> Twitter / X
                </a>
                <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                    target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white text-sm font-medium rounded-md transition-colors"
                >
                    <Facebook className="h-4 w-4" /> Facebook
                </a>
                <a
                    href={`https://api.whatsapp.com/send?text=${encodedTitle} ${encodedUrl}`}
                    target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-md transition-colors"
                >
                    {/* WhatsApp icon using text if lucide doesnt have it */}
                    <span className="font-bold">W</span> WhatsApp
                </a>
                <a
                    href={`https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`}
                    target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded-md transition-colors"
                >
                    <span className="font-bold">R</span> Reddit
                </a>
                <a
                    href={`mailto:?subject=${encodedTitle}&body=Check out this article: ${encodedUrl}`}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium rounded-md transition-colors"
                >
                    <Mail className="h-4 w-4" /> Email
                </a>
            </div>
        </div>
    );
}
