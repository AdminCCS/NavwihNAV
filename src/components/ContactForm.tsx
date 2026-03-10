'use client';

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

export function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate form
        if (!formData.name || !formData.email || !formData.message) {
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus('idle'), 3000);
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // Simulate form submission (in production, you'd send to an API endpoint)
            // For now, we'll just store it in localStorage as a demo
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const submission = {
                ...formData,
                timestamp: new Date().toISOString()
            };
            
            // Store in localStorage (in production, send to your backend API)
            const existingMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
            existingMessages.push(submission);
            localStorage.setItem('contactMessages', JSON.stringify(existingMessages));
            
            // Show success message
            setSubmitStatus('success');
            
            // Reset form
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
            
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
        <form onSubmit={handleSubmit} className="bg-muted/30 p-8 rounded-2xl border border-border">
            {/* Success Message */}
            {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <p className="text-sm text-primary">Message sent successfully! We&apos;ll get back to you soon.</p>
                </div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <p className="text-sm text-red-500">Please fill in all required fields.</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                        type="text" 
                        id="name" 
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" 
                        placeholder="John Doe" 
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input 
                        type="email" 
                        id="email" 
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" 
                        placeholder="john@company.com" 
                    />
                </div>
            </div>
            <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</label>
                <input 
                    type="text" 
                    id="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary" 
                    placeholder="How can I help you?" 
                />
            </div>
            <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message <span className="text-red-500">*</span>
                </label>
                <textarea 
                    id="message" 
                    rows={6} 
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none" 
                    placeholder="Write your message here..."
                ></textarea>
            </div>
            <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground font-medium rounded-lg px-6 py-3 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isSubmitting ? (
                    <>
                        <span className="inline-block h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></span>
                        Sending...
                    </>
                ) : (
                    <>
                        <Send className="h-4 w-4" />
                        Send Message
                    </>
                )}
            </button>
        </form>
    );
}
