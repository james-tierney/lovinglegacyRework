import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate} from 'react-router-dom';
import '../styles/medallionForm.css';
import { useSelector } from 'react-redux';

const CreateNewMedallionProfile = ({username, profileData, includeCemetery}) => {

    console.log("in create new ")
    const location = useLocation();
const navigate = useNavigate();
const queryString = location.search;
const urlParams = new URLSearchParams(queryString);
console.log("location.search in create new", location.search)

  useEffect(() => {
    if (profileData) {
      setMedallionFormData((prevData) => ({
        ...prevData,
        ...profileData.medallionProfile, // Merge profileData into medallionFormData
      }));
      console.log("pre populated medallionFormData = ", medallionFormData);
    }
  }, [profileData]);

const viewParam = urlParams.get('view');
  // State to track form input values for medallion data
  const [medallionFormData, setMedallionFormData] = useState({
    username: username,
    firstName: '',
    middleName: '',
    lastName: '',
    title: '',
    relationship: '',
    bio: '',
    profilePicture: null,
    isVeteran: false,
    headlineText: '',
    includeHeadlineText: false,
    linkToObituary: '',
    birthDate: '',
    deathDate: '',
    city: '',
    state: '',
    quoteSection: '',
    cemeteryName: '',
    cemeteryPlotNumber: '',
    cemeteryCity: '',
    cemeteryState: '',

  });

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createProfile, setCreateProfile] = useState(false);
  // Handler to update form input values for medallion data
const handleMedallionInputChange = (event) => {
  const { name, value, files, type, checked } = event.target;
  const inputValue = type === 'checkbox' ? checked : files ? files[0] : value;
  
  setMedallionFormData({
    ...medallionFormData,
    [name]: inputValue,
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
    formDataToSend.append('firstName', medallionFormData.firstName);
    formDataToSend.append('middleName', medallionFormData.middleName);
    formDataToSend.append('lastName', medallionFormData.lastName);
    formDataToSend.append('title', medallionFormData.title);
    formDataToSend.append('relationship', medallionFormData.relationship);
    formDataToSend.append('bio', medallionFormData.bio);
    formDataToSend.append('profilePicture', medallionFormData.profilePicture);
    formDataToSend.append('headlineText', medallionFormData.headlineText);
    formDataToSend.append('includeHeadlineText', medallionFormData.includeHeadlineText);
    formDataToSend.append('linkToObituary', medallionFormData.linkToObituary);
    formDataToSend.append('birthDate', medallionFormData.birthDate);
    formDataToSend.append('deathDate', medallionFormData.deathDate);
    formDataToSend.append('city', medallionFormData.city);
    formDataToSend.append('state', medallionFormData.state);
    formDataToSend.append('quoteSection', medallionFormData.quoteSection);
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
    <div className="root-div">
  
      <div className="form-container" > {/* Apply background color to this div */}
          <div className='container'>
            <div className="bg-white p-6 rounded-lg shadow-md">
          {!includeCemetery && (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {/* Other content */}
              <button className="back-btn" onClick={() => navigate(-1)}>
                <ChevronLeftIcon style={{ width: "20px", height: "20px" }} />
                <span>Create new profile</span>
              </button>
            </div>
          )}
              <div className='flex items-center mb-6 border-bottom'>
                <p>Personal Details</p>
              </div>
              <p className="mb-4">Start by entering as much info as you can about your loved one. You will have a chance to update this later.</p>
              <form onSubmit={handleCreateMedallion} encType='multipart/form-data'>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            
            <div className='firstname-label'>
              <label className="name-labels" htmlFor="firstName" style={{float: 'left'}}>First name: *</label>
            </div>
            <div className='middlename-label'>
              <label className="name-labels" htmlFor="middleName" style={{float: 'left'}}>Middle Name:</label>
            </div>
            <div className='lastname-label'>
              <label className="name-labels" htmlFor='lastName' style={{float: 'left'}}>Last Name: *</label>
            </div>
            <input className='name-inputs input-field' name="firstName" placeholder="" value={medallionFormData.firstName} required onChange={handleMedallionInputChange} />
            <input className='name-inputs input-field' name="middleName" placeholder="" value={medallionFormData.middleName} onChange={handleMedallionInputChange}/>
            <input className='name-inputs input-field' name="lastName" placeholder="" value={medallionFormData.lastName} required onChange={handleMedallionInputChange}/>
          </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
                  <div className='title-relation-label'>
                    <label className="labels" htmlFor="title" style={{float: 'left'}}>Title:</label>
                  </div>
                  <div className='title-relation-label'>
                    <label className="labels" htmlFor='relationship' style={{float: 'left'}}>Relationship: </label>
                  </div>
                  <input className="title-and-relation input-field" type="text" name="title" value={medallionFormData.title} onChange={handleMedallionInputChange} placeholder="Title:" />
                  <select className="title-and-relation input-field" name="relationship" onChange={handleMedallionInputChange}>
                    <option value="" selected>-- Select an option --</option>
                    <option value="aunt">Aunt</option>
                    <option value="boyfriend">Boyfriend</option>
                    <option value="brother">Brother</option>
                    <option value="cousin">Cousin</option>
                    <option value="daughter">Daughter</option>
                    <option value="father">Father</option>
                    <option value="girlfriend">Girlfriend</option>
                    <option value="granddaughter">Granddaughter</option>
                    <option value="grandfather">Grandfather</option>
                    <option value="grandmother">Grandmother</option>
                    <option value="grandson">Grandson</option>
                    <option value="great-grandfather">Great grandfather</option>
                    <option value="great-grandmother">Great grandmother</option>
                    <option value="husband">Husband</option>
                    <option value="mother">Mother</option>
                    <option value="nephew">Nephew</option>
                    <option value="niece">Niece</option>
                    <option value="sister">Sister</option>
                    <option value="son">Son</option>
                    <option value="uncle">Uncle</option>
                    <option value="wife">Wife</option>

                  </select>
    
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
                  
                <div className='label-under'>
                    <label style={{float: 'left'}}>(Example Jr - Sr)</label>
                </div>
                  </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: "16px" }}>
                <div >
                  <label className="label-above" htmlFor='profilePicture' style={{float: 'left'}}>Profile picture: </label>
                </div>
              </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
  
              <input
                id="profile-picture"
                className='img-input input-field'
                name='profilePicture'
                type="file"
                onChange={handleMedallionInputChange}
                accept="image/*" 
                

              />
              <label className="checkbox-label flex items-center space-x-2">
                <input  type="checkbox" name="isVeteran" checked={medallionFormData.isVeteran} onChange={handleMedallionInputChange}/>
                <span>Is a Veteran?</span>
              </label>
            </div>

            
                <div className='flex items-center mb-6 border-bottom'>
                  <label className="block mb-2">Headline text</label>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)", gap: "16px" }}>
                <div >
                  <label className="label-above" htmlFor='headlineText' style={{float: 'left'}}>Headline Text </label>
                </div>
                
              </div>
                <div className='flex items-center'>
                    <input className="single-row-inputs input-field" name="headlineText" value={medallionFormData.headlineText} type="text" onChange={handleMedallionInputChange} placeholder="In loving memory of" />
                </div>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)"}}>
                  <p className="label-under">This headline text is the one that shows above the name of the person. If this field is null, the headline text won't be added.</p>
                        <label className="checkbox-label flex items-center space-x-2">
                <input  type="checkbox" name="include-headline-text" value={medallionFormData.includeHeadlineText} onChange={handleMedallionInputChange}/>
                <span>Don't include headline text</span>
              </label>
                </div>

    



                
                  
                  <div className='flex items-center mb-6 border-bottom'>
                  <label className="block mb-2">Obituary Information</label>
                  </div>

                  <div className='flex items-center'>
                    <label className="single-row-labels" htmlFor='linkToObituary'>Link to Obituary: </label>
                  </div>        
                  
                  <div className='flex items-center'>
                    <textarea className="single-row-inputs text-input" name="linkToObituary" value={medallionFormData.linkToObituary} onChange={handleMedallionInputChange}></textarea>
                  </div>

                  <div className='flex items-center'>
                    <label className="single-row-labels" htmlFor='bio'>Bio information: </label>
                  </div>
    
                  <div className='flex items-center'>
                    <textarea name="bio" className="single-row-inputs text-input" value={medallionFormData.bio} onChange={handleMedallionInputChange} ></textarea>
                  </div>


                <div className='flex items-center mb-6 border-bottom'>
                  <label className="block mb-2">Lifetime</label>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
                  
                  <div className='label-above'>
                    <label style={{float: 'left'}}>Birth date: *</label>    
                  </div>
                  <div className='label-above'>
                    <label style={{float: 'left'}}>Death date: *</label>
                  </div>
                </div>


                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>  
                  <input className="border p-2 input-field" type="date" name="birthDate" value={medallionFormData.birthDate} onChange={handleMedallionInputChange} />
                  <input className="border p-2 input-field" type="date" name="deathDate" value={medallionFormData.deathDate} onChange={handleMedallionInputChange} />
                </div>




                {includeCemetery ? (
                  <div>
                    <div className='flex items-center mb-6 border-bottom'>
                      <label className="block mb-2">Cemetery information</label>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
                      <div className='label-above'>
                        <label style={{float: 'left'}}>Cemetery name:</label>    
                      </div>
                      <div className='label-above'>
                        <label style={{float: 'left'}}>Cemetery plot number:</label>
                      </div>

                    </div>
                    
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>  
                  <input className="border p-2 input-field" type="text" name="CemeteryName" value={medallionFormData.cemeteryName} onChange={handleMedallionInputChange} />
                  <input className="border p-2 input-field" type="text" name="CemeteryPlotNumber" value={medallionFormData.cemeteryPlotNumber} onChange={handleMedallionInputChange} />
                </div>


                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
                      <div className='label-above'>
                        <label style={{float: 'left'}}>Cemetery City:</label>    
                      </div>
                      <div className='label-above'>
                        <label style={{float: 'left'}}>Cemetery State:</label>
                      </div>
                  </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>  
                  <input className="border p-2 input-field" type="text" name="CemeteryCity" value={medallionFormData.cemeteryCity} onChange={handleMedallionInputChange} />
                  <input className="border p-2 input-field" type="text" name="CemeteryState" value={medallionFormData.cemeteryState} onChange={handleMedallionInputChange} />
                </div>
                
                </div>
                ) : null}





                <div className='flex items-center mb-6 border-bottom'>
                  <label className="block mb-2">Location Details</label>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)"}}>
                  
                  <div className='label-above'>
                    <label style={{float: 'left'}}>City: </label>    
                  </div>
                  <div className='label-above'>
                    <label style={{float: 'left'}}>State/County: </label>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>  
                  <input className='input-field' placeholder="Be as precise as possible for more precise map on the profile"type="text" name="city" value={medallionFormData.city} onChange={handleMedallionInputChange}></input>
                  <input className='input-field' type="text" name="state" value={medallionFormData.state} onChange={handleMedallionInputChange}></input>
                </div>

                <div className='flex items-center mb-6 border-bottom'>
                  <label className="block mb-2">Quote Section</label>
                </div>


                <div className='flex items-center'>
                    <label className="single-row-labels" htmlFor='quoteSection'>Text or Phrase: </label>
                </div>

                <div className='flex items-center'>
                    <textarea name="quoteSection" className="single-row-inputs text-input" value={medallionFormData.quoteSection} onChange={handleMedallionInputChange} ></textarea>
                </div>

                <div className='flex items-center'>
                    <label className="single-row-labels" htmlFor='headlineText'>This headline text is the one that shows above the name of the person.</label>
                </div>
              
                <div className='btn-container'>
                  <button className="submit-btn" type="submit">{includeCemetery ? 'Save Changes' : 'Create Medallion Account'}</button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
  )
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}

function ChevronLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

export default CreateNewMedallionProfile;