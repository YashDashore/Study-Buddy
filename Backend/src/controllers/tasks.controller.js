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
    const {title, subject, status} = req.body;
})

const createGroupTask = AsyncHandler(async (req, res) => {

})
export { createtask }