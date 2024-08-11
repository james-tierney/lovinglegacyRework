import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProfileByUsername, fetchProfileByQrId } from '../../redux/ProfileSlicer'; 
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import ProfileBio from '../footerComponents/ProfileBio';
import ProfilePhotos from '../footerComponents/ProfilePhotos';
import ProfileVideos from '../footerComponents/ProfileVideos';
import ProfileLinks from '../footerComponents/ProfileLinks';
import SiteNavigation from '../SiteNavigation';

export default function Profile() {
  const [activeLink, setActiveLink] = useState('bio');
  const profileData  = useSelector(state => state.profile.data);
  const dispatch = useDispatch();
  const [medallionProfile, setMedallionProfile] = useState(null);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const username = localStorage.getItem('username');
    const qr_id = localStorage.getItem('qr_id');
    if (username) {
      dispatch(fetchProfileByUsername(username));
    } else if (qr_id) {
      dispatch(fetchProfileByQrId(qr_id));
    }
  }, [dispatch]);

  useEffect(() => {
    if (profileData) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://lovinglegacy.onrender.com/userProfile`, {
            params: { username: profileData.username }
          });
          setMedallionProfile(response.data.medallionProfile);
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      };
      fetchData();
    }
  }, [profileData]);

  if (!profileData || !medallionProfile) {
    return <div>Loading...</div>;
  }

  const styles = {
    profilePage: {
      maxWidth: '935px',
      margin: '0 auto',
      paddingTop: '50px',
      backgroundColor: '#fff',
    },
    headerImageContainer: {
      width: '100%',
      height: '200px',
      backgroundImage: `url('https://via.placeholder.com/935x200?text=Header+Image')`, // Placeholder header image
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
    },
    profileHeader: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      marginBottom: '20px',
      padding: '0 20px',
      position: 'relative',
      top: '-70px', // Moves the header up to partially overlay the header image
      marginLeft: '0%', // Adjusts position to be closer to the left side
      maxWidth: '60%', // Keeps content width within a specific range
    },
    profilePicContainer: {
      zIndex: 1,
    },
    profilePicture: {
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '5px solid white',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    },
    profileInfo: {
      textAlign: 'center',
      marginTop: '20px', // Adds spacing between the profile picture and the text
    },
    inLovingMemory: {
      fontSize: '18px',
      color: '#8e8e8e',
      marginBottom: '5px',
    },
    profileName: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#000',
    },
    profileDates: {
      color: '#8e8e8e',
    },
    profileTabs: {
      display: 'flex',
      justifyContent: 'space-around',
      borderTop: '1px solid #dbdbdb',
      borderBottom: '1px solid #dbdbdb',
      backgroundColor: '#fafafa',
    },
    tab: {
      flex: 1,
      textAlign: 'center',
      padding: '10px 0',
      fontWeight: 'bold',
      cursor: 'pointer',
      color: '#262626',
    },
    tabActive: {
      borderBottom: '2px solid #000',
      color: '#000',
    },
    profileContent: {
      padding: '20px',
    },
    editButton: {
      marginTop: '20px',
      padding: '10px 20px',
      backgroundColor: '#000',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.profilePage}>
      <SiteNavigation />
      <div style={styles.headerImageContainer}></div> {/* Header Image */}
      <div style={styles.profileHeader}>
        <div style={styles.profilePicContainer}>
          <img style={styles.profilePicture} src={medallionProfile.profilePicture} alt="Profile" />
        </div>
        <div style={styles.profileInfo}>
          <p style={styles.inLovingMemory}>In loving memory of</p>
          <h2 style={styles.profileName}>{medallionProfile.firstName} {medallionProfile.lastName}</h2>
          <p style={styles.profileDates}>{medallionProfile.birthDate} - {medallionProfile.deathDate}</p>
        </div>
      </div>

      <div style={styles.profileTabs}>
        <div
          style={{ ...styles.tab, ...(activeLink === 'bio' ? styles.tabActive : {}) }}
          onClick={() => setActiveLink('bio')}
        >
          Bio
        </div>
        <div
          style={{ ...styles.tab, ...(activeLink === 'photos' ? styles.tabActive : {}) }}
          onClick={() => setActiveLink('photos')}
        >
          Photos
        </div>
        <div
          style={{ ...styles.tab, ...(activeLink === 'videos' ? styles.tabActive : {}) }}
          onClick={() => setActiveLink('videos')}
        >
          Videos
        </div>
        <div
          style={{ ...styles.tab, ...(activeLink === 'links' ? styles.tabActive : {}) }}
          onClick={() => setActiveLink('links')}
        >
          Links
        </div>
      </div>

      <div style={styles.profileContent}>
        {activeLink === 'bio' && <ProfileBio bioText={medallionProfile.bio} />}
        {activeLink === 'photos' && <ProfilePhotos />}
        {activeLink === 'videos' && <ProfileVideos />}
        {activeLink === 'links' && <ProfileLinks profileLinks={medallionProfile.linkToObituary} />}
      </div>

      <button 
        style={styles.editButton}
        onClick={() => navigate('/editProfile')} // Navigate to the edit profile route when clicked
      >
        Edit Profile
      </button>
    </div>
  );
}
