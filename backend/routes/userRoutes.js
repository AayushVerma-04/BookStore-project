import express from "express";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { SECRET } from "../config.js";

const userRouter = express.Router();

const createToken = (_id) => {
  return jwt.sign({ _id }, SECRET, { expiresIn: "3d" });
};

userRouter.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.signup(email, password);
    const token = createToken(user._id);

    res.status(200).send({ email, id:user._id, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.login(email, password);
    const token = createToken(user._id);

    res.status(200).send({ email, id: user._id, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export default userRouter;
