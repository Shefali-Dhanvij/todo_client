import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  Grid,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import constant from "../constant";

const AddUserForm = ({ open, onClose }) => {
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

  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const validate = () => {
    let tempErrors = {};
    const emailPattern = /.+@.+\..+/;
    const mobilePattern = /^[6-9]\d{9}$/;

    if (!formData.firstName) tempErrors.firstName = "First Name is required.";
    if (!formData.lastName) tempErrors.lastName = "Last Name is required.";
    if (!formData.gender) tempErrors.gender = "Gender is required.";
    if (!formData.email) {
      tempErrors.email = "Email is required.";
    } else if (!emailPattern.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address.";
    }
    if (!formData.mobileNo) {
      tempErrors.mobileNo = "Mobile Number is required.";
    } else if (!mobilePattern.test(formData.mobileNo)) {
      tempErrors.mobileNo = "Please enter a valid mobile number.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post(
          `${constant.baseurl}addUser`,
          formData
        );
        console.log(response.data);
        setSnackbarOpen(true);
        onClose();
      } catch (err) {
        console.error("Error adding user:", err);
      }
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

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
              error={!!errors.firstName}
              helperText={errors.firstName}
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
              error={!!errors.lastName}
              helperText={errors.lastName}
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
              error={!!errors.gender}
              helperText={errors.gender}
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
              error={!!errors.email}
              helperText={errors.email}
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
              error={!!errors.mobileNo}
              helperText={errors.mobileNo}
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
          <Grid
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Button type="submit" variant="contained" color="primary">
              Add User
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleSnackbarClose} severity="success">
          User added successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddUserForm;
