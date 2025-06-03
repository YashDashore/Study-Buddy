import { Router } from "express";
import { RegisterUser } from "../controllers/users.controller.js";
const router = Router();

// http://localhost:8000/api/v1/users/registration
router.route("/registration").post(RegisterUser)

export default router;