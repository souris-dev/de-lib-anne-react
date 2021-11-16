import "./SignIn.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { postData, toApiEndpoint } from "../utils/serverFetchUtils";

export function SignInPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(
    "Lorem ipsum dolor sit amet adipscing elit. Bulu bulu."
  );
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);

  const trySignIn = () => {
    if (email == "" || password == "") {
      alert("Please input email and password both.");
    }

    postData(toApiEndpoint("auth"), {
      email: email,
      password: password,
    }).then((response) => {
      switch (response.message) {
        case "User not found":
          setErrorMessage(
            "We like guests but with a reservation. User not found."
          );
          setErrorMessageVisible(true);
          break;

        case "Wrong password":
          setErrorMessage(
            "The lock did not like the key. Wrong password. LOL."
          );
          setErrorMessageVisible(true);
          break;

        case "Auth OK":
          navigate("/books");
          break;

        default:
          setErrorMessage("Something ceased to be right. Please try again.");
          setErrorMessageVisible(true);
      }
    });
  };

  useEffect(() => {
    setErrorMessageVisible(false);
  }, [email, password]);

  return (
    <section className="login">
      <div className="login_box">
        <div className="left">
          <div className="top_link">
            <button onClick={() => navigate(-1)} className="flex flex-row">
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
              <h3>SIGN IN</h3>
              <input
                type="email"
                placeholder="EMAIL"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="PASSWORD"
                onChange={(e) => setPassword(e.target.value)}
              />
              <p>
                Don't have an account? <Link to="/register">Register</Link>
              </p>

              <p
                className="font-semibold text-red-700"
                style={{
                  visibility: errorMessageVisible ? "visible" : "hidden",
                }}
              >
                {errorMessage}
              </p>
              <button className="submit" onClick={trySignIn}>
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
