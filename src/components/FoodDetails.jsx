import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faOilCan,
  faDrumstickBite,
  faFire,
} from "@fortawesome/free-solid-svg-icons";
import "./styles/foodDetails.css";

const FoodDetails = () => {
  const { state } = useLocation();
  const food = state?.meal;

  return (
    <div className="container">
      <div className="food-details">
        <div className="content">
          <div className="image-features">
            <img src={food.image} alt={food.title} />
            <div className="features">
              <div className="feature-box">
                <div className="icon">
                  <FontAwesomeIcon icon={faDrumstickBite} className={"no"} />
                </div>
                <div className="text">
                  <p>protein</p>
                  <p>{food.protein}</p>
                </div>
              </div>
              <div className="feature-box">
                <div className="icon">
                  <FontAwesomeIcon icon={faFire} className={"no"} />
                </div>
                <div className="text">
                  <p>calorie</p>
                  <p>{food.calories}</p>
                </div>
              </div>
              <div className="feature-box">
                <div className="icon">
                  <FontAwesomeIcon icon={faOilCan} className={"no"} />
                </div>
                <div className="text">
                  <p>fat</p>
                  <p>{food.fat}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="details">
            <h2>{food.name}</h2>
            <p>Total Time: {food.totalTime}</p>
            <h3>ingredients</h3>
            <ol>
              {food.ingredients.map((ing, index) => (
                <li key={index}>{ing}</li>
              ))}
            </ol>
            <h3>instructions</h3>
            <ol>
              {food.instructions.map((ing, index) => (
                <li key={index}>{ing}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
