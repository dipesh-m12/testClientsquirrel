import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import axios from "axios"; // Import Axios
import { auth, host } from "../../utils/apiRoutes";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    organizationName: "",
    organizationType: "",
    jobTitle: "",
    sector: "",
    city: "",
    pinCode: "",
    mobileNo: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  // Define the zod schema for validation
  const registerSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    organizationName: z
      .string()
      .min(1, { message: "Organization name is required" }),
    organizationType: z
      .string()
      .min(1, { message: "Organization type is required" }),
    jobTitle: z.string().min(1, {
      message:
        "Job title is required, if you are currently not employed, just write 'N/A'",
    }),
    sector: z.string().min(1, { message: "Sector is required" }),
    city: z.string().min(1, { message: "City is required" }),
    pinCode: z
      .string()
      .regex(/^[0-9]{6}$/, { message: "Pin code must be a 6-digit number" }),
    mobileNo: z.string().regex(/^[0-9]{10}$/, {
      message: "Mobile number must be a 10-digit number",
    }),

    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form data
    const validationResult = registerSchema.safeParse(formData);

    if (!validationResult.success) {
      // If validation fails, set the errors
      const formattedErrors = validationResult.error.format();
      setErrors(formattedErrors);
    } else {
      // If validation succeeds, clear errors and proceed
      setErrors({});
      console.log("Form Submitted:", formData);

      try {
        // Send a POST request to the backend
        const response = await axios.post(
          "http://localhost:5000/api/auth/register",
          {
            firstName: formData.firstName,
            lastName: formData.lastName,
            mobile: formData.mobileNo, // Make sure this matches
            email: formData.email,
            password: formData.password,
            country: formData.country || "", // Include country if needed
            state: formData.state || "", // Include state if needed
            city: formData.city,
            pincode: formData.pinCode, // Make sure this matches
            orgLogo: formData.organizationLogo || "",
            orgName: formData.organizationName || "",
            orgType: formData.organizationType || "",
            orgEmail: formData.organizationEmail || "",
            orgContact: formData.organizationContact || "",
            jobTitle: formData.jobTitle || "",
            orgLocation: formData.organizationLocation || "",
            username: formData.username || "",
            linkedIn: formData.linkedIn || "",
            facebook: formData.facebook || "",
            twitter: formData.twitter || "",
            avatar: formData.avatar || "",
          },
          {
            withCredentials: true, // Important to include this
          }
        );
        console.log(response.data);

        if (response.status === 201) {
          alert("Registration Successful");
          localStorage.setItem("squirrelUser", true);
          navigate("/home"); // Redirect to the desired page after successful registration
        }
      } catch (error) {
        console.error(
          "Registration failed:",
          error.response?.data.message || error.message
        );
        alert("Registration failed. Please try again.");
      }
    }
  };

  const handleSignIn = () => {
    navigate("/");
  };

  return (
    <div className="register-form-container-re">
      <form className="register-form-re" onSubmit={handleSubmit}>
        <h2 className="form-title-re">Register</h2>

        {/* First Name and Last Name */}
        <div className="form-group-re">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          {errors.firstName && (
            <p className="error">{errors.firstName._errors[0]}</p>
          )}

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          {errors.lastName && (
            <p className="error">{errors.lastName._errors[0]}</p>
          )}
        </div>

        {/* Organization Name and Type */}
        <div className="form-group-re">
          <input
            type="text"
            name="organizationName"
            placeholder="Organization Name"
            value={formData.organizationName}
            onChange={handleChange}
            required
          />
          {errors.organizationName && (
            <p className="error">{errors.organizationName._errors[0]}</p>
          )}

          <input
            type="text"
            name="organizationType"
            placeholder="Organization Type"
            value={formData.organizationType}
            onChange={handleChange}
            required
          />
          {errors.organizationType && (
            <p className="error">{errors.organizationType._errors[0]}</p>
          )}
        </div>

        {/* Job Title and Sector */}
        <div className="form-group-re">
          <input
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            value={formData.jobTitle}
            onChange={handleChange}
            required
          />
          {errors.jobTitle && (
            <p className="error">{errors.jobTitle._errors[0]}</p>
          )}

          <input
            type="text"
            name="sector"
            placeholder="Sector"
            value={formData.sector}
            onChange={handleChange}
            required
          />
          {errors.sector && <p className="error">{errors.sector._errors[0]}</p>}
        </div>

        {/* City and Pin Code */}
        <div className="form-group-re">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />
          {errors.city && <p className="error">{errors.city._errors[0]}</p>}

          <input
            type="text"
            name="pinCode"
            placeholder="Pin Code"
            value={formData.pinCode}
            onChange={handleChange}
            required
          />
          {errors.pinCode && (
            <p className="error">{errors.pinCode._errors[0]}</p>
          )}
        </div>

        {/* Mobile Number */}
        <div className="form-group-re">
          <input
            type="text"
            name="mobileNo"
            placeholder="Mobile No."
            value={formData.mobileNo}
            onChange={handleChange}
            required
          />
          {errors.mobileNo && (
            <p className="error">{errors.mobileNo._errors[0]}</p>
          )}
        </div>

        {/* Email and Password */}
        <div className="form-group-re">
          <input
            type="email"
            name="email"
            placeholder="Email ID"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email._errors[0]}</p>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && (
            <p className="error">{errors.password._errors[0]}</p>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="terms-re">
          <input type="checkbox" required />
          <label>
            By clicking you agree to accept terms & conditions that you are
            aware of our genuine user policy!
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit" className="register-btn-re">
          Register
        </button>

        {/* Sign In Redirect */}
        <p className="sign-in-re">
          Already have an account? <a onClick={handleSignIn}>Sign In</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
