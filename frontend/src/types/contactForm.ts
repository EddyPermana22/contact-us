import { z } from "zod";
import { contactFormSchema } from "../schemas/contactFormSchema";
import { Control, FieldErrors } from "react-hook-form";

// Type for contact form data
export type FormData = z.infer<typeof contactFormSchema>;

// Type for available subjects
export type Subject =
  | "General Inquiry"
  | "Partnership Opportunity"
  | "Support Request"
  | "Career Information";

// Type for FormFields component props
export interface FormFieldsProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
  subjects: Subject[];
  messageLength: number;
  handleMessageChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

// Type for SuccessDialog component props
export interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
}

// Type for submission data in API response
export interface SubmissionData {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submissionTime: string;
}

// Type for API response
export interface ContactFormResponse {
  message: string;
  submission: SubmissionData;
}
