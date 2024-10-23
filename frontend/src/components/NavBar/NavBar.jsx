import React, { useState } from "react";
import "./NavBar.css";
import { redirect, useLocation, useNavigate } from "react-router-dom";
import user from "../../images/user.png";
import axios from "axios";
import { auth, profileRoute } from "../../utils/apiRoutes";
import useAuth from "../../hooks/useAuth";
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set to true if user is logged in
  // const {pathname} = useLocation()
  const isAuth = useAuth(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle between true/false
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible); // Toggle dropdown visibility
  };

  const handleLogout = async () => {
    try {
      // Make a request to your backend to clear the cookie
      const response = await axios.post(
        `${auth}/logout`,
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        // Handle logout logic
        setIsLoggedIn(false);
        localStorage.removeItem("squirrelUser");
        navigate("/"); // Navigate to home or login page
      }
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally handle errors, such as showing a message to the user
    }
  };

  const scrollToSection = (task) => {
    const servicesSection = document.getElementById(task);
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigateToSection = (task) => {
    navigate("/" + task);
  };

  const deleteUser = async () => {
    try {
      const response = await axios.delete(`${profileRoute}/delete-user`, {
        withCredentials: true, // to send cookies with the request
      });

      if (response.status === 200) {
        console.log("User deleted successfully", response.data);
        handleLogout();
        return response.data; // return the data on success
      } else {
        console.error("Failed to delete user", response.data);
      }
    } catch (error) {
      console.error(
        "Error deleting user:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Squirrel IP</div>
        <ul className={isOpen ? "nav-links open" : "nav-links"}>
          <li onClick={() => navigateToSection("home")}>
            <a>Home</a>
          </li>
          <li onClick={() => navigateToSection("about")}>
            <a>About</a>
          </li>
          <li onClick={() => navigateToSection("service")}>
            <a>Services</a>
          </li>
          <li onClick={() => navigateToSection("contact")}>
            <a>Contact</a>
          </li>
          <li onClick={() => navigateToSection("marketplace")}>
            <a>Marketplace</a>
          </li>
          <li>
            {isAuth ? (
              <div className="profile-dropdown">
                <img
                  src={user}
                  alt="User Profile"
                  className="user-profile-image"
                  onClick={toggleDropdown}
                />
                {dropdownVisible && (
                  <div className="dropdown-menu">
                    <a href="#dashboard">Dashboard</a>
                    <a onClick={() => navigateToSection("profile")}>Profile</a>
                    <a href="#patent">Patent</a>
                    <a href="#deleteAccount" onClick={deleteUser}>
                      Delete Account{" "}
                    </a>
                    <a href="#logout" onClick={handleLogout}>
                      Logout
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <button
                className="join-us-btn"
                onClick={() => navigateToSection("")}
              >
                Join Us
              </button>
            )}
          </li>
          {/* <li onClick={() => scrollToSection('cust-pt')}><a>Custom-patent</a></li> */}
        </ul>
        <div className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
