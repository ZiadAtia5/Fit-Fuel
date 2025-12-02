import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import { Link, Links } from "react-router-dom";
import absImage from "../images/abs.jpg";
import cardioImage from "../images/cardio.jpg";
import hiitImage from "../images/lossweight.jpg";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./styles/popularWorkouts.css";

const PopularWorkouts = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      easing: "ease-in-out",
      once: false,
    });
  }, []);
  return (
    <div className="popular-workouts">
      <div className="overlay"></div>
      <div className="container">
        <div className="popular-header">
          <p>GYM & FITNESS TRAINING</p>
          <h2>Popular Workouts</h2>
        </div>
        <div data-aos="fade-up" className="content">
          <div className="workout-box">
            <img src={absImage} alt="abs-workout" />
            <div className="text">
              <h3>Abs Workout – 30-Day Challenge</h3>
              <p>
                Sculpt your abs and strengthen your core with our 30-day abs
                workout plan. This program targets all core muscles through
                progressive exercises — from planks and crunches to leg raises
              </p>
            </div>
            <Link key="Abs" to={`/exercisesDetails?type=Abs`}>
              <div className="icon">
                <FontAwesomeIcon icon={faArrowCircleRight} />
              </div>
            </Link>
          </div>
          <div className="workout-box">
            <img src={cardioImage} alt="cardio-workout" />
            <div className="text">
              <h3>Cardio Blast for Fat Loss</h3>
              <p>
                Boost your metabolism and burn calories with high-intensity
                cardio. This program includes jumping jacks, burpees, mountain
                climbers, and fast-paced circuits for maximum fat burning.
              </p>
            </div>

            <Link key="Shoulders" to={`/exercisesDetails?type=Shoulders`}>
              <div className="icon">
                <FontAwesomeIcon icon={faArrowCircleRight} />
              </div>
            </Link>
          </div>

          <div className="workout-box">
            <img src={hiitImage} alt="hiit-workout" />
            <div className="text">
              <h3>HIIT Fat Burning Training</h3>
              <p>
                Burn fat efficiently with High-Intensity Interval Training
                (HIIT). Short bursts of intense cardio followed by recovery
                periods help you shed weight and improve stamina.
              </p>
            </div>
            <Link key="WeightLoss" to={`/exercisesDetails?type=WeightLoss`}>
              {" "}
              <div className="icon">
                <FontAwesomeIcon icon={faArrowCircleRight} />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularWorkouts;
