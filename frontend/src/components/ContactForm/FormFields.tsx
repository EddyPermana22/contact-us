import React from "react";
import { Controller, Control } from "react-hook-form";
import { TextField, MenuItem, Box } from "@mui/material";
import { FormData } from "../../types/contactForm";

interface FormFieldsProps {
  control: Control<FormData>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: Record<string, any>;
  subjects: string[];
  messageLength: number;
  handleMessageChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const FormFields: React.FC<FormFieldsProps> = ({
  control,
  errors,
  subjects,
  messageLength,
  handleMessageChange,
}) => {
  return (
    <Box sx={{ "& > :not(style)": { mb: 3 } }}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Name"
            placeholder="Enter your full name (e.g., John Doe)"
            error={!!errors.name}
            helperText={errors.name?.message}
            inputProps={{ minLength: 2, maxLength: 50 }}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Email Address"
            placeholder="Enter your email (e.g., johndoe@example.com)"
            error={!!errors.email}
            helperText={errors.email?.message}
            inputProps={{ maxLength: 100 }}
          />
        )}
      />
      <Controller
        name="subject"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            select
            label="Subject"
            placeholder="Select the topic of your message"
            error={!!errors.subject}
            helperText={errors.subject?.message}
          >
            {subjects.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      <Controller
        name="message"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Message"
            multiline
            rows={4}
            placeholder="Type your message here (10-1000 characters)"
            error={!!errors.message || messageLength > 1000}
            helperText={
              errors.message?.message ||
              (messageLength > 1000 && "Message is too long") ||
              `${messageLength}/1000 characters`
            }
            inputProps={{ minLength: 10, maxLength: 1000 }}
            onChange={(e) => {
              field.onChange(e);
              handleMessageChange(e);
            }}
          />
        )}
      />
    </Box>
  );
};

export default FormFields;
