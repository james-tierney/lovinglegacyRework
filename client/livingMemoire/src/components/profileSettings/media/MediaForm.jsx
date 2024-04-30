import React, { useState } from "react";
import axios from "axios";
import '../../../styles/mediaForm.css'
import { BASE_URL_LIVE, BASE_URL_DEV } from '../../../utils/config';
const MediaForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    mediaType: "image",
    file: null,
    videoUrl: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Extract username from local storage
    const username = localStorage.getItem("username");
    if (!username) {
      console.error("Username not found in local storage");
      return;
    }

    try {
      // Send a POST request to the backend API endpoint
     console.log("formData = ", formData);
      await axios.post(`${BASE_URL_DEV}/uploadMedia`, {
        username,
        title: formData.title,
        description: formData.description,
        mediaType: formData.mediaType,
        mediaLink: formData.mediaType === "image" ? formData.file.name : formData.videoUrl,
      });

      // Reset form fields
      setFormData({
        title: "",
        description: "",
        mediaType: "image",
        file: null,
        videoUrl: "",
      });
    } catch (error) {
      console.error("Error uploading media:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log("name = ", name);
    console.log("value = ", value);
    console.log("files = ", files);
    if (name === "file") {
      console.log("files = ", files[0].name);
      setFormData({
        ...formData,
        file: files[0].name,
        [name]: files[0], // Store the file object in state
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <form className="media-form" onSubmit={handleSubmit}>
            {/* Media Type */}
      <div className="media-type-options">
        <label className="block text-sm font-medium text-gray-700">Media Type:</label>
        <div>
          <input
            type="checkbox"
            name="mediaType"
            value="image"
            checked={formData.mediaType === "image"}
            onChange={handleChange}
            className="mr-2"
          />
          <span>Image</span>
        </div>
        <div>
          <input
            type="checkbox"
            name="mediaType"
            value="video"
            checked={formData.mediaType === "video"}
            onChange={handleChange}
            className="mr-2"
          />
          <span>Video</span>
        </div>
      </div>
      {formData.mediaType === "image" ? (
        <div className="mt-4">
          
          <label className="block text-sm font-medium text-gray-700">Images:</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                  htmlFor="file"
                >
                  <span>Drag images or click to upload images</span>
                  <input
                    type="file"
                    name="file"
                    onChange={handleChange}
                    className="sr-only"
                    id="file"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
       ) : (
        <input
          type="text"
          name="videoUrl"
          placeholder="YouTube Video URL"
          value={formData.videoUrl}
          onChange={handleChange}
          className="video-url"
        />
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="title">
          Title:
        </label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 focus:z-10 sm:text-sm"
        />
      </div>
      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700" htmlFor="description">
          Description:
        </label>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
        ></textarea>
      </div>

 
      {/* Submit Button */}
      <button type="submit" className="submit-button">Upload</button>
    </form>
  );
};


function UploadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}

export default MediaForm;
