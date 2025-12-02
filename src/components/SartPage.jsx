import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell } from "@fortawesome/free-solid-svg-icons";
import logo from "../images/logo.webp";
import "./styles/startPage.css";

const SartPage = () => {
  return (
    <div className="parent">
      <div className="child">
        <FontAwesomeIcon icon={faDumbbell} className="icon" />
        <img src={logo} alt="logo" />
      </div>
    </div>
  );
};

export default SartPage;
