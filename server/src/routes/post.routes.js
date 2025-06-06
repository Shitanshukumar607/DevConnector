import { Router } from "express";
import {
  createAPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from "../controllers/post.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

// GET    /api/v1/posts       → getAllPosts
// POST   /api/v1/posts       → createPost

// GET    /api/v1/posts/:id      → getPostById
// PUT    /api/v1/posts/:id      → updatePost
// DELETE /api/v1/posts/:id      → deletePost

router.route("/").get(getAllPosts).post(verifyJWT, createAPost);

router
  .route("/:id")
  .get(getPostById)
  .put(verifyJWT, updatePost)
  .delete(verifyJWT, deletePost);

// GET    /api/v1/posts/search    → searchPostsByKeyword

// GET    /api/v1/posts/user/:id/comments → getAllCommentsByUserId

// POST   /api/v1/posts/:id/report → reportPost
// POST   /api/v1/posts/:id/comments/:commentId/report → reportComment
// GET    /api/v1/reported → getAllReportedPostsAndComments (admin only)

export default router;
