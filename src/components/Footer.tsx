import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-background border-t border-border py-12 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <a href="#home" className="text-xl font-display font-bold tracking-tighter mb-2 block">
            <span className="text-primary">&lt;</span>
            RP
            <span className="text-primary">/&gt;</span>
          </a>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Rama Pujitha. All rights reserved.
          </p>
        </div>

        <button 
          onClick={scrollToTop}
          className="p-3 bg-secondary rounded-xl hover:bg-primary hover:text-primary-foreground transition-colors group"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  );
}
