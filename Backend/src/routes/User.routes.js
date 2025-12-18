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
router.post(
    "/register",
    Upload.fields([{ name: "Profile_Photo", maxCount: 1 }]),
    RegisterUser
);


router.post(
    "/registration",
    Upload.fields([{ name: "Profile_Photo", maxCount: 1 }]),
    RegisterUser
);

router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logout);
router.route("/refresh-tokens").post(accessRefreshToken);
router.route("/changePassword").patch(verifyJWT, UpdatePassword);
router.patch(
    "/changeDetails",
    verifyJWT,
    Upload.fields([{ name: "Profile_Photo", maxCount: 1 }]),
    UpdateUserDetails
);

router.route("/deleteUser").delete(verifyJWT, deleteUser)
router.route("/details").get(verifyJWT, getUserDetails)

export default router;