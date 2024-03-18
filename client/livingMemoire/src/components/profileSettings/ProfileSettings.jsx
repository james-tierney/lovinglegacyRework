import React, { useEffect } from 'react';
import '../../styles/profileSettings.css';
import TabbedNavigation from '../TabbedNavigation';
import UploadMedia from './media/UploadMedia';
import ProfileDetails from './details/ProfileDetails';
import ProfileAbout from './about/ProfileAbout';
import ProfileAdmin from './admin/ProfileAdmin';

import { useSelector, useDispatch } from 'react-redux';
import { fetchProfileByUsername, fetchProfileByQrId } from '../../redux/ProfileSlicer'; 

const ProfileSettings = () => {

  /* Need to add safety catching logic so that if profile Data isn't defined then */
  /* we use our dispatch to the redux state to fetch it just to cover diff cases */

  const profileData = useSelector(state => state.profile.data);


  const medallionProfile = profileData?.medallionProfile;

  return (
    <div className="bg-white">
      <div className="relative">
        <img
          src="/placeholder.svg"
          alt="Cover"
          className="profile-image"
          width="1181"
          height="200"
        />
        <button className="update-cover-button">
          Update Cover Photo
        </button>
        <div className="profile-picture-container">
          <span className="profile-picture">
            <img alt="Profile" src="/placeholder.svg?height=148&amp;width=148" />
          </span>
        </div>
      </div>
      <div className="mt-16 px-4">
        <h1 className="title">In loving memory of {medallionProfile.firstName} {medallionProfile.lastName} - {medallionProfile.title}</h1>
        <p className="subtitle">Lifetime: {medallionProfile.birthDate} - {medallionProfile.deathDate}</p>
        <div className="button-group">
          <div className="status">Profile status: Unverified</div>
          <button className="action-button">Public view</button>
          <button className="action-button">Status info</button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-500"
          >
            <circle cx="12.1" cy="12.1" r="1"></circle>
          </svg>
        </div>
      </div>
      <div className="mt-8 px-4">
       {/* Using TabbedNavigation with provided links and components */}
        <TabbedNavigation
          defaultActiveLink="Timeline"
          links={[
            { name: 'Timeline' },
            { name: 'About' },
            { name: 'Media' },
            { name: 'Details' },
            { name: 'Admins' },
          ]}
          components={{
            Timeline: <></>,
            About: <ProfileAbout />,
            Media: <UploadMedia />,
            Details: <ProfileDetails />,
            Admins: <ProfileAdmin profileData={profileData}/>,
          }}
        />

      </div>
    </div>
  );
}

export default ProfileSettings;
