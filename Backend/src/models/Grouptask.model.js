import mongoose from "mongoose";
const GroupTaskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        Team_Leader: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        status: {
            type: String,
            enum: ["pending", "completed"],
            default: "pending",
        },
        deadline: {
            type: Date,
        },
    },
    { timestamps: true }
);

export const GroupTask = mongoose.model("GroupTask", GroupTaskSchema);
