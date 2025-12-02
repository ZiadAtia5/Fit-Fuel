import React from "react";
import tipsData from "../data/fitnessTips.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarCheck,
  faDumbbell,
  faWater,
  faChartLine,
  faHeartPulse,
  faRunning,
  faWalking,
  faLeaf,
  faBed,
  faExclamationTriangle,
  faUtensils,
  faEarListen,
  faStar,
  faUsers,
  faPerson,
  faTrophy,
  faHeart,
  faMugHot,
} from "@fortawesome/free-solid-svg-icons";

const iconsMap = {
  faCalendarCheck,
  faDumbbell,
  faWater,
  faChartLine,
  faHeartPulse,
  faRunning,
  faWalking,
  faLeaf,
  faBed,
  faExclamationTriangle,
  faUtensils,
  faEarListen,
  faStar,
  faUsers,
  faPerson,
  faTrophy,
  faHeart,
  faMugHot,
};
import "./styles/fitnesstips.css";

export default function FitnessTips() {
  return (
    <div className="fitness-tips">
      <div className="container">
        <h2>Fitness & Motivation Tips</h2>
        <div data-aos="fade-up" className="tips-container">
          {tipsData.map((tip, index) => (
            <div className="tip-box" key={index}>
              <FontAwesomeIcon
                icon={iconsMap[tip.icon] || faStar}
                className="ff-icon"
              />
              <h3>{tip.title}</h3>
              <p>{tip.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
