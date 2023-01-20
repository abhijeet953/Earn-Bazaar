import { useState } from "react";
import { Link } from "react-router-dom";
import { register } from "../httpCommon";
import "./register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userCategory, setUserCategory] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await register({
        username,
        email,
        password,
        userCategory,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="registerInput input-group-text"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          className="registerInput input-group-text"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          className="registerInput input-group-text"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Requirements </label>
        <select
          className="registerInput form-select"
          onChange={(e) => setUserCategory(e.target.value)}
        >
          <option value=""> Select One </option>
          <option value="Organiser"> Looking for Sponsors </option>
          <option value="Sponsor"> Looking for Promotion </option>
        </select>
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <button className="registerLoginButton btn-lg btn btn-outline-secondary">
        <Link className="link rm-txt-dec" to="/login">
          Login
        </Link>
      </button>
      {error && <span style={{color:"red", marginTop:"10px"}}>Something went wrong!</span>}
    </div>
  );
}
