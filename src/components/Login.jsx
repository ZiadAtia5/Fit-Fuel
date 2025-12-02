import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faUser,
  faEyeSlash,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import logoImage from "../images/logo.webp";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { toast } from "sonner";
import "./styles/login.css";

const MAX_ATTEMPTS = 5; // الحد الأقصى لمحاولات تسجيل الدخول
const LOCKOUT_TIME = 60 * 1000; // دقيقة حظر بعد الوصول للحد

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [activeProvider, setActiveProvider] = useState("");

  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const lockTimer = useRef(null);

  const navigate = useNavigate();
  const { login, loginWithGoogle, resetPassword, authError, clearError } =
    useAuth();

  useEffect(() => {
    if (authError) {
      toast.error("Invalid email or password");
      clearError();
    }
  }, [authError]);

  useEffect(() => {
    if (isLocked) {
      lockTimer.current = setTimeout(() => {
        setIsLocked(false);
        setAttempts(0);
      }, LOCKOUT_TIME);
    }
    return () => clearTimeout(lockTimer.current);
  }, [isLocked]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();

    if (isLocked) {
      toast.error("Too many attempts. Please try again in one minute.");
      return;
    }

    if (!email || !password) return;

    setIsLoading(true);
    setActiveProvider("email");

    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      toast.success("Logged in successfully");
      navigate(result.isAdmin ? "/dashboard" : "/");
    } else {
      setAttempts((prev) => prev + 1);
      if (attempts + 1 >= MAX_ATTEMPTS) {
        setIsLocked(true);
        toast.error("Too many failed attempts. Login locked temporarily.");
      } else {
        toast.error("Invalid credentials. Try again.");
      }
    }
  };

  const handleSocialLogin = async () => {
    setIsLoading(true);
    setActiveProvider("google");

    const result = await loginWithGoogle();
    setIsLoading(false);

    if (result.success) {
      navigate(result.isAdmin ? "/dashboard" : "/");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.warning("Please enter your email first");
      return;
    }

    const result = await resetPassword(email);
    if (result.success) {
      toast.success("Password reset link sent");
    } else {
      toast.error("Error sending reset link");
    }
  };

  return (
    <div className="logIn">
      <div className="container">
        <div className="login">
          <Link to="/">
            <img className="logo-img" src={logoImage} alt="logo-img" />
          </Link>
        </div>

        <div className="login-container">
          <h2>Log In</h2>
          <form onSubmit={handleEmailLogin}>
            <div className="input-field">
              <FontAwesomeIcon className="icon-l" icon={faUser} />
              <input
                placeholder="Your Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading || isLocked}
              />
            </div>

            <div className="input-field">
              <FontAwesomeIcon className="icon-l" icon={faLock} />
              <input
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading || isLocked}
              />
              <FontAwesomeIcon
                className="icon"
                icon={showPassword ? faEyeSlash : faEye}
                onClick={() => setShowPassword((prev) => !prev)}
              />
            </div>

            <p
              onClick={() => setShowResetForm(!showResetForm)}
              className="forgot-password"
            >
              Forgot Password?
            </p>

            {showResetForm && (
              <div className="reset-section">
                <div className="input-field">
                  <FontAwesomeIcon className="icon-l" icon={faUser} />
                  <input
                    placeholder="Your Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <button className="res-btn" onClick={handleResetPassword}>
                  Send Reset Link
                </button>
              </div>
            )}

            <button
              className="signin-button"
              type="submit"
              disabled={isLoading || isLocked}
            >
              {isLoading && activeProvider === "email"
                ? "Processing..."
                : isLocked
                ? "Locked"
                : "Sign In"}
            </button>

            <div className="google">
              <button
                className="google-btn"
                onClick={handleSocialLogin}
                disabled={isLoading || isLocked}
                type="button"
              >
                {isLoading && activeProvider === "google" ? (
                  "Loading..."
                ) : (
                  <>
                    <span>Continue With</span>
                    <img
                      className="google-image"
                      src="https://www.google.com/favicon.ico"
                      alt="Google"
                    />
                  </>
                )}
              </button>
            </div>

            <p>By continuing you agree to our Terms and Privacy Notice.</p>

            <Link to="register">
              <p className="create-account">Sign Up</p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
