import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircularProgress } from "@mui/material";
import { FormData } from "../../types/contactForm";
import { contactFormSchema } from "../../schemas/contactFormSchema";
import { ContactUsClient } from "../../utils/contactUsClient";
import FormFields from "./FormFields";
import SuccessDialog from "./SuccessDialog";
import { FormPaper, SubmitButton } from "./styles";

const subjects = [
  "General Inquiry",
  "Partnership Opportunity",
  "Support Request",
  "Career Information",
];

const ContactForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const [success, setSuccess] = useState(false);
  const [messageLength, setMessageLength] = useState(0);

  const onSubmit = async (data: FormData) => {
    try {
      await ContactUsClient.post("/contact-us", data);
      setSuccess(true);
      reset();
      setMessageLength(0);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCloseDialog = () => {
    setSuccess(false);
  };

  const handleMessageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMessageLength(event.target.value.length);
  };

  return (
    <FormPaper elevation={2}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormFields
          control={control}
          errors={errors}
          subjects={subjects}
          messageLength={messageLength}
          handleMessageChange={handleMessageChange}
        />
        <SubmitButton
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          disabled={isSubmitting || messageLength > 1000}
        >
          {isSubmitting ? <CircularProgress size={24} /> : "Send Message"}
        </SubmitButton>
      </form>
      <SuccessDialog open={success} onClose={handleCloseDialog} />
    </FormPaper>
  );
};

export default ContactForm;
