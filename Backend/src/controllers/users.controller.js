// Operations - 

// get user details
// vaildation - empty
// check user already exist
// Image uploading to Server
// Uploading it to cloudinary
// Create user entry in db
// check for user creation
// remove password and tokens
// return response 

import { ApiError } from "../utils/ApiErrors.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/user.model.js";
// This User is responsible for conatcting DB as it is made up using mongoose.
import { UploadOnCloud } from "../utils/CloudinaryFileUpload.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const RegisterUser = AsyncHandler(async (req, res) => {
    const { Username, Email, Password, Organization } = req.body;


    // if(Username === ""){
    //     throw new ApiError(400,"Invalid Username")
    // } Correct way but it takes alot of time to check each field.

    if (
        [Username, Email, Password, Organization].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }
    // We can't use map bcoz it always returns an array()

    // [Username, Email, Password, Organization].forEach((field) => {
    //     if (field?.trim() === "") {
    //         throw new ApiError(400, `${field} is required`);
    //     }
    // });  // for each always return undefined so don't wrap it inside if but include if inside it.

    const existedUser = User.findOne({
        $or: [{ Username }, { Email }]
    })

    // if (existedUser)
    //     throw new ApiError(409, "User already Existed");

    const Profile_Photo_LocalPath = req.files?.Profile_Photo[0]?.path

    if (!Profile_Photo_LocalPath) // Couldn't get image
        throw new ApiError(400, "Image is required")
    console.log(req.body)
    const Profile_Photo = await UploadOnCloud(Profile_Photo_LocalPath)

    if (Profile_Photo)
        throw new ApiError(400, "Image is required")

    const user = User.create({
        Username,
        Password,
        Email,
        Profile_Photo: Profile_Photo?.url
    })

    const createdUser = await User.findById(user._id).select("-Password -refresh_Token")
    if(!createdUser)
        throw new ApiError(500,"User not created")

    return res.status(201).json(new ApiResponse(200,createdUser))
})

export { RegisterUser }