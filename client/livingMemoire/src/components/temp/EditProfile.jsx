import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProfileByUsername, fetchProfileByQrId } from '../../redux/ProfileSlicer'; 
import SiteNavigation from '../SiteNavigation';
import { BASE_URL_LIVE, BASE_URL_DEV } from '../../utils/config';

export default function EditProfile() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    deathDate: '',
    bio: '',
    profilePicture: null,
    linkToObituary: '',
  });
  
  const profileData = useSelector(state => state.profile.data);
  const dispatch = useDispatch();

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
          setFormData({
            ...response.data.medallionProfile,
            profilePicture: null  // Reset file input to avoid preselected file issues
          });
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      };
      fetchData();
    }
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profilePicture') {
      setFormData({ ...formData, profilePicture: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
        console.log("form data to send", formDataToSend);
        console.log("profile data ", profileData);
      const response = await axios.put(`${BASE_URL_DEV}/editProfile`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Profile updated successfully:', response.data);
      // Optionally redirect or show success message
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', paddingTop: '50px' }}>
      <SiteNavigation />
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Birth Date</label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Death Date</label>
          <input
            type="date"
            name="deathDate"
            value={formData.deathDate}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Profile Picture</label>
          <input
            type="file"
            name="profilePicture"
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Link to Obituary</label>
          <input
            type="text"
            name="linkToObituary"
            value={formData.linkToObituary}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '5px', backgroundColor: 'black', color: 'white', border: 'none', cursor: 'pointer' }}>
          Save Changes
        </button>
      </form>
    </div>
  );
}
