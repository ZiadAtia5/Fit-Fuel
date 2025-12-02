import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "sonner";

const ExerciseContext = createContext();

export const ExerciseProvider = ({ children }) => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllExercises = useCallback(async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, "Exercises"));
      const data = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setExercises(data);
    } catch (err) {
      console.error("Error fetching exercises:", err);
      toast.error(
        "Failed to fetch exercises. Check your database permissions."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllExercises();
  }, [fetchAllExercises]);

  const deleteExercise = async (id) => {
    try {
      await deleteDoc(doc(db, "Exercises", id));
      toast.success("Exercise deleted successfully");
      fetchAllExercises();
    } catch (err) {
      toast.error("Failed to delete exercise");
    }
  };

  const updateExercise = async (id, field, value) => {
    try {
      const ref = doc(db, "Exercises", id);
      await updateDoc(ref, { [field]: value });
      toast.success("Exercise updated successfully");
      fetchAllExercises();
    } catch (err) {
      toast.error("Failed to update exercise");
    }
  };

  const getExercisesByType = (type) => {
    return exercises.filter(
      (ex) => ex.category?.toLowerCase() === type?.toLowerCase()
    );
  };

  const value = useMemo(
    () => ({
      exercises,
      loading,
      totalExercises: exercises.length,
      getExercisesByType,
      deleteExercise,
      updateExercise,
      fetchAllExercises,
    }),
    [
      exercises,
      loading,
      getExercisesByType,
      deleteExercise,
      updateExercise,
      fetchAllExercises,
    ]
  );

  return (
    <ExerciseContext.Provider value={value}>
      {children}
    </ExerciseContext.Provider>
  );
};

export const useExercises = () => useContext(ExerciseContext);
