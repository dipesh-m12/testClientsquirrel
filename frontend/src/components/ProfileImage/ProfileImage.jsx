import React, { useState } from "react";
import Cropper from "react-easy-crop";
import Modal from "react-modal"; // Import react-modal
import "./ProfileImage.css"; // Updated to match the new CSS file
import { FiUpload, FiTrash } from "react-icons/fi"; // For icons

Modal.setAppElement("#root"); // For accessibility, add root element

const ProfileImage = ({ handleAvatarLogo }) => {
  const [avatar, setAvatar] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false); // Modal state

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        setIsCropping(true);
        setModalIsOpen(true); // Open modal when image is uploaded
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarDelete = () => {
    setAvatar(null);
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleSaveCroppedImage = async () => {
    const croppedImage = await getCroppedImg(avatar, croppedAreaPixels);
    setAvatar(croppedImage);
    setIsCropping(false);
    setModalIsOpen(false); // Close modal after saving
  };

  return (
    <div className="profileAvatarContainer-editprofile">
      <div className="avatarPreview-editprofile">
        {avatar && !isCropping ? (
          <img src={avatar} alt="Avatar" className="avatarImage-editprofile" />
        ) : (
          <div className="defaultAvatar-editprofile">No Avatar</div>
        )}
      </div>

      <button
        className="uploadNewAvatar-editprofile"
        onClick={() => document.getElementById("fileInput-editprofile").click()}
      >
        <FiUpload /> Upload New
      </button>
      <input
        id="fileInput-editprofile"
        type="file"
        accept="image/*"
        onChange={handleAvatarUpload}
        style={{ display: "none" }}
      />

      {avatar && (
        <button
          className="deleteAvatar-editprofile"
          onClick={handleAvatarDelete}
        >
          <FiTrash /> Delete Avatar
        </button>
      )}

      {/* Modal for Cropping */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Crop Image"
        className="Modal-editprofile"
        overlayClassName="Overlay-editprofile"
      >
        <h2>Crop Your Image</h2>
        <div className="cropContainer-editprofile">
          <Cropper
            image={avatar}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <div className="cropControls-editprofile">
          <button onClick={handleSaveCroppedImage}>Save</button>
          <button onClick={() => setModalIsOpen(false)}>Cancel</button>
        </div>
      </Modal>
    </div>
  );
};

export default ProfileImage;

// Utility function to create the cropped image
async function getCroppedImg(imageSrc, crop) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      resolve(url);
    }, "image/jpeg");
  });
}

function createImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous"); // Needed to avoid CORS issues
    image.src = url;
  });
}
