import React, { createContext } from "react";
import { useState } from "react";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [username, setUsername] = useState("");

  return (
    <LoginContext.Provider value={{ username, setUsername }}>
      {children}
    </LoginContext.Provider>
  );
};

export { LoginProvider, LoginContext };
