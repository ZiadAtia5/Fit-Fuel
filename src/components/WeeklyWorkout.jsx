import pushImage from "../images/push.jpg";
import pullImage from "../images/pull.jpg";
import legImage from "../images/leg.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./styles/weeklyWorkout.css";

const WeeklyWorkout = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  return (
    <div className="weekly-workout">
      <div className="container">
        <div className="popular-header">
          <p>Weekly Workout Schedule</p>
          <h2>Push Pull Legs Workouts</h2>
        </div>
        <div className="content">
          <Link
            key="push"
            to={`/exercisesDetails?type=push`}
            className="exercise-box"
          >
            <div data-aos="fade-up" className="left">
              <div className="l-content">
                <div className="overlay"></div>
                <img src={pushImage} alt="push" />
                <h3>PUSH</h3>
                <FontAwesomeIcon className="icon" icon={faArrowCircleRight} />
              </div>
            </div>
          </Link>

          <div data-aos="fade-left" className="right">
            <Link
              key="pull"
              to={`/exercisesDetails?type=pull`}
              className="exercise-box"
            >
              {" "}
              <div className="r-content">
                <div className="overlay"></div>
                <img src={pullImage} alt="pull" />
                <h3>PULL</h3>
                <FontAwesomeIcon className="icon" icon={faArrowCircleRight} />
              </div>
            </Link>
            <Link
              key="legs"
              to={`/exercisesDetails?type=legs`}
              className="exercise-box"
            >
              <div className="r-content">
                <div className="overlay"></div>
                <img src={legImage} alt="legs" />
                <h3>LEGS</h3>
                <FontAwesomeIcon className="icon" icon={faArrowCircleRight} />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyWorkout;
