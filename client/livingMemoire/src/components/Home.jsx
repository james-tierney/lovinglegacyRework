import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

function Home() {
  const [qrCodeData, setQrCodeData] = useState(null);
  const navigate = useNavigate();
  const { isSignedIn, user, isLoaded } = useUser();

  const generateQrCode = async () => {
    try {
      const response = await axios.post('http://localhost:3001/generateQrCode', {
        qrData: 'http://localhost:5173/signUp', // Replace with your desired QR data
      });
      setQrCodeData(response.data);
      console.log("qr code data = ", qrCodeData.data)
    } catch (error) {
      console.error('Error generating QR Code:', error.message);
    }
  }; if (!isSignedIn) {
  return (
    <div>
      <h1>Dynamic QR Code Generator</h1>
      <button onClick={generateQrCode}>Generate QR Code</button>
     
      {qrCodeData && (
        <div>
          <h2>Generated QR Code:</h2>
          <img
            src={qrCodeData.data.qr_code}
            alt="QR Code"
            style={{ width: '150px', height: '150px' }} // Adjust the size as needed
          />
        </div>
      )}
    </div>
  );}

  if (isSignedIn) {
    console.log("user = ", user);
    return (
      
      <div>Hello {user.username}</div>
    )
  }
}

export default Home;
