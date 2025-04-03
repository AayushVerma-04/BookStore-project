import jwt from "jsonwebtoken";

import { SECRET } from "../config.js";

import User from "../models/userModel.js";

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Auth token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, SECRET);
    req.user = await User.findOne({ _id }).select("_id"); //add user to request for next routes
    // console.log(req.user._id);
    next();
  } catch (error) {
    res.send(400).json({ error: "Request not authorized" });
  }
};

export default requireAuth
