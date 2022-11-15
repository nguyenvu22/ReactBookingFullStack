import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseFloodWaterCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" className="logoLink">
          <span className="logo">
            <FontAwesomeIcon
              className="logoItem"
              icon={faHouseFloodWaterCircleArrowRight}
            />{" "}
            Booking App
          </span>
        </Link>
        {user ? (
          <span className="hello">Hello, <b> {user.username} </b></span>
        ) : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <button className="navButton" onClick={() => {navigate("/login")}}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
