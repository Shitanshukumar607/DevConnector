import { createBrowserRouter } from "react-router";
import App from "../App";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Home from "../components/Home/Home";
import Post from "../pages/Posts/Posts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "/posts/:id", element: <Post /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;
