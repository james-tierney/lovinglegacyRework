import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useParams } from 'react-router-dom';

const UserProfile = () => {
  const location = useLocation();
  console.log("location = ", location)
  //const {username} = location.state || useParams();
  //const {username} = useParams();
  const queryString = location.search;
  const urlParams = new URLSearchParams(queryString);
  const username = urlParams.get('username');
  console.log("location.state = ", location.state);
  console.log("location.search = ", location.search);
  console.log("username from state = ", username);
  const [profileData, setProfileData] = useState({
    username: username,
    email: '',
    bio: '',
    profilePicture: '',
  });

   useEffect(() => {

const fetchProfile = async () => {
  console.log("profile data = ", profileData);
  try {
    //const response = await axios.get(`http://localhost:3001/userProfile/${username}`);
      const response = await axios.get('http://localhost:3001/userProfile', {
      params: {
        username: username
      }
    });
    console.log("response from user profile fetch ", response);

    if (response.status === 200) {
      const profile = response.data;
      setProfileData(profile);
    } else {
      console.error('Failed to fetch profile');
      // Handle failure, e.g., show an error message
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
};

    fetchProfile();
  }, []);

  // Render your form here with appropriate input fields

  return (
    <div>
      <h2>{profileData.username}'s Profile</h2>
      <p>Username: {profileData.username}</p>
      <p>Email: {profileData.email}</p>
      <p>Bio: {profileData.bio}</p>
    </div>
  );
};

export default UserProfile;
