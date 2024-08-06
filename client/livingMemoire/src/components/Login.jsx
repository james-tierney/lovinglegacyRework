import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import Cookies from 'js-cookie';
import { AuthContext } from '../context/AuthProvider';
import SiteNavigation from './SiteNavigation';
import GoogleSVG from '../assets/google-logo/google.svg'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();
    const { loginUser, loading, user } = useContext(AuthContext);

    const handleLogin = async () => {
        try {
            // Sign in the user with email and password using Firebase Authentication
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const firebaseUser = userCredential.user;

            console.log("firebase user on login page", firebaseUser);
            const username = firebaseUser.displayName;

            // Redirect to the user profile page with the username as state
            navigate('/userProfile', {
                state: { username },
            });
        } catch (error) {
            console.error("Login failed", error.message);
            setError(error.message);
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const firebaseUser = result.user;

            console.log("firebase user on login page", firebaseUser);
            const username = firebaseUser.displayName;

            navigate('/userProfile', {
                state: { username },
            });
        } catch (error) {
            console.error("Google login failed", error.message);
            setError(error.message);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
            <SiteNavigation />
            <h2 style={{ fontWeight: 'bold' }}>Login</h2>
            <p>For login, no registration is necessary.</p>
            <div style={{ width: '300px', marginBottom: '15px' }}>
                <input 
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
            </div>
            <div style={{ width: '300px', marginBottom: '15px' }}>
                <input 
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
            </div>
            {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
            <button
                onClick={handleLogin}
                style={{ width: '300px', padding: '10px', marginBottom: '10px', borderRadius: '5px', backgroundColor: 'black', color: 'white', border: 'none', cursor: 'pointer' }}
            >
                Sign in
            </button>
            <button
                onClick={handleGoogleLogin}
                style={{ width: '300px', padding: '10px', borderRadius: '5px', backgroundColor: 'white', color: 'black', border: '1px solid #ccc', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <img src={GoogleSVG} alt="Google logo" style={{ width: '20px', height: '20px', marginRight: '10px' }} />
                
                Login with Google
            </button>
        </div>
    );
};

export default Login;
