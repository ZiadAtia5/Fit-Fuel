import { writeBatch, doc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import exercisesData from "./exercisesData.json";

export async function addExercisesWithBatch() {
  try {
    console.log("🚀 بدء رفع التمارين إلى Firebase...");

    const batch = writeBatch(db);
    const allCategories = Object.keys(exercisesData.Exercises); // [ "Abs", "Chest", "Back", ... ]

    allCategories.forEach((category) => {
      const exercises = exercisesData.Exercises[category];

      exercises.forEach((exercise) => {
        const exerciseRef = doc(db, "exercises", `${category}_${exercise.id}`);
        batch.set(exerciseRef, {
          ...exercise,
          category: category,
          createdAt: serverTimestamp(),
        });
      });
    });

    await batch.commit();
    console.log("🎉 تم رفع جميع التمارين بنجاح إلى Firebase!");
  } catch (error) {
    console.error("❌ حدث خطأ أثناء الرفع:", error);
  }
}
