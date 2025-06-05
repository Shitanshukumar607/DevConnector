import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router";

function App() {
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
