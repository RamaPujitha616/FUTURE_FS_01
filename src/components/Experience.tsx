import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";

const TIMELINE = [
  {
    year: "2022",
    title: "Computer Science Graduate",
    subtitle: "B.Tech Journey Complete",
    description: "Graduating with strong fundamentals in full-stack development, algorithms, and scalable system design.",
    icon: GraduationCap,
  },
  {
    year: "2023",
    title: "The Fundamentals",
    subtitle: "HTML, CSS, JavaScript",
    description: "Started the web development journey. Built static sites and interactive scripts using vanilla web technologies.",
    icon: GraduationCap,
  },
  {
    year: "2024",
    title: "Mastering the Frontend",
    subtitle: "React & Frameworks",
    description: "Mastered React.js, Tailwind CSS, and component-driven UI design. Started exploring Node.js basics.",
    icon: GraduationCap,
  },
   {
    year: "2025",
    title: "First Complex Applications",
    subtitle: "Applying Knowledge",
    description: "Built and deployed multiple end-to-end web applications and automated dashboards.",
    icon: Briefcase,
  },
 
  {
    year: "2026",
    title: "Advanced Full-Stack Development",
    subtitle: "Projects & Architecture",
    description: "Deep dive into MongoDB, Express architecture, state management in React, and building RESTful scalable APIs.",
    icon: Briefcase,
  },
 
  
];

export function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">My Journey</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-8" />
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

          {TIMELINE.map((item, index) => {
            const Icon = item.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center justify-between mb-12 md:mb-8 ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Desktop Spacer */}
                <div className="hidden md:block w-5/12" />

                {/* Timeline Node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-background border-4 border-primary z-10 shadow-lg shadow-primary/20">
                  <Icon className="w-5 h-5 text-primary" />
                </div>

                {/* Content Card */}
                <div className="w-full pl-16 md:pl-0 md:w-5/12">
                  <div className="glass-card p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex items-center gap-2 text-primary font-bold mb-2">
                      <Calendar className="w-4 h-4" />
                      {item.year}
                    </div>
                    <h3 className="text-xl font-display font-bold text-foreground mb-1">{item.title}</h3>
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">{item.subtitle}</h4>
                    <p className="text-muted-foreground/80 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
