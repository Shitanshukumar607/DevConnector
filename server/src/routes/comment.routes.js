import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
  addCommentToPost,
  deleteComment,
  editComment,
  getAllCommentsOnPost,
} from "../controllers/comment.controller.js";

const router = Router();

// POST   /api/v1/posts/:id/comments → addCommentToPost
// GET    /api/v1/posts/:id/comments → getAllCommentsOnPost

// PUT    /api/v1/posts/:id/comments/:commentId → editComment
// DELETE /api/v1/posts/:id/comments/:commentId → deleteComment

router
  .route("/:id/comments")
  .get(verifyJWT, getAllCommentsOnPost)
  .post(verifyJWT, addCommentToPost);

router
  .route("/:id/comments/:commentId")
  .put(verifyJWT, editComment)
  .delete(verifyJWT, deleteComment);

// POST   /api/v1/posts/:id/comments/:commentId/likes → likeComment
// DELETE /api/v1/posts/:id/comments/:commentId/likes → unlikeComment
// GET    /api/v1/posts/:id/comments/:commentId/likes → getUsersWhoLikedComment

// POST   /api/v1/posts/:id/comments/:commentId/replies → addReplyToComment
// GET    /api/v1/posts/:id/comments/:commentId/replies → getAllRepliesToComment

export default router;
