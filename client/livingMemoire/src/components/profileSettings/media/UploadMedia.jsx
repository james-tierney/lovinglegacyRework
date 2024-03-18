import React, { useState } from "react";
import MediaForm from "./MediaForm"; // Import the MediaForm component
import StyledForm from "./StyledForm";

const UploadMedia = () => {
  // State to track whether the form is visible or not
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Function to toggle the visibility of the form
  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  // Function to handle form submission
  const handleSubmit = (formData) => {
    console.log("Form Data:", formData);
    // You can add logic to handle form submission here, e.g., send data to server
  };

  return (
    <div>
      {/* Button to toggle form visibility */}
      <button onClick={toggleFormVisibility}>Upload Media</button>

      {/* Dropdown form */}
      {isFormVisible && (
        <div>
          {/* Render the MediaForm component and pass onSubmit prop */}
          <MediaForm onSubmit={handleSubmit} />
          {/* <StyledForm /> */}
        </div>
      )}
    </div>
  );
};

export default UploadMedia;
