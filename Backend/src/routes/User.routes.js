import { Router } from "express";
import { RegisterUser } from "../controllers/users.controller.js";
import { Upload } from "../middlewares/multer.middleware.js";
const router = Router();

// http://localhost:8000/api/v1/users/registration
router.route("/register").post(RegisterUser) //For normal data/text/JSON etc.

router.route("/registration").post(
    Upload.single('Profile_Photo'),
    RegisterUser
)

export default router;