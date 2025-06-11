import Post from "../models/post.model.js";
import User from "../models/user.model.js";

const likePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const userId = req.user._id.toString();

    const likesSet = new Set(post.likes.map((id) => id.toString()));
    const dislikesSet = new Set(post.dislikes.map((id) => id.toString()));

    let likedStatus;

    if (likesSet.has(userId)) {
      likesSet.delete(userId);
      likedStatus = false;
    } else {
      dislikesSet.delete(userId);
      likesSet.add(userId);
      likedStatus = true;
    }

    post.likes = Array.from(likesSet);
    post.dislikes = Array.from(dislikesSet);
    await post.save();

    return res.status(200).json({
      success: true,
      message: likedStatus
        ? "Post liked successfully"
        : "Post un-liked successfully",
      likedStatus,
    });
  } catch (error) {
    console.error("Error liking post:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const dislikePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    const userId = req.user._id.toString();

    const likesSet = new Set(post.likes.map((id) => id.toString()));
    const dislikesSet = new Set(post.dislikes.map((id) => id.toString()));

    let message = "";
    let likedStatus = likesSet.has(userId);
    let dislikedStatus = dislikesSet.has(userId);

    if (dislikedStatus) {
      post.dislikes = post.dislikes.filter((id) => id.toString() !== userId);
      message = "Post un-disliked successfully";
      dislikedStatus = false;
    } else {
      post.dislikes.push(userId);
      dislikedStatus = true;

      if (likedStatus) {
        post.likes = post.likes.filter((id) => id.toString() !== userId);
        likedStatus = false;
      }

      message = "Post disliked successfully";
    }

    await post.save();

    return res.status(200).json({
      success: true,
      message,
      likedStatus,
      dislikedStatus,
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
        // console.log("user is ", user);

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
