import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail } from "lucide-react";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiMongodb, SiJavascript } from "react-icons/si";

const TYPING_PHRASES = [
  "Full Stack Web Developer",
  "React Developer",
  "Node.js Engineer",
  "Problem Solver",
];

export function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = TYPING_PHRASES[phraseIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentPhrase.length) {
          setCharIndex(prev => prev + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        if (charIndex > 0) {
          setCharIndex(prev => prev - 1);
        } else {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % TYPING_PHRASES.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex]);

  const scrollTo = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-1/4 -left-64 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen opacity-50 dark:opacity-20 animate-pulse" />
      <div className="absolute bottom-1/4 -right-64 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px] mix-blend-screen opacity-50 dark:opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start text-left"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="px-4 py-2 rounded-full glass border border-primary/20 text-primary text-sm font-semibold mb-6 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              Available for new opportunities
            </motion.div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-[1.1] mb-4">
              Hi, I'm <br />
              <span className="text-gradient">Rama Pujitha</span>
            </h1>
            
            <div className="h-[40px] sm:h-[48px] mb-6 flex items-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-muted-foreground">
                <span className="sr-only">I am a </span>
                {TYPING_PHRASES[phraseIndex].substring(0, charIndex)}
                <span className="inline-block w-[3px] h-[1em] bg-primary ml-1 animate-pulse" />
              </h2>
            </div>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-lg leading-relaxed">
              I craft modern, performant web applications with clean code and beautiful UIs. Turning complex problems into elegant solutions.
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={() => scrollTo('#projects')}
                className="px-8 py-4 rounded-xl font-semibold bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
              >
                View Projects <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollTo('#contact')}
                className="px-8 py-4 rounded-xl font-semibold glass hover:bg-white/10 dark:hover:bg-white/5 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
              >
                Contact Me <Mail className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative lg:ml-auto w-full max-w-md mx-auto aspect-square"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-accent p-1 animate-spin-slow" style={{ animationDuration: '8s' }}>
              <div className="w-full h-full rounded-full bg-background/90 backdrop-blur-3xl overflow-hidden p-2">
                <img 
                  src={`${import.meta.env.BASE_URL}images/profi.jpeg`} 
                  alt="Rama Pujitha" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            
            {/* Floating Tech Icons */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 p-4 glass rounded-2xl shadow-xl border border-white/10"
            >
              <FaReact className="w-8 h-8 text-[#61DAFB]" />
            </motion.div>
            <motion.div 
              animate={{ y: [10, -10, 10] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-1/4 -right-8 p-4 glass rounded-2xl shadow-xl border border-white/10"
            >
              <FaNodeJs className="w-8 h-8 text-[#339933]" />
            </motion.div>
            <motion.div 
              animate={{ y: [-8, 8, -8] }} 
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-8 -left-8 p-4 glass rounded-2xl shadow-xl border border-white/10"
            >
              <SiMongodb className="w-8 h-8 text-[#47A248]" />
            </motion.div>
            <motion.div 
              animate={{ y: [8, -8, 8] }} 
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-4 right-8 p-4 glass rounded-2xl shadow-xl border border-white/10"
            >
              <SiJavascript className="w-8 h-8 text-[#F7DF1E] rounded-sm bg-black" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
