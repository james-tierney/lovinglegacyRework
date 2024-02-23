import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Cookies from 'js-cookie';

const Login = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const auth = getAuth();

    // const handleLogin = async () => {
    //     try {
    //         // Make POST request to backend server route
    //         const response = await axios.post('http://localhost:3001/login', {
    //             username, 
    //             password,
    //         });
    //             console.log("login response = ", response.data
    //             )
    //         if (response.status === 200) {
    //             //const cookie = Cookies.get('token');
                
    //             const token = response.data.token;
                
    //             console.log("checking for cookie token in login ", token);
                
    //             document.cookie = `token=${token}; path=/`
    //             // Handle successful login e.g redirect to another page
    //             // TODO add IF statement here for the success logic
    //             // based on response from the server
    //             console.log("Login Successful", response.data);
    //             setError('');
    //             navigate('/userProfile', {
    //                 state: { username: response.data.user.username },
    //                 uName: response.data.user.username,
    //             });
    //         }
    //     } catch (error) {
    //         // Handle login error (e.g. display error message)
    //         console.error("Login failed", error.response.data.message);
    //         setError(error.response.data.message);
    //     }
    // };

    const handleLogin = async () => {
        try {
            // Sign in the user with email and password using Firebase Authentication
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const firebaseUser = userCredential.user;

            console.log("firebase user on login page", firebaseUser);
            // Retrieve the username from the user's displayName property
            const username = firebaseUser.displayName;

            // Redirect to the user profile page with the username as state
            navigate('/userProfile', {
                state: { username },
            });
        } catch (error) {
            // Handle login error (e.g. display error message)
            console.error("Login failed", error.message);
            setError(error.message);
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <div>
                <label>Username:</label>
                <input 
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}        
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>
            <div>
                <label>Password:</label>
                <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {error && <div style={{color: 'red'}}>{error}</div>}
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;