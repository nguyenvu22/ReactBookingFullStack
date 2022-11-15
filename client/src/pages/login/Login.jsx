import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "/auth/login",
        credentials
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>リン & クッキー</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam nobis
            commodi assumenda. Tenetur, cupiditate cum. Corporis quod ipsum
            exercitationem fugiat eligendi incidunt sed ab? Ipsam perferendis
            doloribus nam quos quisquam!
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form action="">
            <input
              type="text"
              placeholder="username"
              id="username"
              onChange={(e) => {
                handleChange(e);
              }}
              className="lInput"
            />
            <input
              type="text"
              placeholder="password"
              id="password"
              onChange={handleChange}
              className="lInput"
            />
            {error && <span className="error">{error.message}</span>}
            <button
              disabled={loading}
              onClick={handleClick}
              className="lButton"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
