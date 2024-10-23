// src/hooks/useAutoLogin.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "../utils/apiRoutes"; // Ensure this import is correct

const useUserData = (setUserData, setErrors) => {
  const navigate = useNavigate();

  useEffect(() => {
    const autoLogin = async () => {
      try {
        const response = await axios.get(`${auth}/auto-login`, {
          withCredentials: true, // Important to include this
        });

        if (response.status === 200) {
          // Successful auto-login
          console.log(response.data);
          setUserData(response.data.data); // Assuming this is the user data
        }
      } catch (error) {
        if (error.response) {
          // Handle error response
          //   setErrors({ general: error.response.data.message });
          console.log({ general: error.response.data.message });
        } else {
          // Handle network or other error
          setErrors({ general: "An error occurred during auto-login." });
          console.log({ general: "An error occurred during auto-login." });
        }
      }
    };

    autoLogin();
  }, [navigate, setUserData, setErrors]);
};

export default useUserData;
