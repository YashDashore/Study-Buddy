import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { GroupTask } from "../models/Grouptask.model.js";
import mongoose from "mongoose";

const getAssignedAndRemainingUsers = (invitation, userId) => {
    try {
        const acceptedUser = invitation
            .filter((invite) => invite.status === "accepted")
            .map((invite) => invite.user.toString());
        console.log(acceptedUser);
        const RemainingInvitations = invitation.filter((invite) => invite.status === "pending").map((invite) => ({
            user: invite.user,
            status: invite.status || "pending"
        }))
        console.log("After remain")
        console.log(userId);

        const assignedUser = Array.from(new Set([userId?.toString(), ...acceptedUser])).map((id) => new mongoose.Types.ObjectId(id))
        console.log("After assignuser")

        return { assignedUser, invitation: RemainingInvitations };
    } catch (error) {
        console.error("Error in getAssignedAndRemainingUsers:", error);
        throw new ApiError(400, error.message || "Something went wrong");
    }

}

const createGroupTask = AsyncHandler(async (req, res) => {
    const { title, subject, invitations, Team_Leader, deadline } = req.body;
    if ([title, subject].some((field) => field.trim() === ""))
        throw new ApiError(400, "All fields are required");
    if (!Array.isArray(invitations) || invitations.length === 0)
        throw new ApiError(400, "For group task, you have to invite other users");
    if (!Team_Leader || !deadline)
        throw new ApiError(400, "All fields are required");
    // console.log(req.user?._id)
    const { assignedUser, invitation } = getAssignedAndRemainingUsers(invitations, req.user?._id);
    const teamLead = assignedUser.includes(Team_Leader) ? Team_Leader : req.user?._id;
    const groupTask = await GroupTask.create({
        title,
        subject,
        Team_Leader: teamLead,
        assignedUsers: assignedUser,
        invitations: invitation,
        deadline
    })
    if (!groupTask)
        throw new ApiError(400, "group task not created")
    return res.status(200)
        .json(new ApiResponse(200, groupTask, "Successfully created"))
})

const updateGrouptask = AsyncHandler(async (req, res) => {
    const groupTaskId = req.params.id;
    const userId = req.user?._id;
    if (!groupTaskId)
        throw new ApiError(400, "Group Task Id cannot fetched")
    const groupTask = await GroupTask.findById(groupTaskId)
    if (!groupTask)
        throw new ApiError(400, "Group Task not found");
    if (userId.toString() !== groupTask.Team_Leader.toString())
        throw new ApiError(400, "Only team leader can make changes to the project")

    const allowedUpdates = (({ title, subject, deadline, status }) => ({
        title,
        subject,
        deadline,
        status,
    }))(req.body);

    const updatedTask = await GroupTask.findByIdAndUpdate(
        groupTaskId,
        { $set: allowedUpdates },
        { new: true, runValidators: true }
    );
    return res.status(200)
        .json(new ApiResponse(200, updatedTask, "Successfully Updated"));
})


// const updateGroupTaskMembers, deleteGroupTask, deleteGroupTaskMembers
export { createGroupTask, updateGrouptask }