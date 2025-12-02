import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

const MealsManager = () => {
  const [mealType, setMealType] = useState("cutting");
  const [mealId, setMealId] = useState("");
  const [mealName, setMealName] = useState("");
  const [category, setCategory] = useState("");
  const [calories, setCalories] = useState("");
  const [mode, setMode] = useState("add"); // add or edit
  const [meals, setMeals] = useState([]);

  const fetchMeals = async () => {
    const q = query(collection(db, "meals"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const mealsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMeals(mealsData);
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const handleEditClick = (meal) => {
    setMode("edit");
    setMealType(meal.type);
    setMealId(meal.id.split("_")[1]);
    setMealName(meal.name);
    setCategory(meal.category);
    setCalories(meal.calories);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const mealRef = doc(collection(db, "meals"), `${mealType}_${mealId}`);

      if (mode === "add") {
        await setDoc(mealRef, {
          id: mealId,
          name: mealName,
          category,
          calories: Number(calories),
          type: mealType,
          createdAt: new Date(),
        });
        alert("✅ تم إضافة الوجبة بنجاح");
      } else {
        await updateDoc(mealRef, {
          name: mealName,
          category,
          calories: Number(calories),
          updatedAt: new Date(),
        });
        alert("✏️ تم تعديل الوجبة بنجاح");
      }

      fetchMeals();

      setMealId("");
      setMealName("");
      setCategory("");
      setCalories("");
      setMode("add");
    } catch (error) {
      console.error("حدث خطأ:", error);
      alert("❌ حدث خطأ أثناء العملية");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <h2>📋 إدارة الوجبات</h2>

      <label>اختيار الوضع:</label>
      <select value={mode} onChange={(e) => setMode(e.target.value)}>
        <option value="add">إضافة</option>
        <option value="edit">تعديل</option>
      </select>

      <form onSubmit={handleSubmit}>
        <label>نوع الوجبة:</label>
        <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
          <option value="cutting">Cutting</option>
          <option value="bulking">Bulking</option>
        </select>

        <label>معرف الوجبة (ID):</label>
        <input
          type="text"
          value={mealId}
          onChange={(e) => setMealId(e.target.value)}
          required
        />

        <label>اسم الوجبة:</label>
        <input
          type="text"
          value={mealName}
          onChange={(e) => setMealName(e.target.value)}
          required
        />

        <label>الفئة:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <label>السعرات (Calories):</label>
        <input
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          required
        />

        <button type="submit" style={{ marginTop: "15px" }}>
          {mode === "add" ? "➕ إضافة وجبة" : "✏️ تعديل وجبة"}
        </button>
      </form>

      <hr style={{ margin: "30px 0" }} />

      <h3>🍽️ قائمة الوجبات الحالية</h3>

      {meals.length === 0 ? (
        <p>لا توجد وجبات بعد.</p>
      ) : (
        <table
          border="1"
          cellPadding="8"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "10px",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>الاسم</th>
              <th>الفئة</th>
              <th>السعرات</th>
              <th>النوع</th>
              <th>تحكم</th>
            </tr>
          </thead>
          <tbody>
            {meals.map((meal) => (
              <tr key={meal.id}>
                <td>{meal.id}</td>
                <td>{meal.name}</td>
                <td>{meal.category}</td>
                <td>{meal.calories}</td>
                <td>{meal.type}</td>
                <td>
                  <button onClick={() => handleEditClick(meal)}>تعديل</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MealsManager;
