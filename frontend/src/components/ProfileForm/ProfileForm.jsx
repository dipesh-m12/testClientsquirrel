import React, { useEffect, useState } from "react";
import "./ProfileForm.css"; // Updated to match the new CSS file
import ProfileImage from "../ProfileImage/ProfileImage";
import checked from "../../images/checked.png";
import NavBar from "../NavBar/NavBar";
import back from "../../images/back.png";
import { Navigate, useActionData, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import office from "../../images/office.png";
import info from "../../images/info.png";
import axios from "axios";
import { host, profileRoute } from "../../utils/apiRoutes";

const ProfileForm = () => {
  useAuth();

  const navigate = useNavigate();
  const [seeForm1, setSeeForm1] = useState(true);
  const [seeForm2, setSeeForm2] = useState(false);
  const [seeForm3, setSeeForm3] = useState(false);
  const [seeForm4, setSeeForm4] = useState(false);
  const [isActive1, setIsActive1] = useState(true);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);
  const [loading, setloading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    orgName: "",
    orgType: "",
    orgEmail: "",
    orgContact: "",
    jobTitle: "",
    orgLocation: "",
    username: "",
    linkedIn: "",
    facebook: "",
    twitter: "",
    avatar: "",
    orgLogo: "",
  });

  const [orgLogoFile, setOrgLogofile] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);

  const handleOrgLogo = (e) => {
    const file = e.target.files[0];
    setOrgLogofile(file);
    console.log(file); // Log the selected file
  };

  // useEffect(() => {
  //   console.log(orgLogoFile);
  // }, [orgLogoFile]);

  const handleAvatarLogo = (image) => {
    setAvatarFile(image);
    console.log(image);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    for (const [key, value] of Object.entries(formData)) {
      if (value === "" && key !== "avatar" && key !== "orgLogo") {
        alert(`The field ${key} is empty.`);
        return; // Exit after the first alert, remove if you want to check all fields
      }
    }
    if (!orgLogoFile) return alert("No ORG logo found");
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("file", orgLogoFile);
    try {
      setloading(true);
      const response = await axios.post(`${host}/upload`, formDataToSubmit, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      setFormData({ ...formData, orgLogo: response.data.fileUrl });
      console.log({ ...formData, orgLogo: response.data.fileUrl });
      const { data } = await axios.put(
        `${profileRoute}/update`,
        { ...formData, orgLogo: response.data.fileUrl },
        {
          withCredentials: true,
        }
      );
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
      setloading(false);
    }

    handleNext(4);
  };

  const handleback = () => {
    navigate("/profile");
  };

  const handleNext = (pageNo) => {
    console.log("Form Data Submitted: ", formData); //change this
    if (pageNo == 2) {
      setSeeForm1(false);
      setSeeForm2(true);
      setIsActive1(false);
      setIsActive2(true);
    } else if (pageNo == 3) {
      setSeeForm2(false);
      setSeeForm3(true);
      setIsActive2(false);
      setIsActive3(true);
    } else if (pageNo == 4) {
      setSeeForm3(false);
      setSeeForm4(true);
      setIsActive1(true);
      setIsActive2(true);
      setIsActive3(true);
    }
  };

  const handleFormBack = (pageNo) => {
    if (pageNo == 1) {
      setSeeForm1(true);
      setSeeForm2(false);
      setIsActive1(true);
      setIsActive2(false);
    } else if (pageNo == 2) {
      setSeeForm2(true);
      setSeeForm3(false);
      setIsActive2(true);
      setIsActive3(false);
    }
  };

  return (
    <div className="container-pff">
      <NavBar />
      {/* Page 1 */}
      {seeForm1 && (
        <div className="top-design">
          <div className="outer-card-pff">
            <div className="middle-card-pff">
              <div className="image-pff">
                <div className="card-back-pff" onClick={handleback}>
                  <a>
                    <img src={back} alt="back Image" />
                  </a>
                  <p>Back</p>
                </div>
                <h3>Your Avatar</h3>
                <ProfileImage handleAvatarLogo={handleAvatarLogo} />
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-row-pff">
                  <div className="fline-pff">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="fline-pff">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row-pff">
                  <div className="fline-pff">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="fline-pff">
                    <label>Contact Number</label>
                    <input
                      type="tel"
                      name="mobile"
                      placeholder="Enter Contact Number"
                      value={formData.mobile}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row-pff">
                  <div className="fline-pff">
                    <label>Country</label>
                    <input
                      type="country"
                      name="country"
                      placeholder="Enter Country"
                      value={formData.country}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="fline-pff">
                    <label>State</label>
                    <input
                      type="text"
                      name="state"
                      placeholder="Enter State"
                      value={formData.state}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row-pff">
                  <div className="fline-pff">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      placeholder="Enter City"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="fline-pff">
                    <label>Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      placeholder="Enter Pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-actions-pff">
                  {/* <button type="button">Save</button> */}
                  <button type="submit" onClick={() => handleNext(2)}>
                    Next
                  </button>
                </div>
              </form>
            </div>
            <div className="right-card-pff">
              <div className="page-numbers-pff">
                <div className={isActive1 ? "step-pff-active" : "step-pff"}>
                  1
                </div>
                <div className={isActive2 ? "step-pff-active" : "step-pff"}>
                  2
                </div>
                <div className={isActive3 ? "step-pff-active" : "step-pff"}>
                  3
                </div>
              </div>

              <div className="right-card-image-pff">
                <img src={checked} alt="org Image" />
              </div>
              <h3>Personal Information</h3>
              <p>
                Fill out the form on the left.<br></br>You can always edit the
                data
              </p>

              <p className="right-card-email-pff">
                Help : info.squirrelip@gmail.com
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Page 2 */}

      {seeForm2 && (
        <div className="top-design">
          <div className="outer-card-pff">
            <div className="middle-card-pff">
              <div className="card-back-pff" onClick={handleback}>
                <a>
                  <img src={back} alt="back Image" />
                </a>
                <p>Back</p>
              </div>

              <div className="card-pdf-upload-pff3">
                <div className="card-upload-box-pff">
                  <label htmlFor="file-upload">
                    <input
                      type="file"
                      id="file-upload"
                      // accept=".pdf"
                      onChange={handleOrgLogo}
                    />
                    <span>Drag your file(s) to start uploading</span>
                    <p>OR</p>
                    <button className="card-browse-button-pff">
                      <label for="myfile">Select a file</label>
                      <input type="file" id="myfile" name="myfile" />
                    </button>
                  </label>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-row-pff">
                  <div className="fline-pff">
                    <label>Organisation Name</label>
                    <input
                      type="text"
                      name="orgName"
                      placeholder="Organisation Name"
                      value={formData.orgName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="fline-pff">
                    <label>Organisation Type</label>
                    <input
                      type="text"
                      name="orgType"
                      placeholder="Organisation Type"
                      value={formData.orgType}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row-pff">
                  <div className="fline-pff">
                    <label>Organisation Email ID</label>
                    <input
                      type="email"
                      name="orgEmail"
                      placeholder="Enter Organisation Email"
                      value={formData.orgEmail}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="fline-pff">
                    <label>Organisation Contact Number</label>
                    <input
                      type="tel"
                      name="orgContact"
                      placeholder="Organisation Contact Number"
                      value={formData.orgContact}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row-pff">
                  <div className="fline-pff">
                    <label>Your Job Position in Organisation</label>
                    <input
                      type="text"
                      name="jobTitle"
                      placeholder="Job Position"
                      value={formData.jobTitle}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="fline-pff">
                    <label>Organisation Location</label>
                    <input
                      type="text"
                      name="orgLocation"
                      placeholder="Organisation Location"
                      value={formData.orgLocation}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-actions-pff">
                  <button type="button" onClick={() => handleFormBack(1)}>
                    Back
                  </button>
                  <button type="submit" onClick={() => handleNext(3)}>
                    Next
                  </button>
                </div>
              </form>
            </div>
            <div className="right-card-pff">
              <div className="page-numbers-pff">
                <div className={isActive1 ? "step-pff-active" : "step-pff"}>
                  1
                </div>
                <div className={isActive2 ? "step-pff-active" : "step-pff"}>
                  2
                </div>
                <div className={isActive3 ? "step-pff-active" : "step-pff"}>
                  3
                </div>
              </div>

              <div className="right-card-image-pff">
                <img src={office} alt="org Image" />
              </div>
              <h3>Organisation Information</h3>
              <p>
                Fill out the form on the left.<br></br>You can always edit the
                data
              </p>

              <p className="right-card-email-pff">
                Help : info.squirrelip@gmail.com
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Page 3 */}

      {seeForm3 && (
        <div className="top-design">
          <div className="outer-card-pff">
            <div className="middle-card-pff">
              <div className="card-back-pff" onClick={handleback}>
                <a>
                  <img src={back} alt="back Image" />
                </a>
                <p>Back</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-row-pff">
                  <div className="fline-pff">
                    <label>Choose Username</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="User Name"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="fline-pff">
                    <label>Linkdin</label>
                    <input
                      type="url"
                      name="linkedIn"
                      placeholder="Linkdin"
                      value={formData.linkedIn}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row-pff">
                  <div className="fline-pff">
                    <label>Facebook</label>
                    <input
                      type="url"
                      name="facebook"
                      placeholder="Facebook"
                      value={formData.facebook}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="fline-pff">
                    <label>Twitter</label>
                    <input
                      type="url"
                      name="twitter"
                      placeholder="Twitter"
                      value={formData.twitter}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <p className="para-card-pff">
                  Or you can skip this step entirely and setup it later.
                </p>
                <div className="form-actions-pff">
                  <button type="button" onClick={() => handleFormBack(2)}>
                    Back
                  </button>
                  <button type="submit" disabled={loading}>
                    {loading ? "Uploading" : "Submit"}
                  </button>
                </div>
              </form>
            </div>
            <div className="right-card-pff">
              <div className="page-numbers-pff">
                <div className={isActive1 ? "step-pff-active" : "step-pff"}>
                  1
                </div>
                <div className={isActive2 ? "step-pff-active" : "step-pff"}>
                  2
                </div>
                <div className={isActive3 ? "step-pff-active" : "step-pff"}>
                  3
                </div>
              </div>

              <div className="right-card-image-pff-info">
                <img src={info} alt="org Image" />
              </div>
              <h3>Additional Information</h3>
              <p>
                Fill out the form on the left.<br></br>You can always edit the
                data
              </p>

              <p className="right-card-email-pff">
                Help : info.squirrelip@gmail.com
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Account is ready */}

      {seeForm4 && (
        <div className="top-design">
          <div className="outer-card-pff">
            <div className="card-back-pff" onClick={handleback}>
              <a>
                <img src={back} alt="back Image" />
              </a>
              <p>Back</p>
            </div>
            <h1>Congratulation</h1>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProfileForm;
