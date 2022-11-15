import {
  faMapLocationDot,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <img
        // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1Yq1z778Wlnx729iBkBMylsTfWf60aJ6OTA&usqp=CAU"
        src={item.photos[0]}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">
          <FontAwesomeIcon
            icon={faMapLocationDot}
            style={{ marginRight: "8px" }}
          />
          {item.distance}m from center
        </span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air Conditioning
        </span>
        <span className="siFeatures">{item.desc}</span>
        <hr/>
        <span className="CancelOp">Free Cancellation</span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && (
          <div className="siRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
          </div>
        )}
        <div className="siDetailTexts">
          <span className="siPrice">
            <FontAwesomeIcon
              icon={faMoneyBill}
              style={{ marginRight: "8px" }}
            />
            {item.cheapestPrice}$
          </span>
          <span className="siTaxOp">Includes taxes and fees</span>
          {/* Go to Specific HOTEL */}
          <Link to={`/hotels/${item._id}`}>
            <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
