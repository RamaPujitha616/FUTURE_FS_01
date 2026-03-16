import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Terminal } from "@/components/Terminal";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FloatingButton } from "@/components/FloatingButton";
import { CursorGlow } from "@/components/CursorGlow";

export default function Home() {
  return (
    <div className="relative bg-background text-foreground min-h-screen">
      <CursorGlow />
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Terminal />
        <Contact />
      </main>

      <Footer />
      <FloatingButton />
    </div>
  );
}
