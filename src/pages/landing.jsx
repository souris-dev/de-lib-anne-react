import "./landing.css";
import { Link } from "react-router-dom";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import * as animationData from "../assets/landingImage.json";
import { Navbar } from "../components/Navbar/Navbar";

function LandingPage() {
  return (
    <div className="body">
    <Navbar />
    <div >
      <div id="flex-con">
        <div id="color-bg">
          <div id="content">
            <h1 id="library-name">
              De Lib <span id="anne">Anne</span>
            </h1>
            <p id="quote">One stop solution for all the bookish stuff.</p>
            <div className="buttons">
              <Link to="/register" className="signup" >
                <i className="fas fa-user-plus"></i> Sign Up
              </Link>
              <Link to="/books" className="collection" >
                <i className="fas fa-chevron-right anim-left"></i> See the
                Collection
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
