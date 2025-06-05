import jwt from "jsonwebtoken";

import Post from "../models/post.model.js";
import User from "../models/user.model.js";

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find({}).populate("user", "_id username").sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: allPosts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const createAPost = async (req, res) => {
  try {
    const { title, description } = req.body;

    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message:
          "Unauthorized request. You must be logged in to create a post.",
      });
    }
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid or expired token" });
    }

    const userId = decoded?._id;
    const user = await User.findById(userId).select("-password -refreshToken");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const newPost = await Post.create({ title, description, user: userId });

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: newPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export { getAllPosts, createAPost };
