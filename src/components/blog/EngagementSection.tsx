"use client";

import { useState, useEffect } from "react";
import { ThumbsUp, MessageSquare, User } from "lucide-react";

interface Reply {
    id: number;
    name: string;
    email: string;
    comment: string;
    timestamp: Date;
}

interface Comment {
    id: number;
    name: string;
    email: string;
    comment: string;
    timestamp: Date;
    replies?: Reply[];
}

interface EngagementSectionProps {
    slug: string;
}

export function EngagementSection({ slug }: EngagementSectionProps) {
    const [likes, setLikes] = useState(128);
    const [hasLiked, setHasLiked] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState<Comment[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    
    // User info saved from main comment
    const [savedName, setSavedName] = useState("");
    const [savedEmail, setSavedEmail] = useState("");
    
    // Reply state
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [replyComment, setReplyComment] = useState("");
    const [isReplySubmitting, setIsReplySubmitting] = useState(false);

    // Load saved user info and article comments from localStorage on component mount
    useEffect(() => {
        const storedName = localStorage.getItem('userName');
        const storedEmail = localStorage.getItem('userEmail');
        if (storedName) {
            setName(storedName);
            setSavedName(storedName);
        }
        if (storedEmail) {
            setEmail(storedEmail);
            setSavedEmail(storedEmail);
        }

        // Load comments for this specific article
        const commentsKey = `comments-${slug}`;
        const storedComments = localStorage.getItem(commentsKey);
        if (storedComments) {
            try {
                const parsed = JSON.parse(storedComments);
                // Convert timestamp strings back to Date objects
                const commentsWithDates = parsed.map((c: any) => ({
                    ...c,
                    timestamp: new Date(c.timestamp),
                    replies: c.replies?.map((r: any) => ({
                        ...r,
                        timestamp: new Date(r.timestamp)
                    })) || []
                }));
                setComments(commentsWithDates);
            } catch (error) {
                console.error('Error loading comments:', error);
            }
        }
    }, [slug]);

    const handleLike = () => {
        if (!hasLiked) {
            setLikes(likes + 1);
            setHasLiked(true);
        } else {
            setLikes(likes - 1);
            setHasLiked(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validation
        if (!name.trim() || !email.trim() || !comment.trim()) {
            alert("Please fill in all fields");
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address");
            return;
        }

        setIsSubmitting(true);

        // Simulate API call delay
        setTimeout(() => {
            const newComment: Comment = {
                id: comments.length + 1,
                name: name.trim(),
                email: email.trim(),
                comment: comment.trim(),
                timestamp: new Date(),
                replies: []
            };

            const updatedComments = [newComment, ...comments];
            setComments(updatedComments);
            
            // Save comments to localStorage with article slug
            const commentsKey = `comments-${slug}`;
            localStorage.setItem(commentsKey, JSON.stringify(updatedComments));
            
            // Save user info to localStorage and state for future use
            localStorage.setItem('userName', name.trim());
            localStorage.setItem('userEmail', email.trim());
            setSavedName(name.trim());
            setSavedEmail(email.trim());
            
            // Trigger stats update event
            window.dispatchEvent(new Event('articleStatsUpdated'));
            
            // Clear only comment field
            setComment("");
            setIsSubmitting(false);
            setSubmitSuccess(true);

            // Hide success message after 3 seconds
            setTimeout(() => setSubmitSuccess(false), 3000);
        }, 500);
    };

    const handleReplySubmit = (e: React.FormEvent, commentId: number) => {
        e.preventDefault();
        
        // Use saved name and email, or prompt user to fill main form first
        if (!savedName || !savedEmail) {
            alert("Please post a comment first to save your details");
            return;
        }
        
        // Validation
        if (!replyComment.trim()) {
            alert("Please enter your reply");
            return;
        }

        setIsReplySubmitting(true);

        // Simulate API call delay
        setTimeout(() => {
            const newReply: Reply = {
                id: Date.now(),
                name: savedName,
                email: savedEmail,
                comment: replyComment.trim(),
                timestamp: new Date()
            };

            const updatedComments = comments.map(comment => {
                if (comment.id === commentId) {
                    return {
                        ...comment,
                        replies: [...(comment.replies || []), newReply]
                    };
                }
                return comment;
            });
            
            setComments(updatedComments);
            
            // Save updated comments to localStorage
            const commentsKey = `comments-${slug}`;
            localStorage.setItem(commentsKey, JSON.stringify(updatedComments));
            
            // Trigger stats update event
            window.dispatchEvent(new Event('articleStatsUpdated'));
            
            // Clear form and close reply
            setReplyComment("");
            setReplyingTo(null);
            setIsReplySubmitting(false);
        }, 500);
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const getRelativeTime = (date: Date) => {
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
        
        if (diffInSeconds < 60) return "Just now";
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border">
            {/* Like Button */}
            <div className="flex items-center gap-4 mb-8 sm:mb-10">
                <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border font-medium transition-colors text-sm sm:text-base ${hasLiked ? 'bg-primary text-primary-foreground border-primary' : 'bg-background hover:bg-muted border-border'}`}
                >
                    <ThumbsUp className={`h-4 w-4 sm:h-5 sm:w-5 ${hasLiked ? 'fill-current' : ''}`} />
                    <span className="hidden sm:inline">{hasLiked ? 'Liked' : 'Like this article'}</span>
                    <span className="sm:hidden">{hasLiked ? 'Liked' : 'Like'}</span>
                    <span className="text-xs sm:text-sm opacity-80">({likes})</span>
                </button>
            </div>

            {/* Discussion / Comments Form */}
            <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-primary" /> Discussion ({comments.length})
                </h3>

                {submitSuccess && (
                    <div className="bg-primary/10 border border-primary/20 text-primary px-4 py-3 rounded-lg mb-6 text-sm">
                        ✓ Your comment has been posted successfully!
                    </div>
                )}

                <form className="bg-muted/30 p-4 sm:p-6 rounded-xl border border-border mb-6 sm:mb-8" onSubmit={handleSubmit}>
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-sm sm:text-base">Leave a comment</h4>
                        {savedName && (
                            <button
                                type="button"
                                onClick={() => {
                                    setSavedName("");
                                    setSavedEmail("");
                                    setName("");
                                    setEmail("");
                                    localStorage.removeItem('userName');
                                    localStorage.removeItem('userEmail');
                                }}
                                className="text-xs text-muted-foreground hover:text-primary transition-colors"
                            >
                                Change identity
                            </button>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="name" className="block text-xs sm:text-sm font-medium mb-1">Name *</label>
                            <input 
                                type="text" 
                                id="name" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" 
                                placeholder="Your name" 
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-xs sm:text-sm font-medium mb-1">
                                Email * <span className="text-muted-foreground font-normal text-xs">(will not be published)</span>
                            </label>
                            <input 
                                type="email" 
                                id="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" 
                                placeholder="you@example.com" 
                            />
                        </div>
                    </div>
                    {savedName && (
                        <p className="text-xs text-primary mb-3 flex items-center gap-1">
                            ✓ Your details are saved for quick replies
                        </p>
                    )}
                    <div className="mb-4">
                        <label htmlFor="comment" className="block text-xs sm:text-sm font-medium mb-1">Comment *</label>
                        <textarea
                            id="comment"
                            rows={4}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                            className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                            placeholder="What are your thoughts?"
                        ></textarea>
                    </div>
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="bg-primary text-primary-foreground px-4 sm:px-6 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Posting...' : 'Post Comment'}
                    </button>
                </form>

                {/* Comments List */}
                <div className="space-y-6">
                    {comments.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                            <p className="text-sm">No comments yet. Be the first to share your thoughts!</p>
                        </div>
                    ) : (
                        comments.map((commentItem) => (
                            <div key={commentItem.id} className="space-y-4">
                                <div className="flex gap-3 sm:gap-4">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary flex-shrink-0 text-xs sm:text-sm">
                                        {getInitials(commentItem.name)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                            <span className="font-semibold text-sm">{commentItem.name}</span>
                                            <span className="text-xs text-muted-foreground">{getRelativeTime(commentItem.timestamp)}</span>
                                        </div>
                                        <p className="text-sm text-foreground mb-2 break-words">{commentItem.comment}</p>
                                        <button 
                                            onClick={() => setReplyingTo(replyingTo === commentItem.id ? null : commentItem.id)}
                                            className="text-xs font-medium text-primary hover:underline"
                                        >
                                            {replyingTo === commentItem.id ? 'Cancel' : 'Reply'}
                                        </button>

                                        {/* Reply Form */}
                                        {replyingTo === commentItem.id && (
                                            <form 
                                                className="mt-4 bg-muted/20 p-3 sm:p-4 rounded-lg border border-border" 
                                                onSubmit={(e) => handleReplySubmit(e, commentItem.id)}
                                            >
                                                <div className="flex items-center justify-between mb-3">
                                                    <h5 className="font-semibold text-xs sm:text-sm">Reply to {commentItem.name}</h5>
                                                    {savedName && (
                                                        <span className="text-xs text-muted-foreground">Replying as <span className="font-medium text-primary">{savedName}</span></span>
                                                    )}
                                                </div>
                                                <div className="mb-3">
                                                    <label htmlFor={`reply-comment-${commentItem.id}`} className="block text-xs font-medium mb-1">Your Reply *</label>
                                                    <textarea
                                                        id={`reply-comment-${commentItem.id}`}
                                                        rows={3}
                                                        value={replyComment}
                                                        onChange={(e) => setReplyComment(e.target.value)}
                                                        required
                                                        className="w-full bg-background border border-border rounded-md px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                                                        placeholder="Write your reply..."
                                                    ></textarea>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button 
                                                        type="submit" 
                                                        disabled={isReplySubmitting}
                                                        className="bg-primary text-primary-foreground px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        {isReplySubmitting ? 'Posting...' : 'Post Reply'}
                                                    </button>
                                                    <button 
                                                        type="button"
                                                        onClick={() => {
                                                            setReplyingTo(null);
                                                            setReplyComment("");
                                                        }}
                                                        className="bg-muted text-foreground px-3 sm:px-4 py-1.5 sm:py-2 rounded-md text-xs sm:text-sm font-medium hover:bg-muted/80 transition-colors"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                                {!savedName && (
                                                    <p className="text-xs text-muted-foreground mt-2">
                                                        💡 Tip: Post a comment above to save your details for quick replies
                                                    </p>
                                                )}
                                            </form>
                                        )}

                                        {/* Nested Replies */}
                                        {commentItem.replies && commentItem.replies.length > 0 && (
                                            <div className="mt-4 space-y-4 pl-4 sm:pl-6 border-l-2 border-primary/20">
                                                {commentItem.replies.map((reply) => (
                                                    <div key={reply.id} className="flex gap-2 sm:gap-3">
                                                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary flex-shrink-0 text-xs">
                                                            {getInitials(reply.name)}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                                <span className="font-semibold text-xs sm:text-sm">{reply.name}</span>
                                                                <span className="text-xs text-muted-foreground">{getRelativeTime(reply.timestamp)}</span>
                                                            </div>
                                                            <p className="text-xs sm:text-sm text-foreground break-words">{reply.comment}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
