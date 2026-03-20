import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  Send,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import {
  contactSchema,
  type ContactInput,
  useSubmitContact,
} from "@/hooks/use-contact";
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
        toast({
          title: "Message Sent",
          description: "Thank you for reaching out. You should receive a reply soon.",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Message Not Sent",
          description:
            error?.message || "Failed to send message. Please try again later.",
          variant: "destructive",
        });
      },
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
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Let's Connect
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I'm currently looking for new opportunities. Whether you have a
            question or just want to say hi, I'll try my best to get back to you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Social Links */}
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
                onClick={() =>
                  (window.location.href =
                    "mailto:ramapujitha.a616@gmail.com")
                }
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                ramapujitha.a616@gmail.com
              </button>
            </div>

            <div className="glass-card p-8 rounded-3xl">
              <h3 className="text-lg font-bold mb-6 text-center">
                Connect with me
              </h3>
              <div className="flex justify-center gap-4">
                <a
                  href="https://github.com/RamaPujitha616"
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 bg-background rounded-full hover:bg-primary hover:text-primary-foreground transition-all border group"
                >
                  <Github className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://www.instagram.com/rama_pujitha_616"
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 bg-background rounded-full hover:bg-[#E4405F] hover:text-white transition-all border group"
                >
                  <Instagram className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 bg-background rounded-full hover:bg-[#0077b5] hover:text-white transition-all border group"
                >
                  <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form / Success UI */}
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

                <h3 className="text-2xl font-bold">
                  Message Sent Successfully!
                </h3>

                <p className="text-muted-foreground">
                  Thank you for reaching out. I'll respond soon.
                </p>

                <button
                  onClick={() => {
                    contactMutation.reset();
                    form.reset();
                  }}
                  className="mt-6 px-6 py-2 bg-secondary rounded-lg hover:bg-secondary/80 transition"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    {...form.register("name")}
                    placeholder="Your Name"
                    className="p-3 border rounded-xl"
                  />
                  <input
                    {...form.register("email")}
                    placeholder="Your Email"
                    className="p-3 border rounded-xl"
                  />
                </div>

                <textarea
                  {...form.register("message")}
                  rows={6}
                  placeholder="Your Message"
                  className="w-full p-3 border rounded-xl"
                />

                <button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full py-4 bg-primary text-white rounded-xl flex justify-center items-center gap-2"
                >
                  {contactMutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
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