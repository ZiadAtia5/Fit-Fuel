import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import "./styles/caloriesCalculator.css";

const CaloriesCalculator = () => {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [goal, setGoal] = useState("Bulking");
  const [result, setResult] = useState("");

  const calculateCalories = () => {
    let bmr;
    if (!gender) {
      alert("Please select your gender");
      return;
    } else if (!age || !height || !weight) {
      alert("Please fill in all fields");
      return;
    }
    if (gender === "male") {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else if (gender === "female") {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    let activityFactor = 1.2;
    switch (activityLevel) {
      case "Lightlyactive":
        activityFactor = 1.375;
        break;
      case "Moderatelyactive":
        activityFactor = 1.55;
        break;
      case "Veryactive":
        activityFactor = 1.725;
        break;
      default:
        activityFactor = 1.2;
    }
    let total = bmr * activityFactor;
    let finalCalories = goal === "Bulking" ? total * 1.15 : total * 0.85;

    setResult(Math.round(finalCalories));
  };

  return (
    <div className="Calories-calculator">
      <div className="container">
        <div className="popular-header">
          <p>Calories Calculator</p>
          <h2>Calculate Your Daily Calorie Needs</h2>
        </div>
        <div className="content">
          <div className="top">
            <div className="form">
              <div className="left">
                <div className="gender">
                  <p>Gender</p>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="male"
                      checked={gender === "male"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    Male
                  </label>
                  <label>
                    <input
                      placeholder=" "
                      type="radio"
                      name="gender"
                      id="female"
                      value="female"
                      checked={gender === "female"}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    Female
                  </label>
                </div>

                <div className="input-wraper">
                  <label htmlFor="age">Age</label>
                  <input
                    placeholder=" "
                    type="number"
                    name="age"
                    id="age"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
                <div className="input-wraper">
                  <label htmlFor="weight">Weight</label>
                  <input
                    placeholder=" "
                    type="number"
                    name="weight"
                    id="weight"
                    onChange={(e) => setWeight(e.target.value)}
                  />
                  <p>kg</p>
                </div>
                <div className="input-wraper">
                  <label htmlFor="height">Height</label>
                  <input
                    placeholder=" "
                    type="number"
                    name="height"
                    id="height"
                    onChange={(e) => setHeight(e.target.value)}
                  />
                  <p>cm</p>
                </div>
              </div>
              <div className="right-c">
                <div className="r-c">
                  <div className="input-wraper select">
                    <label htmlFor="activity">Activity Level</label>
                    <select
                      className="activity"
                      value={activityLevel}
                      name="activity"
                      id="activity"
                      onChange={(e) => setActivityLevel(e.target.value)}
                    >
                      <option value="Sedentary">
                        Sedentary (little or no exercise)
                      </option>
                      <option value="Lightlyactive">
                        Lightly active (exercise 1–3 days per week)
                      </option>
                      <option value="Moderatelyactive">
                        Moderately active (exercise 3–5 days per week)
                      </option>
                      <option value="Veryactive">
                        Very active (exercise 6–7 days per week)
                      </option>
                    </select>
                  </div>
                  <div className="input-wraper select">
                    <label htmlFor="goal">Goal</label>
                    <select
                      className="goal"
                      value={goal}
                      name="goal"
                      id="goal"
                      onChange={(e) => setGoal(e.target.value)}
                    >
                      <option value="Bulking">Bulking</option>
                      <option value="Cutting">Cutting</option>
                    </select>
                  </div>
                  <button className="btn" onClick={() => calculateCalories()}>
                    Calculate
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="r-content">
              <div className="text">
                <FontAwesomeIcon className="icon" icon={faFire} />
                <h3>{result || 0}</h3>
                <p>kcal/day</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaloriesCalculator;
