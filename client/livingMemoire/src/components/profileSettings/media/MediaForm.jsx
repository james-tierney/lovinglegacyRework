import React, { useState } from "react";

const MediaForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    mediaType: "image",
    file: null,
    videoUrl: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call onSubmit with form data
    onSubmit(formData);
    // Reset form fields
    setFormData({
      title: "",
      description: "",
      mediaType: "image",
      file: null,
      videoUrl: "",
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "file" ? files[0] : value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Title */}
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
      />
      {/* Description */}
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      ></textarea>

      {/* Media Type */}
      <select
        name="mediaType"
        value={formData.mediaType}
        onChange={handleChange}
      >
        <option value="image">Image</option>
        <option value="video">Video</option>
      </select>

      {/* File Upload or Video URL */}
      {formData.mediaType === "image" ? (
        <input
          type="file"
          name="file"
          onChange={handleChange}
        />
      ) : (
        <input
          type="text"
          name="videoUrl"
          placeholder="YouTube Video URL"
          value={formData.videoUrl}
          onChange={handleChange}
        />
      )}

      {/* Submit Button */}
      <button type="submit">Upload</button>
    </form>
  );
};

export default MediaForm;
