import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { GroupTask } from "../models/Grouptask.model.js";
import { User } from "../models/user.model.js";

const createGroupTask = AsyncHandler(async (req, res) => {
    const { title, subject, invitations, deadline } = req.body;
    if ([title, subject].some((field) => field.trim() === ""))
        throw new ApiError(400, "All fields are required");
    if (!Array.isArray(invitations) || invitations.length === 0)
        throw new ApiError(400, "For group task, you have to invite other users");
    if (!deadline)
        throw new ApiError(400, "All fields are required");

    const user = await User.findById(req.user?._id);
    const CurrentUser = { user: user._id, status: "accepted" };
    const UpdatedUser = [...invitations, CurrentUser];
    const groupTask = await GroupTask.create({
        title,
        subject,
        Team_Leader: user._id,
        invitations: UpdatedUser,
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

const updateGroupTaskMembers = AsyncHandler(async (req, res) => {
    const groupTaskId = req.params.id;
    const userId = req.user?._id;
    const { invite, Team_Leader } = req.body;
    if (!groupTaskId)
        throw new ApiError(400, "Group task Id in not in params")
    const groupTask = await GroupTask.findById(groupTaskId);
    if (!groupTask)
        throw new ApiError(400, "Group task not found")

    if (userId.toString() !== groupTask.Team_Leader.toString())
        throw new ApiError(400, "Only team leader can make changes");

    if (Team_Leader) {
        const assignUsersInString = groupTask.assignedUsers.map((id) => id.toString())
        if (!assignUsersInString.includes(Team_Leader.toString()))
            throw new ApiError(400, "User not found in the group, Invite!")
        groupTask.Team_Leader = Team_Leader;
    }

    if (invite) {
        if (Array.isArray(invite) && invite.length !== 0) {
            const UpdatedInvitations = [...invite, ...groupTask.invitations]
            groupTask.invitations = UpdatedInvitations;
        }
        else
            throw new ApiError(400, "Invitations should be an array with length > 0")
    }
    groupTask.markModified("invitations")
    await groupTask.save({ validateBeforeSave: false })
    res.status(200)
        .json(new ApiResponse(200, groupTask, "Successfully Updated"))
})

const deleteTask = AsyncHandler(async (req, res) => {
    const groupTaskId = req.params.id;
    if (!groupTaskId)
        throw new ApiError(400, "Group Task id is not fetched")
    const grouptask = await GroupTask.findById(groupTaskId)
    if (!grouptask)
        throw new ApiError(404, "Not valid group task");
    if (req.user?._id.toString() !== grouptask.Team_Leader.toString())
        throw new ApiError(400, "Only leader can delete task")
    await GroupTask.deleteOne({ _id: groupTaskId })
    return res.status(200)
        .json(new ApiResponse(200, {}, "Successfully deleted group task"))
})

const leaveFromGroup = AsyncHandler(async (req, res) => {
    const groupTaskId = req.params.id;
    const user = await User.findById(req.user?._id);
    const groupTask = await GroupTask.findById(groupTaskId);
    if (!groupTask)
        throw new ApiError(404, "Group task does not exist anymore");

    if (!groupTask.assignedUsers.map((element) => element.toString()).includes(user._id.toString()))
        throw new ApiError(400, "User is not present in a group task")

    if (groupTask.Team_Leader.toString() == user._id.toString())
        // Logic - Change the team leader 

        groupTask.assignedUsers = groupTask.assignedUsers.filter((id) => id.toString() !== user._id.toString())
    groupTask.save({ validateBeforeSave: false })

    return res.status(200)
        .json(new ApiResponse(200, {}, "Successfully leaved from group task"))
})

const removeAssignedUser = AsyncHandler(async (req, res) => {
    const { userToRemove } = req.body
    const currentUser = await User.findById(req.user._id);
    const groupTaskId = req.params.id;
    const groupTask = await GroupTask.findById(groupTaskId);

    if (!groupTask)
        throw new ApiError(404, "Group task does not exist anymore");

    if (!groupTask.assignedUsers.map((element) => element.toString()).includes(userToRemove.toString()))
        throw new ApiError(400, "User is not present in a group task")

    if (currentUser._id.toString() !== groupTask.Team_Leader.toString())
        throw new ApiError(400, "Only team leader can remove members");

    if (userToRemove.toString == groupTask.Team_Leader.toString())
        throw new ApiError(400, "Team leader can perform self removal function")

    groupTask.assignedUsers = groupTask.assignedUsers.filter((id) => id.toString() !== userToRemove.toString())
    await groupTask.save({ validateBeforeSave: false });

    return res.status(200)
        .json(new ApiResponse(200, { groupTask }, "Successfully removed user")
        )
})


// Remaining Controllers  - sendGroupTaskInvitation, respondToGroupInvitation, getGroupTaskDetails, getAllGroupTask, searchUserForInvitation, DeleteInvitations - who are either accepted or rejected. 
//  If team leader left then update TL.
// If user is deleted remove it from the groupTask.

export {
    createGroupTask,
    updateGrouptask,
    updateGroupTaskMembers,
    deleteTask,
    leaveFromGroup,
    removeAssignedUser
}