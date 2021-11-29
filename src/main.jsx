import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./contexts/ThemeProvider";
import { LoginProvider } from "./contexts/LoginProvider";
import { SearchProvider } from "./contexts/SearchProvider";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <LoginProvider>
        <SearchProvider>
          <App />
        </SearchProvider>
      </LoginProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
