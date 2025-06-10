import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createStudySession, UpdateStudySession, deleteSession, getSingleSession, getAllSession } from "../controllers/studyProgress.controller.js"
const SessionRoute = Router();
// http
SessionRoute.route("/create").post(verifyJWT, createStudySession);
SessionRoute.route("/update/:id").patch(verifyJWT, UpdateStudySession);
SessionRoute.route("/delete/:id").delete(verifyJWT, deleteSession)
SessionRoute.route("/details/:id").get(verifyJWT, getSingleSession)
SessionRoute.route("/allSessions").get(verifyJWT, getAllSession)
export { SessionRoute }