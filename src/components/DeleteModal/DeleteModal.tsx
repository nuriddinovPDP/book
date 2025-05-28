import { Modal, Box } from "@mui/material";
import React from "react";

interface DeleteModalProps {
  open: boolean;
  close: () => void;
  bookTitle: string;
  onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ open, close, bookTitle, onDelete }) => {
  return (
    <Modal open={open} onClose={close}>
      <Box
        className="bg-white rounded-lg p-6 w-full max-w-md mx-auto mt-[20vh] relative shadow-lg outline-none"
      >
        <button
          onClick={close}
          className="absolute top-2 right-3 text-xl font-bold text-gray-600 hover:text-red-600"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Confirm Delete</h2>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete <strong className="text-black">"{bookTitle}"</strong>?
        </p>

        <div className="flex gap-4">
          <button
            onClick={close}
            className="w-1/2 px-4 py-2 border border-gray-400 text-gray-700 rounded hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="w-1/2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
