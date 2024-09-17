// src/components/Profile.js
import React, { useState } from 'react';
import '../styles/Profile.css';

function Profile() {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890', // Initial phone number
  });

  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle input change for name and phone
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  // Toggle between edit and view mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Save changes
  const handleSave = () => {
    toggleEdit(); // Exit edit mode after saving
  };

  return (
    <div className="profile-page">
      <h2>User Profile</h2>

      <div className="profile-section">
        {/* User Information */}
        <div className="profile-info">
          <img
            className="profile-pic"
            src={profileImage}
            alt="User Profile"
          />
          <input type="file" accept="image/*" onChange={handleImageUpload} />

          {/* Editable Fields */}
          {isEditing ? (
            <div className="editable-fields">
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
              />
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
              />
              <button onClick={handleSave}>Save</button>
            </div>
          ) : (
            <div className="user-details">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <p>{user.phone}</p>
              <button onClick={toggleEdit}>Edit Profile</button>
            </div>
          )}
        </div>

        {/* Password Update */}
        <div className="profile-edit">
          <h3>Update Password</h3>
          <input type="password" placeholder="Current Password" />
          <input type="password" placeholder="New Password" />
          <button>Update Password</button>
        </div>

        {/* Logout Button */}
        <button className="logout-btn">Logout</button>
      </div>
    </div>
  );
}

export default Profile;
