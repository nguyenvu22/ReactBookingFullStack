import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { useState } from "react";
import { hotelInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

const NewHotel = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);
  const { data, loading, error } = useFetch("/rooms");
  const [loadingAdd, setLoadingAdd] = useState(false);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      setLoadingAdd(true);
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dq50lwlz6/image/upload",
            data
          );
          const { url } = uploadRes.data;

          return url;
        })
      );

      const newHotel = {
        ...info,
        rooms,
        photos: list,
      };

      console.log(newHotel);

      await axios.post("/hotels", newHotel);
      setLoadingAdd(false);
    } catch (error) {}
  };

  console.log(info);

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Hotel</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
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
                <div className="formInput">
                  <label htmlFor="file">
                    Image:
                    <DriveFolderUploadIcon className="icon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    multiple
                    onChange={(e) => {
                      setFiles(e.target.files);
                    }}
                    style={{ display: "none" }}
                  />
                </div>

                {hotelInputs.map((item) => (
                  <div className="formInput" key={item.id}>
                    <label>{item.label}</label>
                    <input
                      id={item.id}
                      onChange={handleChange}
                      type={item.type}
                      placeholder={item.placeholder}
                      required
                    />
                  </div>
                ))}
                <div className="formInput">
                  <label>Type</label>
                  <select className="select" id="type" onChange={handleChange} style={{ width: "130px" }}>
                    <option value="hotel" hidden>Choose type</option>
                    <option value="hotel">hotel</option>
                    <option value="villa">villa</option>
                  </select>
                </div>
                <div className="formInput">
                  <label>Featured</label>
                  <select
                    className="select"
                    id="featured"
                    onChange={handleChange}
                  >
                    <option value={false} hidden>Yes / No</option>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </select>
                </div>
                <div className="selectRooms">
                  <label style={{ marginLeft: "13px" }}>Rooms</label>
                  <select id="rooms" multiple onChange={handleSelect}>
                    {loading
                      ? " loading"
                      : data &&
                        data.map((room) => (
                          <option key={room._id} value={room._id}>
                            {room.title}
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

export default NewHotel;
