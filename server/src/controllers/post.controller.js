import Post from "../models/post.model.js";

const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find({})
      .populate("user", "_id username")
      .sort({ createdAt: -1 });

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

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    const newPost = await Post.create({
      title,
      description,
      user: res.user._id,
    });

    const populatedPost = await newPost.populate("user", "username _id");

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: populatedPost,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id).populate("user", "_id username");

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Post fetched successfully",
      data: post,
    });
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden: Not your post" });
    }

    post.title = title || post.title;
    post.description = description || post.description;
    await post.save();

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: post,
    });
  } catch (error) {
    console.error("Error updating post:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden: Not your post" });
    }

    await post.deleteOne();
    return res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export { createAPost, deletePost, getAllPosts, getPostById, updatePost };
