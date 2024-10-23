import React, { useState } from "react";
import './AboutUs.css';
import ContactUsCommon from "../ContactUsCommon/ContactUsCommon";
import dummyImage from "../../images/who-are-we.jpg"; // Dummy image path
import member1 from "../../images/who-are-we.jpg";
import member2 from "../../images/who-are-we.jpg";
import member3 from "../../images/who-are-we.jpg";
import NavBar from "../NavBar/NavBar";

const AboutUs = () => {
    return (
        <section>
            <NavBar/>
            <div className="who-container">
                <h3>Empowering Innovation, Fueling progress</h3>
                <h3>SQUIRREL IP, Where ideas takes flight!</h3>
            </div>
            <div >
                <div className="image-container1">
                    <img src={dummyImage} alt="Who Are We" />
                    <div className="text-overlay">
                        <h3></h3>
                        <div className="tagline">
                            <h2 >Who &nbsp; are &nbsp; &nbsp; we</h2>
                        </div>
                    </div>
                </div>
                <div className="description-container">
                    <p>
                        At SQUIRREL IP, we're creating an online platform to connect industries with scientists and streamline innovation. We offer comprehensive services for technology commercialization, including patent, trademark, and copyright filing, as well as custom patent creation. Our goal is to support new technologies and build a vibrant community of innovators through our dedicated portal.
                    </p>
                </div>
            </div>
            <div className="team-section">
                <h2 className="team-heading">Our Team</h2>
                <div className="team-members">
                    <div className="team-member">
                        <img src={member1} alt="Somuddhi Kharvilkar" />
                        <div className="member-info">
                            <h3>Somuddhi Kharvilkar</h3>
                            <p>Co-founder & CEO</p>
                        </div>
                    </div>
                    <div className="team-member">
                        <img src={member2} alt="Akshat Mohite" />
                        <div className="member-info">
                            <h3>Akshat Mohite</h3>
                            <p>Co-founder & COO</p>
                        </div>
                    </div>
                    <div className="team-member">
                        <img src={member3} alt="Prasad Karhad" />
                        <div className="member-info">
                            <h3>Prasad Karhad</h3>
                            <p>Sr. Legal Counsel</p>
                        </div>
                    </div>
                </div>
            </div>
            <ContactUsCommon/>
        </section>
    );
};

export default AboutUs;