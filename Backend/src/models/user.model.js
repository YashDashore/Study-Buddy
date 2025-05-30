import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
    Organization: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Pre hook - Execute the code just before saving data. It contain middleware inside it
UserSchema.pre("save", async function (next) {
  if (this.isModified("Password")) {
    this.Password = bcrypt.hash(this.Password, 10);
  }
  next();
});
// Don't write callback using arrow function. Why ? arrow function don't have this references or context.

// Now when user enter the password. We have to check it in the database. But we stored hashed password so -

UserSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.Password);
};

UserSchema.methods.generateAccessToken = function () {
  jwt.sign(
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
  jwt.sign(
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
