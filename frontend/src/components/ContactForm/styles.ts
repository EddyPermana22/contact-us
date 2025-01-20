import { styled } from "@mui/material/styles";
import { Box, Paper, Button } from "@mui/material";

export const ContactWrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
  "& .MuiTextField-root": {
    marginBottom: theme.spacing(2),
  },
}));

export const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "transparent",
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  backgroundColor: "#86A8E7"
}));

export const DialogIconBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  color: "success.main",
});
