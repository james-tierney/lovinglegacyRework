import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';

const UserProfile = () => {
  const location = useLocation();
  const queryString = location.search;
  const urlParams = new URLSearchParams(queryString);
  const username = urlParams.get('username');

  const [profileData, setProfileData] = useState({
    username: username,
    email: '',
    bio: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3001/userProfile', {
          params: {
            username: username
          }
        });
        if (response.status === 200) {
          const profile = response.data;
          setProfileData(profile);
        } else {
          console.error('Failed to fetch profile');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  // State to keep track of the active tab
  const [activeTab, setActiveTab] = useState('profile');

  // State to track form input values for medallion data
  const [medallionFormData, setMedallionFormData] = useState({
    username: profileData.username,
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    profilePicture: null,
  });

  // Handler to update form input values for medallion data
  const handleMedallionInputChange = (event) => {
    const { name, value, files } = event.target;
    //console.log("event target", event.target);
    setMedallionFormData({
      ...medallionFormData,
      [name]: files ? files[0] : value,
    });
  };

  // Handler to switch active tab
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Handler for form submission to create a new medallion account
  const handleCreateMedallion = async (event) => {
    event.preventDefault();
    console.log("medallion data", medallionFormData)
    // Create FormData object for medallion data
    const formDataToSend = new FormData();
    formDataToSend.append('username', profileData.username);
    formDataToSend.append('email', medallionFormData.email);
    formDataToSend.append('firstName', medallionFormData.firstName);
    formDataToSend.append('lastName', medallionFormData.lastName);
    formDataToSend.append('bio', medallionFormData.bio);
    formDataToSend.append('profilePicture', medallionFormData.profilePicture);
    formDataToSend.append("test", "text")
    console.log("form data to send = ", formDataToSend);

    for (let x of formDataToSend.entries()) {
      console.log("form pairs", x[0] + ', ' + x[1]);
    }

    try {
 
      // Send POST request to server to create medallion account
      const response = await axios.post('http://localhost:3001/createMedallionProfile', formDataToSend);
      console.log('Response from create medallion account:', response);
      // Optionally update state or show a success message
    } catch (error) {
      console.error('Error creating medallion account:', error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div>
      <div>
        {/* Top section for displaying profile data */}
        <div>
          <h2>{profileData.username}'s Profile</h2>
          <p>Username: {profileData.username}</p>
          <p>Email: {profileData.email}</p>
          <p>Bio: {profileData.bio}</p>
        </div>
        {/* Bottom section for tab navigation and content */}
        <div>
          {/* Tab navigation */}
          <div>
            <button onClick={() => handleTabClick('profile')}>Profile</button>
            <button onClick={() => handleTabClick('medallion')}>Medallion</button>
          </div>
          {/* Content based on active tab */}
          {activeTab === 'profile' && (
            <div>
              {/* Content for Profile tab */}
              <p>This is the profile tab content</p>
            </div>
          )}
          {activeTab === 'medallion' && (
            <div>
              {/* Content for Medallion tab */}
              <h3>Create Medallion Account</h3>
              <form onSubmit={handleCreateMedallion} encType='multipart/form-data'>
                {/* Add input fields for medallion details */}
                {/* Example: email, bio, profilePicture */}
                <input type="email" name="email" value={medallionFormData.email} onChange={handleMedallionInputChange} placeholder="Email" />
                <input type="text" name="firstName" value={medallionFormData.firstName} onChange={handleMedallionInputChange} placeholder='First Name' />
                <input type="text" name="lastName" value={medallionFormData.lastName} onChange={handleMedallionInputChange} placeholder='Last Name' />
                <textarea name="bio" id="bio" value={medallionFormData.bio} onChange={handleMedallionInputChange} placeholder="Bio"></textarea>
                <input type="file" name="profilePicture" onChange={handleMedallionInputChange} accept="image/*" />
                <button type="submit">Create Medallion Account</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
