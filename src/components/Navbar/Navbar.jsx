import "./Navbar.css";

export function Navbar() {
  return (
    <nav className="topnav">
      <div className="logo">
        <a className="active p1" href="#">
          Anne
        </a>
      </div>
      <div className="all-icons">
        <div className="left-buttons">
          <a
            className="peach p1"
            id="exp"
            href="#"
            style={{ fontSize: "17px" }}
          >
            Explore
          </a>
          <a className="peach p1" href="#">
            About
          </a>
        </div>
        <div className="right-buttons">
          <a className="login" href="#">
            <i className="fas fa-sign-in-alt"></i> Sign In
          </a>
          <form className="nav-search-form">
            <input type="text" autoFocus autoComplete={false} placeholder="Search" name="search" />
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
