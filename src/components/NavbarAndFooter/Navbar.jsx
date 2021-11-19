import "./Navbar.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { ThemeContext } from "../../ThemeProvider";
import { useContext } from "react";

import wave from "../../assets/wave_2.svg";
import { ThemeSwitch } from "../ThemeSwitch/ThemeSwitch";

// NavLink from react router doesn't seem to work and
// so active link detection had to be implemented manually
// Tnis function jus returns a convenient representation
// given the current location in the URL field of the browser
const locationToPageName = (pathname) => {
  if (pathname == "/") {
    return "root";
  } else if (pathname.endsWith("/books")) {
    return "explore";
  } else if (pathname.endsWith("/books/search")) {
    return "search";
  } else if (pathname.endsWith("/mywishlist")) {
    return "wishlist";
  } else {
    return "unrecorded";
  }
};

export function Navbar() {
  var location = useLocation(); // for getting the URL in the browser's URL field
  const [currPage, setCurrPage] = useState(
    locationToPageName(location.pathname)
  );

  var { themeData: theme, setThemeData: setTheme } = useContext(ThemeContext);

  // utility function
  const isLandingPageLightTheme = () => currPage == "root" && !theme.dark;

  // NavLink from react router doesn't seem to work and
  // so active link detection had to be implemented manually
  useEffect(() => {
    setCurrPage(locationToPageName(location.pathname));
  }, [location.pathname]);

  return (
    <div className="relative">
      <nav
        className={`topnav w-full z-50 ${
          currPage == "root"
            ? theme.dark
              ? ""
              : "topnav-light"
            : "topnav-bg-black"
        }`}
      >
        <div className="logo">
          <Link className="active p1" to="/">
            Anne
          </Link>
        </div>
        <div className="all-icons">
          <div className="left-buttons">
            <Link
              className={`peach flex flex-row items-center ${
                currPage == "explore" ? "topnav-active-link" : ""
              }`}
              to="/books"
              style={{ fontSize: "17px" }}
            >
              Explore
            </Link>
            <Link className="peach flex flex-row items-center" to="/">
              About
            </Link>
          </div>
          <div className="right-buttons">
            <Link
              className={`${isLandingPageLightTheme() ? "bg-yellow-100 hover:bg-opacity-50 bg-opacity-30 border-yellow-700 border" : "text-gray-200 border-0"} transform translate-x-6 transition-all duration-500 flex flex-row items-center justify-center rounded-xl pt-0"}`}
              to="/signin"
            >
              Sign up
            </Link>
            <Link className="login" to="/signin">
              Sign in
            </Link>
            <form className="nav-search-form" action="/books/search">
              <input
                type="text"
                autoFocus
                autoComplete={"no"}
                placeholder="Search"
                name="search"
              />
              <button className="search">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ height: "20px" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke={`${isLandingPageLightTheme() ? "#5a3922" : "white"}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </form>
            <ThemeSwitch />
          </div>
        </div>
      </nav>

      <div
        className="absolute w-full h-96 bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${wave})`,
          opacity: theme.dark ? "0.35" : "0.5",
          zIndex: "-1",
          top: "-5vh",
        }}
      ></div>
    </div>
  );
}
