import { Schema, model } from "mongoose";

const userSchama = new Schema(
  {
    _id: { type: String, required: true },
    username: { type: String, required: true, min: 4, max: 10 },
    password: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

const User = model("User", userSchama);

export default User;
