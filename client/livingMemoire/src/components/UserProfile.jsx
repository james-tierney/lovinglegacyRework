import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import CreateMedallionProfile from './CreateMedallionProfile';
import CreateNewMedallionProfile from './CreateMedallionProfile';
import { useProfile } from './context/ProfileContext';

const UserProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryString = location.search;
  const urlParams = new URLSearchParams(queryString);
  const usernameFromParams = urlParams.get('username'); 
  const usernameFromState = location.state && location.state.username;
  const qr_id = location.state?.qr_id;
  const username = usernameFromParams || usernameFromState;
  const viewParam = urlParams.get('view');
  const { profileData, updateProfileData } = useProfile(); // Use the context hook 
  
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  
  let content;  // will be used to render diff component based on view

   useEffect(() => {
    const fetchProfile = async () => {
      // Check if profile data exists in context
      console.log("profile data context ", profileData);
      if (!profileData || profileData === null) {
        console.log("profile data context in if", profileData);
        try {
          let response; 
          if(username) {
            response = await axios.get('http://localhost:3001/userProfile', {
              params: {
                username: username
              }
            });
          } else if(qr_id) {
            response = await axios.get('http://localhost:3001/getProfile', {
              params: {
                qr_id: qr_id
              }
            });
          } else {
            console.error("Neither User nor qr_id is defined ");
          }
          
          if (response.status === 200) {
            const profile = response.data;
            console.log("profile = ", profile);
            updateProfileData(profile); // Update profile data in the context
          } else {
            console.error('Failed to fetch profile');
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        } finally {
          setIsLoading(false); // Set loading state to false when done fetching
        }
      } else {
        setIsLoading(false); // If profile data exists, set loading state to false
      }
    };
    fetchProfile();
  }, []);

  switch(viewParam) {
    case 'createMedallionProfile':
      content = <CreateMedallionProfile username={profileData.username} />
      break;

    case 'createNew':
      content = <CreateNewMedallionProfile username={profileData.username} />
      break;
    default: 
  }

  // Handler to switch active tab
  const handleTabClick = (tab) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('view', tab);
    const newUrl = `${location.pathname}?${searchParams.toString()}`;
    navigate(newUrl);
  };

  return (
    
    <div>
      {console.log("profile data context in the render = ", profileData)}
      {isLoading || !profileData  ? (
        <p>Loading...</p>
      ) : (
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
            <NavBar
              items={[
                { label: 'My favorites', children: '', onClick: () => handleTabClick('') },
                { label: 'Posts', children: '', onClick: ''},
                { label: 'Medallion', children:'', onClick: () => handleTabClick('createMedallionProfile') },
                { label: 'My Account', children: '', onClick: ''},
              ]}
            />
            {content}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
