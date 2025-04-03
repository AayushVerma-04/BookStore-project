import BookSingleCard from "./BookSingleCard";
import React from "react";

const BooksCard = ({ books }) => {
  return (
    <React.Fragment>
      {books.length===0 && <p className="px-3">Nothing to show here!</p>}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {books.map((item) => (
          <BookSingleCard key={item._id} book={item} />
        ))}
      </div>
    </React.Fragment>
  );
};

export default BooksCard;
