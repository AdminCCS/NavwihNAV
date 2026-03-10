import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { getSortedArticlesData } from "@/lib/articles";
import { PaginatedArticles } from "@/components/blog/PaginatedArticles";
import { SearchArticles } from "@/components/blog/SearchArticles";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
  url: "/",
  keywords: ["Business Central blog", "AL programming tutorials", "Microsoft Dynamics NAV", "ERP development"],
});

export default async function Home() {
  const allArticles = getSortedArticlesData();

  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-16">

              {/* Latest Articles */}
              <div>
                <div className="flex items-center justify-between mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight flex items-center gap-2">
                    <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-primary" /> Latest Articles
                  </h2>
                  <Link href="/series" className="text-primary font-medium hover:underline text-sm flex items-center whitespace-nowrap">
                    View all <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>

                <PaginatedArticles articles={allArticles} articlesPerPage={4} />
              </div>

              {/* Developer Tips Removed */}

            </div>

            {/* Sidebar */}
            <div className="space-y-8 lg:space-y-12">

              {/* Author Authority Profile */}
              <div className="rounded-xl border border-border bg-background p-4 sm:p-6">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&h=256&auto=format&fit=crop"
                  alt="Author"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto mb-4 border-2 border-primary object-cover"
                />
                <div className="text-center">
                  <h3 className="font-bold text-lg sm:text-xl mb-1">Nitin</h3>
                  <p className="text-primary font-medium text-sm mb-3">Solution Architect</p>
                  <p className="text-sm text-muted-foreground mb-4">
                    18+ years of experience specializing in Microsoft Dynamics NAV, Business Central, Power Platform, and ERP Architecture.
                  </p>
                  <Link href="/about" className="inline-flex items-center text-sm font-medium hover:text-primary transition-colors">
                    Read full bio <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Search Articles */}
              <div className="rounded-xl border border-border bg-background p-4 sm:p-6">
                <h3 className="font-bold text-lg mb-4">Search Articles</h3>
                <SearchArticles articles={allArticles} />
              </div>           

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
