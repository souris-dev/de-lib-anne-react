import "./Navbar.css";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import "react-toggle/style.css";
import Toggle from "react-toggle";

import { ThemeContext } from "../../ThemeProvider";
import { useContext } from "react";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

import wave from "../../assets/wave_2.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
  var location = useLocation();
  const [currPage, setCurrPage] = useState(
    locationToPageName(location.pathname)
  );

  var { themeData: theme, setThemeData: setTheme } = useContext(ThemeContext);

  useEffect(() => {
    setCurrPage(locationToPageName(location.pathname));
  }, [location.pathname]);

  return (
    <div className="relative">
      <nav
        className={`topnav w-full z-50 ${
          currPage == "root" ? "" : "topnav-bg-black"
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
            <Toggle
              defaultChecked={!theme.dark}
              onChange={() => setTheme({ dark: !theme.dark })}
              className="dark-theme-toggle"
              icons={{
                checked: (
                  <FontAwesomeIcon
                    icon={faSun}
                    color="white"
                    style={{
                      marginTop: "-4px",
                      height: "20px",
                    }}
                  />
                ),
                unchecked: (
                  <FontAwesomeIcon
                    icon={faMoon}
                    color="white"
                    style={{
                      marginTop: "-5px",
                      paddingRight: "3px",
                      height: "20px",
                    }}
                  />
                ),
              }}
            />
            <Link className="login" to="/signin">
              <i className="fas fa-sign-in-alt"></i> Sign In
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
                  stroke="white"
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
          </div>
        </div>
      </nav>

      <div
        className="absolute w-full h-96 bg-no-repeat bg-cover"
        style={{
          backgroundImage: `url(${wave})`,
          opacity: "0.5",
          zIndex: "-1",
          top: "-5vh",
        }}
      ></div>
    </div>
  );
}
