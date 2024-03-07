import React from 'react';

const ProfileHeader = () => {
  return (
    <div style={{ backgroundColor: "white", padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div style={{ width: "100px", height: "100px", borderRadius: "50%", overflow: "hidden" }}>
            <img style={{ width: "100%", height: "100%" }} alt="Profile picture" src="/placeholder.svg?height=100&width=100" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <h1 style={{ fontSize: "1.5rem", fontWeight: "600" }}>JTierney Tech</h1>
            <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>Email: jamestier1203@gmail.com</p>
            <p style={{ fontSize: "0.875rem", color: "#6b7280", display: "flex", alignItems: "center" }}>
              <svg style={{ width: "1em", height: "1em", marginRight: "0.25rem" }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
              <span>Joined 22 days ago</span>
            </p>
          </div>
        </div>
        <div style={{ maxWidth: "20rem", padding: "1rem", backgroundColor: "#fefcbf", borderRadius: "0.25rem" }}>
          <h2 style={{ fontSize: "1.25rem", fontWeight: "600" }}>Welcome back!</h2>
          <p style={{ fontSize: "0.875rem" }}>Thank you for choosing Turning Hearts to keep the memory of your loved ones alive. We are honored to be a part of your healing journey.</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
