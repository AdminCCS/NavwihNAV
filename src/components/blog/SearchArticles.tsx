'use client';

import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import { ArticleData } from '@/lib/articles';
import { ArticleStats } from './ArticleStats';
import { ArticleShareButton } from './ArticleShareButton';

interface SearchArticlesProps {
    articles: ArticleData[];
}

export function SearchArticles({ articles }: SearchArticlesProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const searchResults = useMemo(() => {
        if (searchQuery.trim() === '') {
            return [];
        }

        const query = searchQuery.toLowerCase();
        
        return articles.filter(article => {
            return (
                article.title.toLowerCase().includes(query) ||
                article.excerpt.toLowerCase().includes(query) ||
                article.category.toLowerCase().includes(query) ||
                (article.tags && article.tags.some(tag => tag.toLowerCase().includes(query)))
            );
        });
    }, [searchQuery, articles]);

    const isSearching = searchQuery.trim() !== '';

    const clearSearch = () => {
        setSearchQuery('');
    };

    return (
        <div className="w-full">
            {/* Search Input */}
            <div className="relative mb-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search articles..."
                        className="w-full pl-10 pr-10 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                    {searchQuery && (
                        <button
                            onClick={clearSearch}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
                            aria-label="Clear search"
                        >
                            <X className="h-4 w-4 text-muted-foreground" />
                        </button>
                    )}
                </div>
            </div>

            {/* Search Results */}
            {isSearching && (
                <div className="mb-4">
                    {searchResults.length > 0 ? (
                        <>
                            <p className="text-xs text-muted-foreground mb-4">
                                Found {searchResults.length} article{searchResults.length !== 1 ? 's' : ''}
                            </p>
                            <div className="space-y-4">
                                {searchResults.map((article) => (
                                    <article key={article.slug} className="group rounded-lg border border-border overflow-hidden hover:shadow-md transition-all duration-300 bg-background">
                                        <Link href={`/series/${article.slug}`} className="block">
                                            <div className="p-4">
                                                <div className="flex items-start justify-between gap-2 mb-2">
                                                    <span className="inline-block px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                                                        {article.category}
                                                    </span>
                                                </div>
                                                <h3 className="text-sm font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                                    {article.title}
                                                </h3>
                                                <p className="text-muted-foreground text-xs mb-2 line-clamp-2">
                                                    {article.excerpt}
                                                </p>
                                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                    <span>{article.date}</span>
                                                </div>
                                            </div>
                                        </Link>
                                        <div className="px-4 pb-3 flex items-center justify-between border-t border-border pt-2">
                                            <ArticleStats slug={article.slug} />
                                            <ArticleShareButton 
                                                slug={article.slug}
                                                title={article.title}
                                            />
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-8 px-4">
                            <Search className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-50" />
                            <h3 className="text-sm font-semibold mb-1">No articles found</h3>
                            <p className="text-muted-foreground text-xs">
                                Try different keywords
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
