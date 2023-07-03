import Post from "../model/Post.js";
import User from "../model/User.js";

//get all the users following posts
export const getPosts = async (req, res) => {
  try {
    const currentUser = await User.findOne({ _id: req.userId });
    if (!currentUser) return res.status(404).send("User not found");

    const userPosts = await Post.find({ userId: req.userId });

    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    return res.status(200).json(userPosts.concat(...friendPosts));
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//create post
export const createPosts = async (req, res) => {
  try {
    const newPost = new Post({
      userId: req.userId,
      desc: req.body.desc,
    });

    const savedPost = await newPost.save();
    return res.status(201).send("post has been created");
  } catch (error) {
    res.status(400).json({ error: error });
  }
};



//get user posts
export const getUserPost = async (req, res) => {
  try {
    const userPost = await Post.find({ userId: req.userId });
    return res.status(200).send(userPost);
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};
