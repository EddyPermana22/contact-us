import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { DialogIconBox } from "./styles";

interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          background: 'rgba(255, 255, 255, 0.25)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          borderRadius: '10px',
          border: '1px solid rgba(255, 255, 255, 0.18)',
        },
      }}
    >
      <Box sx={{ p: 2 }}> {/* Added padding */}
        <DialogTitle id="alert-dialog-title">
          <DialogIconBox>
            <CheckCircleOutlineIcon sx={{ mr: 1 }} fontSize="large" />
            Message Sent Successfully!
          </DialogIconBox>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Thank you for reaching out. We've received your message and will get
            back to you as soon as possible.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default SuccessDialog;