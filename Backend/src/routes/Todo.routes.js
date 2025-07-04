import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createtask, UpdateTask,deleteTask, getSingleTask,getAllTask} from "../controllers/tasks.controller.js";
const Todorouter = Router();

http://localhost:8000/api/v1/tasks/CreateTask
Todorouter.route("/create").post(verifyJWT,createtask);
Todorouter.route("/UpdateTask/:id").patch(verifyJWT, UpdateTask)
Todorouter.route("/delete/:id").delete(verifyJWT, deleteTask)
Todorouter.route("/details/:id").get(verifyJWT, getSingleTask)
Todorouter.route("/allTasks").get(verifyJWT, getAllTask)
export{Todorouter};