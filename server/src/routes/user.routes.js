import { Router } from "express";
import {
  getUserData,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/user.controllers.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", getUserData);
router.get("/refreshAccessToken", refreshAccessToken);
router.post("/logout", logoutUser);

export default router;
