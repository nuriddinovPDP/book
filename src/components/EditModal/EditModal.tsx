import { useState } from "react";
import { API } from "../../utils/config";
import { toast } from "react-toastify";
import { Modal, Box } from "@mui/material";

// Book tipi
interface Book {
  _id: string;
  title: string;
  cover: string;
  pages: number;
  published: string;
  isbn: string;
  status: number;
}

// Props tipi
interface EditModalProps {
  open: boolean;
  close: () => void;
  book: Book;
  fetchBooks: () => void;
}

function EditModal({ open, close, book, fetchBooks }: EditModalProps) {
  const [title, setTitle] = useState<string>(book.title);
  const [cover, setCover] = useState<string>(book.cover);
  const [pages, setPages] = useState<string>(book.pages.toString());
  const [publishedYear, setPublishedYear] = useState<string>(
    new Date(book.published).getFullYear().toString()
  );
  const [isbn, setIsbn] = useState<string>(book.isbn);
  const [status, setStatus] = useState<number>(book.status);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!title.trim() || !cover.trim() || !pages || !publishedYear || !isbn) {
      toast.warning("Please fill in all the fields");
      return;
    }

    setLoading(true);
    try {
      const updatedBook = {
        title: title.trim(),
        cover: cover.trim(),
        pages: Number(pages),
        published: new Date(Number(publishedYear), 0, 1).toISOString(),
        isbn: isbn.trim(),
        status,
      };

      await API.patch(`/books/${book._id}`, updatedBook);
      toast.success("Book updated successfully");
      fetchBooks();
      close();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={close}>
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 w-[90%] max-w-md shadow-xl outline-none">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Book</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Cover URL"
            value={cover}
            onChange={(e) => setCover(e.target.value)}
            className="input-field"
          />
          <input
            type="number"
            placeholder="Pages"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            className="input-field"
          />
          <input
            type="number"
            placeholder="Published Year"
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
            className="input-field"
          />
          <input
            type="text"
            placeholder="ISBN"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            className="input-field"
          />
          <select
            value={status}
            onChange={(e) => setStatus(Number(e.target.value))}
            className="input-field text-gray-700"
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
            {loading ? "Saving..." : "Submit"}
          </button>
        </div>
      </Box>
    </Modal>
  );
}

export default EditModal;
