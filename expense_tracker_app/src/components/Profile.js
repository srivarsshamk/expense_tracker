// src/components/Profile.js
import React, { useState } from 'react';
import {
  Avatar, Button, TextField, IconButton, Stack, Typography, Box, Grid,
  Card, CardContent, CardActions
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import '../styles/Profile.css'; // You can remove or keep any custom styles if necessary

function Profile() {
  const [user, setUser] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
  });

  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');
  const [isEditing, setIsEditing] = useState(false);

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

  // Handle input change for firstName, lastName, email, and phone
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  // Toggle between edit and view mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4} justifyContent="center">
        {/* Profile Information */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Stack direction="column" spacing={2} alignItems="center">
                {/* Profile Picture */}
                <Avatar
                  src={profileImage}
                  alt={`${user.firstName} ${user.lastName}`}
                  sx={{ width: 120, height: 120 }}
                />
                <label htmlFor="image-upload">
                  <input
                    style={{ display: 'none' }}
                    accept="image/*"
                    id="image-upload"
                    type="file"
                    onChange={handleImageUpload}
                  />
                  <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                  </IconButton>
                </label>
                <Typography variant="h5">{`${user.firstName} ${user.lastName}`}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.phone}
                </Typography>
              </Stack>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center' }}>
              <Button variant="contained" color="primary" onClick={toggleEdit}>
                {isEditing ? 'Save' : 'Edit Profile'}
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Editable Form Fields */}
        {isEditing && (
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Stack spacing={2}>
                  <TextField
                    label="First Name"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    label="Last Name"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    label="Email"
                    name="email"
                    value={user.email}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    label="Phone Number"
                    name="phone"
                    value={user.phone}
                    onChange={handleInputChange}
                    variant="outlined"
                    fullWidth
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Password Update Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Update Password</Typography>
              <Stack spacing={2}>
                <TextField
                  label="Current Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  label="New Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                />
                <Button variant="contained" color="secondary">
                  Update Password
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Logout Button */}
        <Grid item xs={12} md={6}>
          <Button variant="outlined" color="error" fullWidth>
            Logout
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Profile;
