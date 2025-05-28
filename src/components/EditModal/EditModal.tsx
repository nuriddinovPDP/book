import { useState } from "react";
import { API } from "../../utils/config";
import { toast } from "react-toastify";
import { Modal, Box } from "@mui/material";

interface Book {
  _id: string;
  title: string;
  cover: string;
  pages: number;
  published: string;
  isbn: string;
  status: number;
}

interface EditModalProps {
  open: boolean;
  close: () => void;
  book: Book;
  fetchBooks: () => void;
}

function EditModal({ open, close, book, fetchBooks }: EditModalProps) {
  const [title, setTitle] = useState(book.title || "");
  const [cover, setCover] = useState(book.cover || "");
  const [pages, setPages] = useState(book.pages?.toString() || "");
  const [publishedYear, setPublishedYear] = useState(
    book.published ? new Date(book.published).getFullYear().toString() : ""
  );
  const [isbn, setIsbn] = useState(book.isbn || "");
  const [status, setStatus] = useState(book.status || 1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const updatedBook = {
        title,
        cover,
        pages: Number(pages),
        published: publishedYear
          ? new Date(Number(publishedYear), 0, 1).toISOString()
          : null,
        isbn,
        status,
      };

      await API.patch(`/books/${book._id}`, updatedBook);
      toast.success("Book updated successfully");
      close();
      fetchBooks();
    } catch (error) {
      toast.error("Failed to update book");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={close}>
      <Box
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 w-[90%] max-w-md shadow-xl outline-none"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Book</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Cover URL"
            value={cover}
            onChange={(e) => setCover(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            placeholder="Pages"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            placeholder="Published Year"
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="ISBN"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={status}
            onChange={(e) => setStatus(Number(e.target.value))}
            className="w-full border border-gray-300 rounded px-4 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={1}>New</option>
            <option value={2}>Reading</option>
            <option value={3}>Finished</option>
          </select>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={close}
            className="w-1/2 border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-1/2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            Submit
          </button>
        </div>
      </Box>
    </Modal>
  );
}

export default EditModal;
