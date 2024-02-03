import React, { useState } from 'react';

const UserProfile = ({ username }) => {
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    bio: '',
    profilePicture: '',
  });

   useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3001/profile/${username}`);
        
        if (response.ok) {
          const profile = await response.json();
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
  }, [username]);

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
