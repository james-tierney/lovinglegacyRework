import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import canvg from 'canvg';

function Home() {
  const [qrCodeData, setQrCodeData] = useState(null);
  const navigate = useNavigate();
  const imageRef = useRef(null);

  const generateQrCode = async () => {
    try {
      const response = await axios.post('https://lovinglegacy.onrender.com/generateQrCode', {
        qrData: 'https://lovinglegacy.onrender.com/signUp', // Replace with your desired QR data
      });
      setQrCodeData(response.data);
    } catch (error) {
      console.error('Error generating QR Code:', error.message);
    }
  };

  const saveImage = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = qrCodeData.data.qr_code;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const dataUrl = canvas.toDataURL(); // Convert canvas to data URL
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'qr_code.png'; // Set the download filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  };

  return (
    <div>
      <h1>Dynamic QR Code Generator</h1>
      <button onClick={generateQrCode}>Generate QR Code</button>
     
      {qrCodeData && (
        <div>
          <h2>Generated QR Code:</h2>
          <img
            ref={imageRef}
            src={qrCodeData.data.qr_code}
            alt="QR Code"
            style={{ width: '189px', height: '189px', transform: 'rotate(-45deg)', margin: '1rem', }} // Adjust the size as needed 
            // qr code rotated 45 degrees anti clockwise
          />
          <button onClick={saveImage}>Download Image</button>
        </div>
      )}
    </div>
  );
}

export default Home;
