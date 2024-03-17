import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProfileByUsername, fetchProfileByQrId } from '../../redux/ProfileSlicer'; 
import Map from '../Map';
import ProfileHeader from '../ProfileHeader';
import LogoSVG from '../../assets/logo/logo.svg';
import '../../styles/userProfile.css';
import ProfileBio from '../footerComponents/ProfileBio';
import ProfilePhotos from '../footerComponents/ProfilePhotos';
import ProfileVideos from '../footerComponents/ProfileVideos';
import ProfileLinks from '../footerComponents/ProfileLinks';
import SiteNavigation from '../SiteNavigation';

export default function Profile() {

  const [activeLink, setActiveLink] = useState('bio'); // state to track active footer link
  
  // Access profile data from the Redux store 
  const profileData  = useSelector(state => state.profile.data);
  const dispatch = useDispatch();
  console.log("profile data from redux store = ", profileData);
  const [medallionProfile, setMedallionProfile] = useState(null); // state to store medallion data
  const [showMap, setShowMap] = useState(false);
  const [mapText, setMapText] = useState("Map");
  // Now that we have the profile data from the redux store
  // we can extract the username and use it to make
  // a call to the server func getProfileByUsername 
  // @ route -> /userProfile

    const [isNavigatedByApp, setIsNavigatedByApp] = useState(false) // state to track navigation intitiated by app 

  const toggleMap = () => {
    setShowMap(!showMap);
    setMapText("Hide Map")
  }

  const handleLinkClick = (link, e) => {
    e.preventDefault()
    console.log("current active link = ", activeLink)
    setActiveLink(link);
  }
  

  useEffect(() => {
    const username = localStorage.getItem('username');
    const qr_id = localStorage.getItem('qr_id');
    if(username) {
      console.log("username from local storage ")
      dispatch(fetchProfileByUsername(username));
      
    }
    else if(qr_id) {
      console.log("qr_id from local storage");
      dispatch(fetchProfileByQrId(qr_id));
    }
    // Dispatch action to fetch profile data only on page refresh
    
  }, [])

  // Effect to make GET request to sever function when profileData changes
  useEffect(() => {
    if(profileData) {
      // Extract the username from profileData
      const username = profileData.username;
      console.log("in here");
    

    // make a GET request to the server-side function
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://lovinglegacy.onrender.com/userProfile`, {
          params : {
            username: username
          }
        });
        console.log("Response from server: ", response.data);
        setMedallionProfile(response.data.medallionProfile); // store fetched data in the state
        // Handle the response data as needed here 
      } catch(error) {
        console.error('Error fetching data: ', error);
        // Rest of handling the error show error msg client side??
        }
      };
    fetchData() // Call the fetchData function
    }
  }, [profileData])   // dependancy to run the effect when ever profile data changes


  // Check if profile data exists before rendering ai
  if(!profileData || !medallionProfile) {
    return (
      <div>Loading...</div>
    );
  }
  
  return (
    <div className="bg-gray-100">
      <SiteNavigation  setIsNavigatedByApp={setIsNavigatedByApp} />
      <div className="max-w-sm mx-auto my-8 bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <img src={LogoSVG} alt="loving-legacy-logo" className='logo-img'/>
        </div>
      </div>
      <div className="container mx-auto p-4">
        <div className='image-container'>
          <img style={{ maxWidth: '100%', height: 'auto'}} src={medallionProfile.profilePicture}></img>
        </div>
        
        <div className="text-center">
          {/* <h1>Profile Username for medallion {profileData.username}</h1> */}
   
          <h2 className="text-lg font-semibold">{medallionProfile.firstName} {medallionProfile.lastName}</h2>
          <div className='flex items-center mb-6 underline-div'></div>
          <p className="text-sm text-gray-600 mb-2">{medallionProfile.birthDate} - {medallionProfile.deathDate}</p>
          <div className="text-sm text-gray-600 mb-4">
            <p>City: {medallionProfile.city}</p>
            <p>State: {medallionProfile.state}</p>
            <p>Forest Lawn Memorial Park</p>
            <p>Hollywood Hills, California</p>
            <p>Plot Number: Lincoln Terrace section, Map #H89, Lot 5245, Companion Garden Crypt 2</p>
            <div className='map-container'>
              {showMap && <Map lat={medallionProfile.coordinates[0]} lng={medallionProfile.coordinates[1]} />}
            </div>
            <button className="text-blue-500 underline map-btn" onClick={toggleMap}>{mapText}</button>
          </div>
          <button className="share-btn bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors mb-4">
            Click to share!
          </button>
          <p>{medallionProfile.bio}</p>
          <footer className="flex justify-around text-sm text-gray-600 border-t pt-2">
            <a href="#" className={`footer-links ${activeLink === 'bio' ? 'active' : ''}`} onClick={(event) => handleLinkClick('bio', event)}>Bio</a>
            <a href="#" className={`footer-links ${activeLink === 'photos' ? 'active' : ''}`} onClick={(event) => handleLinkClick('photos', event)}>Photos</a>
            <a href="#" className={`footer-links ${activeLink === 'videos' ? 'active' : ''}`} onClick={(event) => handleLinkClick('videos', event)}>Videos</a>
            <a href="#" className={`footer-links ${activeLink === 'links' ? 'active' : ''}`} onClick={(event) => handleLinkClick('links', event)}>Links</a>

            {/* Render appropriate component based on the active link */}
            {activeLink === 'bio' && <ProfileBio bioText={medallionProfile.bio} />}
            {activeLink === 'photos' && <ProfilePhotos />}
            {activeLink === 'videos' && <ProfileVideos />}
            {activeLink === 'links' && <ProfileLinks profileLinks={medallionProfile.linkToObituary} />}
          </footer>
        </div>
      </div>
    </div>
  );
}
