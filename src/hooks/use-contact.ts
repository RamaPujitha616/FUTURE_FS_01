import { useMutation } from "@tanstack/react-query";
import { init, send } from "@emailjs/browser";
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactInput = z.infer<typeof contactSchema>;

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;
const TO_EMAIL = import.meta.env.VITE_EMAILJS_TO_EMAIL as string;

if (typeof window !== "undefined" && SERVICE_ID && PUBLIC_KEY) {
  init(PUBLIC_KEY);
}

const isEmailJsConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY && TO_EMAIL);

export function useSubmitContact() {
  return useMutation({
    mutationFn: async (data: ContactInput) => {
      if (!isEmailJsConfigured) {
        const msg =
          "EmailJS is not configured. Create a .env with VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY, and VITE_EMAILJS_TO_EMAIL.";
        console.error(msg);
        throw new Error(msg);
      }

      const templateParams = {
        name: data.name,
        email: data.email,
        reply_to: data.email,
        to_email: TO_EMAIL,
        subject: `New message from ${data.name}`,
        message: data.message,
      };

      try {
        await send(SERVICE_ID, TEMPLATE_ID, templateParams);
        return { success: true, message: "Message sent successfully!" };
      } catch (error) {
        // EmailJS returns a 400 for invalid payload / missing template vars.
        // Surface the response body where possible to help diagnose template config.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const err = error as any;
        console.error("EmailJS send failed", err);
        if (err?.status === 400 && err?.text) {
          console.error("EmailJS response body:", err.text);
        }
        throw new Error(
          "EmailJS request failed. Check console for details and verify your template variables match the payload."
        );
      }
    },
  });
}
