// App.js
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import LoginSignup from "./components/LoginSignup/LoginSignup";
import Homepage from "./components/Homepage/Homepage";
import AboutUs from "./components/AboutUs/AboutUs";
import SignIn from "./components/SignIn/SignIn";
import ContactUs from "./components/ContactUs/ContactUs";
import Services from "./components/Services/Services";
import Marketplace from "./components/Marketplace/Marketplace";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import PDescription from "./components/PDescription/PDescription";
import PatentForm from "./components/PatentForm/PatentForm";
import ProfileForm from "./components/ProfileForm/ProfileForm";
import ProfileImage from "./components/ProfileImage/ProfileImage";

function App() {
  useEffect(() => {}, []);
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Homepage />} />
        <Route path="/signup" element={<LoginSignup />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/service" element={<Services />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/description/:id" element={<PDescription />} />
        <Route path="/pform" element={<PatentForm />} />
        <Route path="/edit" element={<ProfileImage />} />
        <Route path="/editprofile" element={<ProfileForm />} />
      </Routes>
    </Router>

    // <div className="App">
    //   <LoginSignup />
    //   {/* <Homepage /> */}
    //   {/* <AboutUs/> */}
    // </div>
  );
}
export default App;
