import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

const NewRoom = () => {
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);
  const [loadingAdd, setLoadingAdd] = useState(false);

  const { data, loading, error } = useFetch("/hotels"); //need hoteId to create a room

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    //convert String to array since  textarea is a string
    const roomNumbers = rooms.split(",").map((room) => ({
      number: room,
    }));
    try {
      setLoadingAdd(true);
      await axios.post(`/rooms/${hotelId}`, { ...info, roomNumbers });
      setLoadingAdd(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src="https://thumbs.dreamstime.com/b/hotel-bed-icon-circle-symbol-flat-cabin-slleeping-room-128428734.jpg"
              alt=""
            />
            <ClipLoader
              className="clipLoader"
              color="#6439ff"
              size={80}
              loading={loadingAdd}
            />
            {loadingAdd && <span>Please wait ...</span>}
          </div>
          <div className="right">
            <form>
              <div className="formContainer">
                {roomInputs.map((item) => (
                  <div className="formInput" key={item.id}>
                    <label>{item.label}</label>
                    <input
                      id={item.id}
                      type={item.type}
                      placeholder={item.placeholder}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                    />
                  </div>
                ))}
                <div className="formInput">
                  <label>Rooms</label>
                  <textarea
                  className="textarea"
                    onChange={(e) => {
                      setRooms(e.target.value);
                    }}
                    name=""
                    id=""
                    placeholder="give comma between room numbers"
                  ></textarea>
                </div>
                <div className="formInput">
                  <label>Choose a Hotel</label>
                  <select
                    id="hotelId"
                    className="selectRoom"
                    onChange={(e) => {
                      setHotelId(e.target.value);
                    }}
                  >
                    <option value="" hidden>Which one?</option>
                    {loading
                      ? " loading"
                      : data &&
                        data.map((hotel) => (
                          <option key={hotel._id} value={hotel._id}>
                            {hotel.name}
                          </option>
                        ))}
                  </select>
                </div>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
