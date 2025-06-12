import mongoose, { set } from "mongoose";
const InvitationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
    },
}, { timestamps: true });
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
        invitations: [InvitationSchema],
        assignedUsers: [
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

GroupTask.pre("save", async function (next) {
    const groupTask = this
    if (this.isModified("invitations")) {

        const acceptedUser = groupTask.invitations
            .filter((invite) => invite.status === "accepted")
            .map((invite) => invite.user.toString());

        const CurrentUser = this.assignedUsers.map((element) => element.toString());

        this.assignedUsers = Array.from(new Set([...CurrentUser, ...acceptedUser])).map((element) => new mongoose.Types.ObjectId(element));

        groupTask.invitations = groupTask.invitations.filter((invite) => invite.status === "pending")
    }
    next();
})

export const GroupTask = mongoose.model("GroupTask", GroupTaskSchema);
