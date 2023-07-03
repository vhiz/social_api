import express from "express";
import { deleteUser, editUser, getUser } from "../controller/user.js";
import { verifedToken } from "../utils/jwt.js";

const router = express.Router();

//get user
router.get("/", verifedToken, getUser);

//delete user
router.delete("/", verifedToken, deleteUser);

//edit user
router.put("/",verifedToken, editUser);
export default router;
