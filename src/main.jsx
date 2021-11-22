import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./ThemeProvider";
import { LoginProvider } from "./contexts/LoginProvider";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <LoginProvider>
        <App />
      </LoginProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
