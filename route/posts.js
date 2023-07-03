import express from "express";
import { verifedToken } from "../utils/jwt.js";
import { createPosts, getPosts, getUserPost } from "../controller/post.js";
import { limiter } from "../utils/limiter.js";

const router = express.Router();
//get all user following posts
router.get("/", verifedToken, getPosts);

//create post
router.post(
  "/",
  verifedToken,
  limiter(
    24 * 60 * 60 * 1000,
    20,
    "You have exceded the amount of post required"
  ),
  createPosts
);

//get single user post
router.get("/mypost", verifedToken, getUserPost);

export default router;
