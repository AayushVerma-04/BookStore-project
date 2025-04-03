import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import {
  MdOutlineAddBox,
  MdOutlineSearch,
  MdOutlineSearchOff,
} from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import useAuthContext from "../hooks/UseAuthContext";
import { useSnackbar } from "notistack";

const Books = ({ showType, showChange }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchBarText, setSearchBarText] = useState("");
  const [showCancelSearch, setCancelSearch] = useState(false);
  const booksRef = useRef([]);
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const enqueueSnackbar = useSnackbar();

  const handleLogout = () => {
    logout();
  };

  const searchHandler = () => {
    if (searchBarText) {
      setCancelSearch(true);
      const result = booksRef.current.filter(
        (book) => book.title.toLowerCase() === searchBarText.toLowerCase()
      );
      setBooks(result);
    } else {
      setCancelSearch(false);
      setBooks(booksRef.current);
    }
  };

  useEffect(() => {
    if (!user || !user.token) return;
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5555/api/books", {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setBooks(response.data.data);
        booksRef.current = response.data.data;
      } catch (error) {
        enqueueSnackbar('An error occurred', { variant: 'error' });
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-700 p-6 text-white">
      <div className="relative flex justify-between items-center">
        {user?.email && <h5 className="text-lg font-medium">{user.email}</h5>}

        <button
          className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:scale-105 hover:bg-gray-200 transition-all"
          onClick={handleLogout}
        >
          LOGOUT
        </button>
      </div>

      <div className="flex justify-center items-center gap-x-4 my-6">
        <button
          className={`px-4 py-2 rounded-xl shadow-lg transition-all ${
            showType === "table" 
              ? "bg-white text-blue-600 hover:bg-gray-200"
              : "bg-white/30 text-white hover:bg-white hover:text-blue-600"
          }`}
          onClick={() => showChange("table")}
        >
          Table View
        </button>
        <button
          className={`px-4 py-2 rounded-xl shadow-lg transition-all ${
            showType === "card"
              ? "bg-white text-blue-600 hover:bg-gray-200"
              : "bg-white/30 text-white hover:bg-white hover:text-blue-600"
          }`}
          onClick={() => showChange("card")}
        >
          Card View
        </button>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold tracking-wide">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-white text-5xl hover:text-blue-300 transition-all" />
        </Link>
      </div>

      <div className="flex mt-6">
        <input
          value={searchBarText}
          placeholder="Search for a book..."
          className="bg-white/20 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white shadow-lg w-full max-w-lg"
          onChange={(e) => setSearchBarText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searchHandler()}
        />
        <MdOutlineSearch
          className="size-9 text-white ml-3 cursor-pointer hover:text-gray-200 transition-all"
          onClick={searchHandler}
        />
        {showCancelSearch && (
          <MdOutlineSearchOff
            className="size-9 text-white ml-2 cursor-pointer hover:text-gray-200 transition-all"
            onClick={() => {
              setSearchBarText("");
              setCancelSearch(false);
              setBooks(booksRef.current);
            }}
          />
        )}
      </div>

      <br />
      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Books;
