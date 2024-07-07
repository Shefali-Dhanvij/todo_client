"use client";

import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import constant from "@/app/constant";

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${constant.baseurl}forgot-password`, {
        email,
      });
      setMessage(response.data.message);
      if (response.data.message === "OTP sent to your email") {
        // router.push("/verifyotp");
      }
    } catch (error) {
      setMessage(
        error.response ? error.response.data.message : "An error occurred"
      );
    }
  };

  return (
    <Paper>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "50%", sm: "40%" },
          height: "35%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 2,
          borderRadius: "4px",
          overflowY: "auto",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          style={{ fontWeight: "600", marginBottom: "10px" }}
        >
          Forgot Password
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
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
        {message && <Typography mt={2}>{message}</Typography>}
      </Box>
    </Paper>
  );
};

export default ForgotPassword;
