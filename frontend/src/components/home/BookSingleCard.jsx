import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle, BiShow } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { useState } from "react";
import BookModal from "./BookModal";

const BookSingleCard = ({ book }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-700 border border-gray-500 rounded-lg px-6 py-4 m-4 relative shadow-lg hover:shadow-xl transition-all w-72">
      {/* Publish Year Badge */}
      <span className="absolute top-2 right-2 px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-md font-semibold shadow-md">
        {book.publishYear}
      </span>

      {/* Book ID (Optional) */}
      <h4 className="text-xs text-gray-400 mt-1 truncate">{book._id}</h4>

      {/* Title Section */}
      <div className="flex items-center gap-x-2 mt-2">
        <PiBookOpenTextLight className="text-blue-400 text-xl" />
        <h2 className="text-lg font-semibold text-gray-100 truncate">
          {book.title}
        </h2>
      </div>

      {/* Author Section */}
      <div className="flex items-center gap-x-2 mt-1">
        <BiUserCircle className="text-green-400 text-xl" />
        <h2 className="text-md text-gray-300">{book.author}</h2>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center gap-x-2 mt-4 p-4 border-t border-gray-600">
        <BiShow
          className="text-2xl text-blue-400 hover:scale-110 transition-transform cursor-pointer"
          onClick={() => setShowModal(true)}
        />
        <Link to={`/books/details/${book._id}`}>
          <BsInfoCircle className="text-2xl text-green-400 hover:scale-110 transition-transform" />
        </Link>
        <Link to={`/books/edit/${book._id}`}>
          <AiOutlineEdit className="text-2xl text-yellow-400 hover:scale-110 transition-transform" />
        </Link>
        <Link to={`/books/delete/${book._id}`}>
          <MdOutlineDelete className="text-2xl text-red-500 hover:scale-110 transition-transform" />
        </Link>
      </div>

      {/* Modal */}
      {showModal && <BookModal book={book} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default BookSingleCard;
