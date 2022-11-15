import useFetch from "../../hooks/useFetch";
import "./featured.css";
import ClipLoader from "react-spinners/ClipLoader";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=berlin,madrid,london"
  );

  return (
    <div className="featured">
      {loading ? (
        <ClipLoader className="clipLoader" color="#6439ff" size={80} />
      ) : (
        <>
          <div className="featuredItem" style={{width: "30%"}}>
            <img
              src="https://static.toiimg.com/thumb/53320533/Berlin.jpg?width=1200&height=900"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Berlin</h1>
              <h3>{data[0]} prop(s)</h3>
            </div>
          </div>
          <div className="featuredItem" style={{width: "40%"}}>
            <img
              src="https://content.r9cdn.net/rimg/dimg/5f/38/353ec907-ap-MAD-551b0685.jpg?width=1366&height=768&xhint=826&yhint=409&crop=true"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Madrid</h1>
              <h3>{data[1]} prop(s)</h3>
            </div>
          </div>
          <div className="featuredItem" style={{width: "30%"}}>
            <img
              src="https://media.architecturaldigest.com/photos/56fd9d65ecd154e0329c1627/4:3/w_768/london-travel-guide-lede.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>London</h1>
              <h3>{data[2]} prop(s)</h3>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
