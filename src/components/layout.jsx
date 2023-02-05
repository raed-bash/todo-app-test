import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

export default function Layout() {
  return (
    <>
      <Navbar />
    
      <div className="container">
        <Outlet />
      </div>
    </>
  );
}
