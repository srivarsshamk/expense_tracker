// src/components/Profile.js
import React, { useState } from 'react';
import '../styles/Profile.css';

function Profile() {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
  });

  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');
  const [isEditing, setIsEditing] = useState(false);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    toggleEdit();
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h2 className="profile-title">My Profile</h2>

        <div className="profile-card">
          <div className="profile-image-container">
            <img className="profile-pic" src={profileImage} alt="User Profile" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="upload-btn"
            />
          </div>

          {isEditing ? (
            <div className="editable-fields">
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter your name"
              />
              <input
                type="text"
                name="phone"
                value={user.phone}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter your phone number"
              />
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
            </div>
          ) : (
            <div className="user-details">
              <h3 className="user-name">{user.name}</h3>
              <p className="user-email">{user.email}</p>
              <p className="user-phone">{user.phone}</p>
              <button className="edit-btn" onClick={toggleEdit}>
                Edit Profile
              </button>
            </div>
          )}
        </div>

        <div className="password-section">
          <h3>Change Password</h3>
          <input type="password" className="input-field" placeholder="Current Password" />
          <input type="password" className="input-field" placeholder="New Password" />
          <button className="update-password-btn">Update Password</button>
        </div>

        <button className="logout-btn">Logout</button>
      </div>
    </div>
  );
}

export default Profile;
