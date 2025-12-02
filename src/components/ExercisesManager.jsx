// src/components/ExercisesManager.jsx
import React, { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useExercises } from "../context/ExerciseContext";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faX } from "@fortawesome/free-solid-svg-icons";
import "./styles/excercisesManager.css";

export default function ExercisesManager() {
  const [add, setAdd] = useState(false);
  const [newExercise, setNewExercise] = useState({
    name: "",
    category: "",
    difficulty: "",
    sets: "",
    reps: "",
  });

  const {
    exercises,
    deleteExercise,
    updateExercise,
    fetchAllExercises,
    totalExercises,
  } = useExercises();
  useEffect(() => {
    fetchAllExercises();
  }, []);

  const exercisesRef = collection(db, "Exercises");

  const addExercise = async () => {
    if (!newExercise.name || !newExercise.category)
      return toast.warning("Fall all field");
    await addDoc(exercisesRef, newExercise);
    fetchAllExercises();
    setAdd(false);
    toast.success("added exsecise successfully");
    setNewExercise({
      name: "",
      category: "",
      difficulty: "",
      sets: "",
      reps: "",
    });
  };

  return (
    <div className="container">
      <h2 className="ex-title">
        Exercises Manager Totall ({totalExercises})
        {
          <FontAwesomeIcon
            className="add-icon"
            icon={faEdit}
            onClick={() => setAdd(true)}
          />
        }
      </h2>

      {add && (
        <div className="ex-card">
          <FontAwesomeIcon
            className="x-icon"
            icon={faX}
            onClick={() => setAdd(false)}
          />
          <div className="ex-inputs">
            <input
              type="text"
              placeholder="Exercise Name"
              value={newExercise.name}
              onChange={(e) =>
                setNewExercise({ ...newExercise, name: e.target.value })
              }
              className="in-field"
            />

            <select
              value={newExercise.category}
              onChange={(e) =>
                setNewExercise({ ...newExercise, category: e.target.value })
              }
              className="in-field"
            >
              <option value="">Select Category</option>
              <option value="Chest">Chest</option>
              <option value="Back">Back</option>
              <option value="Legs">Legs</option>
              <option value="Shoulders">Shoulders</option>
              <option value="Arms">Arms</option>
              <option value="Abs">Abs</option>
            </select>

            <select
              value={newExercise.difficulty}
              onChange={(e) =>
                setNewExercise({ ...newExercise, difficulty: e.target.value })
              }
              className="in-field"
            >
              <option value="">Select Difficulty</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <select
              value={newExercise.sets}
              onChange={(e) =>
                setNewExercise({ ...newExercise, sets: e.target.value })
              }
              className="in-field"
            >
              <option value="">Select Sets</option>
              <option value="2">2 Sets</option>
              <option value="3">3 Sets</option>
              <option value="4">4 Sets</option>
              <option value="5">5 Sets</option>
            </select>

            <select
              value={newExercise.reps}
              onChange={(e) =>
                setNewExercise({ ...newExercise, reps: e.target.value })
              }
              className="in-field"
            >
              <option value="">Select Reps</option>
              <option value="6-8">6-8</option>
              <option value="8-10">8-10</option>
              <option value="10-12">10-12</option>
              <option value="12-15">12-15</option>
              <option value="15-20">15-20</option>
            </select>
          </div>

          <button className="ex-btn" onClick={addExercise}>
            Add Exercise
          </button>
        </div>
      )}

      <table className="ex-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Difficulty</th>
            <th>Sets</th>
            <th>Reps</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {exercises.map((ex, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={ex.name}
                  onChange={(e) =>
                    updateExercise(ex.id, "name", e.target.value)
                  }
                  className="table-input"
                />
              </td>
              <td>
                <select
                  value={ex.category}
                  onChange={(e) =>
                    updateExercise(ex.id, "category", e.target.value)
                  }
                  className="table-input"
                >
                  <option value="Chest">Chest</option>
                  <option value="Back">Back</option>
                  <option value="Legs">Legs</option>
                  <option value="Shoulders">Shoulders</option>
                  <option value="Arms">Arms</option>
                  <option value="Abs">Abs</option>
                </select>
              </td>
              <td>
                <select
                  value={ex.difficulty}
                  onChange={(e) =>
                    updateExercise(ex.id, "difficulty", e.target.value)
                  }
                  className="table-input"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </td>
              <td>
                <select
                  value={ex.sets}
                  onChange={(e) =>
                    updateExercise(ex.id, "sets", e.target.value)
                  }
                  className="table-input"
                >
                  <option value="2">2 Sets</option>
                  <option value="3">3 Sets</option>
                  <option value="4">4 Sets</option>
                  <option value="5">5 Sets</option>
                </select>
              </td>
              <td>
                <select
                  value={ex.reps}
                  onChange={(e) =>
                    updateExercise(ex.id, "reps", e.target.value)
                  }
                  className="table-input"
                >
                  <option value="6-8">6-8</option>
                  <option value="8-10">8-10</option>
                  <option value="10-12">10-12</option>
                  <option value="12-15">12-15</option>
                  <option value="15-20">15-20</option>
                </select>
              </td>
              <td className="ex-actions">
                <button onClick={() => deleteExercise(ex.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
