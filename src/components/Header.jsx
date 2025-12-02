import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "../images/logo.webp";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./styles/header.css";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useUser } from "../context/AuthContext";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 500,
      offset: 100,
      easing: "ease-in-out",
      once: false,
    });

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div data-aos="fade-down" className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Fit-Fuel" />
          </Link>
        </div>

        <div className={showLinks ? "links show" : "links"}>
          <ul>
            <li>
              <Link to="/#home">home</Link>
            </li>
            <li>
              <Link to="/#aboutUs">about</Link>
            </li>
            <li>
              <Link to="/#services">services</Link>
            </li>
            <li>
              <Link to="/foods">foods</Link>
            </li>
          </ul>
        </div>

        <div className="icons">
          <FontAwesomeIcon
            className="search-icon"
            icon={faUser}
            onClick={() => navigate(isLoggedIn ? "/profile" : "/login")}
          />

          <FontAwesomeIcon
            icon={faBars}
            className="bars"
            onClick={() => setShowLinks(!showLinks)}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
