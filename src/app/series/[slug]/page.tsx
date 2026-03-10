import { getArticleData, getSortedArticlesData } from "@/lib/articles";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { ShareSection } from "@/components/blog/ShareSection";
import { FollowSection } from "@/components/blog/FollowSection";
import { EngagementSection } from "@/components/blog/EngagementSection";
import { RelatedContent } from "@/components/blog/RelatedContent";
import { ViewTracker } from "@/components/blog/ViewTracker";
import { StructuredData } from "@/components/StructuredData";
import { generateSEOMetadata, generateArticleSchema, generateBreadcrumbSchema } from "@/lib/seo";
import Link from "next/link";
import { ArrowLeft, Clock, User, Linkedin, Twitter } from "lucide-react";
import "highlight.js/styles/github-dark.css"; // We'll inject basic highlightjs styles

export async function generateStaticParams() {
    const articles = getSortedArticlesData();
    return articles.map((article) => ({
        slug: article.slug,
    }));
}

export async function generateMetadata({ params: rawParams }: any) {
    const params = await rawParams;
    const article = getArticleData(params.slug);
    if (!article) return { title: "Not Found" };

    return generateSEOMetadata({
        title: article.title,
        description: article.excerpt,
        url: `/series/${params.slug}`,
        type: "article",
        publishedTime: article.date,
        modifiedTime: article.date,
        authors: [article.author],
        section: article.category,
        keywords: article.tags || [],
    });
}

export default async function ArticlePage({ params: rawParams }: any) {
    const params = await rawParams;
    let article;

    try {
        article = getArticleData(params.slug);
    } catch (e) {
        notFound();
    }

    // Generate structured data
    const articleSchema = generateArticleSchema({
        title: article.title,
        description: article.excerpt,
        datePublished: article.date,
        dateModified: article.date,
        authorName: article.author,
        slug: params.slug,
    });

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Articles", url: "/series" },
        { name: article.title, url: `/series/${params.slug}` },
    ]);

    // To map AL code blocks to a supported syntax (Delphi is closest in highlight.js if AL isn't present)
    const rehypePlugins = [
        [rehypeHighlight, { aliases: { al: 'delphi', cpp: 'cpp' }, ignoreMissing: true }]
    ] as any;

    return (
        <div className="bg-background pt-6 sm:pt-10 pb-12 sm:pb-20">
            <StructuredData data={articleSchema} />
            <StructuredData data={breadcrumbSchema} />
            <ViewTracker slug={params.slug} />
            <div className="container mx-auto px-4 sm:px-6 max-w-4xl border-b border-border pb-6 sm:pb-8 mb-6 sm:mb-10">
                <Link href="/series" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 sm:mb-8 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Articles
                </Link>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-semibold text-primary">
                        {article.category}
                    </span>
                    {article.tags?.map((tag) => (
                        <span key={tag} className="text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 sm:py-1 rounded-md">
                            #{tag}
                        </span>
                    ))}
                </div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4 sm:mb-6 leading-tight">
                    {article.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-muted-foreground text-xs sm:text-sm border-t border-border pt-4 sm:pt-6 mt-4 sm:mt-6">
                    <div className="flex items-center gap-2">
                        <User className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="font-medium text-foreground">{article.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>{article.readingTime}</span>
                    </div>
                    <div className="hidden sm:block">Published on {new Date(article.date).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                    <div className="sm:hidden">{new Date(article.date).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 max-w-4xl flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
                {/* Main Content */}
                <div className="lg:w-3/4">
                    <article className="prose prose-sm sm:prose-base prose-neutral dark:prose-invert prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl max-w-none w-full">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={rehypePlugins}
                            components={{
                                code({ node, inline, className, children, ...props }: any) {
                                    return (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    )
                                }
                            }}
                        >
                            {article.content || ""}
                        </ReactMarkdown>
                    </article>

                    <ShareSection url={`https://navwithnav.com/series/${article.slug}`} title={article.title} />

                    <FollowSection />

                    <EngagementSection slug={params.slug} />

                    <RelatedContent category={article.category} />
                </div>

                {/* Floating Sidebar (Share) */}
                <div className="hidden lg:block lg:w-1/4">
                    <div className="sticky top-24">
                        <h4 className="font-semibold text-sm mb-4 text-muted-foreground">Quick Share</h4>
                        <div className="flex flex-col gap-3">
                            <a href="#" className="flex items-center justify-center p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"><Linkedin className="h-5 w-5" /></a>
                            <a href="#" className="flex items-center justify-center p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"><Twitter className="h-5 w-5" /></a>
                            <a href="#" className="flex items-center justify-center p-3 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"><ArrowLeft className="h-5 w-5" /></a>
                        </div>

                        <div className="mt-12 p-5 border border-border rounded-xl bg-muted/30">
                            <p className="text-sm font-semibold mb-2">Author</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">N</div>
                                <div>
                                    <p className="text-sm font-semibold">{article.author}</p>
                                    <p className="text-xs text-muted-foreground">Solution Architect</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
