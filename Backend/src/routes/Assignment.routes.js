import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createAssignment, UpdateAssignment, deleteAssign, getAllAssign, getSingleAssign } from "../controllers/assignments.controller.js";
const AssignRoute = Router();
AssignRoute.route("/create").post(verifyJWT,createAssignment);
AssignRoute.route("/update/:id").patch(verifyJWT,UpdateAssignment);
AssignRoute.route("/delete/:id").delete(verifyJWT, deleteAssign)
AssignRoute.route("/details/:id").get(verifyJWT, getSingleAssign)
AssignRoute.route("/allAssign").get(verifyJWT, getAllAssign)
export{AssignRoute}