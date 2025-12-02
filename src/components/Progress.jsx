import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDumbbell,
  faFire,
  faWeight,
  faWeightHanging,
} from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";
import { useUser } from "../context/AuthContext";
import "./styles/progress.css";

const Progress = () => {
  const { user, profileData } = useUser();
  const [animate, setAnimate] = useState(false);
  const [bmi, setBmi] = useState(0);
  const [weightCategory, setWeightCategory] = useState("");
  const [weightColor, setWeightColor] = useState("");

  useEffect(() => {
    if (profileData.height && profileData.weight) {
      const cmHeight = Number(profileData.height);
      const mHeight = cmHeight / 100;
      const result = Number(profileData.weight) / (mHeight * mHeight);
      setBmi(result.toFixed(1));
      if (result < 18.5) {
        setWeightCategory("Underweight");
        setWeightColor("#e3ff00");
      } else if (result < 25) {
        setWeightCategory("Normal weight");
        setWeightColor("#00ff00");
      } else if (result < 30) {
        setWeightCategory("Over weight");
        setWeightColor("#ff3500");
      } else setWeightCategory("Obese");
    }
  }, [profileData.height, profileData.weight]);

  useEffect(() => {
    AOS.init({
      duration: 500,
      offset: 100,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  useEffect(() => {
    if (profileData?.workout || bmi) {
      setAnimate(false);
      const timer = setTimeout(() => {
        setAnimate(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [profileData?.workout, bmi]);

  const progressValue = Math.min(Math.max(profileData?.workout || 0, 0), 1000);

  return (
    <div className="progress">
      <div className="container">
        {user ? (
          <div className="content">
            <div className="popular-header">
              <p>Your Fitness Progress</p>
              <h2>Track Your Journey and See How Far You’ve Come</h2>
            </div>
            <div className="progress-content">
              <div data-aos="fade-up" className="workout">
                <div className="w-header">
                  <h2>Workouts</h2>
                  <p>{profileData.weight} Kg</p>
                  <FontAwesomeIcon className="d-icon" icon={faDumbbell} />
                </div>
                <div className="w-main">
                  <div
                    className="w-p"
                    style={{
                      background: animate
                        ? `conic-gradient(#00ff7b ${
                            progressValue * 3.6
                          }deg, var(--color-gray-text) 0deg)`
                        : "var(--color-gray-text)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <div className="inner">
                      <h3>{progressValue}</h3>
                      <p>Record</p>
                    </div>
                  </div>
                </div>
                <div className="w-footer">
                  <h3>
                    {profileData.workout >= 1
                      ? "Great job!!"
                      : "you must training"}
                  </h3>
                </div>
              </div>
              <div data-aos="fade-left" className="right">
                <div className="r-box">
                  <div className="r-left">
                    <FontAwesomeIcon className="r-icon" icon={faFire} />
                  </div>
                  <div className="r-right">
                    <h3>{profileData.calories} Kcal</h3>
                    <p>total calories</p>
                  </div>
                </div>
                <div className="r-box">
                  <div className="r-left">
                    <FontAwesomeIcon className="r-icon" icon={faDumbbell} />
                  </div>
                  <div className="r-right">
                    <h3>{profileData.workout} </h3>
                    <p>total Workouts</p>
                  </div>
                </div>
                <div className="r-box">
                  <div className="r-left">
                    <FontAwesomeIcon className="r-icon" icon={faWeight} />
                  </div>
                  <div className="r-right">
                    <h3>{profileData.weight} Kg</h3>
                    <p>weight</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="prog-weight">
              <div className="w-content">
                <div className="w-left">
                  <p>
                    <FontAwesomeIcon
                      className="w-icon"
                      icon={faWeightHanging}
                    />{" "}
                    weight progress
                  </p>
                  <h3>{weightCategory}</h3>
                </div>
                <div className="w-right">
                  <div className="w-parent">
                    <div
                      className="w-child"
                      style={{
                        background: animate
                          ? `conic-gradient(${weightColor} ${
                              bmi * 2.56 * 3.6
                            }deg, #c6c6c6ff 0deg)`
                          : "var(--color-gray-text)",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <div className="inner">
                        <h3>{bmi}</h3>
                        <p>BMI</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="no-user">
            <h2>You must sign in!</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Progress;
