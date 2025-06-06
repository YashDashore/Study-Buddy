import { AsyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiErrors.js";

//  This will verify whether the user have right tokens or not. True login check.
export const verifyJWT = AsyncHandler(async (req, res, next) => {
    // Accessing token
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        // console.log("Token recieved");
        if (!token)
            throw new ApiError(401, "Token not found");

        // Verifying token is right or not
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id)
        if (!user)
            throw new ApiError(402, "Invalid access Token");
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(403, error?.message || "Cannot verify JWT");
    }
})

// Why we created middleware instead of normal function.
// We will require to authenticate user and require its details for other task too - add task ?