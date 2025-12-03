import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "sonner";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState(() => ({
    workout: 0,
  }));

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        setUser(currentUser);
        try {
          const userRef = doc(db, "userProfiles", currentUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const data = userSnap.data();
            setProfileData({
              displayName: data.displayName || "",
              email: data.email || currentUser.email || "",
              age: data.age || "",
              height: data.height || "",
              weight: data.weight || "",
              gender: data.gender || "",
              fitnessGoal: data.fitnessGoal || "",
              dateOfBirth: data.dateOfBirth || "",
              workout: data.workout || 0,
              calories: data.calories || 0,
              isAdmin: data.isAdmin || false,
              createdAt: data.createdAt || null,
            });
          } else {
            setProfileData(null);
          }
        } catch (err) {
          console.error("❌ Error fetching user profile:", err);
          toast.error("An error occurred while loading the user data");
        }
      } else {
        setUser(null);
        setProfileData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    profileData,
    loading,
    error,
    setProfileData,
    isLoggedIn: !!user,
    isAdmin: profileData?.isAdmin || false,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useUser = () => useContext(AuthContext);
