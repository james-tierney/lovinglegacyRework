import React from 'react';
import infoSVG from '../assets/icons/info.svg';
import '../styles/profileHeader.css';

const ProfileHeader = ({ username, email, dateCreated, profilePicture }) => {
  const calcualteDaysAgo = (dateCreated) => {
    const currentDate = new Date();
    const creationDate = new Date(dateCreated);
    const differenceInTime = currentDate.getTime() - creationDate.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };

  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '2rem',
        color: 'black',
        borderRadius: '8px',
        border: '2px solid #ccc',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', margin: 'auto' }}>
          <img style={{ width: '100%', height: '100%' }} alt="Profile picture" src="/placeholder.svg?height=100&width=100" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '600' }}>{username}</h1>
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Email: {email}</p>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', display: 'flex', alignItems: 'center' }}>
            <svg style={{ width: '1em', height: '1em', marginRight: '0.25rem' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
            <span>Joined {calcualteDaysAgo(dateCreated)} days ago</span>
          </p>
        </div>
        <div style={{ padding: '1rem', backgroundColor: '#F0E8D1', borderRadius: '0.25rem', border: '1px solid #D4A42F' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Welcome back!</h2>
            <img src={infoSVG} style={{ height: '25px' }} alt="info icon" />
          </div>
          <p style={{ color: '#59677C', fontSize: '0.875rem' }}>Thank you for choosing Loving Legacy to keep the memory of your loved ones alive. We are honored to be a part of your healing journey.</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;