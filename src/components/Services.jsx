import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./styles/services.css";

const Services = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      easing: "ease-in-out",
      once: false,
    });
  }, []);
  return (
    <div className="container">
      <div className="services">
        <p className="p">OUR SERVICES</p>
        <h2>Our Service For You</h2>
        <div data-aos="fade-up" className="content">
          <div className="service-box">
            <div className="icons">
              <FontAwesomeIcon className="icon" icon={faDumbbell} />
            </div>
            <h3>Workout Library</h3>
            <p>
              Explore a wide variety of workouts, including strength, cardio,
              and flexibility routines, all designed to help you stay fit and
              reach your goals.
            </p>
            <Link to="exercises">
              <div className="link">
                <p>READ MORE</p>
                <FontAwesomeIcon className="icon" icon={faArrowRight} />
              </div>
            </Link>
          </div>

          <div className="service-box">
            <div className="icons">
              <FontAwesomeIcon className="icon" icon={faDumbbell} />
            </div>
            <h3>Healthy Meal Plans</h3>
            <p>
              Explore delicious and easy-to-cook healthy recipes to fuel your
              body before and after workouts.{" "}
            </p>
            <Link to="/foods">
              <div className="link">
                <p>READ MORE </p>
                <FontAwesomeIcon className="icon" icon={faArrowRight} />
              </div>
            </Link>
          </div>

          <div className="service-box">
            <div className="icons">
              <FontAwesomeIcon className="icon" icon={faDumbbell} />
            </div>
            <h3>Track Your Progress</h3>
            <p>
              Log your daily workouts and monitor your progress with visual
              charts and performance stats.{" "}
            </p>
            <Link to="/progress">
              <div className="link">
                <p>READ MORE </p>
                <FontAwesomeIcon className="icon" icon={faArrowRight} />
              </div>
            </Link>
          </div>

          <div className="service-box">
            <div className="icons">
              <FontAwesomeIcon className="icon" icon={faDumbbell} />
            </div>
            <h3>Fitness & Motivation Tips</h3>
            <p>
              Discover expert fitness advice and motivational articles to keep
              you consistent and focused.{" "}
            </p>
            <Link to="/fitnesstips">
              <div className="link">
                <p>READ MORE </p>
                <FontAwesomeIcon className="icon" icon={faArrowRight} />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
