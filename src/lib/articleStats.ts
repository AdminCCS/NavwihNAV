// Article statistics management using localStorage

export interface ArticleStats {
  views: number;
  comments: number;
}

interface StoredComment {
  replies?: unknown[];
  [key: string]: unknown;
}

export function getArticleStats(slug: string): ArticleStats {
  if (typeof window === 'undefined') {
    return { views: 0, comments: 0 };
  }

  const stats = localStorage.getItem(`article-stats-${slug}`);
  if (stats) {
    return JSON.parse(stats);
  }

  return { views: 0, comments: 0 };
}

export function incrementArticleViews(slug: string): void {
  if (typeof window === 'undefined') return;

  const stats = getArticleStats(slug);
  stats.views += 1;
  localStorage.setItem(`article-stats-${slug}`, JSON.stringify(stats));
}

export function getArticleCommentCount(slug: string): number {
  if (typeof window === 'undefined') return 0;

  const commentsKey = `comments-${slug}`;
  const commentsData = localStorage.getItem(commentsKey);
  
  if (!commentsData) return 0;

  try {
    const comments = JSON.parse(commentsData) as StoredComment[];
    // Count main comments + all replies
    let totalCount = comments.length;
    comments.forEach((comment: StoredComment) => {
      if (comment.replies && Array.isArray(comment.replies)) {
        totalCount += comment.replies.length;
      }
    });
    return totalCount;
  } catch {
    return 0;
  }
}

export function getAllArticlesStats(): Record<string, ArticleStats> {
  if (typeof window === 'undefined') return {};

  const stats: Record<string, ArticleStats> = {};
  
  // Get all keys from localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('article-stats-')) {
      const slug = key.replace('article-stats-', '');
      const data = localStorage.getItem(key);
      if (data) {
        try {
          const parsed = JSON.parse(data);
          stats[slug] = {
            views: parsed.views || 0,
            comments: getArticleCommentCount(slug)
          };
        } catch {
          stats[slug] = { views: 0, comments: 0 };
        }
      }
    }
  }

  return stats;
}
