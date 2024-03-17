import React from 'react';
import '../../../styles/profileSettings.css';
import TabbedNavigation from '../../TabbedNavigation';
import UploadMedia from './UploadMedia';

const ProfileSettings = () => {
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
        <h1 className="title">In loving memory of Tam Spraggings - Mr</h1>
        <p className="subtitle">Lifetime: Feb 28, 2024 - Mar 11, 2024</p>
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
            About: <></>,
            Media: <UploadMedia />,
            Details: <></>,
            Admins: <></>,
          }}
        />
        <div className="mt-4 flex justify-between">
          <div className="status">Profile Admins 1</div>
          <button className="action-button">Invite user</button>
        </div>
        <div className="card">
          <div className="card-content">
            <div className="user-info">
              <span className="user-avatar">
                <img alt="JTierney Tech" src="/placeholder.svg?height=40&amp;width=40" />
              </span>
              <div className="user-details">
                <p className="user-name">JTierney Tech</p>
                <p className="joined-date">Joined: 1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;
