import express from "express";
import { verifedToken } from "../utils/jwt.js";
import { createPosts, getPosts, getUserPost } from "../controller/post.js";

const router = express.Router();
//get all user following posts
router.get("/", verifedToken, getPosts);

//create post
router.post("/", verifedToken, createPosts);

//get single user post
router.get("/mypost", verifedToken, getUserPost);

export default router;
