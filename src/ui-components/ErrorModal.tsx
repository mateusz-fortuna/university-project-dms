import { FC, useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import ErrorIcon from "@mui/icons-material/Error";

interface ErrorModalProps {
  title: string;
  description: string;
  onProceed?: () => void;
}

export const ErrorModal: FC<ErrorModalProps> = ({
  title,
  description,
  onProceed,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const onClose = () => {
    setIsOpen(false);
    onProceed?.();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        outline: 0,
      }}
    >
      <Paper
        elevation={4}
        sx={{ padding: 4, display: "flex", flexDirection: "column" }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <ErrorIcon color="error" />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
        </Box>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {description}
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={onClose}
          sx={{ marginTop: 4 }}
        >
          Zrozumiałem
        </Button>
      </Paper>
    </Modal>
  );
};
