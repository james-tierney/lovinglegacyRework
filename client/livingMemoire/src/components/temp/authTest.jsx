import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const authTest = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>No user is logged in</div>;
    }

    return (
        <div>
            <h2>Welcome, {user.displayName || user.email}</h2>
        </div>
    );
};

export default authTest;
