import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Landing from "./components/Landing";
import Services from "./components/Services";
import FoodList from "./components/FoodList";
import FoodDetails from "./components/FoodDetails";
import Exercises from "./components/Exercises";
import AboutUs from "./components/AboutUs";
import PopularWorkouts from "./components/PopularWorkouts";
import WeeklyWorkout from "./components/WeeklyWorkout";
import Db from "./components/Db";
import CaloriesCalculator from "./components/CaloriesCalculator";
import Login from "./components/Login";
import Register from "./components/Register";
import NotFound from "./components/NotFound";
import UploadExercises from "./UploadExercises";
import AdminDashboard from "./components/AdminDashboard";
import Profile from "./components/Profile";
import ExercisesDetails from "./components/ExercisesDetails";
import SartPage from "./components/SartPage";
import FitnessTips from "./components/FitnessTips";

import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { useAuth } from "./context/useAuth";

import "./App.css";
import TestFirestore from "./components/TestFirestore";
import Progress from "./components/Progress";
import StartExersise from "./components/StartExersise";
import Footer from "./components/Footer";

import { Toaster } from "sonner";

function App() {
  const { user } = useAuth();
  const location = useLocation();
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {hidden && <SartPage />}
      {!hidden && (
        <>
          <div
            style={{
              position: "fixed",
              top: 1,
              right: 1,

              zIndex: 999999,
            }}
          >
            <Toaster richColors closeButton />
          </div>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <div id="home">
                    <Landing />
                  </div>

                  <div id="services">
                    <Services />
                  </div>

                  <div id="aboutUs">
                    <AboutUs />
                  </div>
                  <PopularWorkouts />
                  <WeeklyWorkout />
                  <div id="calories">
                    <CaloriesCalculator />
                  </div>
                  {/* <Db /> */}
                  {/* <UploadExercises /> */}
                  {/* <AdminDashboard /> */}
                  <Exercises />
                  {/* <TestFirestore /> */}
                  <Footer />
                </>
              }
            />

            <Route
              path="/foods"
              element={
                <>
                  <Header />
                  <FoodList />
                </>
              }
            />

            <Route
              path="/foodDetails/:id"
              element={
                <>
                  <Header />
                  <FoodDetails />
                </>
              }
            />

            <Route path="/exercises" element={<Exercises />} />
            <Route
              path="/exercisesDetails"
              element={
                <>
                  <Header />
                  <ExercisesDetails />
                </>
              }
            />

            <Route
              path="/startExercise/:id"
              element={
                <>
                  <Header />
                  <StartExersise />
                </>
              }
            />

            <Route
              path="/login"
              element={
                <>
                  <Header />
                  <Login />
                </>
              }
            />

            <Route
              path="/login/register"
              element={
                <>
                  <Header />
                  <Register />
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <Header />
                  <Profile />
                </>
              }
            />

            <Route
              path="/progress"
              element={
                <>
                  <Header />
                  <Progress />
                </>
              }
            />
            <Route
              path="/dashboard"
              element={
                <>
                  <Header />
                  <AdminDashboard />
                </>
              }
            />
            <Route
              path="/fitnesstips"
              element={
                <>
                  <Header />
                  <FitnessTips />
                </>
              }
            />

            <Route
              path="*"
              element={
                <>
                  <Header />
                  <NotFound />
                </>
              }
            />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
