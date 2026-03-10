import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
    title: "Terms of Service",
    description: "Terms of Service for NavWithNav - Legal terms and conditions for using our services.",
    url: "/terms",
});

export default function TermsOfServicePage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl flex-1">
            <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Link>

            <h1 className="text-4xl font-bold tracking-tight mb-4">Terms of Service</h1>
            <p className="text-sm text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}</p>

            <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Agreement to Terms</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        By accessing or using NavWithNav, you agree to be bound by these Terms of Service and all applicable 
                        laws and regulations. If you do not agree with any of these terms, you are prohibited from using or 
                        accessing this site.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Use License</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        Permission is granted to temporarily access the materials (information or software) on NavWithNav for 
                        personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Modify or copy the materials</li>
                        <li>Use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
                        <li>Attempt to decompile or reverse engineer any software contained on NavWithNav</li>
                        <li>Remove any copyright or other proprietary notations from the materials</li>
                        <li>Transfer the materials to another person or &quot;mirror&quot; the materials on any other server</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Content and Intellectual Property</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        All content on NavWithNav, including but not limited to text, graphics, logos, images, audio clips, 
                        video clips, data compilations, page layout, underlying code and software is the property of NavWithNav 
                        or licensed to us and is protected by copyright, trademark, and other intellectual property laws.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        You may view, print and download portions of the material from the website for your own personal, 
                        non-commercial use only, provided you maintain all copyright and other proprietary notices.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">User Accounts and Comments</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        When you create an account or leave comments on our website, you are responsible for maintaining the 
                        security of your account and for all activities that occur under your account.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        You agree not to post any content that:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>Is unlawful, threatening, abusive, harassing, defamatory, libelous, deceptive, fraudulent, or invasive of another&apos;s privacy</li>
                        <li>Contains software viruses or any other computer code designed to interrupt, destroy or limit functionality</li>
                        <li>Infringes any patent, trademark, trade secret, copyright or other proprietary rights</li>
                        <li>Impersonates any person or entity or otherwise misrepresents your affiliation with a person or entity</li>
                        <li>Is spam or unsolicited advertising</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Newsletter and Communications</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        By subscribing to our newsletter, you consent to receive periodic emails from us about Business Central 
                        development, tutorials, and updates. You may unsubscribe at any time by clicking the unsubscribe link 
                        in any email we send.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Third-Party Services and Links</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        Our website may contain links to third-party websites or services that are not owned or controlled by 
                        NavWithNav. We have no control over, and assume no responsibility for, the content, privacy policies, 
                        or practices of any third-party websites or services.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        You acknowledge and agree that NavWithNav shall not be responsible or liable, directly or indirectly, 
                        for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance 
                        on any such content, goods or services available on or through any such websites or services.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        The materials on NavWithNav are provided on an &apos;as is&apos; basis. NavWithNav makes no warranties, 
                        expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, 
                        implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement 
                        of intellectual property or other violation of rights.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        The information provided on this website is for general informational and educational purposes only and 
                        is not intended as professional advice. While we strive to provide accurate information, we make no 
                        representations or warranties about the completeness, accuracy, reliability, suitability or availability.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Limitations of Liability</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        In no event shall NavWithNav or its suppliers be liable for any damages (including, without limitation, 
                        damages for loss of data or profit, or due to business interruption) arising out of the use or inability 
                        to use the materials on NavWithNav, even if NavWithNav or an authorized representative has been notified 
                        orally or in writing of the possibility of such damage.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Indemnification</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        You agree to indemnify, defend and hold harmless NavWithNav and its officers, directors, employees, 
                        agents, and affiliates from and against any and all claims, damages, obligations, losses, liabilities, 
                        costs or debt, and expenses arising from your use of and access to the website, your violation of these 
                        Terms, or your violation of any third party right.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Modifications to Terms</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        NavWithNav may revise these Terms of Service at any time without notice. By using this website you are 
                        agreeing to be bound by the then current version of these Terms of Service. We encourage you to 
                        periodically review these Terms to stay informed of updates.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        These Terms shall be governed and construed in accordance with applicable laws, without regard to its 
                        conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be 
                        considered a waiver of those rights.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Termination</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        We may terminate or suspend your access to our website immediately, without prior notice or liability, 
                        for any reason whatsoever, including without limitation if you breach the Terms. All provisions of the 
                        Terms which by their nature should survive termination shall survive termination.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        If you have any questions about these Terms of Service, please contact us:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                        <li>By email: contact@navwithnav.com</li>
                        <li>By visiting our <Link href="/contact" className="text-primary hover:underline">contact page</Link></li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        By using NavWithNav, you acknowledge that you have read these Terms of Service and agree to be bound 
                        by them. If you do not agree to these terms, please do not use our website.
                    </p>
                </section>
            </div>
        </div>
    );
}
