import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import useAuthContext from "../hooks/UseAuthContext";

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();

  const handleSaveBook = async (e) => {
    e.preventDefault();
    if (!user) {
      enqueueSnackbar("Please login first", { variant: "error" });
      return;
    }
    const data = { title, author, publishYear, about };
    console.log(data);
    setLoading(true);
    try {
      await axios.post("http://localhost:5555/api/books", data, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      enqueueSnackbar("Book Created successfully", { variant: "success" });
      navigate("/books");
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700 p-6">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-6">
        <BackButton />
        <h1 className="text-3xl font-bold text-gray-800 text-center my-4">
          Create Book
        </h1>

        {loading && <Spinner />}

        <form className="space-y-5">
          <div>
            <label className="block text-lg font-medium text-gray-600">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter book title"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-600">Author</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter author's name"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-600">Publish Year</label>
            <input
              type="number"
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              placeholder="Enter year"
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-600">About the Book</label>
            <textarea
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none h-28"
              placeholder="Brief description of the book"
            />
          </div>

          <button
            onClick={handleSaveBook}
            className="w-full bg-indigo-600 text-white py-2 text-lg font-semibold rounded-lg shadow-md hover:bg-indigo-800 transition duration-300"
          >
            Save Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBooks;
