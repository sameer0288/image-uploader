import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import LoginComponent from "./Auth/Login";
import SignupComponent from "./Auth/Signup";
import Main from "./main";
import LandingPage from "./components/LandingPage";
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Main />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/signup" element={<SignupComponent />} />
      </Routes>
    </Router>
  );
};

export default App;
