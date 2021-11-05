import { Outlet } from "react-router";
import { Navbar } from "../components/Navbar/Navbar";

export function WithNavbarAndFooter() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
