import { useDispatch } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router";
import { useGetUserQuery } from "./redux/auth/authApi";
import { setUser } from "./redux/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const { data } = useGetUserQuery({});

  if (data) {
    dispatch(setUser(data.user));
  }

  return (
    <>
      <Navbar />
      <main className="px-5 sm:px-9">
        <Outlet />
      </main>
    </>
  );
}

export default App;
