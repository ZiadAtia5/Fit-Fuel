// src/components/MealsManager.jsx
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faX } from "@fortawesome/free-solid-svg-icons";

import "./styles/mealsManager.css";

export default function MealsManager() {
  const [addMode, setAddMode] = useState(false);
  const [meals, setMeals] = useState([]);
  const [newMeal, setNewMeal] = useState({
    name: "",
    type: "",
    calories: "",
  });

  const mealsRef = collection(db, "meals");

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    const snapshot = await getDocs(mealsRef);
    const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    setMeals(data);
  };

  const addMeal = async () => {
    if (!newMeal.name || !newMeal.type) {
      alert("Please fill all required fields");
      return;
    }
    await addDoc(mealsRef, newMeal);
    fetchMeals();
    setNewMeal({ name: "", type: "", calories: "" });
    setAddMode(false);
  };

  const updateMeal = async (id, field, value) => {
    const docRef = doc(db, "meals", id);
    await updateDoc(docRef, { [field]: value });
    fetchMeals();
  };

  const deleteMeal = async (id) => {
    await deleteDoc(doc(db, "meals", id));
    fetchMeals();
  };

  return (
    <div className="container">
      <h2 className="title">
        Meals Management
        <FontAwesomeIcon
          className="add-icon"
          icon={faEdit}
          onClick={() => setAddMode(true)}
        />
      </h2>

      {addMode && (
        <div className="meal-form">
          <FontAwesomeIcon
            className="x-icon"
            icon={faX}
            onClick={() => setAddMode(false)}
          />

          <input
            className="meal-input"
            type="text"
            placeholder="Meal Name"
            value={newMeal.name}
            onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
          />

          <select
            className="meal-input"
            value={newMeal.type}
            onChange={(e) => setNewMeal({ ...newMeal, type: e.target.value })}
          >
            <option value="">Select Type</option>
            <option value="Bulking">Bulking</option>
            <option value="Cutting">Cutting</option>
            <option value="Maintenance">Maintenance</option>
          </select>

          <input
            className="meal-input"
            type="number"
            placeholder="Calories"
            value={newMeal.calories}
            onChange={(e) =>
              setNewMeal({ ...newMeal, calories: e.target.value })
            }
          />

          <button className="add-btn" onClick={addMeal}>
            Add Meal
          </button>
        </div>
      )}

      <table className="meals-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Calories</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {meals.map((meal, index) => (
            <tr key={index}>
              <td>
                <input
                  className="table-input"
                  type="text"
                  defaultValue={meal.name}
                  onBlur={(e) => updateMeal(meal.id, "name", e.target.value)}
                />
              </td>

              <td>
                <select
                  className="table-input"
                  defaultValue={meal.type}
                  onChange={(e) => updateMeal(meal.id, "type", e.target.value)}
                >
                  <option value="Bulking">Bulking</option>
                  <option value="Cutting">Cutting</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </td>

              <td>
                <input
                  className="table-input"
                  type="number"
                  defaultValue={meal.calories}
                  onBlur={(e) =>
                    updateMeal(meal.id, "calories", e.target.value)
                  }
                />
              </td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteMeal(meal.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
