import { ApiError } from "../utils/ApiErrors.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/user.model.js";
// This User is responsible for conatcting DB as it is made up using mongoose.

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

    if (existedUser)
        throw new ApiError(409, "User already Existed");
    console.log("Username : ", Username);
})

export { RegisterUser }