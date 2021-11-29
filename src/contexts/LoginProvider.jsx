import React, { createContext, useEffect } from "react";
import { useState } from "react";
import { atServiceEndpoint, postData } from "../utils/serverFetchUtils";

const LoginContext = createContext();

export const NHOURS_LOGIN_VALID = 3;

const LoginProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const localStorageUsername = localStorage.getItem("username");

    // user has already logged in before
    if (localStorageUsername != null && localStorageUsername != "") {
      setUsername(localStorageUsername);
      setIsSignedIn(true);

      const lastLoggedIn = new Date(localStorage.getItem("lastLoggedIn"));

      // if more than N hours since last log in, then log out
      if (
        lastLoggedIn >
        new Date(Date.now() + NHOURS_LOGIN_VALID * 60 * 60 * 1000)
      ) {
        postData(atServiceEndpoint("auth", "/logout"))
          .then((response) => {
            localStorage.removeItem("username");
            localStorage.removeItem("lastLoggedIn");
            setUsername("");
            setIsSignedIn(false);
          })
          .catch((err) => console.error(err));
      }
    }
  }, []);

  return (
    <LoginContext.Provider value={{ username, isSignedIn, setUsername, setIsSignedIn }}>
      {children}
    </LoginContext.Provider>
  );
};

export { LoginProvider, LoginContext };
