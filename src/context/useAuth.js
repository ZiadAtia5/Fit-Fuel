import { useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const ADMIN_EMAILS = ["zezoatia100@gmail.com"];

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState("");

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      console.error("Error resetting password:", error.message);
      let message =
        "An error occurred while sending the request. Please try again";
      if (error.code === "auth/user-not-found") {
        message = "There is no account associated with this email address";
      } else if (error.code === "auth/invalid-email") {
        message = "Invalid email address";
      }
      return { success: false, error: message };
    }
  };

  const isAdminEmail = (email) => {
    return ADMIN_EMAILS.includes(email.toLowerCase());
  };

  const setAdminClaims = async (userId, email) => {
    try {
      if (isAdminEmail(email)) {
        const userRef = doc(db, "adminUsers", userId);
        await setDoc(
          userRef,
          {
            email: email,
            isAdmin: true,
            role: "super_admin",
            permissions: ["all"],
            createdAt: new Date(),
          },
          { merge: true }
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error setting admin claims:", error);
      return false;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const [isAdmin, profile] = await Promise.all([
          checkAdminStatus(user.uid, user.email),
          getUserProfile(user.uid, user.email),
        ]);

        setUser({
          ...user,
          isAdmin,
          role: isAdmin ? "admin" : "user",
        });
        setUserProfile(profile);
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const checkAdminStatus = async (userId, email) => {
    try {
      if (isAdminEmail(email)) return true;
      const adminDoc = await getDoc(doc(db, "adminUsers", userId));
      return adminDoc.exists() && adminDoc.data().isAdmin;
    } catch (error) {
      console.error("Error checking admin status:", error);
      return false;
    }
  };

  const getUserProfile = async (userId, email) => {
    try {
      const profileRef = doc(db, "userProfiles", userId);
      const profileSnap = await getDoc(profileRef);

      if (profileSnap.exists()) {
        return profileSnap.data();
      } else {
        const defaultProfile = {
          displayName: "",
          email: email,
          photoURL: "",
          dateOfBirth: "",
          age: "",
          workout: 0,
          calories: 0,
          height: "",
          weight: "",
          gender: "",
          fitnessGoal: "Bulking",
          provider: "email",
          isAdmin: isAdminEmail(email),
          role: isAdminEmail(email) ? "admin" : "user",
          createdAt: new Date(),
          lastLogin: new Date(),
        };

        await setDoc(profileRef, defaultProfile, { merge: true });

        if (isAdminEmail(email)) {
          await setAdminClaims(userId, email);
        }

        return defaultProfile;
      }
    } catch (error) {
      console.error("Error getting user profile:", error);
      return null;
    }
  };

  const login = async (email, password) => {
    try {
      setAuthError("");
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const isAdmin = await checkAdminStatus(user.uid, user.email);
      await updateUserProfile(user.uid, {
        lastLogin: new Date(),
        isAdmin,
        role: isAdmin ? "admin" : "user",
      });
      return { success: true, isAdmin };
    } catch (error) {
      const errorMessage = getAuthErrorMessage(error.code);
      setAuthError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const loginWithGoogle = async () => {
    try {
      setAuthError("");
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const isAdmin = await checkAdminStatus(user.uid, user.email);

      const profileRef = doc(db, "userProfiles", user.uid);
      await setDoc(
        profileRef,
        {
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
          provider: "google",
          isAdmin,
          role: isAdmin ? "admin" : "user",
          lastLogin: new Date(),
          createdAt: new Date(),
        },
        { merge: true }
      );

      return { success: true, isAdmin };
    } catch (error) {
      const errorMessage = getAuthErrorMessage(error.code);
      setAuthError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const register = async (email, password, userData) => {
    try {
      setAuthError("");
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const isAdmin = await checkAdminStatus(user.uid, user.email);

      await updateProfile(user, { displayName: userData.displayName });

      const profileRef = doc(db, "userProfiles", user.uid);
      await setDoc(
        profileRef,
        {
          ...userData,
          email: user.email,
          isAdmin,
          role: isAdmin ? "admin" : "user",
          provider: "email",
          createdAt: new Date(),
          lastLogin: new Date(),
        },
        { merge: true }
      );

      return { success: true, isAdmin };
    } catch (error) {
      const errorMessage = getAuthErrorMessage(error.code);
      setAuthError(errorMessage);
      return { success: false, error: errorMessage };
    }
  };

  const updateUserProfile = async (userId, updates) => {
    try {
      const profileRef = doc(db, "userProfiles", userId);
      await updateDoc(profileRef, {
        ...updates,
        lastUpdated: new Date(),
      });
      setUserProfile((prev) => ({ ...prev, ...updates }));
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const getAuthErrorMessage = (errorCode) => {
    const errorMessages = {
      "auth/invalid-credential": "The email or password is invalid",
      "auth/user-disabled": "This account has been disabled",
      "auth/email-already-in-use": "This email is already in use",
      "auth/network-request-failed":
        "Network request failed, please check your internet connection",
      "auth/too-many-requests": "Too many requests, please try again later",
      "auth/requires-recent-login":
        "Please log in again to perform this action",
      "auth/account-exists-with-different-credential":
        "An account already exists with a different credential",
      "auth/credential-already-in-use":
        "The credentials you are trying to use are already linked to another account",
      "auth/multi-factor-auth-required":
        "Multi-factor authentication is required",
    };

    for (const key in errorMessages) {
      if (errorCode.includes(key)) {
        return errorMessages[key];
      }
    }

    return "An unexpected error occurred, please try again";
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return {
    user,
    userProfile,
    authError,
    login,
    register,
    logout,
    updateUserProfile,
    loginWithGoogle,
    loading,
    resetPassword,
    clearError: () => setAuthError(""),
  };
};
