import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const spSchema = new mongoose.Schema(
  {
    Subject: {
      type: String,
      required: true,
    },
    Total: {
      type: Number,
      required: true,
    },
    Covered: {
      type: Number,
      default: 0,
    },
    PercentageProgress: {
      type: Number,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true }
);

spSchema.plugin(mongooseAggregatePaginate);

export const StudyProgress = mongoose.model("StudyProgress", spSchema);
