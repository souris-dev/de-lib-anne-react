import { ThemeContext } from "../../contexts/ThemeProvider";
import noSearchResults from "../../assets/no_results.svg";
import { useContext } from "react";

export function NoResults(props) {
  const { themeData: theme } = useContext(ThemeContext);

  return (
    <div
      className={` flex flex-col items-center justify-center text-gray-500`}
      style={{ minHeight: "54vh" }}
    >
      <img src={noSearchResults} style={{ height: "10rem" }} />
      <div className={`mt-6 text-lg ${theme.dark ? "text-gray-400" : ""}`}>
        {props.notFoundText ? props.notFoundText : "Not found."}
      </div>
    </div>
  );
}
