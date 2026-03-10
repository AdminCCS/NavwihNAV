import { getArticlesWithVideos } from "@/lib/articles";
import Link from "next/link";
import { ArrowRight, Play, Video } from "lucide-react";
import { ArticleStats } from "@/components/blog/ArticleStats";
import { ArticleShareButton } from "@/components/blog/ArticleShareButton";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
    title: "Video Tutorials - Business Central Development",
    description: "Browse all video tutorials and visual guides on Business Central development, AL programming demonstrations, and step-by-step walkthroughs.",
    url: "/videos",
    keywords: ["Business Central videos", "AL programming tutorials", "NAV development videos", "ERP video guides"],
});

export default function VideosPage() {
    const videoArticles = getArticlesWithVideos();

    return (
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16 max-w-6xl flex-1">
            <div className="mb-8 sm:mb-12">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 flex items-center gap-2 sm:gap-3">
                    <Video className="h-6 w-6 sm:h-8 sm:w-8 text-primary" /> Video Tutorials
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground">
                    Watch in-depth video tutorials, walkthroughs, and demonstrations on Business Central development.
                </p>
            </div>

            {videoArticles.length === 0 ? (
                <div className="text-center py-12 sm:py-20">
                    <Video className="h-16 w-16 sm:h-20 sm:w-20 text-muted-foreground/30 mx-auto mb-4" />
                    <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-muted-foreground">
                        No Video Tutorials Yet
                    </h2>
                    <p className="text-sm sm:text-base text-muted-foreground mb-6">
                        Video content is coming soon! Check back later for video tutorials and demonstrations.
                    </p>
                    <Link 
                        href="/series" 
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                    >
                        Browse All Articles <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {videoArticles.map((article) => (
                        <Link 
                            href={`/series/${article.slug}`} 
                            key={article.slug} 
                            className="group relative rounded-xl border border-border bg-background flex flex-col h-full hover:border-primary/50 transition-all duration-300 overflow-hidden hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
                        >
                            {/* Video Thumbnail/Placeholder */}
                            <div className="relative w-full h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10"></div>
                                <Play className="h-12 w-12 sm:h-16 sm:w-16 text-primary/80 group-hover:scale-110 transition-transform z-20" />
                                {article.videoUrl && (
                                    <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-md z-20">
                                        VIDEO
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-4 sm:p-5 flex flex-col flex-1">
                                <div className="flex justify-between items-start mb-3 sm:mb-4">
                                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2 sm:px-2.5 py-0.5 text-xs font-semibold text-primary line-clamp-1">
                                        {article.category}
                                    </span>
                                    <time className="text-xs text-muted-foreground">
                                        {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </time>
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
                                            Watch Now <Play className="ml-1 h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
                                        </span>
                                        <span className="text-muted-foreground">{article.readingTime}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Call to Action */}
            {videoArticles.length > 0 && (
                <div className="mt-12 sm:mt-16 text-center">
                    <div className="inline-flex flex-col items-center gap-4 p-6 sm:p-8 rounded-2xl border border-border bg-muted/30">
                        <h3 className="text-lg sm:text-xl font-semibold">Want to see more videos?</h3>
                        <p className="text-sm sm:text-base text-muted-foreground max-w-md">
                            Subscribe to stay updated with the latest video tutorials and demonstrations.
                        </p>
                        <Link 
                            href="/contact" 
                            className="bg-primary text-primary-foreground px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                        >
                            Get Notified
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}
