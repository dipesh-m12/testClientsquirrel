import React, { useState } from "react";
import "./PatentForm.css";
import NavBar from "../NavBar/NavBar";
import checked from "../../images/checked.png";
import home from "../Homepage/Homepage";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { host, patentsRoute } from "../../utils/apiRoutes";

const PatentForm = () => {
  useAuth();

  const navigate = useNavigate();
  const [seeform1, setForm1] = useState(true);
  const [seeform2, setForm2] = useState(false);
  const [seeform3, setForm3] = useState(false);
  const [seeform4, setForm4] = useState(false);
  const [seeform5, setForm5] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [isActive1, setIsActive1] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "", // First name of the applicant
    lastName: "", // Last name of the applicant
    mobile: "", // Phone number of the applicant
    email: "", // Email of the applicant
    state: "", // State of residence
    city: "", // City of residence
    coauthors: "", // Co-authors (can be an array of strings or a comma-separated string)
    org: "", // Institution/organization name
    title: "", // Title of the patent
    grantDate: "", // Grant date (string, later converted to Date)
    filingDate: "", // Filing date (string, later converted to Date)
    patentNumber: "", // Patent number
    applicationNumber: "", // Application number
    abstract: "", // Abstract description of the patent
    sector: "", // Sector of the patent
    usedTech: "", // Technology used
    pdf: "", // URL or path to the uploaded PDF
    transactionType: "available", // Transaction type (default is "available")
    patentType: "utility", // Patent type (could be utility, design, etc.)
    id: "", // ID (can be pre-filled or auto-generated)
    verified: false, // Verified status, default to false
  });
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; // Get the selected file
    setFile(selectedFile); // Update state
    console.log(selectedFile); // Log the selected file directly
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
  };

  const handleClick = () => {
    navigate("/home");
  };

  const handleNext = (pageNo) => {
    console.log("Form Data Submitted: ", formData); //change this
    if (pageNo == 2) {
      setForm1(false);
      setForm2(true);
      setIsActive(false);
      setIsActive1(true);
    } else if (pageNo == 3) {
      setForm2(false);
      setForm3(true);
    } else if (pageNo == 4) {
      setForm3(false);
      setForm4(true);
      setIsActive1(false);
      setIsActive2(true);
    } else {
      setForm4(false);
      setForm5(true);
      setIsActive2(false);
    }
  };

  const handleBack = (pageNo) => {
    if (pageNo == 1) {
      setForm1(true);
      setForm2(false);
      setIsActive(true);
      setIsActive1(false);
    } else if (pageNo == 2) {
      setForm2(true);
      setForm3(false);
      setIsActive(false);
      setIsActive1(true);
    } else {
      setForm3(true);
      setForm4(false);
      setIsActive2(false);
      setIsActive1(true);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.mobile ||
      !formData.email ||
      !formData.state ||
      !formData.city ||
      !formData.coauthors ||
      !formData.org ||
      !formData.title ||
      !formData.grantDate ||
      !formData.filingDate ||
      !formData.patentNumber ||
      !formData.applicationNumber ||
      !formData.abstract ||
      !formData.sector ||
      !formData.usedTech
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!file) return alert("File is required");

    const formDataToSend = new FormData();
    formDataToSend.append("file", file);

    try {
      setLoading(true);
      if (formData.pdf === "") {
        const response = await axios.post(`${host}/upload`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });

        setFormData({ ...formData, pdf: response.data.fileUrl });
        console.log({ ...formData, pdf: response.data.fileUrl });
      }

      // Ensure formData includes the updated pdf
      const patentData = { ...formData, pdf: formData.pdf, id: formData.id }; // Ensure id and pdf are included

      const { data } = await axios.post(
        `${patentsRoute}/add-patent`,
        patentData,
        {
          withCredentials: true,
        }
      );

      console.log("Patent added successfully:", data);
      handleNext(5);
    } catch (error) {
      console.error(
        "Error adding patent:",
        error.response ? error.response.data : error.message
      );
      alert(
        "Error adding patent: " +
          (error.response ? error.response.data.message : error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="search-container-pf">
        <h1> Welcome !</h1>
        <p>Add your patent by completing following steps</p>
      </div>
      <div className="form-container-pf">
        <div className="form-steps-pf">
          <div className="step1-pf">
            <p>Tell us about yourself</p>
            <div className={isActive ? "step-pf-active" : "step-pf"}>1</div>
          </div>

          <div className="step1-pf">
            <p>Tell us about your patent</p>
            <div className={isActive1 ? "step-pf-active" : "step-pf"}>2</div>
          </div>

          <div className="step1-pf">
            <p>Share knowledge about your invention</p>
            <div className={isActive2 ? "step-pf-active" : "step-pf"}>3</div>
          </div>
        </div>
        {/* page 1 */}
        {seeform1 && (
          <div className="form-section-pf">
            <div className="form-header-pf">
              <p>Personal Information</p>
            </div>

            <form onSubmit={handleSubmit} className="form-container">
              <div className="form-row-pf">
                <div className="top-pf2">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="top-pf2">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row-pf">
                <div className="top-pf2">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                </div>
                <div className="top-pf2">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row-pf">
                <div className="top-pf2">
                  <label>State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>
                <div className="top-pf2">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row-pf">
                <div className="top-pf2">
                  <label>Co-Authors (If any)</label>
                  <input
                    type="text"
                    name="coauthors"
                    value={formData.coauthors}
                    onChange={handleChange}
                  />
                </div>
                <div className="top-pf2">
                  <label>Institution/Organization</label>
                  <input
                    type="text"
                    name="org"
                    value={formData.org}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-actions-pf">
                {/* <button type="button">Save</button> */}
                <button type="submit" onClick={() => handleNext(2)}>
                  Next
                </button>
              </div>
            </form>
          </div>
        )}

        {/* page 2 */}

        {seeform2 && (
          <div className="form-section-pf">
            <div className="form-header-pf">
              <p>Patent Information</p>
            </div>

            <form onSubmit={handleSubmit} className="form-container">
              <div className="form-row-pf2">
                <div className="top-pf0">
                  <label>Title of Patent</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Title of patent"
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row-pf2">
                <div className="daeoffiling-pf">
                  <label>Date Of Grant</label>
                  <input
                    type="date"
                    name="grantDate"
                    placeholder="Date of Grant"
                    value={formData.grantDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="daeoffiling-pf">
                  <label>Date Of Filing</label>
                  <input
                    type="date"
                    name="filingDate"
                    placeholder="MM/DD/YYYY"
                    value={formData.filingDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row-pf2">
                <div className="daeoffiling-pf">
                  <label>Patent Number</label>
                  <input
                    type="number"
                    name="patentNumber"
                    placeholder="Patent Number"
                    value={formData.patentNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="daeoffiling-pf">
                  <label>Application Number</label>
                  <input
                    type="number"
                    placeholder="Application Number"
                    name="applicationNumber"
                    value={formData.applicationNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-actions-pf">
                <button onClick={() => handleBack(1)}>Back</button>
                <button onClick={() => handleNext(3)} type="submit">
                  Next
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Page 3 */}

        {seeform3 && (
          <div className="form-section-pf">
            <div className="form-header-pf">
              <p>Patent Information</p>
            </div>

            <form onSubmit={handleSubmit} className="form-container">
              <div className="form-row-pf3">
                <div className="top-pf2">
                  <label>Abstract</label>
                  <textarea
                    placeholder="Some text..."
                    name="abstract"
                    value={formData.abstract}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>

              <div className="form-row-pf2">
                <div className="daeoffiling-pf">
                  <label>Sector</label>
                  <input
                    type="text"
                    name="sector"
                    placeholder="sector"
                    value={formData.sector}
                    onChange={handleChange}
                  />
                </div>

                <div className="daeoffiling-pf">
                  <label>Used Technology</label>
                  <input
                    type="text"
                    name="usedTech"
                    placeholder="Used Technology"
                    value={formData.usedTech}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-actions-pf">
                <button onClick={() => handleBack(2)}>Back</button>
                <button onClick={() => handleNext(4)} type="submit">
                  Next
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Page 4 */}

        {seeform4 && (
          <div className="form-section-pf">
            <div className="form-header-pf">
              <p>Patent Information</p>
            </div>

            <form onSubmit={handleFormSubmit} className="form-container">
              <div className="pdf-upload">
                <h2>PDF Upload</h2>
                <p>
                  Add your documents here, and you can upload up to 1 file max
                  in .pdf format
                </p>
                <div className="upload-box">
                  <input
                    type="file"
                    id="file-upload"
                    accept=".pdf"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="file-upload">
                    <div className="upload-icon">
                      <img src="/upload-icon.png" alt="Upload" />
                    </div>
                    <span>
                      {file
                        ? file.name
                        : "Drag your file(s) to start uploading"}
                    </span>
                    <p>OR</p>
                    <div className="browse-button">
                      <label htmlFor="myfile">Select a file</label>
                      <input
                        type="file"
                        id="myfile"
                        accept=".pdf"
                        name="myfile"
                        onChange={handleFileChange}
                      />
                    </div>
                  </label>
                </div>
              </div>
              <div className="form-actions-pf">
                <button onClick={() => handleBack(3)}>Back</button>
                <button type="submit" disabled={loading}>
                  {loading ? "Uploading" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        )}

        {seeform5 && (
          <div className="form-section-pf-lp">
            <div className="confirmation-container-lp">
              <div className="icon-container-lp">
                <img src={checked} alt="Checklist Icon" />
              </div>
              <h1>Your Patent has been successfully registered!!!</h1>
              <p className="description-lp">
                Please allow us 24-48 hours to review the application before it
                is made live on the patent marketplace. Till then do check out
                other patents of your interest.
              </p>
              <p className="footer-text-lp">
                Empowering Innovation, Fueling progress. SQUIRREL IP, where
                ideas take flight!
              </p>
              <button className="home-button-lp" onClick={handleClick}>
                Home
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PatentForm;
