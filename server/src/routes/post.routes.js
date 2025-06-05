import { Router } from "express";
import { createAPost, getAllPosts } from "../controllers/post.controller.js";

const router = Router();

// GET    /api/v1/posts       → getAllPosts

router.route("/").get(getAllPosts).post(createAPost);

// GET    /api/v1/posts/:id       → getPostById
// GET    /api/v1/posts/user/:id  → getAllPostsByUserId
// GET    /api/v1/posts/liked/:id → getAllPostsLikedByUserId
// GET    /api/v1/posts/search    → searchPostsByKeyword

// POST   /api/v1/posts           → createPost
// PUT    /api/v1/posts/:id      → updatePost
// DELETE /api/v1/posts/:id      → deletePost

// POST   /api/v1/posts/:id/like  → likePost
// DELETE /api/v1/posts/:id/like → unlikePost
// GET    /api/v1/posts/:id/likes  → getUsersWhoLikedPost
// POST   /api/v1/posts/:id/comments → addCommentToPost
// GET    /api/v1/posts/:id/comments → getAllCommentsOnPost
// PUT    /api/v1/posts/:id/comments/:commentId → updateComment
// DELETE /api/v1/posts/:id/comments/:commentId → deleteComment
// POST   /api/v1/posts/:id/comments/:commentId/likes → likeComment
// DELETE /api/v1/posts/:id/comments/:commentId/likes → unlikeComment
// GET    /api/v1/posts/:id/comments/:commentId/likes → getUsersWhoLikedComment

// POST   /api/v1/posts/:id/comments/:commentId/replies → addReplyToComment
// GET    /api/v1/posts/:id/comments/:commentId/replies → getAllRepliesToComment

// GET    /api/v1/posts/user/:id/comments → getAllCommentsByUserId

// POST   /api/v1/posts/:id/report → reportPost
// POST   /api/v1/posts/:id/comments/:commentId/report → reportComment
// GET    /api/v1/reported → getAllReportedPostsAndComments (admin only)

export default router;
