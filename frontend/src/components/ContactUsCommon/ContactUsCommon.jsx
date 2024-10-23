import React, { useState } from 'react';
import './ContactUsCommon.css';
import { useNavigate } from 'react-router-dom';


const ContactUsCommon = () => {

    const navigate = useNavigate();

    const navigateToSection =(task) => {
        navigate('/'+task);

    };

    return (
        <>
            <div className="contact-us-container">
                <h1>Contact Us</h1>
                {/* Main Contact Section */}
                <div className="contact-header">

                    <p>We'll be happy to hear from you</p>
                    <button className="contact-btn" onClick={() => navigateToSection('contact')}>Contact</button>
                    {/* <p>Join our wishlist to get premium membership</p>
                    <div className="subscribe-section">
                        <input
                            type="email"
                            placeholder="Enter your email here"
                            className="email-input"
                        />
                        <button className="subscribe-btn">SUBSCRIBE</button>
                    </div> */}
                </div>
            </div>
            {/* Footer Section */}
            <footer className="contact-footer">
                <div className="footer-left">
                    <img src="squirrel-logo.png" alt="Squirrel IP Logo" className="logo" />
                    <div className="social-links">
                        <a href="#" className="social-icon">LinkedIn</a>
                        <a href="#" className="social-icon">Instagram</a>
                    </div>
                </div>

                <div className="footer-contact">
                    <h3>CONTACT US</h3>
                    <p>Phone: +91 9862006741</p>
                    <p>Email: info.squirrelip@gmail.com</p>
                    {/* <p>Mumbai, Maharashtra</p> */}
                    <p>Working Days: Monday to Saturday</p>
                </div>

                <div className="footer-services">
                    <h3>SERVICES</h3>
                    <p>Patent Filing</p>
                    <p>Patent Commercialization</p>
                    <p>Patent Customization</p>
                    <p>Patent Workforce Community</p>
                </div>

                <div className="footer-pages">
                    <h3>PAGES</h3>
                    <p><a onClick={() => navigateToSection('about')}>About</a></p>
                    <p><a onClick={() => navigateToSection('service')}>Services</a></p>
                    <p><a onClick={() => navigateToSection('marketplace')}>Marketplace</a></p>
                    <p><a onClick={() => navigateToSection('contact')}>Contact Us</a></p>
                </div>
            </footer>

            <div className="footer-rights">
                <p>© All rights reserved to Squirrel-IP</p>
            </div>

        </>
    );
};

export default ContactUsCommon;