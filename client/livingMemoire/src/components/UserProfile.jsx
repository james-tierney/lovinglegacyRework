import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import CreateMedallionProfile from './MedallionProfile';
import NavBar from './NavBar';
import CreateNewMedallionProfile from './CreateMedallionProfile';


const UserProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryString = location.search;
  const urlParams = new URLSearchParams(queryString);
  const usernameFromParams = urlParams.get('username'); 
  const usernameFromState = location.state && location.state.username;
  const username = usernameFromParams || usernameFromState;
  const viewParam = urlParams.get('view');

  let content;  // will be used to render diff component based on view

  const [profileData, setProfileData] = useState({
    username: username,
    email: '',
    bio: '',
  });

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
    setActiveTab(tab);
    console.log("active tab = ", activeTab)
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('view', tab);
    const newUrl = `${location.pathname}?${searchParams.toString()}`;
    navigate(newUrl);
  };


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
  const [createProfile, setCreateProfile] = useState(false);

  // State to track form input values for medallion data
  const [medallionFormData, setMedallionFormData] = useState({
    username: profileData.username,
    firstName: '',
    middleName: '',
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
          <NavBar
            items={[
              { label: 'My favorites', children: '', onClick: () => handleTabClick('') },
              { label: 'Posts', children: '', onClick: ''},
              { label: 'Medallion', children:'', onClick: () => handleTabClick('createMedallionProfile') },
              { label: 'My Account', children: '', onClick: ''},
            ]}
          />

          {/* <NavBar
            items={[
              { label: 'Profile', href: '#' },
              { label: 'Groups', href: '#' },
            ]}
          /> */}
          
          {/* Tab navigation */}
          {/* <div>
            <button onClick={() => handleTabClick('profile')}>Profile</button>
            <button onClick={() => handleTabClick('medallion')}>Medallion</button>
          </div> */}
          {/* Content based on active tab */}
          {/* {activeTab === 'medallion' && (
            <div>
              <CreateMedallionProfile username={profileData.username} />
            </div>
          )} */}
          {content}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
