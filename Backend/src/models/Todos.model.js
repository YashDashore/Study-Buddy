import mongoose from "mongoose";
const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", " completed"],
    },
    subject: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export const Todo = mongoose.model("Todo", TodoSchema);
