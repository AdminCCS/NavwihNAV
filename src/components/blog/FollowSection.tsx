import { Github, Linkedin, Twitter, Youtube } from "lucide-react";

export function FollowSection() {
    return (
        <div className="bg-muted/50 rounded-xl p-6 my-8 border border-border">
            <h3 className="text-lg font-semibold mb-4">Follow NavWithNav</h3>
            <p className="text-sm text-muted-foreground mb-4">
                Connect with Nitin on social media for more Business Central development tips and architecture insights.
            </p>
            <div className="flex gap-4">
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2 bg-background rounded-full border border-border hover:border-primary hover:text-primary transition-colors">
                    <Linkedin className="h-5 w-5" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-2 bg-background rounded-full border border-border hover:border-primary hover:text-primary transition-colors">
                    <Youtube className="h-5 w-5" />
                </a>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 bg-background rounded-full border border-border hover:border-primary hover:text-primary transition-colors">
                    <Github className="h-5 w-5" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2 bg-background rounded-full border border-border hover:border-primary hover:text-primary transition-colors">
                    <Twitter className="h-5 w-5" />
                </a>
            </div>
        </div>
    );
}
