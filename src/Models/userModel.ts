import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    pic: {
      type: String,
      default: process.env.ORIGIN + "/favicon.ico",
    },
  },
  { timestamps: true }
);
export default mongoose.models.User || mongoose.model("User", UserSchema);