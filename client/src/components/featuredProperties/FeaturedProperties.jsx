import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import ClipLoader from "react-spinners/ClipLoader";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch(
    "/hotels?featured=true&limit=4"
  );

  return (
    <div className="fp">
      {loading ? (
        <ClipLoader className="clipLoader" color="#6439ff" size={80} />
      ) : (
        <>
          {data.map((item) => (
            <div className="fpItem" key={item?._id}>
              <img
                // src="https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg"
                src={
                  item?.photos[0] ||
                  "https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg"
                }
                alt=""
                className="fpImg"
              />
              <span className="fpName">{item?.name}</span>
              <span className="fpCity">
                <FontAwesomeIcon icon={faLocationDot} /> - {item?.city}
              </span>
              <span className="fpPrice">
                <FontAwesomeIcon icon={faMoneyBill} /> - Starting from{" "}
                <b> {item?.cheapestPrice}$ </b>
              </span>
              {item?.rating && (
                <div className="fpRating">
                  <button>{item?.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
