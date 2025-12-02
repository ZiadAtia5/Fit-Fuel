import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./styles/exercises.css";

const Exercises = () => {
  const exercisesCategories = [
    {
      name: "chest",
      description:
        "Build and strengthen your chest muscles with effective push-based exercises.",
      image:
        "https://i.postimg.cc/Jhj0jT23/Training-chest-and-shoulders-same-day.jpg",
    },
    {
      name: "back",
      description:
        "Enhance your back strength and posture with pull-focused workouts.",
      image: "https://i.postimg.cc/cJZqvXyc/Health-and-Fitness.jpg",
    },
    {
      name: "legs",
      description:
        "Develop lower body power and endurance with leg-focused exercises.",
      image: "https://i.postimg.cc/W3h5zkzR/download-4.jpg",
    },

    {
      name: "arms",
      description:
        "Increase arm strength and definition with biceps and triceps exercises.",
      image: "https://i.postimg.cc/pTpsrFrt/Ryan-J-Terry.jpg",
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  return (
    <div className="exercises">
      <div className="container">
        <div className="popular-header">
          <p>Workout Categories</p>
          <h2>Find the Perfect Exercises for Every Muscle Group</h2>
        </div>
        <div className="content">
          {exercisesCategories.map((cat) => {
            return (
              <Link
                key={cat.name}
                to={`/exercisesDetails?type=${cat.name}`}
                className="exercise-box"
              >
                <div className="ex-box">
                  <img src={cat.image} alt={cat.name} />
                  <h3>{cat.name}</h3>
                  <p>{cat.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Exercises;
