import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL_LIVE, BASE_URL_DEV } from '../utils/config';
function Home() {
  const [qrCodeData, setQrCodeData] = useState(null);
  const navigate = useNavigate();

  const generateQrCode = async () => {
    console.log("base url = ", BASE_URL_DEV);
    try {
      const response = await axios.post(`${BASE_URL_DEV}/generateQrCode`, {
        qrData: `${BASE_URL_DEV}/signUp`, // Replace with your desired QR data
      });
      setQrCodeData(response.data);
      console.log("qr code data = ", qrCodeData.data)
    } catch (error) {
      console.error('Error generating QR Code:', error.message);
    }
  };

  const saveSVGAsFile = () => {
    const svgData = qrCodeData.data.qr_code; 
    const rotatedSvgData = svgData.replace('<svg', '<svg width="189" height="189" transform="rotate(-45)"')
    const blob = new Blob([rotatedSvgData], { type: 'image/svg+xml'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'qr_code.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

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
          <button onClick={saveSVGAsFile}>Download SVG</button>
        </div>
      )}
    </div>
  );


}

export default Home;