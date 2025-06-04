import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "https://devconnector-fweah.vercel.app"],
    credentials: true,
  })
);

app.use("/api/v1/users", userRouter);

export default app;
