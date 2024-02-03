import React, { useState } from 'react';

const UserProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    bio: '',
    profilePicture: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/createProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Profile created successfully!');
        // Handle success, e.g., redirect or show a success message
      } else {
        console.error('Failed to create profile');
        // Handle failure, e.g., show an error message
      }
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  // Render your form here with appropriate input fields

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Your form input fields go here */}
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
};

export default UserProfile;
