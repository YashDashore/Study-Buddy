import { AsyncHandler } from "../utils/AsyncHandler.js";

const RegisterUser = AsyncHandler(async (req, res, next) => {
    res.status(200).json({ message: "User Registered" })
})

export {RegisterUser}