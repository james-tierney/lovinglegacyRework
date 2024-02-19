import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleLogin = async () => {
        try {
            // Make POST request to backend server route
            const response = await axios.post('http://localhost:3001/login', {
                username, 
                password,
            });
                console.log("login response = ", response.data
                )
            if (response.status === 200) {
                //const cookie = Cookies.get('token');
                
                const token = response.data.token;
                
                console.log("checking for cookie token in login ", token);
                
                document.cookie = `token=${token}; path=/`
                // Handle successful login e.g redirect to another page
                // TODO add IF statement here for the success logic
                // based on response from the server
                console.log("Login Successful", response.data);
                setError('');
                navigate('/userProfile', {
                    state: { username: response.data.user.username },
                    uName: response.data.user.username,
                });
            }
        } catch (error) {
            // Handle login error (e.g. display error message)
            console.error("Login failed", error.response.data.message);
            setError(error.response.data.message);
        }
    };

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