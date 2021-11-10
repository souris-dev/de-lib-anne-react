import { Outlet } from "react-router";
import { Navbar } from "../components/NavbarAndFooter/Navbar";

export function WithNavbarAndFooter() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
