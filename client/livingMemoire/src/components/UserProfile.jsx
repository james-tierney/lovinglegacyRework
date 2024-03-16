import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavBar from './NavBar';
import CreateMedallionProfile from './CreateMedallionProfile';
import CreateNewMedallionProfile from './CreateMedallionProfile';
import SiteNavigation from './SiteNavigation';
import ProfileHeader from './ProfileHeader';
import { fetchProfileByUsername, fetchProfileByQrId } from '../redux/ProfileSlicer';


const UserProfile = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const queryString = location.search;
  const urlParams = new URLSearchParams(queryString);
  const usernameFromParams = urlParams.get('username'); 
  const usernameFromState = location.state && location.state.username;
  const qr_id = location.state?.qr_id;
  const username = usernameFromParams || usernameFromState;
  const viewParam = urlParams.get('view');
  const profileData = useSelector(state => state.profile.data);
  const isLoading = useSelector(state => state.profile.isLoading);
  const [isNavigatedByApp, setIsNavigatedByApp] = useState(false) // state to track navigation intitiated by app 
  console.log("profile data = ", profileData);



  //   useEffect(() => {
  //   const username = localStorage.getItem('username');
  //   const qr_id = localStorage.getItem('qr_id');
  //   console.log("username from local storage --- ", username);
  //   if(username) {
  //     console.log("username from local storage ")
  //     dispatch(fetchProfileByUsername(username));
      
  //   }
  //   else if(qr_id) {
  //     console.log("qr_id from local storage");
  //     dispatch(fetchProfileByQrId(qr_id));
  //   }
  //   // Dispatch action to fetch profile data only on page refresh
    
  // }, [])

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Check if navigation was initiated by the app, useNavigate hook or by direct URL manipulation
        if (isNavigatedByApp || location.state || usernameFromParams) { // checks if by app or useNavigate hook 
          // location.state only set when useNavigate hook used
          console.log("navigated by app ")
          if (username) {
            await dispatch(fetchProfileByUsername(username));
            localStorage.setItem('username', username); // set username in local storage
          } else if (qr_id) {
            await dispatch(fetchProfileByQrId(qr_id));
            localStorage.setItem('qr_id', qr_id);  // Set the qr_id in local storage
          } else {
            console.error("Neither User nor qr_id is defined");
          }
        } else {
          // If navigation was not initiated by the app, fetch data from local storage
          const storedUsername = localStorage.getItem('username');
          const storedQrId = localStorage.getItem('qr_id');
          if (storedUsername) {
            await dispatch(fetchProfileByUsername(storedUsername));
          } else if (storedQrId) {
            await dispatch(fetchProfileByQrId(storedQrId));
          } else {
            console.error("Neither User nor qr_id is stored in local storage");
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, [dispatch, username, qr_id, isNavigatedByApp]);

  let content;
  switch (viewParam) {
    case 'createMedallionProfile':
      content = <CreateMedallionProfile username={profileData?.username} />;
      break;
    case 'createNew':
      content = <CreateNewMedallionProfile username={profileData?.username} />;
      break;
    default:
  }

  const handleTabClick = (tab) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('view', tab);
    const newUrl = `${location.pathname}?${searchParams.toString()}`;
    navigate(newUrl);
  };

  // background color for full background could be ECF4F4?
  return (
    <div>
      <SiteNavigation  setIsNavigatedByApp={setIsNavigatedByApp} />
      {isLoading || !profileData ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div>
            <h2>{profileData.username}'s Profile</h2>
            <p>Username: {profileData.username}</p>
            <p>Email: {profileData.email}</p>
          </div>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', border: '2px solid #ccc' }}>
            <ProfileHeader 
              username={profileData.username}
              email={profileData.email}
              dateCreated={profileData.dateCreated}
              profilePicture={""}
            />
            <NavBar
              items={[
                { label: 'My favorites', children: '', onClick: () => handleTabClick('') },
                { label: 'Posts', children: '', onClick: '' },
                { label: 'Medallion', children: '', onClick: () => handleTabClick('createMedallionProfile') },
                { label: 'My Account', children: '', onClick: '' },
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
