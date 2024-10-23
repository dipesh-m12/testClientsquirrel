import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import "./SignIn.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import axios from "axios"; // Import Axios
import { auth, host } from "../../utils/apiRoutes"; // Ensure this is the correct import for your API routes
import useAutoLogin from "../../hooks/useAutoLogin";
const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  // useEffect(() => {
  //   async function start() {
  //     const { data } = await axios.get(`${host}`, { withCredentials: true });
  //     console.log(data);
  //   }
  //   start();
  // }, []);

  // Define the schema using zod
  const signInSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
  });
  useAutoLogin(setUserData, setErrors);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const logmein = async (e) => {
    e.preventDefault(); // Prevent form from submitting

    // Validate the form data
    const validationResult = signInSchema.safeParse(formData);

    if (!validationResult.success) {
      // If validation fails, set the errors
      const formattedErrors = validationResult.error.format();
      setErrors(formattedErrors);
      return; // Stop execution if validation fails
    }

    // Clear existing errors
    setErrors({});
    setLoading(true); // Start loading

    try {
      // Send POST request with Axios
      const response = await axios.post(
        `${auth}/login`,
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true, // Important to include this
        }
      );

      if (response.status === 200) {
        // Successful login
        console.log(response.data);
        localStorage.setItem("squirrelUser", true);
        navigate("/home"); // Redirect on successful login
      }
    } catch (error) {
      // Handle login errors
      if (error.response) {
        // Server responded with a status code outside 2xx
        setErrors({ general: error.response.data.message });
      } else {
        // Network or other error
        // console.log(error);
        setErrors({ general: "An error occurred during login." });
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <NavBar />
      <div className="login-container">
        <div className="form-container-signin">
          <h2>
            Welcome to <span className="brand">Squirrel IP</span>
          </h2>

          {/* Sign in with Google and Apple */}
          <div className="social-buttons">
            <button className="google-button">
              <i className="fab fa-google"></i>
              &nbsp; Login with Google
            </button>

            <button className="apple-button">
              <i className="fab fa-apple"></i>
              &nbsp; Login with Apple
            </button>
          </div>

          <div className="or-separator">
            <hr className="line" /> <span>OR</span> <hr className="line" />
          </div>

          {/* Email and Password input */}
          <form className="form" onSubmit={logmein}>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="input"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <p className="error">{errors.email._errors[0]}</p>}
            <input
              type="password"
              placeholder="Password"
              className="input"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            {errors.password && (
              <p className="error">{errors.password._errors[0]}</p>
            )}
            {errors.general && <p className="error">{errors.general}</p>}{" "}
            {/* General error */}
            <div className="remember-forgot">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </div>
            <button type="submit" className="sign-in-button" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Register link */}
          <p>
            Don’t have an account?{" "}
            <a onClick={handleRegister} className="register-link">
              Register
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
