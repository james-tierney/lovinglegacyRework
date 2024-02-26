import React, { createContext, useContext, useState, useEffect } from 'react';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        // Perform any side effects related to profile data here
        console.log("profile data in context component = ", profileData);
    }, [profileData]);

    const updateProfileData = (data) => {
        console.log("data in update profile data = ", data);
        setProfileData(data);
    }

    return (
        <ProfileContext.Provider value={{ profileData, updateProfileData }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    return useContext(ProfileContext);
};
