import mongoose from "mongoose";
import {DB_NAME} from "../constants.js";
const ConnectDB = async () => {
  try {
    const ConnectionInst = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log("DB connected");
    // console.log(ConnectionInst); 
  } catch (error) {
    console.log("DB Connection Error ", error);
  }
};

export default ConnectDB;
