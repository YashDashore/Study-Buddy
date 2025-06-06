// Operations - Registration

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

const generateAccessAndRefreshTokens = async (user_Id) => {
    try {
        const user = await User.findById(user_Id);
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refresh_Token = refreshToken;

        // We updated the refreshToken but doesn't saved it till now - 
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(408, "Cannot generate access and refreshj tokens");
    }
}


const RegisterUser = AsyncHandler(async (req, res) => {
    // console.log("FILES ====>", req.files);
    // console.log("BODY ====>", req.body);

    const { Username, Email, Password, Organization } = req.body;
    console.log("Inside Controller , Body ======> ", req.body)

    // if(Username === ""){
    //     throw new ApiError(400,"Invalid Username")
    // } Correct way but it takes alot of time to check each field.

    if (
        [Username, Email, Password, Organization].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ Username }, { Email }]
    })

    if (existedUser)
        throw new ApiError(409, "User already Existed");


    const Profile_Photo_LocalPath = req.files?.Profile_Photo[0]?.path
    // console.log(req.files); 

    if (!Profile_Photo_LocalPath) // Couldn't get image
        throw new ApiError(402, "Profile Image is required")
    console.log(req.body)
    const Profile_Photo = await UploadOnCloud(Profile_Photo_LocalPath)

    if (!Profile_Photo)
        throw new ApiError(401, "Image is required")

    const user = await User.create({
        Username,
        Password,
        Email,
        Organization,
        Profile_Photo: Profile_Photo
    })
    console.log("user -> ", user);

    const createdUser = await User.findById(user._id).select("-Password -refresh_Token")
    if (!createdUser)
        throw new ApiError(500, "User not created")

    return res.status(201).json(new ApiResponse(200, createdUser))
})


const loginUser = AsyncHandler(async (req, res) => {
    const { Username, Email, Password } = req.body
    console.log("Inside controller");
    if (!Username && !Email)
        throw new ApiError(402, "Enter either Username or Email");
    const userExist = await User.findOne({
        $or: [{ Username }, { Email }]
    })
    if (!userExist)
        throw new ApiError(401, "Invalid Username or password");
    const PasswordCheck = await userExist.isPasswordCorrect(Password);
    if (!PasswordCheck)
        throw new ApiError(405, "Invalid Password");
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(userExist._id);
    console.log(accessToken)
    console.log(refreshToken)
    // the previous user (refrence) we had does not access token so either update it or refresh it.
    const UpdatedUser = await User.findById(userExist._id).select("-Password -refresh_Token");
    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options).
        json(new ApiResponse(200, {
            User: UpdatedUser, accessToken, refreshToken
        },
            "User successfully logged In"))
})

const logout = AsyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id,
        {
            $set: { refresh_Token: undefined }
        },
        {
            new: true
        });

    const options = {
        httpOnly: true,
        secure: true
    }
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "Successfully logged out user"));

    // We can also logout user by using blacklisting - learn that topic too.    
})

export { RegisterUser, loginUser, logout }