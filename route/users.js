import express from "express";
import {
  Relationship,
  deleteUser,
  editUser,
  getFriends,
  getUser,
  search,
} from "../controller/user.js";
import { verifedToken } from "../utils/jwt.js";

const router = express.Router();

//get user
router.get("/", verifedToken, getUser);

//search user
router.get("/search", verifedToken, search);

//get friends
router.get("/myfriends", verifedToken, getFriends);

//delete user
router.delete("/", verifedToken, deleteUser);

//edit user
router.put("/", verifedToken, editUser);

//follow and unfollow a user
router.put("/relationship", verifedToken, Relationship);

export default router;
