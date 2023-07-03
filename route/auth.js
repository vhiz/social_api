import express from "express";
import { Login, Register } from "../controller/auth.js";
import { limiter } from "../utils/limiter.js";
const router = express.Router();

router.post(
  "/register",
  limiter(
    24 * 60 * 60 * 1000,
    3,
    "You cant register at this moment try again later"
  ),
  Register
);

router.post(
  "/login",
  limiter(
    24 * 60 * 60 * 1000,
    5,
    "You cant signin at this moment try again later"
  ),
  Login
);

export default router;
