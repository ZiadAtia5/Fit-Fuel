import { useLocation } from "react-router-dom";
import { useState } from "react";
import { auth, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRedoAlt,
  faLayerGroup,
  faClock,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import "./styles/startExercise.css";
import { useUser } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const StartExersise = () => {
  const { state } = useLocation();
  const exercises = state?.exercises || [];
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(
    state?.currentIndex || 0
  );
  const { setProfileData, profileData, user } = useUser();

  const exercise = exercises[currentExerciseIndex];

  if (!exercise) {
    return <p className="no">No exercise data found.</p>;
  }

  const handleChange = () => {
    setProfileData((prev) => {
      const safe = prev || {};
      return {
        ...safe,
        workout: (safe.workout || 0) + 1,
      };
    });
  };

  const handleSave = async () => {
    if (user) {
      const userRef = doc(db, "userProfiles", user.uid);
      await updateDoc(userRef, profileData);
    }
  };

  const handleNext = () => {
    if (currentExerciseIndex < exercises.length - 1) {
      setCurrentExerciseIndex((prev) => prev + 1);
      handleChange();
      handleSave();
    }
  };

  const handlePrev = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="start-exercise">
      <div className="container">
        <div className="content">
          <div className="c-header">
            <h2>{exercise.name}</h2>
          </div>

          <div className="c-image">
            <AnimatePresence mode="wait">
              <motion.img
                key={exercise.id}
                src={exercise.videoLink}
                alt={exercise.name}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
          </div>

          <div className="c-main">
            <div className="box">
              <div className="main-icon">
                <FontAwesomeIcon className="m-icon" icon={faRedoAlt} />
              </div>
              <h3>reps</h3>
              <p>{exercise.reps}</p>
            </div>

            <div className="box">
              <div className="main-icon">
                <FontAwesomeIcon className="m-icon" icon={faClock} />
              </div>
              <h3>rest time</h3>
              <p>{exercise.restTime}</p>
            </div>

            <div className="box">
              <div className="main-icon">
                <FontAwesomeIcon className="m-icon" icon={faLayerGroup} />
              </div>
              <h3>sets</h3>
              <p>{exercise.sets}</p>
            </div>
          </div>

          <div className="c-footer">
            <div
              className={`left ${currentExerciseIndex === 0 ? "disabled" : ""}`}
              onClick={handlePrev}
            >
              <FontAwesomeIcon className="f-icon" icon={faArrowLeft} />
            </div>

            <div className="box">
              <h3>difficulty</h3>
              <div className="medle">
                <div
                  className="child"
                  style={{
                    width:
                      exercise.difficulty === "Beginner"
                        ? "33%"
                        : exercise.difficulty === "Intermediate"
                        ? "66%"
                        : "100%",
                    backgroundColor:
                      exercise.difficulty === "Beginner"
                        ? "#22c55e"
                        : exercise.difficulty === "Intermediate"
                        ? "#eab308"
                        : "#ef4444",
                  }}
                ></div>
              </div>
            </div>

            <div
              className={`right ${
                currentExerciseIndex === exercises.length - 1 ? "disabled" : ""
              }`}
              onClick={handleNext}
            >
              <FontAwesomeIcon className="f-icon" icon={faArrowRight} />
            </div>
          </div>

          <p
            className="counter"
            style={{
              color:
                currentExerciseIndex + 1 >= 9
                  ? "#22c55e"
                  : currentExerciseIndex + 1 >= 5
                  ? "#eab308"
                  : "#ef4444",
            }}
          >
            {currentExerciseIndex + 1} / {exercises.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StartExersise;
