import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createtask } from "../controllers/tasks.controller.js";
const router = Router();
router.route("/CreateTask").post(verifyJWT, createtask);