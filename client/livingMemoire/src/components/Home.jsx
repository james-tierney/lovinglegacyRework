import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [qrCodeData, setQrCodeData] = useState(null);
  const navigate = useNavigate();

  const generateQrCode = async () => {
    try {
      const response = await axios.post('http://localhost:3002/generateQrCode', {
        qrData: 'http://localhost:3002/signUp', // Replace with your desired QR data
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
            style={{ width: '150px', height: '150px' }} // Adjust the size as needed
          />
        </div>
      )}
    </div>
  );


}

export default Home;
