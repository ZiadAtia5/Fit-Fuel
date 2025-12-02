import { useLocation, Link } from "react-router-dom";
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import { useExercises } from "../context/ExerciseContext";
import AOS from "aos";
import "aos/dist/aos.css";
import "./styles/exerciseDetails.css";

const ExerciseDetails = () => {
  const { getExercisesByType, loading } = useExercises();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type");

  const exercises = getExercisesByType(type);

  if (loading) return <Loading />;

  return (
    <div className="exercise-details">
      <div className="container">
        <h2>{type.toUpperCase()} Exercises</h2>
        {exercises.length === 0 ? (
          <p>No exercises found for this category.</p>
        ) : (
          <div className="exercise-list">
            <h2>{type} workout</h2>
            <div className="ex-list">
              {exercises.map((ex, index) => (
                <Link
                  key={index}
                  to={`/startExercise/${ex.id}`}
                  state={{ exercises, currentIndex: index }}
                >
                  <div data-aos="fade-up" className="exercise-card">
                    <div className="image">
                      {ex.image && <img src={ex.image} alt={ex.name} />}
                    </div>
                    <div className="text">
                      <div className="ex-main">
                        <h3>{ex.name}</h3>
                      </div>
                      <div className="ex-footer">
                        <p>{ex.difficulty}</p>
                        <p>{ex.reps}</p>

                        <p>{ex.restTime}</p>
                      </div>
                      <FontAwesomeIcon
                        className="icon"
                        icon={faArrowAltCircleRight}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseDetails;
