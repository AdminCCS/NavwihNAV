'use client';

import { Share2, Linkedin, Twitter, Facebook, Link2, Check } from "lucide-react";
import { useState } from "react";

interface ArticleShareButtonProps {
  slug: string;
  title: string;
}

export function ArticleShareButton({ slug, title }: ArticleShareButtonProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const url = typeof window !== 'undefined' 
    ? `${window.location.origin}/series/${slug}`
    : `https://navwithnav.com/series/${slug}`;
  
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const handleShare = (e: React.MouseEvent, platform?: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (platform) {
      let shareUrl = '';
      switch (platform) {
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
          break;
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
          break;
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
          break;
        case 'whatsapp':
          shareUrl = `https://api.whatsapp.com/send?text=${encodedTitle} ${encodedUrl}`;
          break;
      }
      
      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
        setShowMenu(false);
      }
    } else {
      setShowMenu(!showMenu);
    }
  };

  const copyLink = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowMenu(false);
      }, 1500);
    });
  };

  return (
    <div className="relative">
      <button
        onClick={handleShare}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
        aria-label="Share article"
      >
        <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
        <span>Share</span>
      </button>

      {showMenu && (
        <>
          {/* Backdrop to close menu */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(false);
            }}
          />
          
          {/* Share menu */}
          <div className="absolute bottom-full left-0 mb-2 w-48 bg-background border border-border rounded-lg shadow-lg overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2">
            <div className="py-1">
              <button
                onClick={(e) => handleShare(e, 'linkedin')}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors text-left"
              >
                <Linkedin className="h-4 w-4 text-blue-600" />
                <span>LinkedIn</span>
              </button>
              <button
                onClick={(e) => handleShare(e, 'twitter')}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors text-left"
              >
                <Twitter className="h-4 w-4 text-sky-500" />
                <span>Twitter / X</span>
              </button>
              <button
                onClick={(e) => handleShare(e, 'facebook')}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors text-left"
              >
                <Facebook className="h-4 w-4 text-blue-800" />
                <span>Facebook</span>
              </button>
              <button
                onClick={(e) => handleShare(e, 'whatsapp')}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors text-left"
              >
                <span className="h-4 w-4 text-green-500 font-bold flex items-center justify-center">W</span>
                <span>WhatsApp</span>
              </button>
              <div className="border-t border-border my-1"></div>
              <button
                onClick={copyLink}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors text-left"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-green-500">Copied!</span>
                  </>
                ) : (
                  <>
                    <Link2 className="h-4 w-4" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
