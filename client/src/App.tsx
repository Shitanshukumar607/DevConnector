import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
