import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    _id: { type: String, required: true },
    username: { type: String, required: true, minlength: 4, maxlength: 10 },
    password: { type: String, required: true },
    email: { type: String, required: true },
    followings: { type: Array, default: [] },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;
