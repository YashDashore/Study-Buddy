import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
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

TodoSchema.plugin(mongooseAggregatePaginate)

export const Todo = mongoose.model("Todo", TodoSchema);

// Later on include models for Attendance and Group Task.
