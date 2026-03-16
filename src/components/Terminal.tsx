import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const COMMANDS = [
  { cmd: "npm install --save-dev awesome-skills", output: "added 1337 packages, and audited 9001 packages in 2s\n\nfound 0 vulnerabilities\n✨ Ready to build amazing things!" },
  { cmd: "git commit -m 'Built something amazing'", output: "[main 8a9b0c1] Built something amazing\n 4 files changed, 404 insertions(+), 0 deletions(-)\n create mode 100644 src/magic.ts" },
  { cmd: "node solve-problem.js", output: "Analyzing requirements...\nCompiling thoughts...\nExecuting solution...\n\n✅ Problem solved successfully! Algorithm efficiency: O(1)" },
  { cmd: "react-scripts build --production-ready", output: "Creating an optimized production build...\nCompiled successfully.\n\nFile sizes after gzip:\n  42.1 kB  build/static/js/main.js\n  1.2 kB   build/static/css/main.css\n\nThe project is built and ready to be deployed." },
];

export function Terminal() {
  const [activeCmdIndex, setActiveCmdIndex] = useState(0);
  const [typedCmd, setTypedCmd] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentCommand = COMMANDS[activeCmdIndex].cmd;
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      if (typedCmd.length < currentCommand.length) {
        timeout = setTimeout(() => {
          setTypedCmd(currentCommand.substring(0, typedCmd.length + 1));
        }, Math.random() * 50 + 50); // Random typing speed
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
          setShowOutput(true);
        }, 500);
      }
    } else {
      timeout = setTimeout(() => {
        setShowOutput(false);
        setTypedCmd("");
        setIsTyping(true);
        setActiveCmdIndex((prev) => (prev + 1) % COMMANDS.length);
      }, 4000); // Wait before next command
    }

    return () => clearTimeout(timeout);
  }, [typedCmd, isTyping, activeCmdIndex]);

  return (
    <section className="py-12 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-xl overflow-hidden bg-[#0d1117] border border-[#30363d] shadow-2xl shadow-primary/10"
        >
          {/* Terminal Header */}
          <div className="bg-[#161b22] px-4 py-3 flex items-center border-b border-[#30363d]">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <div className="mx-auto flex items-center text-xs text-muted-foreground font-mono">
              <span className="opacity-50">ramapujitha</span>
              <span className="mx-2">—</span>
              <span className="opacity-50">bash</span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 font-mono text-sm md:text-base h-[300px] overflow-y-auto">
            <div className="flex text-[#e6edf3]">
              <span className="text-[#238636] mr-2">rama@dev:~$</span>
              <span className="text-[#58a6ff]">{typedCmd}</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="w-2.5 h-5 bg-[#e6edf3] inline-block ml-1 align-middle"
              />
            </div>
            
            {showOutput && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-[#8b949e] whitespace-pre-wrap leading-relaxed"
              >
                {COMMANDS[activeCmdIndex].output}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
