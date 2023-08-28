import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: {},
  },
  { timestamps: true }
);
