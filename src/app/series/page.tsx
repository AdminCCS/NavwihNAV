import { getSortedArticlesData } from "@/lib/articles";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { ArticleStats } from "@/components/blog/ArticleStats";
import { ArticleShareButton } from "@/components/blog/ArticleShareButton";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
    title: "Series of Articles - Business Central Tutorials",
    description: "Browse all articles, tutorials, and deep-dives on Business Central development, AL programming, integration patterns, and ERP best practices.",
    url: "/series",
    keywords: ["Business Central tutorials", "AL programming guides", "NAV development articles", "ERP tutorials"],
});

export default function SeriesPage() {
    const articles = getSortedArticlesData();

    return (
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16 max-w-5xl flex-1">
            <div className="mb-8 sm:mb-12">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 flex items-center gap-2 sm:gap-3">
                    <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-primary" /> Series of Articles
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground">
                    Explore all tutorials, architecture guidance, technical solutions, and best practices for Business Central.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {articles.map((article) => (
                    <Link href={`/series/${article.slug}`} key={article.slug} className="group relative rounded-xl border border-border bg-background flex flex-col h-full hover:border-primary/50 transition-colors p-4 sm:p-6">
                        <div className="flex justify-between items-start mb-3 sm:mb-4">
                            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 sm:px-2.5 py-0.5 text-xs font-semibold text-primary line-clamp-1">
                                {article.category}
                            </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 group-hover:text-primary transition-colors line-clamp-2">
                            {article.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 sm:mb-6 line-clamp-3 text-xs sm:text-sm flex-1">
                            {article.excerpt}
                        </p>
                        <div className="space-y-3 mt-auto">
                            <div className="flex items-center justify-between">
                                <ArticleStats slug={article.slug} />
                                <ArticleShareButton slug={article.slug} title={article.title} />
                            </div>
                            <div className="flex items-center justify-between text-xs sm:text-sm">
                                <span className="font-medium text-primary flex items-center">
                                    Read article <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
                                </span>
                                <span className="text-muted-foreground">{article.readingTime}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
