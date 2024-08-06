import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';
import { AuthContext } from '../context/AuthProvider';
import { BASE_URL_DEV } from '../utils/config';
import GoogleSVG from '../assets/google-logo/google.svg';

const Signup = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const auth = getAuth();
    const urlSearchParams = new URLSearchParams(window.location.search);
    const qrCodeId = urlSearchParams.get('qr_id');

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { email, password, username } = formData;
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const firebaseUser = userCredential.user;

            await updateProfile(firebaseUser, { displayName: username });
            await signInWithEmailAndPassword(auth, email, password);

            const response = await fetch(`${BASE_URL_DEV}/createProfile`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, username, qrCodeId }),
            });

            if (response.ok) {
                const result = await response.json();
                const profile = result.profile;
                const token = result.token;

                document.cookie = `token=${token}; path=/`;

                await axios.post(`${BASE_URL_DEV}/updateQRCode`, { qrCodeId });
                await updateQRCodeWithUserProfile(profile.username, qrCodeId);

                navigate(`/userProfile?username=${profile.username}`, { state: { qrCodeId } });
            } else if (response.status === 409) {
                console.error("Username already taken");
            } else {
                console.error('Signup failed');
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    const signUpWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, new GoogleAuthProvider());
            const firebaseUser = result.user;
            const username = firebaseUser.displayName;

            const response = await fetch(`${BASE_URL_DEV}/createProfile`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: firebaseUser.email, username, qrCodeId }),
            });

            if (response.ok) {
                const result = await response.json();
                const profile = result.profile;
                const token = result.token;

                document.cookie = `token=${token}; path=/`;

                await axios.post(`${BASE_URL_DEV}/updateQRCode`, { qrCodeId });
                await updateQRCodeWithUserProfile(profile.username, qrCodeId);

                navigate(`/userProfile?username=${profile.username}`, { state: { qrCodeId } });
            } else {
                console.error('Signup with Google failed');
            }
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
            <h2 style={{ fontWeight: 'bold' }}>Signup</h2>
            <form onSubmit={handleSubmit} style={{ width: '300px', display: 'flex', flexDirection: 'column' }}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    required
                />
                <button
                    type="submit"
                    style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', backgroundColor: 'black', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                    Sign Up
                </button>
                <button
                    type="button"
                    onClick={signUpWithGoogle}
                    style={{ width: '100%', padding: '10px', borderRadius: '5px', backgroundColor: 'white', color: 'black', border: '1px solid #ccc', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <img src={GoogleSVG} alt="Google logo" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
                    Sign up with Google
                </button>
                <p style={{ marginTop: '10px' }}>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    );
};

export default Signup;
