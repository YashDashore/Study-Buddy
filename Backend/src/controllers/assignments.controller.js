import { AsyncHandler } from "../utils/AsyncHandler.js";
import { Task } from "../models/Assignment.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiErrors.js";

const createAssignment = AsyncHandler(async (req, res) => {
    const { title, subject, deadline } = req.body;
    if ([title, subject, deadline].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "Enter all the fields");
    }
    const assignment = await Task.create({
        title,
        user: req.user?._id,
        subject,
        deadline
    })
    res.status(200)
        .json(new ApiResponse(200, { assignment }, "Task Successfully created"));
})

const UpdateAssignment = AsyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const AssignID = req.params.id;
    if (!AssignID)
        throw new ApiError(400, "TaskId is not found");
    const task = await Task.findOneAndUpdate(
        { _id: AssignID, user: userId },
        { $set: req.body },
        { new: true, runValidators: true }
    );
    if (!task)
        throw new ApiError(404, "Task not found")
    return res.status(200)
        .json(new ApiResponse(200, task, "Successfully Updated"))
})

const deleteAssign = AsyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const AssignId = req.params.id;
    if (!AssignId)
        throw new ApiError(400, "TaskId not found");
    const task = await Task.findOneAndDelete({ user: userId, _id: AssignId })
    if (!task)
        throw new ApiError(403, "Task not found")
    return res.status(200)
        .json(
            new ApiResponse(200, {}, "Task deleted")
        )
})

const getSingleAssign = AsyncHandler(async (req, res) => {
    const user_Id = req.user?._id;
    const task_id = req.params.id;
    const task = await Task.findOne({ user: user_Id, _id: task_id })
    if (!task)
        throw new ApiError(400, "task not found")
    return res.status(200)
        .json(new ApiResponse(200, task, "Task Details"))
})
const getAllAssign = AsyncHandler(async (req, res) => {
    const user_Id = req.user?._id;
    const Alltasks = await Task.find({ user: user_Id })
    if (!Alltasks)
        throw new ApiError(401, "Tasks couldn't fetch")
    return res.status(200)
        .json(new ApiResponse(200, Alltasks, "Successfully fetched all tasks"))
})

export { createAssignment,UpdateAssignment,deleteAssign,getSingleAssign,getAllAssign}