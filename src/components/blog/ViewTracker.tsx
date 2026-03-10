'use client';

import { useEffect } from 'react';
import { incrementArticleViews } from '@/lib/articleStats';

interface ViewTrackerProps {
  slug: string;
}

export function ViewTracker({ slug }: ViewTrackerProps) {
  useEffect(() => {
    // Track view only once per session using sessionStorage
    const viewKey = `viewed-${slug}`;
    const hasViewed = sessionStorage.getItem(viewKey);
    
    if (!hasViewed) {
      incrementArticleViews(slug);
      sessionStorage.setItem(viewKey, 'true');
      
      // Dispatch custom event to update stats in real-time
      window.dispatchEvent(new Event('articleStatsUpdated'));
    }
  }, [slug]);

  return null; // This component doesn't render anything
}
