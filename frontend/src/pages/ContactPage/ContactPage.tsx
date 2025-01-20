import React from "react";
import { Container, Typography, Grid, Box } from "@mui/material";
import ContactForm from "../../components/ContactForm";

const ContactPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 8 }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          align="center"
          sx={{
            color: "white",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            fontWeight: "bold",
            mb: 2,
          }}
        >
          Get in Touch
        </Typography>
        <Typography
          variant="h5"
          gutterBottom
          align="center"
          sx={{
            color: "rgba(255,255,255,0.9)",
            textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
            mb: 6,
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          We'd love to hear from you. Drop us a line and we'll get back to you
          as soon as possible.
        </Typography>

        <Grid container justifyContent="center">
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <Box
              sx={{
                background: "rgba(255, 255, 255, 0.25)",
                boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
                borderRadius: "10px",
                border: "1px solid rgba(255, 255, 255, 0.18)",
              }}
            >
              <ContactForm />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ContactPage;
