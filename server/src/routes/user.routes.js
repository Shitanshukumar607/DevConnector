import { Router } from "express";
import {
  getUserData,
  loginUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/user.controllers.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", getUserData);
router.get("/refreshAccessToken", refreshAccessToken);

export default router;
