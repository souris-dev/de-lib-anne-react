import { useState } from "react";
import "./SignIn.css";
import "./SignUp.css";
import ReactCardFlip from "react-card-flip";
import { SelectableTags } from "../components/SignUp/SelectableTags";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router";

export function SignUpPage() {
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);
  const [tags, setTags] = useState([]);

  const [pageOneInputs, setPageOneInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  return (
    <ReactCardFlip isFlipped={isFlipped}>
      <section className="login">
        <div className="login_box">
          <div className="left">
            <div className="top_link">
              <button
                onClick={() => navigate(-1) }
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

      <section className="login">
        <div className="login_box">
          <div className="right"></div>
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
                <form onSubmit={(e) => e.preventDefault()}>
                  Please select the genres you are interested in:
                  <div>
                    <SelectableTags
                      onClick={(tags) => setTags(tags)}
                      tags={["Fantasy", "Gore", "Action", "R18+", "Mystery"]}
                    />
                  </div>
                  <h2 className="mt-6 font-bold">OTP Verification</h2>
                  Please enter the OTP sent to your email address.{" "}
                  <span className="underline cursor-pointer">Resend OTP</span>
                  <input
                    type="text"
                    placeholder="6-digit OTP"
                    onChange={() => {}}
                  />
                  <button className="submit submit-btn-next" onClick={() => {}}>
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
