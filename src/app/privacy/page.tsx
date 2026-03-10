import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
    title: "Privacy Policy",
    description: "Privacy Policy for NavWithNav - How we collect, use, and protect your information.",
    url: "/privacy",
});

export default function PrivacyPolicyPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl flex-1">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>

            <h1 className="text-4xl font-bold tracking-tight mb-4">Privacy Policy</h1>
            <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}</p>

            <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        Welcome to NavWithNav. We respect your privacy and are committed to protecting your personal data. 
                        This privacy policy will inform you about how we look after your personal data when you visit our 
                        website and tell you about your privacy rights and how the law protects you.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        We may collect, use, store and transfer different kinds of personal data about you:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li><strong>Identity Data:</strong> includes name and username</li>
                        <li><strong>Contact Data:</strong> includes email address</li>
                        <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location</li>
                        <li><strong>Usage Data:</strong> includes information about how you use our website and services</li>
                        <li><strong>Marketing and Communications Data:</strong> includes your preferences in receiving marketing from us and your communication preferences</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>To provide and maintain our service</li>
                        <li>To notify you about changes to our service</li>
                        <li>To provide customer support</li>
                        <li>To gather analysis or valuable information so that we can improve our service</li>
                        <li>To send you newsletters and marketing communications (with your consent)</li>
                        <li>To respond to your comments and questions</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        We use cookies and similar tracking technologies to track activity on our website and hold certain 
                        information. Cookies are files with small amount of data which may include an anonymous unique identifier.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. 
                        However, if you do not accept cookies, you may not be able to use some portions of our website.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        We have put in place appropriate security measures to prevent your personal data from being accidentally 
                        lost, used or accessed in an unauthorized way, altered or disclosed. We limit access to your personal 
                        data to those employees, agents, contractors and other third parties who have a business need to know.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Request access to your personal data</li>
                        <li>Request correction of your personal data</li>
                        <li>Request erasure of your personal data</li>
                        <li>Object to processing of your personal data</li>
                        <li>Request restriction of processing your personal data</li>
                        <li>Request transfer of your personal data</li>
                        <li>Right to withdraw consent</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Third-Party Links</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        Our website may include links to third-party websites, plug-ins and applications. Clicking on those 
                        links or enabling those connections may allow third parties to collect or share data about you. We do 
                        not control these third-party websites and are not responsible for their privacy statements.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the 
                        new Privacy Policy on this page and updating the &quot;Last updated&quot; date at the top of this Privacy Policy.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        If you have any questions about this Privacy Policy, please contact us:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>By email: contact@navwithnav.com</li>
                        <li>By visiting our <Link href="/contact" className="text-primary hover:underline">contact page</Link></li>
                    </ul>
                </section>
            </div>
        </div>
    );
}
