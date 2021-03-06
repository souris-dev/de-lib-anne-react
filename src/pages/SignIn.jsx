import "./SignIn.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { postData, atServiceEndpoint } from "../utils/serverFetchUtils";

import { ThemeContext } from "../contexts/ThemeProvider";
import { useContext } from "react";
import { BackButton } from "../components/SignUp/BackButton";
import {
  ClipLoader,
  DotLoader,
  FadeLoader,
  PropagateLoader,
} from "react-spinners";
import { LoginContext } from "../contexts/LoginProvider";

export function SignInPage() {
  const { themeData: theme } = useContext(ThemeContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(
    "Lorem ipsum dolor sit amet adipscing elit. Bulu bulu."
  );
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);

  const [signInInProgress, setSignInInProgress] = useState(false);

  /**
   * Login state
   */
  const { setUsername: setGlobalUsername, setIsSignedIn: setGlobalIsSignedIn } =
    useContext(LoginContext);

  const trySignIn = () => {
    if (email == "" || password == "") {
      alert("Please input email and password both.");
      return;
    }

    setSignInInProgress(true);

    postData(atServiceEndpoint("auth", "/auth"), {
      email: email,
      password: password,
    })
      .then((response) => {
        switch (response.message) {
          case "User not found":
            setErrorMessage(
              "We like guests but with a reservation. User not found."
            );
            setErrorMessageVisible(true);
            setSignInInProgress(false);
            break;

          case "Wrong password":
            setErrorMessage(
              "The lock did not like the key. Wrong password. LOL."
            );
            setErrorMessageVisible(true);
            setSignInInProgress(false);
            break;

          case "Auth OK":
            localStorage.setItem("username", response.username);
            localStorage.setItem(
              "lastLoggedIn",
              new Date(Date.now()).toISOString()
            );
            setGlobalIsSignedIn(true);
            setGlobalUsername(response.username);
            navigate("/books");
            break;

          default:
            setErrorMessage("Something ceased to be right. Please try again.");
            setErrorMessageVisible(true);
            setSignInInProgress(false);
        }
      })
      .catch((err) => {
        alert("Could not sign in, please try again.");
        setSignInInProgress(false);
      });
  };

  useEffect(() => {
    setErrorMessageVisible(false);
  }, [email, password]);

  return (
    <section className={`login ${theme.dark ? "" : "login-light"}`}>
      <div
        className={`login_box ${theme.dark ? "" : "border border-yellow-600"}`}
      >
        <div className="left">
          <BackButton />
          <div className="contact">
            <div>
              <h3 className="h3-title">SIGN IN</h3>
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
                Don't have an account?{" "}
                <Link to="/register">Register here.</Link>
              </p>

              <p>
                Forgot password? <Link to="/forgot">Reset it.</Link>
              </p>

              <p
                className="font-semibold text-red-700"
                style={{
                  visibility: errorMessageVisible ? "visible" : "hidden",
                }}
              >
                {errorMessage}
              </p>
              <button
                className="submit flex flex-row items-center"
                onClick={trySignIn}
              >
                {signInInProgress ? (
                  <span class="mt-2 -mb-1">
                    <ClipLoader size={20} color="#ffffff" />
                  </span>
                ) : (
                  "Start Reading"
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="right"></div>
      </div>
    </section>
  );
}
