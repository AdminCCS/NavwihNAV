'use client';

import { useEffect, useState } from 'react';
import { Eye, MessageCircle } from 'lucide-react';
import { getArticleStats, getArticleCommentCount } from '@/lib/articleStats';

interface ArticleStatsProps {
  slug: string;
}

export function ArticleStats({ slug }: ArticleStatsProps) {
  const [views, setViews] = useState(() => {
    if (typeof window !== 'undefined') {
      return getArticleStats(slug).views;
    }
    return 0;
  });
  const [comments, setComments] = useState(() => {
    if (typeof window !== 'undefined') {
      return getArticleCommentCount(slug);
    }
    return 0;
  });

  useEffect(() => {
    // Listen for storage changes to update counts in real-time
    const handleStorageChange = () => {
      const updatedStats = getArticleStats(slug);
      const updatedComments = getArticleCommentCount(slug);
      setViews(updatedStats.views);
      setComments(updatedComments);
    };

    window.addEventListener('storage', handleStorageChange);
    // Custom event for same-tab updates
    window.addEventListener('articleStatsUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('articleStatsUpdated', handleStorageChange);
    };
  }, [slug]);

  return (
    <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
      <div className="flex items-center gap-1" title={`${views} view${views !== 1 ? 's' : ''}`}>
        <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
        <span>{views}</span>
      </div>
      <div className="flex items-center gap-1" title={`${comments} comment${comments !== 1 ? 's' : ''}`}>
        <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
        <span>{comments}</span>
      </div>
    </div>
  );
}
