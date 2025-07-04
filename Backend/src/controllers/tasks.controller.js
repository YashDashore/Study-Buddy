import { Todo } from "../models/Todos.model.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

const createtask = AsyncHandler(async (req, res) => {
    const { title, subject } = req.body;
    if ([title, subject].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "Enter all the fields");
    }

    const task = await Todo.create({
        title,
        user: req.user?._id,
        subject,
    })
    res.status(200)
        .json(new ApiResponse(200, { task }, "Task Successfully created"));
})

const UpdateTask = AsyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const taskID = req.params.id;
    if (!taskID)
        throw new ApiError(400, "TaskId is not found");
    const task = await Todo.findOneAndUpdate(
        { _id: taskID, user: userId },
        { $set: req.body },
        { new: true, runValidators: true }
    );
    if (!task)
        throw new ApiError(404, "Task not found")
    return res.status(200)
        .json(new ApiResponse(200, task, "Successfully Updated"))
})

const deleteTask = AsyncHandler(async (req, res) => {
    const userId = req.user?._id;
    const taskId = req.params.id;
    if (!taskId)
        throw new ApiError(400, "TaskId not found");
    const task = await Todo.findOneAndDelete({ user: userId, _id: taskId })
    if (!task)
        throw new ApiError(403, "Task not found")
    return res.status(200)
        .json(
            new ApiResponse(200, {}, "Task deleted")
        )
})
const getSingleTask = AsyncHandler(async (req, res) => {
    const user_Id = req.user?._id;
    const task_id = req.params.id;
    const task = await Todo.findOne({ user: user_Id, _id: task_id })
    if (!task)
        throw new ApiError(400, "task not found")
    return res.status(200)
        .json(new ApiResponse(200, task, "Task Details"))
})
const getAllTask = AsyncHandler(async (req, res) => {
    const user_Id = req.user?._id;
    const Alltasks = await Todo.find({ user: user_Id })
    if (!Alltasks)
        throw new ApiError(401, "Tasks couldn't fetch")
    return res.status(200)
        .json(new ApiResponse(200, Alltasks, "Successfully fetched all tasks"))
})
export {
    createtask,
    UpdateTask,
    deleteTask,
    getSingleTask,
    getAllTask
}