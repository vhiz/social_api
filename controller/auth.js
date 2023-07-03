import User from "../model/User.js";
import bcryptjs from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  function isEmailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailRegex.test(email);
  }

  const isValid = isEmailValid(req.body.email);
  if (!isValid) return res.status(400).send("input a valid email");
  try {
    const existingUser = await User.findOne({
      $or: [
        { username: { $regex: new RegExp(`^${req.body.username}$`, "i") } },
        { email: { $regex: new RegExp(`^${req.body.email}$`, "i") } },
      ],
    });

    if (existingUser) {
      return res.status(409).json("User already exists");
    }

    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync(req.body.password, salt);

    const newUser = {
      ...req.body,
      _id: uuidv4(),
      password: hashedPassword,
    };

    await User.create(newUser);

    res.status(201).json("User created");
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const userExit = await User.findOne({
      $or: [
        { username: { $regex: new RegExp(`^${req.body.username}$`, "i") } },
      ],
    });
    if (!userExit) return res.status(404).json({ error: "User not found" });

    const validPassword = bcryptjs.compareSync(
      req.body.password,
      userExit.password
    );

    if (!validPassword)
      return res.status(403).json({ error: "Invalid password" });

    const token = jwt.sign({ id: userExit.id }, process.env.JWT);
    const { password, updatedAt, ...user } = userExit._doc;

    res
      .cookie("social", token, {
        httpOnly: true,
      })
      .status(200)
      .json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
