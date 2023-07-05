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
    const user = await User.findOneAndUpdate(
      { _id: req.userId },
      { $set: updatedData }
    );
    if (!user) return res.status(404).send("User not found");
    res.status(200).send("User updated");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get friends

export const getFriends = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req.userId });

    if (!currentUser) return res.status(404).send("User not found");
    if (currentUser.followings.length > 0) {
      const friends = await Promise.all(
        currentUser.followings.map((friendId) => {
          return User.findOne({ _id: friendId });
        })
      );

      let friendList = [];
      friends.map((friend) => {
        const { _id, username, email } = friend;
        friendList.push({ _id, username, email });
      });
      res.status(200).json(friendList);
    } else {
      res.status(200).json("You have no friends");
    }
  } catch (error) {
    res.status(400).json({ error: error });
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

//search users
export const search = async (req, res) => {
  const query = req.query.q;
  try {
    const users = await User.find({
      username: { $regex: query, $options: "i" },
    }).limit(40);

    let searchUser = [];
    users.map((user) => {
      const { _id, username, email } = user;
      searchUser.push({ _id, username, email });
    });

    res.status(200).json(searchUser);
  } catch (error) {
    res.status(400).json(error);
  }
};

// follow and unfollow users

export const Relationship = async (req, res) => {
  const userToFollow = await User.findById(req.body.userId);

  if (!userToFollow) {
    return res.status(404).send("User you want to follow not found");
  }

  const currentUser = await User.findById(req.userId);

  if (!currentUser) {
    return res.status(404).send("User not found");
  }

  if (req.body.userId === currentUser._id)
    return res.status(409).json("You can't add yourself as a friend");

  const isUserAlreadyFollowed = currentUser.followings.includes(
    req.body.userId
  );

  if (!isUserAlreadyFollowed) {
    await currentUser.updateOne({ $push: { followings: req.body.userId } });
    return res.status(200).send("User has been followed");
  } else {
    await currentUser.updateOne({ $pull: { followings: req.body.userId } });
    return res.status(200).send("User has been unfollowed");
  }
};
