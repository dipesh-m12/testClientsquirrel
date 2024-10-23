import React, { useState, useEffect } from "react";
import "./Profile.css"; // Include the CSS file
import profileImg from "../../images/user.png"; // Import profile image
import NavBar from "../NavBar/NavBar";
import patentImage from "../../images/patent.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { auth, intRoute, patentsRoute } from "../../utils/apiRoutes";
import useUserData from "../../hooks/useUserData";
import moment from "moment";
import useAuth from "../../hooks/useAuth";
const Profile = () => {
  const [showAll, setShowAll] = useState(false);
  const patents = [
    patentImage,
    patentImage,
    patentImage,
    patentImage,
    patentImage,
    patentImage,
    patentImage,
  ];
  const visiblePatents = showAll ? patents : patents.slice(0, 3);
  const handleViewAll = () => {
    setShowAll(!showAll);
  };
  const navigate = useNavigate();
  useAuth();
  const [activeDiv, setActiveDiv] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "John",
    lastName: "Cena",
    jobTitle: "Propulsion Scientist",
    orgName: "Astroborne Aerospace",
    city: "Maharashtra",
    _id: "Anjali_Gupta-20b48960",
    joinedAt: "8 Aug 2024",
  });
  const [patRegistered, setPatRegistered] = useState([]);
  const [errors, setErrors] = useState();
  const [patentInteractions, setPatentInteractions] = useState({
    wishlistCount: 0,
    enquiryCount: 0,
    impressionCount: 0,
  });
  const [enquiryCount, setEnquiryCount] = useState(0);

  useUserData(setUserData, setErrors);
  console.log(userData);
  const showDiv1 = () => {
    setActiveDiv(1);
    setIsActive(false);
  };
  const showDiv2 = () => {
    setActiveDiv(2);
    setIsActive(true);
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
        navigate("/"); // Navigate to home or login page
      }
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally handle errors, such as showing a message to the user
    }
  };

  const fetchPatents = async () => {
    try {
      const response = await axios.get(`${patentsRoute}/my-patents`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        console.log(response.data.data.length);
        // console.log(response.data.data);
        setPatRegistered(response.data.data); // Set the number of registered patents
      }
    } catch (error) {
      console.error(
        "Error fetching patents:",
        error.response ? error.response.data.message : error.message
      );
    }
  };

  useEffect(() => {
    fetchPatents(); // Call the fetch function on component mount
  }, []);

  const fetchWishlistCount = async () => {
    try {
      const response = await axios.get(`${intRoute}/received-wishlist`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setPatentInteractions((prevState) => ({
          ...prevState,
          wishlistCount: response.data.data.length,
        }));
      }
    } catch (error) {
      console.error("Failed to fetch wishlisted patents", error);
    }
  };

  const fetchEnquiryCount = async () => {
    try {
      const response = await axios.get(`${intRoute}/received-enquiry`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setPatentInteractions((prevState) => ({
          ...prevState,
          enquiryCount: response.data.data.length,
        }));
      }
    } catch (error) {
      console.error("Failed to fetch enquired patents", error);
    }
  };

  const fetchImpressionCount = async () => {
    try {
      const response = await axios.get(`${intRoute}/received-impression`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setPatentInteractions((prevState) => ({
          ...prevState,
          impressionCount: response.data.data.length,
        }));
      }
    } catch (error) {
      console.error("Failed to fetch patents impressions", error);
    }
  };
  useEffect(() => {
    fetchWishlistCount();
    fetchEnquiryCount();
    fetchImpressionCount();
  }, []);

  const fetchEnquiredPatents = async () => {
    try {
      const response = await axios.get(`${intRoute}/enquiry`, {
        withCredentials: true,
      });

      if (response.status === 200 && response.data.success) {
        // Set the number of enquired patents
        setEnquiryCount(response.data.data.length);
      } else {
        console.error(
          "Error fetching enquired patents:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error making API call to fetch enquired patents:", error);
    }
  };

  // UseEffect to fetch data on mount
  useEffect(() => {
    fetchEnquiredPatents();
  }, []);
  return (
    <>
      <NavBar />
      <div className="top-section"></div>
      <div className="profile-navigation">
        <a
          onClick={showDiv1}
          className={!isActive ? "dashboard-btn-active" : "dashboard-btn"}
        >
          Dashboard
        </a>
        <p>|</p>
        <a
          onClick={showDiv2}
          className={isActive ? "dashboard-btn-active" : "dashboard-btn"}
        >
          Patent
        </a>
      </div>
      <div className="profile-content">
        <div className="profile-card-section">
          <div className="profile-card">
            <img src={profileImg} alt="Profile" className="profile-img" />
            <h2>
              {userData.firstName} {userData.lastName}
            </h2>
            <h4>{userData.jobTitle}</h4>
            <p>{userData.orgName} employee</p>
            <p>
              <i className="fas fa-map-marker-alt"></i>
              {userData.city}
            </p>
            <p>{userData._id}</p>
            <p>{patRegistered.length} Patents Registered</p>
            <p>
              Member Since {moment(userData.joinedAt).format("MMMM Do, YYYY")}
            </p>
          </div>
          <div className="profile-buttons">
            <button onClick={() => navigate("/editprofile")}>
              Edit Profile
            </button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
        {activeDiv === 1 && (
          <div className="dashboard">
            <p>Welcome back, {userData.firstName}</p>
            <div className="dashboard-content">
              <div className="patent-summary">
                <div className="patent-imp">
                  <p>
                    Patent <br></br> Impression/<br></br> Likes
                  </p>
                  <div className="imp-count">
                    <p>{patentInteractions.impressionCount}</p>
                  </div>
                </div>
                <div className="patent-wishlist">
                  <p>
                    People<br></br> wislisted<br></br> your patent
                  </p>
                  <div className="wishlist-count">
                    <p>{patentInteractions.wishlistCount}</p>
                  </div>
                </div>
                <div className="patent-inquiry">
                  <p>
                    Inquiry<br></br> Raised
                  </p>
                  <div className="inquiry-count">
                    <p>{patentInteractions.enquiryCount}</p>
                  </div>
                </div>
              </div>
              <div className="activity-summary">
                <div className="activity-1">
                  <h3>Your Activity</h3>
                </div>
                <div className="activity-2">
                  <div className="your-wishlist">
                    <p>
                      Your <br></br> Wishlist
                    </p>
                  </div>
                  <div className="your-inquiry">
                    <p>
                      Inquiry<br></br> Raised by<br></br>you
                    </p>
                    <div className="your-inquiry-count">
                      <p>{enquiryCount}</p>
                    </div>
                  </div>
                </div>
                <div className="activity-3">
                  <h3>How much you were active here</h3>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: "75%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeDiv === 2 && (
          <div className="patent-section">
            <p>Hello {userData.firstName}</p>
            <div className="patent-section-in">
              <div className="patent-1">
                <div className="add-patent">
                  <h4>Add your patent to the list.</h4>
                  <button
                    className="add-patent-btn"
                    onClick={() => navigate("/pform")}
                  >
                    Add patent
                  </button>
                </div>
                <div className="my-patent">
                  <h3>My Patents</h3>
                  <a className="view-all" onClick={handleViewAll}>
                    {!showAll ? "View All" : "View Less"}
                  </a>
                  <div className="patents">
                    <div className="patents-grid">
                      {patRegistered
                        ?.filter((patent) => patent.transactionType !== "sold")
                        .map((patent, index) => (
                          <img
                            src={patentImage} // Assuming you're showing a PDF thumbnail or similar image
                            key={patent.patentId} // Use patentId as key for better uniqueness
                            onClick={() =>
                              navigate(`/description/${patent.patentId}`)
                            } // Navigate to /description/:patentId
                            style={{ cursor: "pointer" }} // Show cursor as pointer to indicate it's clickable
                          />
                        ))}
                    </div>
                  </div>
                </div>
                <div className="sold-patent">
                  <h3>Sold</h3>
                  <div className="patents-grid">
                    {patRegistered
                      ?.filter((patent) => patent.transactionType === "sold")
                      .map((patent, index) => (
                        <img
                          src={patentImage}
                          alt={patent.title}
                          key={patent.patentId} // Ensure each sold patent has a unique key
                          onClick={() =>
                            navigate(`/description/${patent.patentId}`)
                          } // Navigate to /description/:patentId
                          style={{ cursor: "pointer" }} // Indicate it's clickable
                        />
                      ))}
                  </div>
                </div>
              </div>
              <div className="patent-2">
                <h4>Recent Activity on your Patent</h4>
                {/* Add logic for recent activities here if needed */}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
