import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

import { generateUsername } from "../utils/generateUsername.js";

const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Full name, email, and password are required.",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists." });
    }

    const newUser = new User({
      fullName,
      email,
      password,
      username: await generateUsername(fullName),
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: { fullName, email, username: newUser.username },
    });
  } catch (error) {
    console.log("Error registering user:", error);
    res
      .status(500)
      .json({ success: false, message: "Error registering user", error });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required.",
    });
  }

  try {
    const user = await User.findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials.",
      });
    }

    const payload = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      username: user.username,
    };

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    });

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)
      .json({
        success: true,
        message: "User logged in successfully",
        user: {
          fullName: user.fullName,
          email: user.email,
          username: user.username,
        },
      });
  } catch (error) {
    console.log("Error logging in user:", error);
    res
      .status(500)
      .json({ success: false, message: "Error logging in user", error });
  }
};

const getUserData = async (req, res) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized request",
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid access token",
      });
    }

    req.user = user;
    return res.status(200).json({
      success: true,
      user: {
        fullName: user.fullName,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error?.message || "Invalid access token",
    });
  }
};

export { registerUser, loginUser, getUserData };
