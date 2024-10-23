import React, { useState } from "react";
import "./ContactUs.css";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import axios from "axios"; // Import Axios
import { subsRoute } from "../../utils/apiRoutes";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    organization: "",
    phone: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const navigateToSection = (task) => {
    navigate("/" + task);
  };

  // Define the schema using zod
  const contactSchema = z.object({
    firstName: z.string().min(1, { message: "First Name is required" }),
    lastName: z.string().min(1, { message: "Last Name is required" }),
    organization: z
      .string()
      .min(1, { message: "Organization Name is required" }),
    phone: z.string().regex(/^[0-9]{10}$/, { message: "Invalid phone number" }),
    email: z.string().email({ message: "Invalid email address" }),
    message: z.string().min(1, { message: "Message cannot be empty" }),
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from submitting

    // Validate the form data
    const validationResult = contactSchema.safeParse(formData);

    if (!validationResult.success) {
      // If validation fails, set the errors
      const formattedErrors = validationResult.error.format();
      setErrors(formattedErrors);
    } else {
      // Clear any existing errors
      setErrors({});

      try {
        // Send POST request to backend
        const response = await axios.post(
          subsRoute,
          {
            firstname: formData.firstName,
            lastname: formData.lastName,
            orgname: formData.organization,
            mobile: formData.phone,
            email: formData.email,
            message: formData.message,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Handle success response
        if (response.status === 201) {
          alert("Subscription successful!"); // Notify user of success
          // Optionally, you can clear the form
          setFormData({
            firstName: "",
            lastName: "",
            organization: "",
            phone: "",
            email: "",
            message: "",
          });
        }
      } catch (error) {
        // Handle error response
        if (error.response) {
          alert(error.response.data.message); // Show error message from server
        } else {
          alert("An error occurred while submitting the form."); // General error message
        }
      }
    }
  };

  return (
    <div>
      <NavBar />
      <div className="contact-section-p">
        <div className="contact-header-p">
          <h2>Contact Us</h2>
          <p>We'd love to talk to you</p>
        </div>
      </div>

      <div className="contact-info-p">
        <div className="contact-item-p">
          <i className="fas fa-phone-alt"></i>
          <div className="contact-in">
            <p>CALL US</p>
            <span>+91 7977563694</span>
          </div>
        </div>
        <div className="contact-item-p">
          <i className="fas fa-envelope"></i>
          <div className="contact-in">
            <p>EMAIL US</p>
            <span>info.squirrelip@gmail.com</span>
          </div>
        </div>
        <div className="contact-item-p">
          <i className="fas fa-map-marker-alt"></i>
          <div className="contact-in">
            <p>OUR OFFICE</p>
            <span>Thane, Mumbai</span>
          </div>
        </div>
      </div>

      {/* Contact us form */}
      <div className="form-section">
        <div className="form-left">
          <h2>Let’s Work Together!</h2>
          <p>
            Share your innovations, visions for your next project with us now.
            Please contact us for basic questions. We’re always here to help.
          </p>
        </div>
        <div className="form-right">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              {errors.firstName && (
                <p className="error">{errors.firstName._errors[0]}</p>
              )}
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
              {errors.lastName && (
                <p className="error">{errors.lastName._errors[0]}</p>
              )}
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Organization Name/ Sector"
                name="organization"
                value={formData.organization}
                onChange={handleInputChange}
              />
              {errors.organization && (
                <p className="error">{errors.organization._errors[0]}</p>
              )}
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Phone No."
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
              {errors.phone && (
                <p className="error">{errors.phone._errors[0]}</p>
              )}
              <input
                type="email"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              {errors.email && (
                <p className="error">{errors.email._errors[0]}</p>
              )}
            </div>
            <div className="form-group">
              <textarea
                placeholder="Type your message..."
                name="message"
                value={formData.message}
                onChange={handleInputChange}
              />
              {errors.message && (
                <p className="error">{errors.message._errors[0]}</p>
              )}
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="contact-footer-p">
        <div className="footer-left-p">
          <img
            src="squirrel-logo.png"
            alt="Squirrel IP Logo"
            className="logo"
          />
          <div className="social-links-p">
            <a href="#" className="social-icon-p">
              LinkedIn
            </a>
            <a href="#" className="social-icon-p">
              Instagram
            </a>
          </div>
        </div>

        <div className="footer-contact-p">
          <h3>CONTACT US</h3>
          <p>Phone: +91 7977563694</p>
          <p>Email: info.squirrelip@gmail.com</p>
          <p>Working Days: Monday to Saturday</p>
        </div>

        <div className="footer-services-p">
          <h3>SERVICES</h3>
          <p>Patent Filing</p>
          <p>Patent Commercialization</p>
          <p>Patent Customization</p>
          <p>Patent Workforce Community</p>
        </div>

        <div className="footer-pages-p">
          <h3>PAGES</h3>
          <p>
            <a onClick={() => navigateToSection("about")}>About</a>
          </p>
          <p>
            <a onClick={() => navigateToSection("service")}>Services</a>
          </p>
          <p>
            <a onClick={() => navigateToSection("marketplace")}>Marketplace</a>
          </p>
          <p>
            <a onClick={() => navigateToSection("contact")}>Contact Us</a>
          </p>
        </div>
      </footer>

      <div className="footer-rights">
        <p>© All rights reserved to Squirrel-IP</p>
      </div>
    </div>
  );
};

export default ContactUs;
