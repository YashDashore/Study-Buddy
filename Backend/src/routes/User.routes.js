import { Router } from "express";
import {
    logout, RegisterUser,
    accessRefreshToken,
    UpdatePassword,
    UpdateUserDetails,
    getUserDetails,
    deleteUser
} from "../controllers/users.controller.js";
import { Upload } from "../middlewares/multer.middleware.js";
import { loginUser } from "../controllers/users.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

// http://localhost:8000/api/v1/users/registration
router.route("/register").post((req, res, next) => {
        next();
    },
    Upload.fields([{
        name: "Profile_Photo",
        maxCount: 1
    }]),
    RegisterUser) //For normal data/text/JSON etc.

router.route("/registration").post(
    (req, res, next) => {
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
router.route("/refresh-tokens").post(accessRefreshToken);
router.route("/changePassword").patch(verifyJWT, UpdatePassword);
router.route("/changeDetails").patch(
    Upload.fields([{
        name: "Profile_Photo",
        maxCount: 1
    }]),
    verifyJWT, UpdateUserDetails);
router.route("/deleteUser").delete(verifyJWT, deleteUser)
router.route("/details").get(verifyJWT, getUserDetails)

export default router;