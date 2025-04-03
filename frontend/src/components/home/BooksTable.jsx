import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

const BooksTable = ({ books }) => {
  return books.length === 0 ? (
    <p className="text-center text-lg text-gray-200 py-6">
      📚 No books available!
    </p>
  ) : (
    <div className="overflow-x-auto mt-6">
      <table className="w-full bg-white/10 backdrop-blur-md shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-900 text-gray-200 uppercase text-sm tracking-wide">
            <th className="py-3 px-4">No</th>
            <th className="py-3 px-4">Title</th>
            <th className="py-3 px-4 max-md:hidden">Author</th>
            <th className="py-3 px-4 max-md:hidden">Publish Year</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {books.map((book, index) => (
            <tr
              key={book._id}
              className="hover:bg-gray-800 transition-all text-gray-300"
            >
              <td className="py-3 px-4 text-center">{index + 1}</td>
              <td className="py-3 px-4 text-center font-semibold">
                {book.title}
              </td>
              <td className="py-3 px-4 text-center max-md:hidden">
                {book.author}
              </td>
              <td className="py-3 px-4 text-center max-md:hidden">
                {book.publishYear}
              </td>
              <td className="py-3 px-4 text-center">
                <div className="flex justify-center gap-x-4">
                  <Link to={`/books/details/${book._id}`}>
                    <BsInfoCircle className="text-2xl text-green-400 hover:scale-110 transition-all" />
                  </Link>
                  <Link to={`/books/edit/${book._id}`}>
                    <AiOutlineEdit className="text-2xl text-yellow-400 hover:scale-110 transition-all" />
                  </Link>
                  <Link to={`/books/delete/${book._id}`}>
                    <MdOutlineDelete className="text-2xl text-red-400 hover:scale-110 transition-all" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;
