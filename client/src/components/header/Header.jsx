import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { Calendar, DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/authContext";

const Header = ({ type }) => {
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [destination, setDestination] = useState("");
  const [checkbox, setCheckbox] = useState(1);

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  // =======================================
  const { dispatch } = useContext(SearchContext); //dispatch: Call function SearchReducer
  // =======================================

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } }); //func SearchReducer need : TYPE + PAYLOAD
    navigate("/hotels", { state: { destination, dates, options } });
  };

  function animation(id) {
    setCheckbox((prev) => {
      document.getElementById("animate" + prev).className = "headerListItem";
      document.getElementById("animate" + id).className += " active";
      return (prev = id);
    });
  }

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div
            id="animate1"
            className="headerListItem active"
            onClick={() => {
              animation(1);
            }}
          >
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div
            id="animate2"
            className="headerListItem"
            onClick={() => {
              animation(2);
            }}
          >
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
          <div
            id="animate3"
            className="headerListItem"
            onClick={() => {
              animation(3);
            }}
          >
            <FontAwesomeIcon icon={faCar} />
            <span>Car rentals</span>
          </div>
          <div
            id="animate4"
            className="headerListItem"
            onClick={() => {
              animation(4);
            }}
          >
            <FontAwesomeIcon icon={faBed} />
            <span>Attractions</span>
          </div>
          <div
            id="animate5"
            className="headerListItem"
            onClick={() => {
              animation(5);
            }}
          >
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport taxis</span>
          </div>
        </div>

        {type !== "list" && (
          <>
            <h1 className="headerTitle">A life of discounts? It's a Genius</h1>
            <p className="headerDesc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
              itaque at quia nostrum quasi corporis, aspernatur facilis maiores
              veritatis enim possimus eligendi rem provident. Quod, sequi!
              Laborum voluptatibus accusamus esse.
            </p>
            {!user && <button className="headerBtn">Sign in / Register</button>}
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput"
                  id="ngu"
                  onClick={()=>{document.getElementById("ngu").removeAttribute("placeholder")}}
                  onBlur={()=>{document.getElementById("ngu").setAttribute("placeholder", "Where are you going?")}}
                  onChange={(e) => {
                    setDestination(e.target.value);
                  }}
                />
                <span className="locationAnimate">Where are you going?</span>
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(dates[0].startDate, "mm/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "mm/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    minDate={new Date()}
                    className="date"
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  className="headerSearchText"
                  onClick={() => {
                    setOpenOptions(!openOptions);
                  }}
                >{`${options.adult} adult - ${options.children} children - ${options.room} room`}</span>

                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          className="optionCounterButton"
                          disabled={options.adult <= 1}
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          className="optionCounterButton"
                          disabled={options.children <= 1}
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          className="optionCounterButton"
                          disabled={options.room <= 1}
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
