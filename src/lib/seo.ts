import { Metadata } from "next";

export const siteConfig = {
  name: "NavWithNav",
  title: "NavWithNav - Business Central Developer Blog",
  description: "Knowledge-sharing platform for Microsoft Dynamics Business Central developers, consultants, and ERP professionals. Learn AL programming, integration patterns, and best practices.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://navwithnav.com",
  ogImage: "/og-image.jpg",
  author: {
    name: "Nitin",
    title: "Solution Architect",
    bio: "18+ years of experience specializing in Microsoft Dynamics NAV, Business Central, Power Platform, and ERP Architecture.",
    twitter: "@navwithnav",
    linkedin: "https://linkedin.com/in/navwithnav",
    github: "https://github.com/navwithnav",
  },
  keywords: [
    "Business Central",
    "Microsoft Dynamics",
    "AL Programming",
    "ERP Development",
    "NAV Development",
    "Power Platform",
    "Azure Integration",
    "Business Central Extensions",
  ],
};

export function generateSEOMetadata({
  title,
  description,
  keywords,
  image,
  url,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  section,
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  section?: string;
}): Metadata {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const pageDescription = description || siteConfig.description;
  const pageUrl = url ? `${siteConfig.url}${url}` : siteConfig.url;
  const pageImage = image ? `${siteConfig.url}${image}` : `${siteConfig.url}${siteConfig.ogImage}`;
  const allKeywords = keywords ? [...siteConfig.keywords, ...keywords] : siteConfig.keywords;

  const metadata: Metadata = {
    title: pageTitle,
    description: pageDescription,
    keywords: allKeywords.join(", "),
    authors: authors ? authors.map(name => ({ name })) : [{ name: siteConfig.author.name }],
    creator: siteConfig.author.name,
    publisher: siteConfig.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: type,
      locale: "en_US",
      url: pageUrl,
      title: pageTitle,
      description: pageDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: title || siteConfig.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
      creator: siteConfig.author.twitter,
      site: siteConfig.author.twitter,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };

  // Add article-specific metadata
  if (type === "article" && metadata.openGraph) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: "article",
      publishedTime,
      modifiedTime,
      authors: authors || [siteConfig.author.name],
      section,
    };
  }

  return metadata;
}

export function generateArticleSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  authorName,
  slug,
}: {
  title: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    image: image ? `${siteConfig.url}${image}` : `${siteConfig.url}${siteConfig.ogImage}`,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: authorName,
      url: `${siteConfig.url}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/series/${slug}`,
    },
  };
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    sameAs: [
      siteConfig.author.linkedin,
      siteConfig.author.github,
    ],
  };
}

export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.author.name,
    jobTitle: siteConfig.author.title,
    description: siteConfig.author.bio,
    url: `${siteConfig.url}/about`,
    sameAs: [
      siteConfig.author.linkedin,
      siteConfig.author.github,
    ],
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}
