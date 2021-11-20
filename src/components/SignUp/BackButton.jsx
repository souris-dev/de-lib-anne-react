import "./BackButton.css";
import { ThemeSwitch } from "../ThemeSwitch/ThemeSwitch";
import { useNavigate } from "react-router";

export function BackButton() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row">
      <div className="top_link mr-4">
        <button onClick={() => navigate(-1)} className="flex flex-row">
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
      <div className="opacity-20 hover:opacity-50 transition-all duration-200"><ThemeSwitch /></div>
    </div>
  );
}
