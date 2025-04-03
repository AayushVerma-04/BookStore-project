import express from "express";
import Book from "../models/bookModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";
import requireAuth from "../middlewares/requireAuth.js";

const booksRouter = express.Router();
booksRouter.use(requireAuth);

// Route to Save a new Book
booksRouter.post("/", async (request, response) => {
  const user_id = request.user._id;

  const { title, author, publishYear, about } = request.body;

  if (!title || !author || !publishYear || !about) {
    return response.status(400).json({
      message:
        "Send all required fields: title, author, publishYear, about, user",
    });
  }

  const newBook = new Book({ title, author, publishYear, about, user: user_id });

  let creator;
  try {
    creator = await User.findById(user_id);
    if (!creator) {
      return response.status(404).json({ message: "User does not exist" });
    }
  } catch (error) {
    return response
      .status(500)
      .json({ message: "Could not fetch user. Please try again" });
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();

    await newBook.save({ session: sess });
    creator.books.push(newBook);
    await creator.save({ session: sess });

    await sess.commitTransaction();
    sess.endSession();

    return response.status(201).json(newBook);
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});

// Route to Get All Books from database
booksRouter.get("/", async (request, response) => {
  try {
    const user_id = request.user._id;
    // console.log(user_id);
    const books = await Book.find({user: user_id});

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});

// Route to Get One Book from database by id
booksRouter.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);

    if (!book) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});

// Route to Update a Book
booksRouter.put("/:id", async (request, response) => {
  try {
    const { title, author, publishYear, about } = request.body;

    if (!title || !author || !publishYear || !about) {
      return response.status(400).json({
        message: "Send all required fields: title, author, publishYear, about",
      });
    }

    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body, {
      new: true,
    });

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response
      .status(200)
      .json({ message: "Book updated successfully", data: result });
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: error.message });
  }
});

// Route to Delete a Book
booksRouter.delete("/:id", async (request, response) => {
  const { id } = request.params;

  let book;
  try {
    book = await Book.findById(id).populate("user");
    if (!book) {
      return response.status(404).json({ message: "No such book" });
    }
  } catch (error) {
    return response.status(500).json({ message: "Book not found" });
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();

    book.user.books.pull(book);
    await book.user.save({ session: sess });
    await book.deleteOne({ session: sess });

    await sess.commitTransaction();
    sess.endSession();

    return response.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ message: "Error deleting book" });
  }
});

export default booksRouter;
