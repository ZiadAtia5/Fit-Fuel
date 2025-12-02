// src/pages/Register.jsx
import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/login.css";
import logoImage from "../images/logo.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faUser,
  faLock,
  faUserEdit,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";
import { useAuth } from "../context/useAuth";

const EMAIL_MAX = 100;
const NAME_MAX = 50;
const PASSWORD_MIN = 8;
const PASSWORD_MAX = 128;

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

const validatePassword = (password) => {
  const lengthOk =
    password.length >= PASSWORD_MIN && password.length <= PASSWORD_MAX;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  return {
    lengthOk,
    hasUpper,
    hasLower,
    hasNumber,
    hasSpecial,
    allOk: lengthOk && (hasUpper || hasSpecial) && (hasLower || hasNumber),
  };
};

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordChecks, setShowPasswordChecks] = useState(false);
  const [recaptchaReady, setRecaptchaReady] = useState(false);

  const navigate = useNavigate();
  const { register } = useAuth();

  const pwValidation = validatePassword(password);
  const emailValid = isValidEmail(email);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    if (!name.trim() || !email.trim() || !password || !date) {
      toast.warning("Please fill in all required fields.");
      return;
    }
    if (name.length > NAME_MAX || email.length > EMAIL_MAX) {
      toast.warning("One or more fields exceed allowed length.");
      return;
    }
    if (!emailValid) {
      toast.warning("Please enter a valid email address.");
      return;
    }
    if (!pwValidation.lengthOk) {
      toast.warning(`Password must be at least ${PASSWORD_MIN} characters.`);
      return;
    }

    setShowPasswordChecks(true);

    setIsLoading(true);

    const recaptchaToken = recaptchaReady
      ? await getRecaptchaToken("register")
      : null;

    const userData = {
      displayName: name.trim().slice(0, NAME_MAX),
      dateOfBirth: date,
    };

    try {
      const result = await register(
        email.trim().toLowerCase(),
        password,
        userData,
        { recaptchaToken }
      );

      if (result?.success) {
        toast.success("Account created successfully!");

        setTimeout(() => navigate("/"), 1200);
      } else {
        const message = result?.error
          ? result.error
          : "Registration failed. Please try again.";
        toast.error(message);
      }
    } catch (err) {
      console.error("register error", err);
      toast.error("An unexpected error occurred. Please try later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="logIn">
      <div className="container">
        <div className="login">
          <Link to="/">
            <img className="logo-img" src={logoImage} alt="logo" />
          </Link>
        </div>

        <div className="login-container" aria-live="polite">
          <h2>Create Account</h2>

          <form onSubmit={handleRegister} noValidate>
            <div className="info-user">
              <div className="input-field name">
                <FontAwesomeIcon className="icon-l" icon={faUserEdit} />
                <input
                  placeholder="Your Name"
                  type="text"
                  value={name}
                  maxLength={NAME_MAX}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  required
                  aria-label="Your name"
                />
              </div>
              <div className="input-field name">
                <FontAwesomeIcon className="icon-l" icon={faCalendar} />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  disabled={isLoading}
                  required
                  aria-label="Date of birth"
                />
              </div>
            </div>

            <div className="input-field">
              <FontAwesomeIcon className="icon-l" icon={faUser} />
              <input
                placeholder="Your Email"
                type="email"
                value={email}
                maxLength={EMAIL_MAX}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
                aria-invalid={!emailValid && email.length > 0}
              />
            </div>

            <div className="input-field">
              <FontAwesomeIcon className="icon-l" icon={faLock} />
              <input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setShowPasswordChecks(true)}
                disabled={isLoading}
                required
                aria-describedby="password-requirements"
                maxLength={PASSWORD_MAX}
              />

              <FontAwesomeIcon
                className="icon"
                icon={showPassword ? faEyeSlash : faEye}
                onClick={() => setShowPassword((prev) => !prev)}
              />
            </div>

            {showPasswordChecks && (
              <div
                id="password-requirements"
                className="cheack-field"
                role="region"
                aria-live="polite"
              >
                <h4
                  className="cheack"
                  style={{
                    color: pwValidation.lengthOk ? "#3eaf4bff" : "#ff6767ff",
                  }}
                >
                  Password must be {PASSWORD_MIN}–{PASSWORD_MAX} characters
                </h4>
                <h4
                  className="cheack"
                  style={{
                    color: pwValidation.hasUpper ? "#3eaf4bff" : "#ff6767ff",
                  }}
                >
                  contain at least one uppercase letter or special character
                </h4>
                <h4
                  className="cheack"
                  style={{
                    color: pwValidation.hasLower ? "#3eaf4bff" : "#ff6767ff",
                  }}
                >
                  contain at least one lowercase letter
                </h4>
                <h4
                  className="cheack"
                  style={{
                    color: pwValidation.hasNumber ? "#3eaf4bff" : "#ff6767ff",
                  }}
                >
                  contain at least one number (recommended)
                </h4>
              </div>
            )}

            <button
              className="signin-button"
              type="submit"
              disabled={isLoading}
              aria-disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>

            <Link to="/login">
              <p className="create-account">Already have an account? Sign In</p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
