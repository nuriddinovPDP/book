import { useState } from "react";
import { API } from "../../utils/config";
import { toast } from "react-toastify";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ModalProps {
  open: boolean;
  close: () => void;
  fetchBooks: () => void;
}

function CreateModal({ open, close, fetchBooks }: ModalProps) {
  const [isbn, setIsbn] = useState("");

  const handleSubmit = async () => {
    try {
      await API.post("/books", { isbn });
      toast.success("Book added successfully");
      close();
      fetchBooks();
    } catch (err: any) {
      console.log(err.message);
      toast.error("Failed to submit");
    }
  };

  return (
    <Modal open={open} onClose={close}>
      <Box
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white shadow-2xl p-4 rounded-md w-[360px]"
      >
        <Box className="flex justify-between items-center mb-2">
          <Typography variant="h6">Create a book</Typography>
          <IconButton onClick={close} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <TextField
          label="ISBN"
          fullWidth
          variant="outlined"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Box className="flex gap-2">
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={close}
          >
            Close
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ bgcolor: "#7A00FF", "&:hover": { bgcolor: "#5a00c4" } }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default CreateModal;
