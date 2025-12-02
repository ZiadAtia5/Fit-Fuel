import logo from "../images/logo.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeadphones,
  faLocationDot,
  faEnvelope,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

import {
  faFacebookF,
  faInstagram,
  faWhatsapp,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import { Link } from "react-router-dom";
import "./styles/footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="h-content">
          <div>
            <img src={logo} alt="logo" className="footer-logo" />
            <p className="p">
              FitFuel is your trusted partner for meal plans, fitness coaching,
              and a healthy lifestyle.
            </p>

            <div className="support">
              <FontAwesomeIcon className="icon" icon={faHeadphones} />
              <div className="text">
                <p>support team 24/7</p>
                <h3>+20 01274285568</h3>
              </div>
            </div>
          </div>

          <div>
            <h3>company</h3>
            <div className="links">
              <ul>
                <li>
                  <Link to="/">home</Link>
                </li>
                <li>
                  <Link to="/#aboutUs">about us</Link>
                </li>
                <li>
                  <Link to="/#services">services</Link>
                </li>
                <li>
                  <Link to="/foods">foods</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-col">
            <h3>Contact</h3>

            <p className="footer-icon-text">
              <FontAwesomeIcon className="f-icon" icon={faLocationDot} /> El
              Beheira, Egypt
            </p>

            <p className="footer-icon-text">
              <FontAwesomeIcon className="f-icon" icon={faEnvelope} />{" "}
              support@fitfuel.com
            </p>

            <p className="footer-icon-text">
              <FontAwesomeIcon className="f-icon" icon={faClock} /> Mon - Sat: 9
              AM - 10 PM
            </p>
          </div>

          <div>
            <h3>subscribe now</h3>
            <p className="subscribe-text">
              Join our newsletter to receive weekly healthy recipes and new
              workout plans.
            </p>
            <div className="subscribe-box">
              <input type="email" placeholder="Enter your email" />
              <button>Subscribe</button>
            </div>
          </div>
        </div>

        <div className="f-content">
          <div className="social-icons">
            <a
              href="https://www.facebook.com/share/1H7iuHM4f3/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon className="icon" icon={faFacebookF} />
            </a>
            <a
              href="https://www.instagram.com/ziadatia._.5?igsh=bG11ZzMxenkwZ201"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon className="icon" icon={faInstagram} />
            </a>
            <a
              href="https://wa.me/2001274285568"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon className="icon" icon={faWhatsapp} />
            </a>
          </div>

          <p>all copyrights &copy; 2025 FitFuel | developed by Ziad Atia</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
