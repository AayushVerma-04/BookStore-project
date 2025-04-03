import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import useAuthContext from "../hooks/UseAuthContext";
import { useSnackbar } from "notistack";

const ShowBook = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) {
      enqueueSnackbar("Please login first!", { variant: "error" });
      return;
    }
    setLoading(true);
    axios
      .get(`http://localhost:5555/api/books/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        console.error(error);
        enqueueSnackbar("Error fetching book details", { variant: "error" });
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-700 p-6">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8">
        <BackButton />
        <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Book Details
        </h1>

        {loading ? (
          <Spinner />
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-lg font-semibold text-gray-600">ID:</span>
              <span className="text-gray-800">{book._id}</span>
            </div>

            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-lg font-semibold text-gray-600">Title:</span>
              <span className="text-gray-800">{book.title}</span>
            </div>

            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-lg font-semibold text-gray-600">Author:</span>
              <span className="text-gray-800">{book.author}</span>
            </div>

            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-lg font-semibold text-gray-600">
                Publish Year:
              </span>
              <span className="text-gray-800">{book.publishYear}</span>
            </div>

            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-lg font-semibold text-gray-600">
                Created At:
              </span>
              <span className="text-gray-800">
                {book.createdAt ? new Date(book.createdAt).toLocaleString() : "N/A"}
              </span>
            </div>

            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-lg font-semibold text-gray-600">
                Last Updated:
              </span>
              <span className="text-gray-800">
                {book.updatedAt ? new Date(book.updatedAt).toLocaleString() : "N/A"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowBook;
