import { ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card/60 backdrop-blur-lg border-t border-white/20 shadow-inner shadow-white/10 bg-gradient-to-br from-white/20 to-transparent mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-center">
          <p className="text-sm text-foreground/80 mb-2">
            Created by{" "}
            <span className="font-semibold text-foreground">Divyansh Kumar</span>
          </p>
          <p className="text-xs text-foreground/60 mb-3">
            Author of this website
          </p>
          <a
            href="https://www.linkedin.com/in/divyansh-kumar-a4529922a/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:text-primary/80 text-sm font-medium transition-colors"
          >
            Connect on LinkedIn
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}