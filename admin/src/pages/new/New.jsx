import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { useState } from "react";
import axios from "axios";
import { userInputs } from "../../formSource";
import ClipLoader from "react-spinners/ClipLoader";

const New = () => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const [loadingAdd, setLoadingAdd] = useState(false);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  //CLOUDINARY -> Get the img url through cloudinary
  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      setLoadingAdd(true)
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dq50lwlz6/image/upload",
        data
      );

      // console.log(uploadRes.data);

      const { url } = uploadRes.data;

      const newUser = {
        ...info,
        img: url,
      };

      console.log(newUser);

      await axios.post("/auth/register", newUser);
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
          <h1>Add New User</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
            <ClipLoader className="clipLoader" color="#6439ff" size={80} loading={loadingAdd} />
            {loadingAdd && <span>Please wait ...</span>}
          </div>
          <div className="right">
            <form>
              <div className="formContainer">
                <div className="formInput" style={{ padding: "10px 0" }}>
                  <label htmlFor="file">
                    Image:
                    <DriveFolderUploadIcon className="icon" />
                  </label>
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                    }}
                    style={{ display: "none" }}
                  />
                </div>
                <div className="formInput"></div>

                {userInputs.map((item) => (
                  <div className="formInput" key={item.id}>
                    <label>{item.label}</label>
                    <input
                      onChange={handleChange}
                      type={item.type}
                      placeholder={item.placeholder}
                      id={item.id}
                      required
                    />
                  </div>
                ))}
              </div>
              <button onClick={handleClick} style={{ marginTop: "30px" }}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
