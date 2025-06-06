import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {
  likePost,
  dislikePost,
  getLikedUsers,
  getDislikedUsers,
} from "../controllers/like.controller.js";

const router = Router();

// DELETE /api/v1/posts/:id/like → unlikePost
// POST   /api/v1/posts/:id/like  → likePost

// GET    /api/v1/posts/:id/likes  → getUsersWhoLikedPost
// GET    /api/v1/posts/:id/dislikes  → getUsersWhoDislikedPost

router.route("/:id/like").post(verifyJWT, likePost);

router.route("/:id/dislike").post(verifyJWT, dislikePost);

router.get("/:id/likes", verifyJWT, getLikedUsers);
router.get("/:id/dislikes", verifyJWT, getDislikedUsers);

// GET    /api/v1/posts/user/:id  → getAllPostsByUserId
// GET    /api/v1/posts/liked/:id → getAllPostsLikedByUserId

export default router;
