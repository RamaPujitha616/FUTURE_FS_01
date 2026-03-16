import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const PROJECT_FILTERS = ["All", "React", "Node.js", "Full Stack", "API"];

const PROJECTS = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "Modern developer portfolio with animations, dark mode, and a premium glassmorphism aesthetic.",
    image: "project1.png",
    tags: ["React", "Tailwind", "Framer Motion", "Frontend"],
    category: ["React", "Frontend"],
    github: "https://github.com/RamaPujitha616",
    demo: "#",
  },
  {
    id: 2,
    title: "Local Business & Live Pitch Platform",
    description: "A unified platform combining a modern local business website with a live pitch/presentation experience, featuring booking flows, interactive slides, and real-time feedback.",
    image: "project2.png",
    tags: ["React", "Tailwind", "WebSocket", "Realtime", "Responsive"],
    category: ["React", "Frontend", "API"],
    github: "https://github.com/RamaPujitha616",
    demo: "#",
  },
  {
    id: 4,
    title: "Client Lead Management System",
    description: "A CRM-style dashboard for tracking leads, managing client outreach, and converting prospects with data-driven workflows.",
    image: "project4.png",
    tags: ["React", "Node.js", "Express", "CRM"],
    category: ["React", "Node.js", "Full Stack"],
    github: "https://github.com/RamaPujitha616",
    demo: "#",
  },
];

export function Projects() {
  const [filter, setFilter] = useState("All");

  const filteredProjects = PROJECTS.filter(
    p => filter === "All" || p.category.includes(filter)
  );

  return (
    <section id="projects" className="py-24 relative bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Featured Projects</h2>
            <div className="w-24 h-1 bg-primary rounded-full" />
          </div>
          
          <div className="flex flex-wrap items-center gap-2 bg-background p-2 rounded-2xl border border-border">
            <Filter className="w-5 h-5 ml-2 text-muted-foreground hidden sm:block" />
            {PROJECT_FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                  filter === f
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-3xl overflow-hidden glass-card flex flex-col"
              >
                {/* Glowing border effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl -z-10 blur-xl" />
                
                <div className="relative h-64 overflow-hidden bg-muted">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                  <img 
                    src={`${import.meta.env.BASE_URL}images/${project.image}`}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 right-4 z-20 flex gap-2">
                    <a 
                      href={project.github} 
                      className="p-3 bg-background/80 backdrop-blur-md rounded-full text-foreground hover:text-primary hover:scale-110 transition-all shadow-lg"
                      aria-label="GitHub Repository"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a 
                      href={project.demo} 
                      className="p-3 bg-primary/90 backdrop-blur-md rounded-full text-primary-foreground hover:scale-110 transition-all shadow-lg"
                      aria-label="Live Demo"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col bg-card/80 backdrop-blur-md">
                  <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="px-3 py-1 text-xs font-medium rounded-full bg-secondary/80 text-secondary-foreground border border-border/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
