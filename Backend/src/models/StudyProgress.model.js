import mongoose from "mongoose";
// import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const spSchema = new mongoose.Schema(
  {
    Subject: {
      type: String,
      required: true,
    },
    User :{
      type: mongoose.Schema.Types.ObjectId,
      ref : "User",
      required : true
    },
    Total_topics: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["In-progress", "Completed"],
      default: "In-progress"
    },
    Covered_topics: {
      type: Number,
      default: 0,
    },
    Remaining_topics: {
      type:Number,
    },
    PercentageProgress: {
      type: Number,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true }
);

// spSchema.plugin(mongooseAggregatePaginate);

export const StudyProgress = mongoose.model("StudyProgress", spSchema);
