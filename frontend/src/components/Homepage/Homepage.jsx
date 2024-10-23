import React, { useState } from 'react';
import './Homepage.css';
import cb from '../../images/celebrating.jpg';
import ip from '../../images/ip.jpg';
import NavBar from '../NavBar/NavBar';
import bridge from '../../images/bridge.png';
import community from '../../images/community.png';
import jig from '../../images/jigsaw.png';
import responsive from '../../images/responsive.png';
import pc from '../../images/PatentCommer.png';
import ipFile from '../../images/IPFile.png';
import cpfi from '../../images/CustomPatentForIndus.png';
import coi from '../../images/CommunityOfInnovators.png';
import star from '../../images/stars.png';
import ContactUsCommon from '../ContactUsCommon/ContactUsCommon';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);  // Toggle between true/false
    };

    const scrollToSection = (task) => {
        const servicesSection = document.getElementById(task);
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const features = [
        {
            id: 1,
            icon: <img src={responsive} className='simIcon' />, // replace with an actual icon or image
            title: 'E-Platform',
            description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit euismod tempor incididunt ut labore et dolore magna.'
        },
        {
            id: 2,
            icon: <img src={community} className='simIcon' />, // replace with an actual icon or image
            title: 'Community',
            description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit euismod tempor incididunt ut labore et dolore magna.'
        },
        {
            id: 3,
            icon: <img src={bridge} className='simIcon' />, // replace with an actual icon or image
            title: 'Bridge',
            description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit euismod tempor incididunt ut labore et dolore magna.'
        },
        {
            id: 4,
            icon: <img src={jig} className='simIcon' />, // replace with an actual icon or image
            title: 'All in 1',
            description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit euismod tempor incididunt ut labore et dolore magna.'
        }
    ];

    const navigate = useNavigate();
    const handleAbout = () => {
        navigate('/about');
    };
    const handleContact = () => {
        navigate('/contact');
    };

    return (
        <div className="homepage">
            {/* Navbar*/}
            <NavBar />

            {/* Main Section: Hero + Countdown + Image */}
            <section className="main-section">
                {/* Hero Section */}
                <div className="hero">
                    <h1>"Protect. Collaborate. Innovate."</h1>
                    <p>Say Goodbye to slow commercialization <br></br>& Hello to the marketplace of your invention</p>
                    <br></br>
                    <div className='join-us'>
                        <p>Join us and unlock world of posibilities!!</p>
                        <div className="buttons">
                            {/* <button className="join-btn">Join the Wishlist</button> */}
                            <button className="join-btn" onClick={handleContact}>Contact</button>
                            <button className="about-btn" onClick={handleAbout}>About us</button>
                        </div>
                    </div>
                </div>

                {/* Countdown and Image Section */}
                <div className="countdown-image-container">

                    <div className='countdown-img'>
                        <img src={cb} alt="Coming Soon" className="coming-soon-img" />
                    </div>
                    <div className="countdown">
                        <h2>COMING SOON !!!</h2>
                        <div className="timer">
                            <div className="time-box">
                                <h3>30</h3>
                                <p>Days</p>
                            </div>
                            <div className="time-box">
                                <h3>2</h3>
                                <p>Hours</p>
                            </div>
                            <div className="time-box">
                                <h3>30</h3>
                                <p>Mins</p>
                            </div>
                            <div className="time-box">
                                <h3>30</h3>
                                <p>Secs</p>
                            </div>
                        </div>
                    </div>



                </div>
            </section>
            <section className="offer" id="services">
                <h2>What We Offer</h2>
                <div className="offer-cards">
                    <div className="offer-card">
                        <div className="image-container">
                            <img src={pc} alt="Patent Commercialization" className="card-image" />
                        </div>
                        <div className="card-content">
                            <h3>Patent Customization</h3>
                            <p>
                                We customize patents for industries, catering to the unique needs of each sector
                                to ensure comprehensive protection of your innovations.
                            </p>
                            <button>Know More</button>
                        </div>
                    </div>
                    <div className="offer-card">
                        <div className="image-container">
                            <img src={ipFile} alt="Patent Commercialization" className="card-image" />
                        </div>
                        <div className="card-content">
                            <h3>Patent Commercialization</h3>
                            <p>
                                At Squirrel IP, we streamline patent commercialization by linking innovation with
                                industries and developing a platform to bring new ideas to market.
                            </p>
                            <button>Know More</button>
                        </div>
                    </div>
                    <div className="offer-card">
                        <div className="image-container">
                            <img src={coi} alt="Patent Commercialization" className="card-image" />
                        </div>
                        <div className="card-content">
                            <h3>Community of Innovators</h3>
                            <p>
                                Join our innovator community, where you can connect with like-minded individuals and
                                collaborate on groundbreaking projects.
                            </p>
                            <button>Know More</button>
                        </div>
                    </div>
                    <div className="offer-card">
                        <div className="image-container">
                            <img src={cpfi} alt="Patent Commercialization" className="card-image" />
                        </div>
                        <div className="card-content">
                            <h3>Custom Patents for Industries</h3>
                            <p>
                                We provide tailored patent solutions for various industries, ensuring that your
                                innovations receive the protection they deserve.
                            </p>
                            <button>Know More</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Us Section */}

            <section className="why-us-container">
                <h2 className="why-us-title"><img src={star} className="star" />WHY US</h2>
                <div className='why-us'>
                    <p className="why-us-description">
                        Lorem ipsum dolor sit amet consectetur adipiscing elit euismod tempor incididunt ut labore et dolore magna.
                    </p>
                    <div className="why-us-features">
                        {features.map((feature) => (
                            <div key={feature.id} className="feature-card">
                                <div className="feature-icon">{feature.icon}</div>
                                <h3 >{feature.title}</h3>
                                <p >{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Supported By Section */}
            <section className="supported-by">
                <h2>Supported By</h2>
                <div className="support-logos">
                    <img src="pedal-start-logo.png" alt="Pedal Start" />
                    <img src="bits-pilani-logo.png" alt="BITS Pilani" />
                </div>
            </section>

            {/*  Common Contact Us + Footer */}
            <ContactUsCommon />
        </div>
    );
};

export default Homepage;

