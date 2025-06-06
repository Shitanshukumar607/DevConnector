import Post from "../models/post.model.js";
import Comment from "../models/comment.model.js";

const getAllCommentsOnPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id).populate("comments");

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Comments fetched successfully",
      data: post.comments,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const addCommentToPost = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (!text || text.trim() === "") {
    return res
      .status(400)
      .json({ success: false, message: "Text is required" });
  }

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    const comment = await Comment.create({
      text,
      post: id,
      user: req.user._id,
    });

    post.comments.push(comment._id);
    await post.save();

    return res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: comment,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const editComment = async (req, res) => {
  const { id: postId, commentId } = req.params;
  const { text } = req.body;

  console.log("Editing comment:", { postId, commentId, text });

  if (!text || text.trim() === "") {
    return res
      .status(400)
      .json({ success: false, message: "Text is required" });
  }

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to edit this comment",
      });
    }

    comment.text = text;
    await comment.save();

    return res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      data: comment,
    });
  } catch (error) {
    console.error("Error updating comment:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

const deleteComment = async (req, res) => {
  const { id, commentId } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res
        .status(404)
        .json({ success: false, message: "Comment not found" });
    }

    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to delete this comment",
      });
    }

    await comment.deleteOne();
    post.comments.pull(commentId);
    await post.save();

    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export { addCommentToPost, editComment, deleteComment, getAllCommentsOnPost };
