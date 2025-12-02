import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

function Db() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const mealsCollection = query(
          collection(db, "meals"),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(mealsCollection);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMeals(data);
      } catch (error) {
        console.error("❌ Error fetching meals:", error);
      }
    };

    fetchMeals();
  }, []);

  return (
    <div
      style={{
        padding: "20px",
        background: "#111",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ textAlign: "center" }}>🍽️ قائمة جميع الوجبات</h2>

      {meals.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {meals.map((meal, index) => (
            <div
              key={index}
              style={{
                background: "#222",
                padding: "15px",
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.5)",
              }}
            >
              <h3 style={{ color: "#4cc9f0", marginBottom: "8px" }}>
                {meal.name}
              </h3>
              <p>
                🏷️ <strong>الفئة:</strong> {meal.category || "غير محددة"}
              </p>
              <p>
                🔥 <strong>السعرات:</strong> {meal.calories || 0}
              </p>
              <p>
                ⚙️ <strong>النوع:</strong> {meal.type || "N/A"}
              </p>
              <p style={{ fontSize: "0.9em", color: "#aaa" }}>
                🕓{" "}
                {meal.createdAt?.seconds
                  ? new Date(meal.createdAt.seconds * 1000).toLocaleString()
                  : "—"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ textAlign: "center", marginTop: "40px" }}>
          ⏳ جاري تحميل الوجبات...
        </p>
      )}
    </div>
  );
}

export default Db;
