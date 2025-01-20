import { z } from 'zod';

/*
 * Contact Us Submission Schema
 *
 * This schema defines the structure and validation rules for a contact form submission.
 * It uses Zod, a TypeScript-first schema declaration and validation library.
 */
export const contactUsSubmissionSchema = z.object({
  /*
   * Name Field
   * - Must be a string
   * - Minimum length: 1 character (cannot be empty)
   * - Maximum length: 100 characters
   * Custom error messages are provided for better user feedback
   */
  name: z.string().min(1, 'Please enter your name').max(100, 'Name should be less than 100 characters'),

  /*
   * Email Field
   * - Must be a string
   * - Must be a valid email address (Zod's built-in email validation)
   * Custom error message for invalid email
   */
  email: z.string().email('Please enter a valid email address'),

  /*
   * Subject Field
   * - Must be a string
   * - Minimum length: 1 character (cannot be empty)
   * - Maximum length: 200 characters
   * Custom error messages for both constraints
   */
  subject: z
    .string()
    .min(1, 'Please enter a subject for your message')
    .max(200, 'Subject should be less than 200 characters'),

  /*
   * Message Field
   * - Must be a string
   * - Minimum length: 1 character (cannot be empty)
   * - Maximum length: 1000 characters
   * Custom error messages for both constraints
   */
  message: z.string().min(1, 'Please enter your message').max(1000, 'Message should be less than 1000 characters'),

  /*
   * IP Address Field
   * - Must be a string if present
   * - Optional field (not required)
   */
  ipAddress: z.string().optional(),

  /*
   * User Agent Field
   * - Must be a string if present
   * - Optional field (not required)
   */
  userAgent: z.string().optional(),
});

/*
 * ContactUsSubmissionInput Type
 *
 * This type is inferred from the Zod schema.
 * It represents the TypeScript type that matches the schema's structure.
 * Using z.infer ensures that the type stays in sync with the schema definition.
 */
export type ContactUsSubmissionInput = z.infer<typeof contactUsSubmissionSchema>;
