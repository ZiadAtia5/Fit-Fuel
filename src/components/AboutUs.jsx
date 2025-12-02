import { useFoods } from "../context/FoodProvider";
import aboutImage from "../images/about-us.jpg";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./styles/aboutUs.css";
import { useExercises } from "../context/ExerciseContext";
import tipsData from "../data/fitnessTips.json";

const AboutUs = () => {
  const { totalExercises } = useExercises();
  const { totalMeals } = useFoods();
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
      <div className="about-us">
        <div className="content">
          <div data-aos="fade-right" className="image">
            <img src={aboutImage} alt="about us  image" />
          </div>
          <div data-aos="fade-up" className="text">
            <p className="p">ABOUT US</p>
            <h2>Unleashing Potential With Intense Fitness Workouts</h2>
            <p>
              Body fitness encompasses various aspects of physical health and
              well-being, including a combination of exercise, nutrition, and
              lifestyle choices. Achieving and maintaining body fitness
              contributes to overall health, vitality.
            </p>
            <p className="with-line">Over 3 years of experience</p>
            <p className="with-line">Certified Trainers</p>
            <p className="with-line">Exceptional work quality</p>
          </div>
        </div>
        <div data-aos="fade-up" className="footer">
          <div className="item-box">
            <h3>
              {tipsData.length} <span>+</span>
            </h3>
            <p>Tips</p>
          </div>
          <div className="item-box">
            <h3>
              3 <span>+</span>
            </h3>
            <p>experience</p>
          </div>
          <div className="item-box">
            <h3>
              {totalMeals} <span>+</span>
            </h3>
            <p>Meals</p>
          </div>
          <div className="item-box">
            <h3>
              {totalExercises} <span>+</span>
            </h3>
            <p>workouts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
