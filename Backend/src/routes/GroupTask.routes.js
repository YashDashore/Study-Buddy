import { createGroupTask } from "../controllers/GroupTask.controller.js";
import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const GroupRouter = Router();
GroupRouter.route("/create").post(verifyJWT, createGroupTask);

export { GroupRouter }