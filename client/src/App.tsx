import { useQuery } from "@tanstack/react-query";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router";
import { getCurrentUser } from "./api/auth/auth";
import useAuthStore from "./store/authStore";
import { useEffect } from "react";

function App() {
  const setUser = useAuthStore((state) => state.setUser);
  const { data, isSuccess } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isSuccess && data?.success && data.user) {
      setUser(data.user);
    }
  }, [isSuccess, data, setUser]);

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
