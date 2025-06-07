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
import { UploadOnCloud, DeleteOnCloud } from "../utils/CloudinaryFileUpload.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

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
        Profile_Photo: Profile_Photo.url,
        Profile_photo_id: Profile_Photo.public_id
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

// Update the access token using refresh token -
const accessRefreshToken = AsyncHandler(async (req, res) => {
    const UserRefreshToken = req.cookies?.refreshToken || req.body.refresh_Token;
    if (!UserRefreshToken)
        throw new ApiError(405, "User side refresh token is not accessed");
    try {
        const decodedUserRefreshToken = jwt.verify(UserRefreshToken, process.env.REFRESH_TOKEN_SECRET)
        const user = await User.findById(decodedUserRefreshToken._id);
        if (!user)
            throw new ApiError(403, "User not found");
        if (UserRefreshToken !== user?.refresh_Token)
            throw new ApiError(402, "Refresh token does not matched");
        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id)
        const options = {
            httpOnly: true,
            secure: true
        }
        res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(200, {}, "Successfully updated access and refresh token")
            )
    } catch (error) {
        throw new ApiError(404, error?.message || "Error in decoding")
    }
})

const UpdatePassword = AsyncHandler(async (req, res) => {
    const { oldPassword, newpassword } = req.body;
    const user = await User.findById(req.user?._id);
    const verifyPassword = await user.isPasswordCorrect(oldPassword)
    if (!verifyPassword)
        throw new ApiError(404, "Invalid old Password");
    console.log(newpassword)
    user.Password = newpassword
    await user.save({ validateBeforeSave: false });
    return res.status(200)
        .json(
            new ApiResponse(200, {}, "Successfully Password changed")
        )
})

const UpdateUserDetails = AsyncHandler(async (req, res) => {
    const { newOrganization, newUsername } = req.body;
    if (newUsername) {
        const existUser = await User.findOne({ Username: newUsername })
        if (existUser)
            throw new ApiError(400, "Username already Exist");
    }
    const user = await User.findById(req.user?._id);
    if (newOrganization)
        user.Organization = newOrganization
    if (newUsername)
        user.Username = newUsername;
    await user.save({ validateBeforeSave: false });
    return res.status(200)
        .json(new ApiResponse(200, {}, "Details updated successfully"))
})

const UpdateProfilePhoto = AsyncHandler(async (req, res) => {
    const New_Profile_Photo_LocalPath = req.files?.New_Profile_Photo[0]?.path
    if (!New_Profile_Photo_LocalPath)
        throw new ApiError(400, "Couldn't get photo");
    const newProfile = await UploadOnCloud(New_Profile_Photo_LocalPath);
    if (!newProfile)
        throw new ApiError(400, "Image not found");
    const user = await User.findById(req.user?._id);
    console.log("Old Photo ", user.Profile_Photo);
    const oldPhotoId = user.Profile_photo_id;
    user.Profile_Photo = newProfile.url;
    user.Profile_photo_id = newProfile.public_id;
    await DeleteOnCloud(oldPhotoId);
    const upuser = await user.save({ validateBeforeSave: false }).select("-Password -refresh_Token");

    return res.status(200)
        .json(new ApiResponse(200, { upuser }, "Successfully updated Profile Photo"))
})

export {
    RegisterUser,
    loginUser,
    logout,
    accessRefreshToken,
    UpdatePassword,
    UpdateUserDetails,
    UpdateProfilePhoto
}