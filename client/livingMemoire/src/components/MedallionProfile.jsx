import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import "../styles/medallionForm.css";
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import CreateNewMedallionProfile from './CreateMedallionProfile';

export default function CreateMedallionProfile({username}) {

const location = useLocation();
const navigate = useNavigate();
const queryString = location.search;
const urlParams = new URLSearchParams(queryString);
console.log("location.search", location.search)
const viewParam = urlParams.get('view');

  const [activeTab, setActiveTab] = useState('');
  const [createProfile, setCreateProfile] = useState(false);

  console.log("view param ===", viewParam);

  const [content,setContent] = useState();

useEffect(() => {
  switch(viewParam) {
    case 'createNew':
      setContent(<CreateNewMedallionProfile username={username} />);
      break;
    default: 
      setContent(null);
  }
}, [viewParam]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('view', tab);
    const newUrl = `${location.pathname}?${searchParams.toString()}`;
  }

const handleCreateProfileButton = (tab) => {
  const newCreateProfileValue = !createProfile; // Calculate the new value
  setCreateProfile(newCreateProfileValue); // Update the state
  console.log("create profile = ", newCreateProfileValue); // Log the updated value
  console.log("active tab ===", tab);
  console.log("view param ", viewParam);
  const searchParams = new URLSearchParams(location.search);
  searchParams.set('view', tab);
  console.log("search params ", searchParams.get('view'))
  
  const newUrl = `${location.pathname}?${searchParams.toString()}`;
 navigate(newUrl);
}


return (
  <div>
    {/* Container with flex layout for NavBar and "Create New Profile" button */}
    <div className="flex justify-between items-center mb-4">
      {/* Secondary Navbar */}
      <NavBar
        items={[
          { label: 'Profiles', href: '#' },
          { label: 'Groups', href: '#',  } // grouped medallion profiles?
        ]}
      />
      {/* "Create New Profile" button */}
      <button onClick={() => handleCreateProfileButton('createNew')}>Create New Profile</button>
    </div>

    {/* Container for the form */}
        {content}
  </div>
);


}