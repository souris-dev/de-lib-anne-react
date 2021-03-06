import { useEffect, useState } from "react";
import "./SignIn.css";
import "./SignUp.css";
import "./ForgotPass.css";
import ReactCardFlip from "react-card-flip";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router";
import { postData, atServiceEndpoint } from "../utils/serverFetchUtils";

import { ThemeContext } from "../contexts/ThemeProvider";
import { useContext } from "react";
import { BackButton } from "../components/SignUp/BackButton";

export function ForgotPassPage() {
  const { themeData: theme } = useContext(ThemeContext);

  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);
  const [tags, setTags] = useState([]);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ isError: false, message: "" });
  const [enteredOtp, setEnteredOtp] = useState("");
  const [actualOtp, setActualOtp] = useState("");
  const [newPass, setNewPass] = useState("");

  const sendOtp = () => {
    console.log("sending the otp");
    if (email == "") {
      setMessage({ isError: true, message: "Please enter your email." });
      return;
    }
    postData(atServiceEndpoint("auth", "/sendotp"), { email: email }).then(
      (response) => {
        console.log("otp is", actualOtp);
        setActualOtp(response.message);
        setMessage({ isError: false, message: "OTP sent." });
      }
    );
  };

  const updatePass = () => {
    postData(atServiceEndpoint("auth", "/forgotpassword"), {
      email: email,
      password: newPass,
    }).then((response) => {
      if (response.status == 400) {
        alert("The email does not exist. Please enter an existing email ID");
        return;
      }
      navigate("/signin");
    });
  };

  const verifyOtp = () => {
    console.log("verifying the otp");
    if (actualOtp == "" || actualOtp == undefined) {
      setMessage({
        isError: true,
        message: "Enter email and click on 'Send OTP' first.",
      });
      return;
    }
    if (actualOtp == "expired") {
      setMessage();
    }
    if (enteredOtp == actualOtp) {
      setIsFlipped(true);
    } else {
      setMessage({
        isError: true,
        message:
          enteredOtp == ""
            ? "Enter the OTP please."
            : "The OTP you entered is incorrect.",
      });
    }
  };

  useEffect(() => {
    setMessage({ isError: false, message: "" });
  }, [email]);

  useEffect(() => {
    if (message.isError) {
      setMessage({ isError: false, message: "" });
    }
  }, [enteredOtp]);

  useEffect(() => updatePass(), [newPass]);

  return (
    <ReactCardFlip isFlipped={isFlipped}>
      <section className={`login ${theme.dark ? "" : "login-light"}`}>
        <div
          className={`login-box-big login_box ${
            theme.dark ? "" : "border border-yellow-600"
          }`}
        >
          <div className="left">
            <BackButton />
            <div className="px-12 mt-6">
              <div>
                <h3 className="tracking-wide h3-title h3-title-long">
                  RESET PASSWORD
                </h3>
                <p className="-mt-4">
                  Please enter your associated email address and click on{" "}
                  <b>Send OTP</b>.{" "}
                  <span className="inline-block mt-2 text-sm italic">
                    {" "}
                    The OTP will be valid for 10 minutes. Do not reload this
                    page after sending the OTP.
                  </span>
                </p>
                <input
                  type="email"
                  placeholder="EMAIL"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="flex flex-col items-center justify-center w-full mt-3">
                  <span
                    className="italic cursor-pointer"
                    onClick={() => sendOtp()}
                  >
                    Send OTP
                  </span>
                  <span
                    className={`${
                      message.isError ? "text-red-700" : "text-blue-700"
                    } mt-1`}
                  >
                    {message.message}
                  </span>
                </div>
                <h2
                  className={`${
                    message.message == "" ? "mt-14" : "mt-8"
                  } font-bold text-black`}
                >
                  OTP Verification
                </h2>
                Please enter the OTP sent to your email address.{" "}
                <input
                  type="text"
                  placeholder="6-digit OTP"
                  onChange={(e) => {
                    setEnteredOtp(e.target.value);
                  }}
                />
                <button
                  className="submit verify-btn"
                  onClick={() => {
                    verifyOtp();
                  }}
                >
                  Verify OTP
                </button>
              </div>
            </div>
          </div>
          <div className="right"></div>
        </div>
      </section>

      <section className={`login ${theme.dark ? "" : "login-light"}`}>
        <div
          className={`login-box-big login_box  ${
            theme.dark ? "" : "border border-yellow-600"
          }`}
        >
          <div className="right"></div>
          <div className="left">
            <BackButton />
            <div className="px-12 mt-6">
              <div>
                <h3 className="tracking-wide h3-title h3-title-long">
                  RESET PASSWORD
                </h3>
                <Formik
                  initialValues={{
                    password: "",
                    confpassword: "",
                  }}
                  validate={(values) => {
                    const errors = {};

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
                    setNewPass(values.password);
                    setSubmitting(false);
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className="flex flex-col items-start justify-between h-full">
                      Please enter the new password.
                      <Field
                        type="password"
                        placeholder="PASSWORD"
                        name="password"
                      />
                      <ErrorMessage name="password">
                        {(msg) => (
                          <div className="text-sm text-red-700">{msg}</div>
                        )}
                      </ErrorMessage>
                      <Field
                        type="password"
                        placeholder="CONFIRM PASSWORD"
                        name="confpassword"
                      />
                      <ErrorMessage name="confpassword">
                        {(msg) => (
                          <div className="text-sm text-red-700">{msg}</div>
                        )}
                      </ErrorMessage>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="submit submit-btn-next mt-28"
                      >
                        Update
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ReactCardFlip>
  );
}
