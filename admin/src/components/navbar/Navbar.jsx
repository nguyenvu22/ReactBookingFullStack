import "./navbar.scss";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ViewListIcon from "@mui/icons-material/ViewList";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeReducer";

const Navbar = () => {
  const { darkMode, dispatch } = useContext(DarkModeContext);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search ..." />
          <SearchIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageIcon className="icon" />
            English
          </div>
          <div className="item">
            {darkMode ? (
              <label className="switch">
                <input
                  type="checkbox"
                  onChange={() => {
                    dispatch({ type: "TOGGLE" });
                  }}
                  checked
                />
                <span className="slider">
                  <LightModeIcon className="icon icon1" />
                  <DarkModeIcon className="icon icon2" />
                </span>
              </label>
            ) : (
              <label className="switch">
                <input
                  type="checkbox"
                  onChange={() => {
                    dispatch({ type: "TOGGLE" });
                  }}
                />
                <span className="slider">
                  <LightModeIcon className="icon icon1" />
                  <DarkModeIcon className="icon icon2" />
                </span>
              </label>
            )}
          </div>
          <div className="item">
            <FullscreenExitIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ViewListIcon className="icon" />
          </div>
          <div className="item">
            <img
              src="https://epipoca.com.br/wp-content/uploads/2021/04/Dwayne-Johnson-The-Rock-Instagram.jpg"
              alt="avatar"
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
