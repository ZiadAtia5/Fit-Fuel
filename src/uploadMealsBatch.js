// src/uploadMealsBatch.js
import { writeBatch, doc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import mealsData from "./mealsData.json";

export async function addMealsWithBatch() {
  try {
    console.log("بدء إضافة الوجبات باستخدام Batch...");

    const batch = writeBatch(db);

    // وجبات Cutting
    mealsData.Meals.Cutting.forEach((meal) => {
      const mealRef = doc(db, "meals", `cutting_${meal.id}`);
      batch.set(mealRef, {
        ...meal,
        type: "cutting",
        category: meal.category.toLowerCase(),
        createdAt: serverTimestamp(),
      });
    });

    // وجبات Bulking
    mealsData.Meals.Bulking.forEach((meal) => {
      const mealRef = doc(db, "meals", `bulking_${meal.id}`);
      batch.set(mealRef, {
        ...meal,
        type: "bulking",
        category: meal.category.toLowerCase(),
        createdAt: serverTimestamp(),
      });
    });

    await batch.commit();
    console.log("🎉 تم إضافة جميع الوجبات بنجاح باستخدام Batch!");
  } catch (error) {
    console.error("❌ حدث خطأ:", error);
  }
}
