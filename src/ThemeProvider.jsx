import { createContext, useEffect, useState } from "react";

const initThemeData = { dark: false };
export const ThemeContext = createContext();

export function ThemeProvider(props) {
  const [themeData, setThemeData] = useState(initThemeData);

  useEffect(() => {
    document.body.style.backgroundColor = themeData.dark
      ? "#1b1b1b"
      : "#fff8e6";
  }, [themeData.dark]);

  return (
    <ThemeContext.Provider value={{ themeData, setThemeData }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
