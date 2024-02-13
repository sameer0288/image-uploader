import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    try {
      // Validate email and password
      if (!email || !password) {
        setIsError(true);
        setErrorMsg("Email and password are required");
        return;
      }

      // Perform login API request using Axios
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        // Simulating a successful login

        setLoading(false);
        setTimeout(() => {
          // Simulating a successful login
          setLoading(false);

          // Navigate to the dashboard
          navigate("/home");
        }, 2000);
      } else {
        setIsError(true);
        setErrorMsg(response.data.error || "Login failed");
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
      setErrorMsg("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginContainer">
      {isError && (
        <div className="alert alert-danger" role="alert">
          {errorMsg}
        </div>
      )}
      <form onSubmit={login}>
        <h1>Login</h1>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">
          {loading ? (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <span>Login</span>
          )}
        </button>
        <a href="/signup" className="question">
          Don't have an account?
        </a>
      </form>
    </div>
  );
};

export default Login;
