import "./Navbar.css";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { ThemeContext } from "../../contexts/ThemeProvider";
import { useContext } from "react";

import wave from "../../assets/wave_2.svg";
import { ThemeSwitch } from "../ThemeSwitch/ThemeSwitch";
import { LoginContext } from "../../contexts/LoginProvider";
import { atServiceEndpoint, postData } from "../../utils/serverFetchUtils";

/**
 * NavLink from react router doesn't seem to work and
 * so active link detection had to be implemented manually
 * This function just returns a convenient representation
 * given the current location in the URL field of the browser
 **/
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
  var { themeData: theme, setThemeData: setTheme } = useContext(ThemeContext);

  /**
   * For location handling/recording
   */
  var location = useLocation(); // for getting the URL in the browser's URL field
  const navigate = useNavigate();
  const [currPage, setCurrPage] = useState(
    locationToPageName(location.pathname)
  );

  // NavLink from react router doesn't seem to work and
  // so active link detection had to be implemented manually
  useEffect(() => {
    setCurrPage(locationToPageName(location.pathname));
  }, [location.pathname]);

  /**
   * For the search bar
   */
  const [searchText, setSearchText] = useState("");
  const doSearch = () => {
    // encodeURI takes care of spaces and special characters in searchText
    navigate(encodeURI("/books/search/" + searchText));
  };

  /**
   * For signed up/signed in/logged out
   */
  const {
    username: globalUsername,
    setUsername: setGlobalUsername,
    isSignedIn: isGlobalSignedIn,
    setIsSignedIn: setGlobalIsSignedIn,
  } = useContext(LoginContext);

  const doLogout = () => {
    postData(atServiceEndpoint("auth", "/logout"))
      .then((response) => {
        localStorage.removeItem("username");
        localStorage.removeItem("lastLoggedIn");
        setGlobalUsername("");
        setGlobalIsSignedIn(false);
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  const SignedOutRightButtons = () => {
    return (
      <>
        <Link
          className={`${
            !theme.dark
              ? "bg-yellow-100 hover:bg-opacity-50 bg-opacity-30 border-yellow-700 border"
              : "text-gray-200 border-0"
          } transform translate-x-6 transition-all duration-500 flex flex-row items-center justify-center rounded-xl pt-0"}`}
          to="/register"
        >
          Sign up
        </Link>
        <Link className="login" to="/signin">
          Sign in
        </Link>
      </>
    );
  };

  const SignedInRightButtons = () => {
    return (
      <>
        <a className="login" onClick={doLogout}>
          Logout
        </a>
        <div className={`mr-5 font-medium ${theme.dark ? `text-white` : `text-black`}`}>{globalUsername}</div>
      </>
    );
  };

  return (
    <div className="relative">
      <nav
        className={`topnav w-full z-50 ${
          theme.dark ? "topnav-bg-black" : "topnav-light"
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
                currPage == "explore"
                  ? theme.dark
                    ? "topnav-active-link"
                    : "topnav-active-link-light"
                  : ""
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
            {isGlobalSignedIn ? (
              <SignedInRightButtons />
            ) : (
              <SignedOutRightButtons />
            )}
            <form className="nav-search-form" onSubmit={(e) => { e.preventDefault(); doSearch() }}>
              <input
                type="text"
                autoFocus
                required
                autoComplete={"no"}
                placeholder="Search"
                name="search"
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button className="search">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ height: "20px" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke={`${theme.dark ? "white" : "#5a3922"}`}
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
