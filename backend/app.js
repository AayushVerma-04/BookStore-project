import express from "express";
import {mongodbURL, PORT} from "./config.js";
import mongoose from "mongoose";
import cors from 'cors';
import booksRouter from "./routes/booksRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

app.use(express.json());

app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "PUT", "POST", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.use("/api/books", booksRouter);
app.use("/api/user", userRouter);

mongoose
  .connect(mongodbURL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error();
  });
