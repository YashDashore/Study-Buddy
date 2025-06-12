import {
    createGroupTask,
    updateGrouptask,
    leaveFromGroup,
    removeAssignedUser,
    updateGroupTaskMembers,
    deleteTask
} from "../controllers/GroupTask.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const GroupRouter = Router();
GroupRouter.route("/create").post(verifyJWT, createGroupTask);
GroupRouter.route("/updateTask/:id").patch(verifyJWT, updateGrouptask);
GroupRouter.route("/delete/:id").delete(verifyJWT, deleteTask)
GroupRouter.route("/UpdateGroupMembers/:id").patch(verifyJWT, updateGroupTaskMembers)
GroupRouter.route("/RemoveGroupMembers/:id").patch(verifyJWT, removeAssignedUser)
GroupRouter.route("/leave/:id").patch(verifyJWT, leaveFromGroup)

// Use pre save hook inplace of UpdateParticipants

export { GroupRouter }