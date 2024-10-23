import React, { useState } from 'react';
import './LoginSignup.css';
import { z } from 'zod';

const LoginSignup = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    // Define the zod schema for validation
    const signupSchema = z.object({
        email: z.string().email({ message: "Invalid email format" }),
        password: z.string().min(6, { message: "Password must be at least 6 characters" })
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSignUp = (e) => {
        e.preventDefault(); // Prevent form submission
        
        // Validate the form data
        const validationResult = signupSchema.safeParse(formData);

        if (!validationResult.success) {
            // If validation fails, set the errors
            const formattedErrors = validationResult.error.format();
            setErrors(formattedErrors);
        } else {
            // Clear any existing errors and proceed if validation passes
            setErrors({});
            alert('Signed up successfully!');
            // Further actions (like API call) can be implemented here
        }
    };

    return (
        <div className='background'>
            <div className="container">
                <div className="login-section">
                    <h2>Welcome Back!</h2>
                    <p>To keep connecting with us please login with your personal info</p>
                    <button className="login-button">Log in</button>
                </div>
                <div className="signup-section">
                    <h2>Create Account</h2>
                    <div className="social-buttons">
                        <span className="social-button">
                            <i className="fab fa-linkedin-in"></i>
                        </span>
                        <span className="social-button">
                            <i className="fab fa-facebook-f"></i>
                        </span>
                        <span className="social-button">
                            <i className="fab fa-google"></i>
                        </span>
                    </div>
                    <p>or use your email for registration</p>

                    {/* Email and Password fields */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="input-field"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                    {errors.email && <p className="error">{errors.email._errors[0]}</p>}
                    
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="input-field"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    {errors.password && <p className="error">{errors.password._errors[0]}</p>}

                    <button className="signup-button" onClick={handleSignUp}>Sign Up</button>
                </div>
            </div>
        </div>
    );
};

export default LoginSignup;
