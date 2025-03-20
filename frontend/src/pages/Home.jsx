import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import {
  MdOutlineAddBox,
  MdOutlineSearch,
  MdOutlineSearchOff
} from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

const Home = ({ showType, showChange }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchBarText, setSearchBarText] = useState("");
  const [showCancelSearch, setCancelSearch] = useState(false);
  const booksRef = useRef([]);

  const searchHandler = (e) => {
    if (searchBarText) {
      setCancelSearch(true);
      const result = booksRef.current.filter(book => book.title.toLowerCase() === searchBarText.toLowerCase());
      setBooks(result);
    } else {
      setCancelSearch(false);
      setBooks(booksRef.current);
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/api/books")
      .then((response) => {
        setBooks(response.data.data);
        booksRef.current = response.data.data;
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className={`bg-sky-400 hover:bg-sky-600 px-4 py-1 rounded-lg ${
            showType === "table" && "border-3"
          }`}
          onClick={() => showChange("table")}
        >
          Table
        </button>
        <button
          className={`bg-sky-400 hover:bg-sky-600 px-4 py-1 rounded-lg ${
            showType === "card" && "border-3"
          }`}
          onClick={() => showChange("card")}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8 font-serif">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-500 text-4xl hover:text-sky-800" />
        </Link>
      </div>
      <div className="flex">
        <input
          value={searchBarText}
          placeholder="Search for a book"
          className="bg-blue-200 mx-3 outline-2 rounded-lg p-1 w-1.5xl text-black pl-2"
          onChange={(e) => setSearchBarText(e.target.value)}
          onSubmit={searchHandler}
        />
        <MdOutlineSearch
          className="size-9 hover:cursor-pointer"
          onClick={searchHandler}
        />
        {showCancelSearch && (
          <MdOutlineSearchOff className="size-9 ml-2 hover:cursor-pointer" onClick={()=>{setSearchBarText(''); setCancelSearch(false); setBooks(booksRef.current)}}/>
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

export default Home;
