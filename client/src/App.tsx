import { useDispatch } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router";
import { useGetUserQuery } from "./redux/auth/authApi";
import { setUser } from "./redux/auth/authSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const { data, isSuccess } = useGetUserQuery({});

  useEffect(() => {
    if (isSuccess && data?.user) {
      dispatch(setUser(data.user));
    }
  }, [isSuccess, data]);

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
