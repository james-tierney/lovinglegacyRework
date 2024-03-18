import React, { useEffect } from "react";
import CreateNewMedallionProfile from "../../CreateMedallionProfile";
import { useSelector } from "react-redux";
import TabbedNavigation from "../../TabbedNavigation";
import LinkDetails from "./LinkDetails";

const ProfileDetails = ({notIncludeDetailsLinkSection}) => {
    const profileData = useSelector(state => state.profile.data);

    useEffect(() => {
        console.log("Profile data in profile details ", profileData);
    }, [profileData]); // Add profileData to dependency array to listen for changes
    console.log("include deatils = ", notIncludeDetailsLinkSection)

    // Render the component only if profileData exists
    if (!profileData) {
        return <div>Loading...</div>;
    }

   return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {notIncludeDetailsLinkSection ? (
                <CreateNewMedallionProfile username={profileData.username} profileData={profileData} includeCemetery={true} />
            ) : (
            <TabbedNavigation
                    defaultActiveLink="About me"
                    links={[
                        { name: 'About me' },
                        { name: 'Details' },
                    ]}
                    components={{
                        AboutMe: <CreateNewMedallionProfile username={profileData.username} profileData={profileData} includeCemetery={true} />,
                        Details: <LinkDetails />
                    }}
                />
            )}
        </div>
    );
}
export default ProfileDetails;

  

