import "./SignIn.css";
import { Link } from "react-router-dom";

export function SignInPage() {
  return (
    <section className="login">
      <div className="login_box">
        <div className="left">
          <div className="top_link">
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="flex flex-row"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ height: "22px" }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                />
              </svg>
              <span className="top_link_text">Back</span>
            </button>
          </div>
          <div className="contact">
            <div>
              <h3>SIGN UP</h3>
              <input type="text" placeholder="USERNAME" />
              <input type="password" placeholder="PASSWORD" />
              <p>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
              <button
                className="submit"
                onClick={() => setIsFlipped(!isFlipped)}
              >
                Start Reading
              </button>
            </div>
          </div>
        </div>
        <div className="right"></div>
      </div>
    </section>
  );
}
