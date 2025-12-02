import { useEffect, useState } from "react";
import { useFoods } from "../context/FoodProvider";
import Loading from "../components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";
import "./styles/foodlist.css";

const FoodList = () => {
  const { meals, loading, error, totalMeals, getMealsByType } = useFoods();
  const [filter, setFilter] = useState("all");

  const filters = ["all", "breakfast", "lunch", "dinner", "snack"];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <>
          <div className="filters">
            <div className="container">
              <div className="content">
                {filters.map((type, index) => (
                  <button
                    key={index}
                    className={filter === type ? "active" : ""}
                    onClick={() => setFilter(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="container">
            <div data-aos="fade-up" className="items">
              {totalMeals === 0 ? (
                <h3 className="no-item">
                  No items are currently available in this section
                </h3>
              ) : filter === "all" ? (
                meals.map((meal, index) => {
                  return (
                    <div className="items-box" key={index}>
                      <img src={meal.image} alt={meal.title} />
                      <h3>{meal.title}</h3>
                      <p>category: {meal.category}</p>
                      <p>time: {meal.prepTime} </p>
                      <Link to={`/foodDetails/${meal.id}`} state={{ meal }}>
                        <div className="link">
                          <p>MORE DETALS</p>
                          <FontAwesomeIcon
                            className="icon"
                            icon={faArrowRight}
                          />
                        </div>
                      </Link>
                    </div>
                  );
                })
              ) : (
                getMealsByType(filter).map((meal, index) => {
                  return (
                    <div className="items-box" key={index}>
                      <img src={meal.image} alt={meal.title} />
                      <h3>{meal.title}</h3>
                      <p>category: {meal.category}</p>
                      <p>time: {meal.prepTime} </p>
                      <Link to={`/foodDetails/${meal.id}`} state={{ meal }}>
                        <div className="link">
                          <p>MORE DETALS</p>
                          <FontAwesomeIcon
                            className="icon"
                            icon={faArrowRight}
                          />
                        </div>
                      </Link>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FoodList;
