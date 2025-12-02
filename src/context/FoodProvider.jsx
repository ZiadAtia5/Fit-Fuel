import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { toast } from "sonner";

const FoodContext = createContext();

const FoodProvider = ({ children }) => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllMeals = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "meals"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMeals(data);
      } catch (error) {
        console.error("Error fetching meal:", error);
        toast.error("Error fetching meal:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMeals();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await axios.get(
  //         `https://api.spoonacular.com/recipes/random?number=1&apiKey=${
  //           import.meta.env.VITE_FOODS_API_KEY
  //         }`
  //       );
  //       if (res.status === 200) {
  //         setLoading(false);
  //         setError(null);
  //         setFoods(res.data.recipes);
  //       } else {
  //         setLoading(false);
  //         setError(AxiosError.message);
  //         throw new Error("Unexpected response status: " + res.status);
  //       }
  //     } catch (error) {
  //       setError(error.message);
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const totalMeals = meals.length;

  const getMealsByType = (type) => {
    return meals.filter(
      (me) => me.category?.toLowerCase() === type?.toLowerCase()
    );
  };

  const value = useMemo(
    () => ({
      meals,
      totalMeals,
      getMealsByType,
      loading,
    }),
    [meals, loading]
  );
  return <FoodContext.Provider value={value}>{children}</FoodContext.Provider>;
};

export default FoodProvider;

export const useFoods = () => {
  return useContext(FoodContext);
};
