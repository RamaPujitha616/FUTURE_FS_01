import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Github, Linkedin, Instagram, Mail, Send, CheckCircle2, Loader2 } from "lucide-react";
import { contactSchema, type ContactInput, useSubmitContact } from "@/hooks/use-contact";
import { useToast } from "@/hooks/use-toast";

export function Contact() {
  const { toast } = useToast();
  const contactMutation = useSubmitContact();
  
  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = (data: ContactInput) => {
    contactMutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        toast({
          title: "Message Sent!",
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Failed to send message. Please try again later.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <section id="contact" className="py-24 relative bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Let's Connect</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Social Links Panel */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass-card p-8 rounded-3xl text-center">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Email Me</h3>
              <button
                type="button"
                onClick={() => {
                  window.location.href = "mailto:ramapujitha.a616@gmail.com";
                }}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                ramapujitha.a616@gmail.com
              </button>
            </div>

            <div className="glass-card p-8 rounded-3xl">
              <h3 className="text-lg font-bold mb-6 text-center">Connect with me</h3>
              <div className="flex justify-center gap-4">
                <a href="https://github.com/RamaPujitha616" target="_blank" rel="noreferrer" className="p-4 bg-background rounded-full hover:bg-primary hover:text-primary-foreground transition-all shadow-sm border border-border group">
                  <Github className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.instagram.com/rama_pujitha_616" target="_blank" rel="noreferrer" className="p-4 bg-background rounded-full hover:bg-[#E4405F] hover:text-white transition-all shadow-sm border border-border group">
                  <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </a>
                <a href="https://www.linkedin.com/in/rama-pujitha-attili-878335348?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noreferrer" className="p-4 bg-background rounded-full hover:bg-[#0077b5] hover:text-white transition-all shadow-sm border border-border group">
                  <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </a>

              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 glass-card p-8 md:p-10 rounded-3xl"
          >
            {contactMutation.isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full min-h-[400px] flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold">Message Sent!</h3>
                <p className="text-muted-foreground">Thank you for reaching out. I'll respond as soon as possible.</p>
                <button 
                  onClick={() => contactMutation.reset()}
                  className="mt-8 px-6 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Name</label>
                    <input 
                      {...form.register("name")}
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      placeholder="John Doe"
                    />
                    {form.formState.errors.name && (
                      <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Email</label>
                    <input 
                      {...form.register("email")}
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                      placeholder="john@example.com"
                    />
                    {form.formState.errors.email && (
                      <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Message</label>
                  <textarea 
                    {...form.register("message")}
                    rows={6}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                    placeholder="Hello, I'd like to talk about..."
                  />
                  {form.formState.errors.message && (
                    <p className="text-xs text-destructive">{form.formState.errors.message.message}</p>
                  )}
                </div>

                <button 
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full py-4 rounded-xl font-semibold bg-primary text-primary-foreground shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {contactMutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
