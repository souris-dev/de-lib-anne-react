import { createContext, useEffect, useReducer } from "react";

const initThemeData = { dark: false };
export const ThemeContext = createContext(initThemeData);

export function ThemeProvider(props) {
  const [themeData, dispatchThemeData] = useReducer((currThemeData, action) => {
    switch (action.switchToTheme) {
      case "light":
        return { dark: false };
      case "dark":
        return { dark: true };
      case "toggle":
        return { dark: !carrThemeData.dark };
      default:
        return { dark: true };
    }
  }, initThemeData);

  useEffect(() => {
    document.body.style.backgroundColor = themeData.dark
      ? "#1b1b1b"
      : "#fff8e6";
  }, [themeData.dark]);

  return (
    <ThemeContext.Provider value={{ themeData, dispatchThemeData }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
