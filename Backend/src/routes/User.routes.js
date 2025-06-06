import { Router } from "express";
import { logout, RegisterUser } from "../controllers/users.controller.js";
import { Upload } from "../middlewares/multer.middleware.js";
import { loginUser } from "../controllers/users.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

// http://localhost:8000/api/v1/users/registration
router.route("/register").post(RegisterUser) //For normal data/text/JSON etc.

router.route("/registration").post(
    (req, res, next) => {
        // console.log(req)
        console.log("🔥 Route Hit");
        next();
    },
    Upload.fields([{
        name: "Profile_Photo",
        maxCount: 1
    }]),
    RegisterUser
)

router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logout);

export default router;