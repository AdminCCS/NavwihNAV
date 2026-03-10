import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function RelatedContent({ category }: { category: string }) {
    // In a real app, you would fetch articles by category excluding the current one.
    return (
        <div className="my-16">
            <h3 className="text-2xl font-bold mb-6">Related Content</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2].map((i) => (
                    <Link href={`/series/related-article-${i}`} key={i} className="group border border-border rounded-xl p-5 hover:border-primary/50 transition-colors block bg-background">
                        <span className="text-xs font-semibold text-primary mb-2 block">{category}</span>
                        <h4 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                            Advanced AL Patterns: Telemetry and Error Handling
                        </h4>
                        <div className="flex items-center text-sm font-medium text-muted-foreground mt-4 group-hover:text-primary">
                            Read article <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
