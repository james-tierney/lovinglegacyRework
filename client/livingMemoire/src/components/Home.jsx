import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [qrCodeData, setQrCodeData] = useState(null);
  const navigate = useNavigate();

  const generateQrCode = async () => {
    try {
      const response = await axios.post('https://lovinglegacy.onrender.com/generateQrCode', {
        qrData: 'https://lovinglegacy.onrender.com/signUp', // Replace with your desired QR data
      });
      setQrCodeData(response.data);
      console.log("qr code data = ", qrCodeData.data)
    } catch (error) {
      console.error('Error generating QR Code:', error.message);
    }
  };
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
            style={{ width: '189px', height: '189px', transform: 'rotate(-45deg)', margin: '1rem', }} // Adjust the size as needed 
            // qr code rotated 45 degrees anti clockwise
          />
        </div>
      )}
    </div>
  );


}

export default Home;
