import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import { signIn } from "../httpCommon";
import "./login.css";

export default function Login() {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [error, setError] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await signIn({
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      setError(true);
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput input-group-text"
          placeholder="Enter your username..."
          ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput input-group-text"
          placeholder="Enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <button className="loginRegisterButton btn btn-outline-secondary btn-lg">
        <Link className="rm-txt-dec"to="/register">
          Register
        </Link>
      </button>
      {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
    </div>
  );
}
