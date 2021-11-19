import "react-toggle/style.css";
import Toggle from "react-toggle";
import "./ThemeSwitch.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContext } from "../../ThemeProvider";
import { useContext } from "react";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

export function ThemeSwitch() {
  var { themeData: theme, setThemeData: setTheme } = useContext(ThemeContext);

  return (
    <Toggle
      defaultChecked={!theme.dark}
      onChange={() => setTheme({ dark: !theme.dark })}
      className="dark-theme-toggle"
      icons={{
        checked: (
          <FontAwesomeIcon
            icon={faSun}
            color="white"
            style={{
              marginTop: "-4px",
              height: "20px",
            }}
          />
        ),
        unchecked: (
          <FontAwesomeIcon
            icon={faMoon}
            color="white"
            style={{
              marginTop: "-5px",
              paddingRight: "3px",
              height: "20px",
            }}
          />
        ),
      }}
    />
  );
}
