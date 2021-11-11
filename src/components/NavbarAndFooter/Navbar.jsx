import "./Navbar.css";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="topnav">
      <div className="logo">
        <Link className="active p1" to="/">
          Anne
        </Link>
      </div>
      <div className="all-icons">
        <div className="left-buttons">
          <Link
            className="peach p1"
            id="exp"
            to="/books"
            style={{ fontSize: "17px" }}
          >
            Explore
          </Link>
          <a className="peach p1" href="#">
            About
          </a>
        </div>
        <div className="right-buttons">
          <a className="login" href="#">
            <i className="fas fa-sign-in-alt"></i> Sign In
          </a>
          <form className="nav-search-form" action="/books/search">
            <input type="text" autoFocus autoComplete={"no"} placeholder="Search" name="search" />
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
  );
}
