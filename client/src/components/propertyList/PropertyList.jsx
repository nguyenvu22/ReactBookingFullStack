import useFetch from "../../hooks/useFetch";
import "./propertyList.css";
import ClipLoader from "react-spinners/ClipLoader";

const PropertyList = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByType"
  );

  const images = [
    "https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768",
    "https://aland.com.au/wp-content/uploads/2021/08/190Croatia_View1_B_McFarlaneRd_R6_Twilight_R2-930x620.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/d/df/Town_and_Country_fh000023.jpg",
    "https://cf.bstatic.com/xdata/images/hotel/max1280x900/295090917.jpg?k=d17621b71b0eaa0c7a37d8d8d02d33896cef75145f61e7d96d296d88375a7d39&o=&hp=1",
    "https://images.ctfassets.net/gxwgulxyxxy1/0Bu5ExcClizeeLLxT0tiB/999893b65383b25aa67e28e82dd53519/1c1d81b0-162b-4f81-a742-271cd4e64204.lg1.jpg",
  ];

  const onMouseOver = (index) => {
    switch (index) {
      case 0:
        document.querySelector(".pList").style.setProperty("--top", "-5%");
        document.querySelector(".pList").style.setProperty("--left", "-1.6%");
        break;
      case 1:
        document.querySelector(".pList").style.setProperty("--top", "-5%");
        document.querySelector(".pList").style.setProperty("--left", "18.95%");
        break;
      case 2:
        document.querySelector(".pList").style.setProperty("--top", "-5%");
        document.querySelector(".pList").style.setProperty("--left", "39.4%");
        break;
      case 3:
        document.querySelector(".pList").style.setProperty("--top", "-5%");
        document.querySelector(".pList").style.setProperty("--left", "59.8%");
        break;
      case 4:
        document.querySelector(".pList").style.setProperty("--top", "-5%");
        document.querySelector(".pList").style.setProperty("--left", "80.2%");
        break;
    }
  };

  return (
    <div className="pList">
      {loading ? (
        <ClipLoader className="clipLoader" color="#6439ff" size={80} />
      ) : (
        <>
          {data &&
            images.map((img, index) => (
              <div
                id={index}
                className="pListItem"
                onMouseOver={() => {
                  onMouseOver(index);
                }}
                key={index}
              >
                <img src={img} alt="" className="pListImg" />
                <div className="pListTitles">
                  <h1>{data[index]?.type}</h1>
                  <h2>
                    {data[index]?.count} {data[index]?.type}s
                  </h2>
                </div>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default PropertyList;
