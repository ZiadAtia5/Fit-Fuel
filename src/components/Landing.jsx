import landingImg from "../images/landing.png";
import { Link } from "react-router-dom";
import { useUser } from "../context/AuthContext";
import "./styles/landing.css";

const Landing = () => {
  const { user } = useUser();
  return (
    <div className="landing">
      <div className="overlay"></div>
      <div className="container">
        <div data-aos="fade-up" className="main">
          <div className="text">
            <h2>KEEP BODY FIT</h2>
            <span className="and">&</span>
            <h2>
              STRON<span className="g">G</span>
            </h2>
            <p>Ready to change your physique, but can’t work out in the gym?</p>
            <div className="butn">
              <Link to={user ? "/profile" : "/login"}>
                <button className="hover">JOIN WITH US</button>
              </Link>

              <Link to="/#services">
                <button className="n-hover">OUR SERVICES </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <h2>
          FOCUS ON YOUR <span>WORKOUTS</span> NOT YOU
        </h2>
      </div>
    </div>
  );
};

export default Landing;
