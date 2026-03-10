'use client';

import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { ArticleStats } from "@/components/blog/ArticleStats";
import { ArticleShareButton } from "@/components/blog/ArticleShareButton";
import { useState } from "react";
import type { ArticleData } from "@/lib/articles";

interface PaginatedArticlesProps {
  articles: ArticleData[];
  articlesPerPage?: number;
}

export function PaginatedArticles({ articles, articlesPerPage = 4 }: PaginatedArticlesProps) {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;
  const currentArticles = articles.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of articles section
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div>
      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
        {currentArticles.map((article) => (
          <Link key={article.slug} href={`/series/${article.slug}`} className="block group h-full">
            <article className="h-full flex flex-col rounded-2xl border border-border bg-background/60 backdrop-blur-md p-4 sm:p-5 hover:border-primary hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                <span className="inline-flex self-start items-center rounded-full bg-primary/10 px-2.5 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-semibold text-primary">
                  {article.category || "Business Central"}
                </span>
                <time className="text-xs sm:text-sm text-muted-foreground">
                  {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </time>
              </div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                {article.title}
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-4 sm:mb-5 line-clamp-3">
                {article.excerpt}
              </p>
              <div className="mt-auto pt-3 sm:pt-4 border-t border-border/50 space-y-3">
                <div className="flex items-center justify-between">
                  <ArticleStats slug={article.slug} />
                  <ArticleShareButton slug={article.slug} title={article.title} />
                </div>
                <div className="flex items-center text-sm sm:text-base lg:text-lg font-medium text-primary">
                  Read article <ArrowRight className="ml-1.5 h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-3 py-2 rounded-lg border border-border bg-background hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1 sm:gap-2">
            {getPageNumbers().map((page, index) => (
              page === '...' ? (
                <span key={`ellipsis-${index}`} className="px-2 py-2 text-muted-foreground">
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => goToPage(page as number)}
                  className={`min-w-[2.5rem] h-10 px-3 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-primary text-primary-foreground'
                      : 'border border-border bg-background hover:bg-muted'
                  }`}
                  aria-label={`Go to page ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </button>
              )
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={goToNext}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-3 py-2 rounded-lg border border-border bg-background hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            aria-label="Next page"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Page Info */}
      {totalPages > 1 && (
        <div className="text-center mt-4 text-sm text-muted-foreground">
          Page {currentPage} of {totalPages} ({articles.length} total articles)
        </div>
      )}
    </div>
  );
}
