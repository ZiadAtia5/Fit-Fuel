import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faServer } from "@fortawesome/free-solid-svg-icons";
import "./styles/notFound.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="container">
        <div className="content">
          <FontAwesomeIcon className="icon" icon={faServer} />
          <h2>page not found go back</h2>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
