import React from "react";
import { calculateDaysAgo } from "../../../utils/utils";

const ProfileAdmin = ({profileData}) => {
    return (
        <div className="mt-8 px-4">
        <div className="mt-4 flex justify-between">
          <div className="status">Profile Admins 1</div>
          <button className="action-button">Invite user</button>
        </div>
        <div className="card">
          <div className="card-content">
            <div className="user-info">
              <span className="user-avatar">
                <img alt="Profile Picture" src="/placeholder.svg?height=40&amp;width=40" />
              </span>
              <div className="user-details">
                <p className="user-name">{profileData.username}</p>
                <p className="joined-date">Joined {calculateDaysAgo(profileData.dateCreated)} days ago</p>
              </div>
            </div>
          </div>
        </div>
        </div>
    )
}

export default ProfileAdmin;