import User from "../model/User.js";
import bcryptjs from "bcryptjs";

//get user
export const getUser = async (req, res) => {
  try {
    if (req.userId) {
      const user = await User.findOne({ _id: req.userId });
      if (!user) return res.status(404).send("User not found");

      const { password, ...other } = user._doc;
      return res.status(200).send(other);
    } else {
      res.status(401).send("try to login and try again");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//edit user
export const editUser = async (req, res) => {
  try {
    const { password, ...updatedData } = req.body;

    if (password) {
      const salt = bcryptjs.genSaltSync(10);
      updatedData.password = bcryptjs.hashSync(password, salt);
    }
    await User.findOneAndUpdate({ _id: req.userId }, { $set: updatedData });
    res.status(200).send("User updated");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete user
export const deleteUser = async (req, res) => {
  try {
    if (req.body.delete === true) {
      const user = await User.findOneAndDelete({ _id: req.userId });
      if (!user) return res.status(404).send("User not found");
      return res.status(200).send("User deleted");
    } else {
      return res.status(400).json("delete must be true");
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};
