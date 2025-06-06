import Post from "../models/post.model.js";
import User from "../models/user.model.js";

const likePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    if (post.likes.includes(req.user._id)) {
      return res
        .status(400)
        .json({ success: false, message: "Post already liked" });
    }

    if (post.dislikes.includes(req.user._id)) {
      post.dislikes = post.dislikes.filter(
        (userId) => userId.toString() !== req.user._id.toString()
      );
    }

    post.likes.push(req.user._id);
    await post.save();

    const populatedPost = await post.populate("user");

    console.log("populated Post is ", populatedPost);

    return res.status(200).json({
      success: true,
      message: "Post liked successfully",
      data: populatedPost,
    });
  } catch (error) {
    console.error("Error liking post:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const dislikePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    if (post.dislikes.includes(req.user._id)) {
      return res
        .status(400)
        .json({ success: false, message: "Post already disliked" });
    }

    if (post.likes.includes(req.user._id)) {
      post.likes = post.likes.filter(
        (userId) => userId.toString() !== req.user._id.toString()
      );
    }

    post.dislikes.push(req.user._id);
    await post.save();

    const populatedPost = await post.populate("user", "username _id");

    return res.status(200).json({
      success: true,
      message: "Post disliked successfully",
      data: populatedPost,
    });
  } catch (error) {
    console.error("Error disliking post:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getLikedUsers = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id).populate("user");

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    if (post.likes.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No users have liked this post",
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      data: likedUsernames,
    });
  } catch (error) {
    console.error("Error fetching liked users:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const getDislikedUsers = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id).populate(
      "dislikes.user",
      "username _id"
    );

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    if (post.dislikes.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No users have disliked this post",
        data: [],
      });
    }

    const dislikedUsernames = await Promise.all(
      post.dislikes.map(async (user) => {
        console.log("user is ", user);

        const dislikedUser = await User.findById(user).select("username _id");

        return dislikedUser?.username;
      })
    );

    return res.status(200).json({
      success: true,
      data: dislikedUsernames,
    });
  } catch (error) {
    console.error("Error fetching disliked users:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export { likePost, dislikePost, getLikedUsers, getDislikedUsers };
