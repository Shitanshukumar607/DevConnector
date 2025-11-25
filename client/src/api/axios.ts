import { baseUrl } from "@/constants";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${baseUrl}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
