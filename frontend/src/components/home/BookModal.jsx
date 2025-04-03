import { AiOutlineClose } from "react-icons/ai";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { motion } from "framer-motion";

const BookModal = ({ book, onClose }) => {
  return (
    <div
      className="fixed bg-black/50 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        onClick={(event) => event.stopPropagation()}
        className="w-[600px] max-w-full h-auto bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-2xl p-6 flex flex-col relative shadow-2xl"
      >
        {/* Close Button */}
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-400 cursor-pointer transition-transform transform hover:scale-125 hover:text-red-500"
          onClick={onClose}
        />

        {/* Book Year */}
        <h2 className="w-fit px-4 py-1 bg-gradient-to-r from-pink-400 to-red-500 text-white rounded-full text-sm font-semibold shadow-md">
          {book.publishYear}
        </h2>

        {/* Book ID */}
        <h4 className="my-2 text-gray-300 text-xs">ID: {book._id}</h4>

        {/* Title */}
        <div className="flex justify-start items-center gap-x-2 text-lg font-semibold">
          <PiBookOpenTextLight className="text-3xl text-blue-400" />
          <h2>{book.title}</h2>
        </div>

        {/* Author */}
        <div className="flex justify-start items-center gap-x-2 text-md mt-2">
          <BiUserCircle className="text-3xl text-green-400" />
          <h2>{book.author}</h2>
        </div>

        {/* About Section */}
        <p className="mt-6 text-md font-semibold">About this book:</p>
        <hr className="border-white/20 my-2" />
        <p className="my-2 overflow-auto text-gray-300 text-sm">{book.about}</p>
      </motion.div>
    </div>
  );
};

export default BookModal;
