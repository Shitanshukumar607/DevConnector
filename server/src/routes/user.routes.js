import { Router } from "express";
import {
  getUserData,
  loginUser,
  registerUser,
} from "../controllers/user.controllers.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", verifyJWT, getUserData);

export default router;
