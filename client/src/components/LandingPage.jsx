import { Link, useNavigate } from "react-router-dom";
import "./landing.css";

const LandingComponent = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // Navigate to the "/login" route
    navigate("/login");
  };

  const handleSignupClick = () => {
    // Navigate to the "/signup" route
    navigate("/signup");
  };

  return (
    <div className="landingContainer">
      <div className="landingMain">
        <div className="landing-child-1">
          <div className="imgCont">
            <img src="" alt="" />
          </div>
        </div>
        <div className="landing-child-2">
          <button onClick={handleLoginClick}>Login</button>
          <button onClick={handleSignupClick}>Sign up</button>
        </div>
      </div>
    </div>
  );
};

export default LandingComponent;
