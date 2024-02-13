import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const signUp = async (e) => {
    e.preventDefault();

    try {
      // Reset previous state
      setIsError(false);
      setErrorMsg("");
      setIsSuccess(false);
      setSuccessMsg("");

      // Validate email and password
      if (!email || !password) {
        setIsError(true);
        setErrorMsg("Email and password are required");
        return;
      }

      // Perform signup API request using Axios
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/v1/user/signup",
        {
          email,
          password,
        }
      );

      if (response.status === 201) {
        setIsSuccess(true);
        setSuccessMsg("Signup successful!");
        navigate("/login"); // Navigate to the login screen
      } else {
        setIsError(true);
        setErrorMsg(response.data.error || "Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setIsError(true);
      setErrorMsg("Internal Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signupContainer">
      {isError && (
        <div className="alert alert-danger" role="alert">
          {errorMsg}
        </div>
      )}
      {isSuccess && (
        <div className="alert alert-success" role="alert">
          {successMsg}
        </div>
      )}
      <form onSubmit={signUp}>
        <h1>Sign Up</h1>
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
        <button type="submit" disabled={loading}>
          {loading ? (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            <span>Sign Up</span>
          )}
        </button>
        <a href="/login" className="question">
          Already have an account?
        </a>
      </form>
    </div>
  );
};

export default Signup;
