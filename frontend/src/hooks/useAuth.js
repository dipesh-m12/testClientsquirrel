// useAuth.js
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const useAuth = (redirect = true) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("token");
    console.log("Token", token);
    if (token) {
      setIsAuthenticated(true); // Set to true if token exists
    } else {
      setIsAuthenticated(false); // Set to false if token does not exist
      if (redirect) navigate("/");
    }
    // console.log(token);
  }, []);

  return isAuthenticated;
};

export default useAuth;
