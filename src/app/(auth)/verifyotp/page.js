"use client";

import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography } from "@mui/material";

const VerifyOtp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${constant.baseurl}verify-otp`, {
        email,
        otp,
      });
      setMessage(response.data.message);
      if (response.message === 200) {
        router.push("/reset-password", undefined, { shallow: true });
      }
    } catch (error) {
      setMessage(
        error.response ? error.response.data.message : "An error occurred"
      );
    }
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Verify OTP
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="OTP"
          variant="outlined"
          fullWidth
          margin="normal"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
      {message && <Typography mt={2}>{message}</Typography>}
    </Box>
  );
};

export default VerifyOtp;
