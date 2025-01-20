import * as z from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(50, { message: "Name must not exceed 50 characters" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .max(100, { message: "Email must not exceed 100 characters" }),
  subject: z.string().min(1, { message: "Please select a subject" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long" })
    .max(1000, { message: "Message must not exceed 1000 characters" }),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
