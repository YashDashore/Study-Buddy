import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createtask, UpdateTask,deleteTask } from "../controllers/tasks.controller.js";
const Todorouter = Router();

http://localhost:8000/api/v1/tasks/CreateTask
Todorouter.route("/CreateTask").post(verifyJWT,createtask);
Todorouter.route("/UpdateTask/:id").patch(verifyJWT, UpdateTask)
Todorouter.route("/deleteTask/:id").delete(verifyJWT, deleteTask)
export{Todorouter};