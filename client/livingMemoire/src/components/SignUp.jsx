import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const [qrCodeId, setQrCodeId] = useState(null);  // State to store the QR code ID

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

    const updateQRCodeWithUserProfile = async (username, qrId) => {
    try {
      const response = await fetch('http://localhost:3001/updateQRCodeWithUserProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, qrId }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('QR code updated with user profile:', result);
      } else {
        console.error('Failed to update QR code with user profile');
      }
    } catch (error) {
      console.error('Error updating QR code with user profile:', error);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Extract QR code ID from the URL
      const urlSearchParams = new URLSearchParams(window.location.search);
      const qrCodeId = urlSearchParams.get('qr_id');


      const response = await fetch('http://localhost:3001/createProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          qrCodeId: qrCodeId,  // Pass the QR code ID to the backend
        }),
      });

      if (response.ok) {
      // Assuming the server responds with a success message or user data
      const result = await response.json();
      const profile = result.profile;
      console.log('Signup successful:', result);

        const token = result.token;

        console.log("token in client side = ", token);

        document.cookie = `token=${token}; path=/`;
        
        // Redirect to the user's profile page
        //navigate(`/userProfile/${result.username}`);  // Use navigate for redirection
        console.log("QR code ID ", qrCodeId);
      // Associate the user's profile with the previously scanned QR code
      // Update the QR code in your database with the user's profile information
      await updateQRCodeWithUserProfile(profile.username, qrCodeId);

        // Navigate to the user's profile page with username as a query param
      // Redirect to the user's profile page with username as a state parameter
      console.log("username to be passed ", profile.username);
      navigate(`/userProfile?username=${profile.username}`);
      // navigate('/userProfile', {
      //   state: { username: result.username },
      //   uName: result.username,
      // });
      

        // Optionally, you can redirect the user to another page or show a success message.
      } else if (response.status === 409) {
        console.error("Username already taken");
        // Handle the case where the username is already taken, e.g., show an error message to the user
      } else {
        console.error('Signup failed');
        // Handle failure, e.g., show an error message to the user.
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
