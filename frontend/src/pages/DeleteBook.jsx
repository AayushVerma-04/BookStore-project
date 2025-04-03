import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import useAuthContext from "../hooks/UseAuthContext";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();

  const handleDeleteBook = async () => {
    if (!user) {
      enqueueSnackbar("You are logged out!", { variant: "error" });
      return;
    }
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5555/api/books/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      enqueueSnackbar("Book Deleted successfully", { variant: "success" });
      navigate("/books");
    } catch (error) {
      enqueueSnackbar("Error deleting book", { variant: "error" });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-white">
      <div className="bg-white/10 backdrop-blur-lg border border-gray-500 p-8 rounded-lg shadow-lg w-[450px] text-center">
        <h2 className="text-2xl font-bold text-red-400">Delete Book</h2>
        <p className="text-lg text-gray-300 mt-3">
          Are you sure you want to delete this book?
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => navigate("/books")}
            className="px-5 py-2 bg-gray-500 hover:bg-gray-600 rounded-md transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteBook}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-all"
            disabled={loading}
          >
            {loading ? <Spinner /> : "Yes, Delete it"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
