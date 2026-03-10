'use client';

import { useState } from "react";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";

interface Subscriber {
    email: string;
    timestamp: string;
}

export function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate email
        if (!email || !email.includes('@')) {
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus('idle'), 3000);
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // Simulate newsletter subscription (in production, send to your email service API)
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const subscription = {
                email,
                timestamp: new Date().toISOString()
            };
            
            // Store in localStorage (in production, send to your newsletter service like Mailchimp, ConvertKit, etc.)
            const existingSubscribers: Subscriber[] = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
            
            // Check if already subscribed
            if (existingSubscribers.some((sub: Subscriber) => sub.email === email)) {
                setSubmitStatus('error');
                setTimeout(() => setSubmitStatus('idle'), 3000);
                setIsSubmitting(false);
                return;
            }
            
            existingSubscribers.push(subscription);
            localStorage.setItem('newsletterSubscribers', JSON.stringify(existingSubscribers));
            
            // Show success message
            setSubmitStatus('success');
            
            // Reset form
            setEmail('');
            
            // Clear success message after 5 seconds
            setTimeout(() => setSubmitStatus('idle'), 5000);
        } catch {
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus('idle'), 3000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h3 className="font-semibold text-foreground mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">Stay updated with the latest Business Central development tips.</p>
            
            {/* Success Message */}
            {submitStatus === 'success' && (
                <div className="mb-4 p-3 bg-primary/10 border border-primary/20 rounded-lg flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                    <p className="text-xs text-primary">Successfully subscribed!</p>
                </div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
                    <p className="text-xs text-red-500">Please enter a valid email.</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="developer@example.com"
                    required
                    disabled={isSubmitting}
                    className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:rounded-r-none disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center rounded-md sm:rounded-r-md sm:rounded-l-none text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <>
                            <span className="inline-block h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2"></span>
                            Subscribing...
                        </>
                    ) : (
                        <>
                            <Mail className="h-4 w-4 mr-2" />
                            Subscribe
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
