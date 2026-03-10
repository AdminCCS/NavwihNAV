import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content/articles");

export interface ArticleData {
    slug: string;
    title: string;
    date: string;
    category: string;
    excerpt: string;
    author: string;
    readingTime: string;
    tags?: string[];
    content?: string;
    videoUrl?: string;
    hasVideo?: boolean;
}

// Ensure the directory exists
function ensureDirectoryExists() {
    if (!fs.existsSync(contentDirectory)) {
        fs.mkdirSync(contentDirectory, { recursive: true });
    }
}

export function getSortedArticlesData(): ArticleData[] {
    ensureDirectoryExists();
    const fileNames = fs.readdirSync(contentDirectory);
    const allArticlesData = fileNames
        .filter((fileName) => fileName.endsWith(".md"))
        .map((fileName) => {
            const slug = fileName.replace(/\.md$/, "");
            const fullPath = path.join(contentDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");

            const matterResult = matter(fileContents);

            return {
                slug,
                title: matterResult.data.title,
                date: matterResult.data.date,
                category: matterResult.data.category,
                excerpt: matterResult.data.excerpt,
                author: matterResult.data.author || "Nitin",
                readingTime: matterResult.data.readingTime || "5 min read",
                tags: matterResult.data.tags || [],
                videoUrl: matterResult.data.videoUrl,
                hasVideo: matterResult.data.hasVideo || false,
            };
        });

    return allArticlesData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getArticleData(slug: string): ArticleData {
    const fullPath = path.join(contentDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    return {
        slug,
        title: matterResult.data.title,
        date: matterResult.data.date,
        category: matterResult.data.category,
        excerpt: matterResult.data.excerpt,
        author: matterResult.data.author || "Nitin",
        readingTime: matterResult.data.readingTime || "5 min read",
        tags: matterResult.data.tags || [],
        content: matterResult.content,
        videoUrl: matterResult.data.videoUrl,
        hasVideo: matterResult.data.hasVideo || false,
    };
}

export function getArticlesWithVideos(): ArticleData[] {
    const allArticles = getSortedArticlesData();
    return allArticles.filter(article => article.hasVideo || article.videoUrl);
}
