import { useState } from "react";
import { motion } from "framer-motion";
import { GraduationCap, Code2, Database, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

const SKILL_CATEGORIES = [
  { id: "frontend", label: "Frontend", icon: Code2 },
  { id: "backend", label: "Backend", icon: Database },
  { id: "database", label: "Database", icon: Database },
  { id: "tools", label: "Tools", icon: Wrench },
];

const SKILLS_DATA = {
  frontend: [
    { name: "HTML5", progress: 95 },
    { name: "CSS3 / Tailwind", progress: 90 },
    { name: "JavaScript", progress: 88 },
    { name: "React.js", progress: 85 },
  ],
  backend: [
    { name: "Node.js", progress: 80 },
    { name: "Express.js", progress: 78 },
    { name: "RESTful APIs", progress: 85 },
  ],
  database: [
    { name: "MongoDB", progress: 75 },
    { name: "MySQL", progress: 70 },
  ],
  tools: [
    { name: "Git", progress: 90 },
    { name: "GitHub", progress: 88 },
    { name: "VS Code", progress: 95 },
    { name: "Postman", progress: 85 },
  ],
};

export function About() {
  const [activeCategory, setActiveCategory] = useState<keyof typeof SKILLS_DATA>("frontend");

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">About Me</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Bio Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-display font-semibold mb-6">Get to know me!</h3>
            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground mb-8">
              <p>
                I'm a passionate Computer Science student and Full Stack Web Developer. 
                I thrive on building modern, scalable, and user-centric web applications from the ground up.
              </p>
              <p>
                My journey in web development started with a deep curiosity about how things work on the internet. 
                Since then, I've immersed myself in learning cutting-edge technologies and best practices to deliver 
                high-quality software solutions.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl flex items-start gap-4">
              <div className="p-3 bg-primary/10 text-primary rounded-xl">
                <GraduationCap className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-foreground">B.Tech in Computer Science</h4>
                <p className="text-muted-foreground">Focusing on algorithms, data structures, and full-stack development methodologies.</p>
              </div>
            </div>
          </motion.div>

          {/* Skills Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-6 md:p-8 rounded-3xl"
          >
            <h3 className="text-2xl font-display font-semibold mb-6">Skills & Expertise</h3>
            
            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {SKILL_CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id as keyof typeof SKILLS_DATA)}
                    className={cn(
                      "px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-medium transition-all duration-300",
                      isActive 
                        ? "bg-primary text-primary-foreground shadow-md shadow-primary/25" 
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Progress Bars */}
            <div className="space-y-6">
              {SKILLS_DATA[activeCategory].map((skill, index) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-foreground">{skill.name}</span>
                    <span className="text-muted-foreground text-sm">{skill.progress}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.progress}%` }}
                      transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full relative"
                    >
                      <div className="absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-r from-transparent to-white/30" />
                      <div className="absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-r from-transparent to-white/30" />
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
