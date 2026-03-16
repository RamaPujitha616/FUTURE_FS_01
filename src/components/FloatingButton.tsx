import { Mail } from "lucide-react";
import { motion } from "framer-motion";

export function FloatingButton() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
  };

  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={scrollToContact}
      className="fixed bottom-6 right-6 z-50 p-4 md:px-6 md:py-4 rounded-full font-bold shadow-2xl shadow-primary/30 bg-gradient-to-r from-primary to-accent text-primary-foreground flex items-center gap-2 group"
    >
      <Mail className="w-5 h-5" />
      <span className="hidden md:block">Hire Me</span>
      
      {/* Ripple effect on hover */}
      <span className="absolute inset-0 rounded-full border-2 border-white/50 opacity-0 group-hover:animate-ping" />
    </motion.button>
  );
}
