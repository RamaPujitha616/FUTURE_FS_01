import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactInput = z.infer<typeof contactSchema>;

const FORMSPREE_FORM_ID =import.meta.env.VITE_FORMSPREE_FORM_ID || "mdawjdga";
const FORMSPREE_ENDPOINT =   FORMSPREE_FORM_ID
  ? `https://formspree.io/f/${FORMSPREE_FORM_ID}`
  : "";

export function useSubmitContact() {
  return useMutation({
    mutationFn: async (data: ContactInput) => {
      if (!FORMSPREE_FORM_ID) {
        // Fallback for git/published use: open mail client when Formspree env isn't provided.
        if (typeof window !== "undefined") {
          const subject = encodeURIComponent(`New message from ${data.name}`);
          const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`);
          window.location.href = `mailto:ramapujitha.a616@gmail.com?subject=${subject}&body=${body}`;
        }
        return { success: true, fallback: true };
      }

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
          _subject: `New message from ${data.name}`,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        const message = result.error || "Failed to send message via Formspree.";
        console.error("Formspree error", result);
        throw new Error(message);
      }

      return result;
    },
  });
}
