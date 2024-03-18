import React, { useEffect } from "react";
import CreateNewMedallionProfile from "../../CreateMedallionProfile";
import { useSelector } from "react-redux";
import ProfileDetails from "../details/ProfileDetails";

const ProfileAbout = () => {
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
            
            <ProfileDetails notIncludeDetailsLinkSection={true}/>
        </div>
    );
}

export default ProfileAbout;
