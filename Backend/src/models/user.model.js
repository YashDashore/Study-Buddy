import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Task } from "./Assignment.model.js";

const UserSchema = new mongoose.Schema(
  {
    Username: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Profile_Photo: {
      type: String,
      required: true
    },
    Profile_photo_id: {
      type: String
    },
    Organization: {
      type: String,
      required: true,
    },
    refresh_Token: {
      type: String
    }
  },
  { timestamps: true }
);

// Pre hook - Execute the code just before saving data. It contain middleware inside it
UserSchema.pre("save", async function (next) {
  if (this.isModified("Password")) {
    this.Password = await bcrypt.hash(this.Password, 10);
  }
  next();
});
UserSchema.pre("remove", async function (next) {
    const userId = this._id;
    await Todo.deleteMany({ user: userId });
    await Task.deleteMany({ user: userId });
    next();
});
// Don't write callback using arrow function. Why ? arrow function don't have this references or context.

// Now when user enter the password. We have to check it in the database. But we stored hashed password so -

UserSchema.methods.isPasswordCorrect = async function (password) {
  const valid = await bcrypt.compare(password, this.Password);
  return valid;
};

UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      Username: this.Username,
      Email: this.Email,
      Organization: this.Organization,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

UserSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", UserSchema);
