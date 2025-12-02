import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import FoodProvider from "../src/context/FoodProvider.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ExerciseProvider } from "./context/ExerciseContext";

createRoot(document.getElementById("root")).render(
  <Router>
    <StrictMode>
      <ExerciseProvider>
        <AuthProvider>
          <FoodProvider>
            <App />
          </FoodProvider>
        </AuthProvider>
      </ExerciseProvider>
    </StrictMode>
  </Router>
);
