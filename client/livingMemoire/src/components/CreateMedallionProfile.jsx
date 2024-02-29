import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate} from 'react-router-dom';




const CreateNewMedallionProfile = ({username}) => {

    console.log("in create new ")
    const location = useLocation();
const navigate = useNavigate();
const queryString = location.search;
const urlParams = new URLSearchParams(queryString);
console.log("location.search in create new", location.search)
const viewParam = urlParams.get('view');
  // State to track form input values for medallion data
  const [medallionFormData, setMedallionFormData] = useState({
    username: username,
    firstName: '',
    middleName: '',
    lastName: '',
    title: '',
    email: '',
    bio: '',
    profilePicture: null,
  });

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createProfile, setCreateProfile] = useState(false);
  // Handler to update form input values for medallion data
  const handleMedallionInputChange = (event) => {
    const { name, value, files } = event.target;
    //console.log("event target", event.target);
    setMedallionFormData({
      ...medallionFormData,
      [name]: files ? files[0] : value,
    });
  };

  const handleCreateProfileButton = () => {
    setCreateProfile((prevState) => !prevState);
  }

    // Handler for form submission to create a new medallion account
  const handleCreateMedallion = async (event) => {
    event.preventDefault();
    console.log("medallion data", medallionFormData)
    // Create FormData object for medallion data
    const formDataToSend = new FormData();
    formDataToSend.append('username', username);
    formDataToSend.append('email', medallionFormData.email);
    formDataToSend.append('firstName', medallionFormData.firstName);
    formDataToSend.append('middleName', medallionFormData.middleName);
    formDataToSend.append('lastName', medallionFormData.lastName);
    formDataToSend.append('title', medallionFormData.title);
    formDataToSend.append('bio', medallionFormData.bio);
    formDataToSend.append('profilePicture', medallionFormData.profilePicture);
    formDataToSend.append("test", "text")
    console.log("form data to send = ", formDataToSend);

    for (let x of formDataToSend.entries()) {
      console.log("form pairs", x[0] + ', ' + x[1]);
    }

    try {
 
      // Send POST request to server to create medallion account
      const response = await axios.post('https://lovinglegacy.onrender.com/createMedallionProfile', formDataToSend);
      console.log('Response from create medallion account:', response);
      // Optionally update state or show a success message
    } catch (error) {
      console.error('Error creating medallion account:', error);
      // Handle error, e.g., show an error message
    }
  };
  return (
    <div style={{ backgroundColor: 'green' }}> {/* Apply background color to this div */}
        <div className='container'>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-6">Create new profile</h1>
            <p className="mb-4">Start by entering as much info as you can about your loved one. You will have a chance to update this later.</p>
            <form onSubmit={handleCreateMedallion} encType='multipart/form-data'>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <input className="border p-2" type="text" name="firstName" value={medallionFormData.firstName} required onChange={handleMedallionInputChange} placeholder='First Name: *' />
                <input className="border p-2" type="text" name="middleName" value={medallionFormData.middleName} onChange={handleMedallionInputChange} placeholder="Middle name:" />
                <input className="border p-2" type="text" name="lastName" value={medallionFormData.lastName} required onChange={handleMedallionInputChange} placeholder='Last Name: *' />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <input className="border p-2" type="text" name="title" value={medallionFormData.title} onChange={handleMedallionInputChange} placeholder="Title:" />
                <select className="border p-2">
                  <option>-- Relationship Select an option --</option>
                </select>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" />
                  <span>Is a Veteran?</span>
                </label>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Profile picture:</label>
                <input className="border p-2 file:border-none file:px-4 file:py-2 file:bg-blue-600 file:text-white file:rounded hover:file:bg-blue-700" type="file" name="profilePicture" onChange={handleMedallionInputChange} accept="image/*" />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Headline text</label>
                <input className="border p-2 w-full" type="text" placeholder="In loving memory of" />
                <p className="text-sm mt-1">This headline text is the one that shows above the name of the person. If this field is null, the headline text won't be added.</p>
              </div>
              <div className="mb-4">
                <label className="block mb-2">Obituary Information</label>
                <textarea className="border p-2 w-full h-32"></textarea>
              </div>
              <textarea name="bio" id="bio" value={medallionFormData.bio} onChange={handleMedallionInputChange} placeholder="Bio"></textarea>
              <button type="submit">Create Medallion Account</button>
            </form>
          </div>
        </div>
      </div>
  )
}

export default CreateNewMedallionProfile;