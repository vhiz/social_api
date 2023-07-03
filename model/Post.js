import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    desc: { type: String, required: true },
    userId: { type: String, max: 600 },
  },
  { timeseries: true }
);

const Post = model("Post", postSchema);
export default Post;
