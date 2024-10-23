import React, { useEffect, useState } from "react";
import "./PDescription.css";
import NavBar from "../NavBar/NavBar";
import like from "../../images/like.png";
import ask from "../../images/ask.png";
import tempd1 from "../../images/tempd1.png";
import tempd2 from "../../images/tempd2.png";
import circle from "../../images/circle.png";
import useAuth from "../../hooks/useAuth";
import useUserData from "../../hooks/useUserData";
import { useParams } from "react-router-dom";
import axios from "axios";
import { intRoute, patentsRoute } from "../../utils/apiRoutes";
import moment from "moment";

const PDescription = () => {
  useAuth();
  const { id } = useParams();
  const [patentData, setPatentData] = useState(null);
  const [userData, setUserData] = useState();
  const [errors, setErrors] = useState();
  useUserData(setUserData, setErrors);
  useEffect(() => {
    async function fetchPatentData() {
      try {
        const response = await axios.post(
          `${patentsRoute}/get-patents-by-ids`,
          {
            patentIds: [id], // Sending patentId array
          },
          { withCredentials: true }
        );
        if (response.data.success) {
          console.log(response.data.data[0]);
          setPatentData(response.data.data[0]); // Set first patent from array
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching patent data:", error);
      }
    }
    fetchPatentData();
  }, [id]);

  async function toggleWishlist() {
    try {
      const response = await axios.post(`${intRoute}/wishlist`, {
        from: {
          userId: userData.userId,
          firstName: userData.firstName,
          lastName: userData.lastName,
          mobile: userData.mobile,
          email: userData.email,
        },
        to: {
          userId: patentData.userId, // Assuming the patent has an owner
          firstName: patentData.firstName,
          lastName: patentData.lastName,
          mobile: patentData.mobile,
          email: patentData.email,
        },
        patentDetails: {
          title: patentData.title,
          patentNumber: patentData.patentNumber,
          applicationNumber: patentData.applicationNumber,
          abstract: patentData.abstract,
          usedTech: patentData.usedTech,
          sector: patentData.sector,
          patentId: patentData.patentId,
        },
      });

      console.log(response.data.message);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data.message : error.message
      );
    }
  }
  async function toggleEnquiry() {
    try {
      const response = await axios.post(`${intRoute}/enquiry`, {
        from: {
          userId: userData.userId,
          firstName: userData.firstName,
          lastName: userData.lastName,
          mobile: userData.mobile,
          email: userData.email,
        },
        to: {
          userId: patentData.userId, // Assuming the patent has an owner
          firstName: patentData.firstName,
          lastName: patentData.lastName,
          mobile: patentData.mobile,
          email: patentData.email,
        },
        patentDetails: {
          title: patentData.title,
          patentNumber: patentData.patentNumber,
          applicationNumber: patentData.applicationNumber,
          abstract: patentData.abstract,
          usedTech: patentData.usedTech,
          sector: patentData.sector,
          patentId: patentData.patentId,
        },
      });

      console.log(response.data.message);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data.message : error.message
      );
    }
  }

  async function toggleImpression() {
    try {
      const response = await axios.post(`${intRoute}/impression`, {
        from: {
          userId: userData.userId,
          firstName: userData.firstName,
          lastName: userData.lastName,
          mobile: userData.mobile,
          email: userData.email,
        },
        to: {
          userId: patentData.userId, // Assuming the patent has an owner
          firstName: patentData.firstName,
          lastName: patentData.lastName,
          mobile: patentData.mobile,
          email: patentData.email,
        },
        patentDetails: {
          title: patentData.title,
          patentNumber: patentData.patentNumber,
          applicationNumber: patentData.applicationNumber,
          abstract: patentData.abstract,
          usedTech: patentData.usedTech,
          sector: patentData.sector,
          patentId: patentData.patentId,
        },
      });

      console.log(response.data.message);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data.message : error.message
      );
    }
  }

  if (!patentData) {
    return <p>Loading patent details...</p>;
  }

  return (
    <>
      <NavBar />
      {/* <div>

                {/*  Description Navbar */}
      {/* <nav className="navbar-pd">
                    <ul className="navbar-list-pd">
                        <li className="navbar-item-pd">
                            <a href="#description-pd" className="navbar-link-pd">Description</a>
                        </li>
                        <li className="navbar-item-pd">
                            <a href="#reviews-pd" className="navbar-link-pd">Reviews</a>
                        </li>
                        <li className="navbar-item-pd">
                            <a href="#related-patents-pd" className="navbar-link-pd">Related Patents</a>
                        </li>
                    </ul>
                </nav> */}

      {/* </div> } */}

      <div className="container-pd">
        <div className="header-pd">
          <h1>{patentData.title}</h1>
          <p>
            Listed On : {moment(patentData.listedAt).format("MMMM Do, YYYY")}
          </p>
        </div>

        <div className="whole-content-pd">
          <div className="content-pd">
            <div className="image-section-pd">
              <img src={tempd1} alt="Space Crew Module" />
              <img src={tempd2} alt="Space Crew Module" />
            </div>

            <div className="description-section-pd">
              <h2>
                <b>Description :</b>
              </h2>
              <p>{patentData.abstract}</p>
              <ul>
                <li>
                  <strong>Sector :</strong> {patentData.sector}
                </li>
                <li>
                  <strong>Used Technology :</strong> {patentData.usedTech}
                </li>
                <li>
                  <strong>Transaction type :</strong>{" "}
                  {patentData.transactionType}
                </li>
              </ul>
              <div className="document-section-pd">
                <strong>Document (Investor's Deck):</strong>
                {patentData.userOwnPatent && (
                  <a
                    href={patentData.pdf}
                    target="_blank"
                    style={{ color: "#ffffff" }}
                  >
                    View pdf
                  </a>
                )}
                {!patentData.userOwnPatent && (
                  <p>Raise an inquiry to view the investor’s Deck.</p>
                )}
              </div>
            </div>
          </div>

          <div className="inquiry-section-pd">
            <button className="btn-pd" onClick={toggleWishlist}>
              <img src={circle} />
              Wishlist Patent
            </button>
            <button className="btn-pd" onClick={toggleImpression}>
              <img src={like} />
              Like Patent
            </button>
            {!patentData.userOwnPatent && (
              <button className="btn-pd" onClick={toggleEnquiry}>
                <img src={ask} />
                Raise an inquiry
              </button>
            )}
          </div>
        </div>
        {/* <div className="related-patents-pd">
                    <h2>Related Patents :</h2>
                    <div className="patents-grid-pd">
                        <div className="patent-box-pd"></div>
                        <div className="patent-box-pd"></div>
                        <div className="patent-box-pd"></div>
                    </div>
                </div> */}
      </div>
    </>
  );
};

export default PDescription;
