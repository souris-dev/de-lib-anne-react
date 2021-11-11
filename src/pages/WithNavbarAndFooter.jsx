import { Outlet } from "react-router";
import { Footer } from "../components/NavbarAndFooter/Footer";
import { Navbar } from "../components/NavbarAndFooter/Navbar";

export function WithNavbarAndFooter() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
