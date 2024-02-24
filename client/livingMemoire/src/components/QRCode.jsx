import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';


const QRCode = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryString = location.search;
    const urlParams = new URLSearchParams(queryString);
    const qr_id = urlParams.get('qr_id');
    console.log("qrcode id = ", qr_id);

    useEffect(() => {
        // logic to check if the qr code has a profile associated with it 
        const checkQRCodeProfile = async () => {
            try {
                const response = await axios.post('http://localhost:3001/checkProfileExists', {qrId: qr_id});
                const data = response.data;
                console.log("response in qrCode loading = ", response);
                console.log("data in qrCode loading = ", data);
                // If the qr code has profile associated with it we will navigate to userProfile
                // and within userProfile logic we will now need to fetch the profile data
                // based on this qr code id 
                if(data) {
                    navigate('/userProfile', {
                        state: { qr_id }
                    })
                }
                 else {
                // if not profile assoaciated, navigate to sign up page
                navigate(`/signUp?qr_id=${qr_id}`);
            }
        } catch (error) {
            //console.error('Error checking QR code profile: ', error);
        }
    };
        checkQRCodeProfile();
    }, [navigate, qr_id]);

    return (
        <div>
            Loading...
        </div>
    );
}


export default QRCode;