import { Router } from "express";
import {
  getUserData,
  loginUser,
  registerUser,
} from "../controllers/user.controllers.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", getUserData);

export default router;
