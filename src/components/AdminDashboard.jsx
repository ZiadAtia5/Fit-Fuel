// src/AdminDashboard.jsx
import React, { useState } from "react";
import MealsManager from "../components/MealsManager";
import ExercisesManager from "../components/ExercisesManager";
import "./styles/dashboard.css";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("meals");

  return (
    <div className="dashboard">
      <div className="content">
        <div className="top">
          <h1>Admin Dashboard</h1>
          <div className="table">
            <button onClick={() => setActiveTab("meals")}>meals</button>
            <button onClick={() => setActiveTab("exercises")}>exercises</button>
          </div>
        </div>
        <div className="right">
          {activeTab === "meals" ? <MealsManager /> : <ExercisesManager />}
        </div>
      </div>
    </div>
  );
}
