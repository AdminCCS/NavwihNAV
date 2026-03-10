import { Github, Linkedin, Youtube } from "lucide-react";
import { generateSEOMetadata, generatePersonSchema } from "@/lib/seo";
import { StructuredData } from "@/components/StructuredData";

export const metadata = generateSEOMetadata({
    title: "About Nitin - Solution Architect",
    description: "About Nitin, a Microsoft Dynamics 365 Business Central Solution Architect with 18+ years of experience in NAV, Business Central, and Power Platform.",
    url: "/about",
    keywords: ["Microsoft Dynamics expert", "Business Central architect", "NAV consultant", "ERP specialist"],
});

export default function AboutPage() {
    const personSchema = generatePersonSchema();
    
    return (
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16 max-w-4xl flex-1">
            <StructuredData data={personSchema} />
            <div className="flex flex-col md:flex-row gap-8 sm:gap-12 items-start">
                <div className="w-full md:w-1/3 flex flex-col items-center">
                    <img
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&h=400&auto=format&fit=crop"
                        alt="Nitin"
                        className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-2xl object-cover shadow-lg border-4 border-background"
                    />
                    <h1 className="text-2xl sm:text-3xl font-bold mt-4 sm:mt-6 mb-1">Nitin</h1>
                    <p className="text-primary font-medium text-base sm:text-lg mb-4 sm:mb-6">Solution Architect</p>

                    <div className="flex gap-3 sm:gap-4">
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2.5 sm:p-3 bg-muted rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                            <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
                        </a>
                        <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2.5 sm:p-3 bg-muted rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                            <Github className="h-4 w-4 sm:h-5 sm:w-5" />
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-2.5 sm:p-3 bg-muted rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
                            <Youtube className="h-4 w-4 sm:h-5 sm:w-5" />
                        </a>
                    </div>
                </div>

                <div className="w-full md:w-2/3 prose prose-neutral dark:prose-invert max-w-none prose-headings:text-xl sm:prose-headings:text-2xl lg:prose-headings:text-3xl prose-p:text-sm sm:prose-p:text-base prose-li:text-sm sm:prose-li:text-base">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">About NavWithNav</h2>
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                        Welcome to NavWithNav, the premier knowledge-sharing platform for Microsoft Dynamics Business Central developers, consultants, and ERP professionals.
                    </p>

                    <h3>18+ Years of ERP Excellence</h3>
                    <p>
                        With over 18 years of specialized experience in Microsoft Dynamics NAV and Business Central,
                        I bring a deep understanding of enterprise architecture, integration patterns, and robust AL development strategies.
                        Throughout my career across various global-scale projects, I have implemented complex solutions spanning finance, supply chain, and manufacturing operations.
                    </p>

                    <h3>My Expertise</h3>
                    <ul>
                        <li><strong>Microsoft Dynamics NAV (C/AL):</strong> Legacy upgrade paths and optimization.</li>
                        <li><strong>Business Central AL Development:</strong> Extension architecture, telemetry, and performance.</li>
                        <li><strong>Power Platform & AI:</strong> Integrating Power BI, Power Automate, and Azure AI/Copilot.</li>
                        <li><strong>Dynamics CRM Integration:</strong> Dual-write and CDS data synchronization.</li>
                        <li><strong>API Integrations:</strong> RESTful APIs, OAuth2, and scalable webhook patterns.</li>
                        <li><strong>ERP Solution Architecture:</strong> Scalable enterprise system designs bridging SaaS and ISV requirements.</li>
                    </ul>

                    <h3>The Goal</h3>
                    <p>
                        The fundamental goal of NavWithNav is to share real-world tutorials, architecture guidance, technical solutions, and best practices.
                        By contributing to the community, we push the entire ecosystem forward and help developers build more resilient Business Central solutions.
                    </p>
                </div>
            </div>
        </div>
    );
}
