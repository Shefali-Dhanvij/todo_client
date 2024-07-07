import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import constant from "../constant";

const UpdateUserForm = ({ userId, onClose }) => {
  console.log("userid===", userId);
  const [userDetails, setUserDetails] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    bloodGroup: "",
    maritalStatus: "",
    email: "",
    mobileNo: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${constant.baseurl}updateUser/${userId}`, formData);
      onClose();
    } catch (err) {
      console.error("Failed to update user details:", err);
    }
  };

  useEffect(() => {
    // Fetch the user details based on the userId when the modal opens
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `${constant.baseurl}viewUser/${userId}`
        );
        const userData = response.data;
        setFormData({
          firstName: userData.firstName,
          lastName: userData.lastName,
          gender: userData.gender,
          dob: userData.dob.split("T")[0], // format date to YYYY-MM-DD
          bloodGroup: userData.bloodGroup,
          maritalStatus: userData.maritalStatus,
          email: userData.email,
          mobileNo: userData.mobileNo,
          note: userData.note,
        });
      } catch (err) {
        console.error("Failed to fetch user details:", err);
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  return (
    <Container maxWidth="sm">
      <Typography
        id="add-user-modal-title"
        variant="h6"
        component="h2"
        style={{ fontWeight: 600, textAlign: "center", marginBottom: "10px" }}
      >
        Add User
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="firstName"
              name="firstName"
              label="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              name="lastName"
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              required
              fullWidth
              id="gender"
              name="gender"
              label="Gender"
              value={formData.gender}
              onChange={handleChange}
            >
              {["Male", "Female", "Other"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="dob"
              name="dob"
              label="Date of Birth"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={formData.dob}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              required
              fullWidth
              id="bloodGroup"
              name="bloodGroup"
              label="Blood Group"
              value={formData.bloodGroup}
              onChange={handleChange}
            >
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                (option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                )
              )}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              required
              fullWidth
              id="maritalStatus"
              name="maritalStatus"
              label="Marital Status"
              value={formData.maritalStatus}
              onChange={handleChange}
            >
              {["Single", "Married", "Divorced", "Widowed"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="mobileNo"
              name="mobileNo"
              label="Mobile Number"
              value={formData.mobileNo}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="note"
              name="note"
              label="Note"
              multiline
              rows={2}
              value={formData.note}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Add User
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default UpdateUserForm;
