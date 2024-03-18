import React, { useEffect } from "react";
import CreateNewMedallionProfile from "../../CreateMedallionProfile";
import { useSelector } from "react-redux";

const ProfileDetails = () => {
    const profileData = useSelector(state => state.profile.data);

    useEffect(() => {
        console.log("Profile data in profile details ", profileData);
    }, [profileData]); // Add profileData to dependency array to listen for changes


    // Render the component only if profileData exists
    if (!profileData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            
            <CreateNewMedallionProfile username={profileData.username} profileData={profileData} />
        </div>
    );
}

export default ProfileDetails;

// add a prop to the form 
// whether to render with pre populated profile data here 
// or empty and have the 