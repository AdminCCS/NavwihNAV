import { ContactForm } from "@/components/ContactForm";
import { Mail, MapPin, Phone } from "lucide-react";
import { generateSEOMetadata } from "@/lib/seo";

export const metadata = generateSEOMetadata({
    title: "Contact - Get ERP Consulting Help",
    description: "Get in touch for ERP consulting, Business Central architecture guidance, and Microsoft Dynamics expertise from an experienced solution architect.",
    url: "/contact",
    keywords: ["ERP consulting", "Business Central consulting", "NAV consultant", "Microsoft Dynamics expert"],
});

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl flex-1">
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-center">Get in Touch</h1>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
                Have a question about Business Central architecture, or interested in having me consult on your next ERP implementation? Send a message.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-1 space-y-8">
                    <div className="flex items-start gap-4">
                        <Mail className="h-6 w-6 text-primary mt-1" />
                        <div>
                            <h3 className="font-semibold mb-1">Email</h3>
                            <p className="text-sm text-muted-foreground">contact@navwithnav.com</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <MapPin className="h-6 w-6 text-primary mt-1" />
                        <div>
                            <h3 className="font-semibold mb-1">Location</h3>
                            <p className="text-sm text-muted-foreground">Available globally for remote consulting.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Phone className="h-6 w-6 text-primary mt-1" />
                        <div>
                            <h3 className="font-semibold mb-1">Phone</h3>
                            <p className="text-sm text-muted-foreground text-opacity-80">Available upon request</p>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}
