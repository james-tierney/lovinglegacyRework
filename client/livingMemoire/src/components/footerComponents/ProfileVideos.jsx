import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileByUsername, fetchProfileByQrId } from '../../redux/ProfileSlicer'; 
import { BASE_URL_LIVE, BASE_URL_DEV } from "../../utils/config";
import axios from "axios";
import '../../styles/profileVideo.css';
import ReactPlayer from "react-player";

const ProfileVideos = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true)
  const profileData = useSelector(state => state.profile.data);

  useEffect(() => {
    const username = localStorage.getItem('username');
    const qr_id = localStorage.getItem('qr_id');
    if(username) {
      console.log("username from local storage ")
      dispatch(fetchProfileByUsername(username));
      
    }
    else if(qr_id) {
      console.log("qr_id from local storage");
      dispatch(fetchProfileByQrId(qr_id));
    }
    // Dispatch action to fetch profile data only on page refresh
    
  }, []);

  useEffect(() => {
    const getVideos = async () => {
    if(profileData) {
      setUsername(profileData.username);
      try {
        console.log("username in here = ", profileData.username);
        const response = await axios.post(`${BASE_URL_DEV}/getVideosByUsername`, { username });
        console.log("Videos retrieved successfully:", response.data.videos);
        const videoData = response.data.videos.filter(video => video.mediaType === "video");
        setVideos(videoData);
        setLoading(false);
        
      } catch (error) {
        console.error("Error retrieving videos:", error);
        setLoading(false);
        }
      }
    }
    getVideos();
  }, [profileData]);

  const handleGetVideos = async () => {

  };

  if(loading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <button onClick={handleGetVideos}>Get Videos</button>
      <p>This is the profile Videos Component</p>
      {console.log("videos = ", videos)}
      {videos.map((video, index) => (
        <div key={index}>
          <h3>{video.title}</h3>
          <p>{video.description}</p>
          <div className="video-container"> {/* Wrap the ReactPlayer component in a container */}
            <ReactPlayer url={video.mediaLink} controls />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileVideos;
