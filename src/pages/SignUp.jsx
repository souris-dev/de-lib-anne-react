import { useState } from "react";
import "./SignIn.css";
import "./SignUp.css";
import ReactCardFlip from "react-card-flip";
import { SelectableTags } from "../components/SignUp/SelectableTags";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { postData, atServiceEndpoint } from "../utils/serverFetchUtils";

import { ThemeContext } from "../ThemeProvider";
import { useContext } from "react";
import { BackButton } from "../components/SignUp/BackButton";

export function SignUpPage() {
  const { themeData: theme } = useContext(ThemeContext);

  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);
  const [tags, setTags] = useState([]);

  const [pageOneInputs, setPageOneInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const postUserData = () => {
    postData(atServiceEndpoint("auth", "/createuser"), {
      username: pageOneInputs.username,
      email: pageOneInputs.email,
      password: pageOneInputs.password,
      interests: tags,
    }).then((response) => {
      switch (response.message) {
        case "User with same email already exists":
          alert("User with same email already exists!");
          break;

        case "User created":
          navigate("/books");
          break;

        default:
          console.log(response.message); // debug
          alert("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <ReactCardFlip isFlipped={isFlipped}>
      <section className={`login ${theme.dark ? "" : "login-light"}`}>
        <div
          className={`login_box ${
            theme.dark ? "" : "border border-yellow-600"
          }`}
        >
          <div className="left">
            <BackButton />
            <div className="contact">
              <div>
                <h3 className="h3-title">SIGN UP</h3>
                <Formik
                  initialValues={{
                    username: "",
                    email: "",
                    password: "",
                    confpassword: "",
                  }}
                  validate={(values) => {
                    const errors = {};

                    // Username validation
                    if (!values.username) {
                      errors.username = "Username is required.";
                    }

                    // email validation
                    if (!values.email) {
                      errors.email = "Email is required.";
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        values.email
                      )
                    ) {
                      errors.email = "Invalid email address.";
                    }

                    // password validation
                    if (!values.password) {
                      errors.password = "Password is required.";
                    }

                    if (values.password != values.confpassword) {
                      errors.confpassword = "Passwords do not match.";
                    }

                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    setPageOneInputs({
                      username: values.username,
                      email: values.email,
                      password: values.password,
                    });
                    setSubmitting(false);
                    setIsFlipped(true);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <Field
                        type="text"
                        placeholder="USERNAME"
                        name="username"
                      />
                      <ErrorMessage name="username">
                        {(msg) => (
                          <div className="text-red-700 text-sm">{msg}</div>
                        )}
                      </ErrorMessage>
                      <Field type="email" placeholder="EMAIL" name="email" />
                      <ErrorMessage name="email">
                        {(msg) => (
                          <div className="text-red-700 text-sm">{msg}</div>
                        )}
                      </ErrorMessage>
                      <Field
                        type="password"
                        placeholder="PASSWORD"
                        name="password"
                      />
                      <ErrorMessage name="password">
                        {(msg) => (
                          <div className="text-red-700 text-sm">{msg}</div>
                        )}
                      </ErrorMessage>
                      <Field
                        type="password"
                        placeholder="CONFIRM PASSWORD"
                        name="confpassword"
                      />
                      <ErrorMessage name="confpassword">
                        {(msg) => (
                          <div className="text-red-700 text-sm">{msg}</div>
                        )}
                      </ErrorMessage>

                      <div className="flex flex-row mt-2 w-full items-center justify-center">
                        Have an account?{" "}
                        <Link to="/signin" className="ml-1">
                          <span className="italic">Sign in.</span>
                        </Link>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="submit submit-btn-next"
                      >
                        Next
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
          <div className="right"></div>
        </div>
      </section>

      <section className={`login ${theme.dark ? "" : "login-light"}`}>
        <div
          className={`login_box ${
            theme.dark ? "" : "border border-yellow-600"
          }`}
        >
          <div className="right"></div>
          <div className="left">
            <BackButton />
            <div className="contact">
              <div>
                <h3 className="h3-title">SIGN UP</h3>
                <form onSubmit={(e) => e.preventDefault()}>
                  Please select the genres you are interested in:
                  <div>
                    <SelectableTags
                      onClick={(tags) => setTags(tags)}
                      tags={[
                        "Fantasy",
                        "Fiction",
                        "Non-fiction",
                        "Thriller",
                        "Mystery",
                        "Action",
                      ]}
                    />
                  </div>
                  <h2 className="mt-16 font-bold text-black">
                    OTP Verification
                  </h2>
                  Please enter the OTP sent to your email address.{" "}
                  <span className="underline cursor-pointer">Resend OTP</span>
                  <input
                    type="text"
                    placeholder="6-digit OTP"
                    onChange={() => {}}
                  />
                  <button
                    className="submit submit-btn-next"
                    onClick={() => {
                      postUserData();
                    }}
                  >
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ReactCardFlip>
  );
}
