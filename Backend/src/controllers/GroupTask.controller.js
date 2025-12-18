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
    const resolvedUsers = await Promise.all(
        invitations.map(async (username) => {
            const invitedUser = await User.findOne({ Username: username });
            if (!invitedUser) throw new ApiError(404, `User '${username}' not found`);
            return {
                user: invitedUser._id,
                status: "pending",
            };
        })
    );
    const CurrentUser = { user: user._id, status: "accepted" };
    const UpdatedUser = [...resolvedUsers, CurrentUser];
    const groupTask = await GroupTask.create({
        title,
        subject,
        Team_Leader: user._id,
        invitations: UpdatedUser,
        deadline
    })
    await groupTask.save();
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
        if (Array.isArray(invite) && invite.length > 0) {
            if (!invite.every((i) => typeof i === "string")) {
                throw new ApiError(400, "Invitations must be an array of usernames (strings)");
            }

            const resolvedUsers = await Promise.all(
                invite.map(async (username) => {
                    const invitedUser = await User.findOne({ Username: username });
                    if (!invitedUser) throw new ApiError(404, `User '${username}' not found`);
                    return {
                        user: invitedUser._id,
                        status: "pending",
                    };
                })
            );

            const UpdatedInvitations = [...groupTask.invitations, ...resolvedUsers];
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

    if (groupTask.Team_Leader.toString() == user._id.toString()) {
        // Logic - Change the team leader 
        if (groupTask.assignedUsers.length <= 1)
            throw new ApiError(400, "Delete the task")
        groupTask.assignedUsers = groupTask.assignedUsers.filter((id) => id.toString() !== user._id.toString())
        groupTask.Team_Leader = groupTask.assignedUsers[0];
    }
    else
        groupTask.assignedUsers = groupTask.assignedUsers.filter((id) => id.toString() !== user._id.toString())
    await groupTask.save({ validateBeforeSave: false })

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

    if (userToRemove.toString() == groupTask.Team_Leader.toString())
        throw new ApiError(400, "Team leader can perform self removal function")

    groupTask.assignedUsers = groupTask.assignedUsers.filter((id) => id.toString() !== userToRemove.toString())
    await groupTask.save({ validateBeforeSave: false });

    return res.status(200)
        .json(new ApiResponse(200, { groupTask }, "Successfully removed user")
        )
})

const getGroupTaskDetails = AsyncHandler(async (req, res) => {
    const groupTaskId = req.params.id;
    const groupTask = await GroupTask.findById(groupTaskId)
        .populate("Team_Leader", "Username _id")
        .populate("assignedUsers", "Username _id")
        .populate("invitations.user", "Username _id");

    if (!groupTask)
        throw new ApiError(404, "Group task does not exist anymore");

    const isAssignedUser = groupTask.assignedUsers
        .map((element) => element._id.toString())
        .includes(req.user._id.toString());

    const isAcceptedInvite = groupTask.invitations
        .some((invite) =>
            invite.user._id.toString() === req.user._id.toString() && invite.status === "accepted"
        );

    const isLeader = groupTask.Team_Leader._id.toString() === req.user._id.toString();
    if (!isAssignedUser && !isAcceptedInvite && !isLeader) {
        throw new ApiError(400, "User is not authorized to view this group task");
    }

    return res.status(200)
        .json(new ApiResponse(200, groupTask, "Details fetched"));
})

const getAllGroupTaskDetails = AsyncHandler(async (req, res) => {
    const userId = req.user?._id;

    const groupTasks = await GroupTask.find({
        assignedUsers: userId
    }).populate("assignedUsers", "Username")
        .populate("Team_Leader", "Username");

    res.status(200).json(new ApiResponse(200, groupTasks, "Assigned group tasks fetched"));
});


const respondToGroupInvitation = AsyncHandler(async (req, res) => {
    const groupTaskId = req.params.id;
    const { response } = req.body;
    if (!response)
        throw new ApiError(404, "Response not found")
    if (!groupTaskId)
        throw new ApiError(400, "No group task ID")
    const groupTask = await GroupTask.findById(groupTaskId);
    if (!groupTask)
        throw new ApiError(404, "No group Task found");
    const Currentinvite = groupTask.invitations.find((invite) => invite.user.toString() == req.user?._id.toString());
    if (!Currentinvite)
        throw new ApiError(400, "You are not invited");
    if (Currentinvite.status.trim() !== "pending")
        throw new ApiError(400, "Already responded")
    if (response.trim() == "accepted" || response.trim() == "rejected")
        Currentinvite.status = response;
    else
        throw new ApiError(401, "Invalid response")
    groupTask.markModified("invitations")
    await groupTask.save()
    return res.status(200)
        .json(new ApiResponse(200, groupTask, "Succesfully Updated"))
})

const getPendingInvitations = AsyncHandler(async (req, res) => {
    const userId = req.user._id;

    const groupTasks = await GroupTask.find({
        "invitations": {
            $elemMatch: { user: userId, status: "pending" }
        }
    })
        .populate("Team_Leader", "Username")
        .populate("invitations.user", "Username");

    const pendingInvites = groupTasks.map(task => {
        return {
            taskId: task._id,
            title: task.title,
            leader: task.Team_Leader.Username
        };
    });

    return res.status(200).json(new ApiResponse(200, pendingInvites, "Pending invitations fetched"));
});

export {
    createGroupTask,
    updateGrouptask,
    updateGroupTaskMembers,
    deleteTask,
    leaveFromGroup,
    removeAssignedUser,
    getGroupTaskDetails,
    respondToGroupInvitation,
    getAllGroupTaskDetails,
    getPendingInvitations
}