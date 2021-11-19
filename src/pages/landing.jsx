import "./landing.css";
import { Link } from "react-router-dom";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import * as animationData from "../assets/landingImage.json";
import { Navbar } from "../components/NavbarAndFooter/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { ThemeContext } from "../ThemeProvider";
import { useContext } from "react";

function LandingPage() {
  const { themeData: theme } = useContext(ThemeContext);

  return (
    <div className={`${theme.dark ? "body" : "body-light"}`}>
      <Navbar />
      <div>
        <div id="flex-con">
          <div id="color-bg">
            <div id="content" className={`${theme.dark ? "" : "content-light"}`}>
              <h1 id="library-name" className={`${theme.dark ? "" : "color-light"}`}>
                <span className={`${theme.dark ? "" : "font-bold"}`}>De Lib</span> <span id="anne">Anne</span>
              </h1>
              <p id="quote" className={`${theme.dark ? "" : "color-light quote-light"}`}>One stop solution for all the bookish stuff.</p>
              <div className="buttons">
                <Link to="/register" className={`signup a-link ${theme.dark ? "" : "a-link-light"}`}>
                  <FontAwesomeIcon icon={faUserPlus} className="mr-3" />
                  <span className="font-normal">Sign up</span>
                </Link>
                <Link to="/books" className={`collection a-link ${theme.dark ? "" : "a-link-light"}`}>
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="anim-left"
                  />
                  <span className="font-normal">See the Collection</span>
                </Link>
              </div>
            </div>
          </div>
          <Player
            autoplay
            loop
            src={animationData}
            style={{ height: "90vh", width: "50vw" }}
          ></Player>
        </div>
      </div>
    </div>
  );
}
export default LandingPage;
