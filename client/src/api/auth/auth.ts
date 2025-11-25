import axios from "../axios";
import type { AuthResponse, LoginData, RegisterData } from "./types";

const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
  const res = await axios.post("/users/register", data);
  return res.data;
};

const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  const res = await axios.post("/users/login", data);
  return res.data;
};

const getCurrentUser = async (): Promise<AuthResponse> => {
  const res = await axios.get("/users/me");
  return res.data;
};

const refreshAccessToken = async (): Promise<AuthResponse> => {
  const res = await axios.get("/users/refreshAccessToken");
  return res.data;
};

export { getCurrentUser, loginUser, refreshAccessToken, registerUser };
