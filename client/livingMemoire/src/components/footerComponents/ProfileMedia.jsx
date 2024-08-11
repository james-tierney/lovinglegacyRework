import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchProfileByUsername, fetchProfileByQrId } from '../../redux/ProfileSlicer'; 
import ReactPlayer from "react-player";
import { BASE_URL_LIVE, BASE_URL_DEV } from "../../utils/config";
import '../../styles/profileVideo.css';

const ProfileMedia = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const profileData = useSelector(state => state.profile.data);

  useEffect(() => {
    const username = localStorage.getItem('username');
    const qr_id = localStorage.getItem('qr_id');
    if(username) {
      dispatch(fetchProfileByUsername(username));
    }
    else if(qr_id) {
      dispatch(fetchProfileByQrId(qr_id));
    }
  }, [dispatch]);

  useEffect(() => {
    const getVideos = async () => {
      const mediaType = "video";
    if(profileData) {
      setUsername(profileData.username);
      try {
        console.log("username in here = ", profileData.username);
 const response = await axios.post(`${BASE_URL_DEV}/getVideosByUsername`, { username, mediaType});
        console.log("response = ", response);
        console.log("Videos retrieved successfully:", response.data.videos);
        // not needed this filter anymore since done on backend now 
        const videoData = response.data.media;
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

  if(loading) {
    return <p>Loading...</p>
  }

  return (
    <div style={styles.mediaGrid}>
      {media.map((item, index) => (
        <div key={index} style={styles.mediaItem}>
          {item.type === 'image' ? (
            <img src={item.mediaLink} alt={`Media ${index + 1}`} style={styles.image} />
          ) : (
            <div style={styles.videoContainer}>
              <ReactPlayer url={item.mediaLink} controls width="100%" height="100%" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const styles = {
  mediaGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '10px',
  },
  mediaItem: {
    position: 'relative',
    width: '100%',
    paddingBottom: '100%', // To maintain a square aspect ratio
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  videoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
  },
};

export default ProfileMedia;
