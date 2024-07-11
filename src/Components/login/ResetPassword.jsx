import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import {
  Box,
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  CardHeader,
  Card,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import Footer from "../footer/Footer";
import DiasecurWhiteLogo from "../../assets/DiasecurWhiteLogo.png";
import publicApi from "../../APIs/PublicApi";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigator = useNavigate();

  function handleResetPassword() {
    setSubmitted(true); // Set submitted to true immediately

    publicApi
      .post("/auth/resetpassword", { email })
      .then((response) => {
        if (response.data.code !== 1) {
          toast.error(response.data.message);
        }
      })
      .catch((error) => console.error(error));
  }

  function isValidEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Toaster position="top-center" richColors></Toaster>
      <Box>
        <Navbar></Navbar>
      </Box>
      <Box
        marginTop={10}
        marginBottom={5}
      >
        <Grid container display={'flex'} justifyContent={'center'} alignItems={'center'}>



          {submitted ? (
            <Box padding={5}>
              <Typography variant="h4" align="center">
                A reset password link has been sent to your email address
              </Typography>
              <Typography variant="h5" align="center">
                Please check your email to reset your password
              </Typography>
            </Box>
          ) : (
            <Card component={Paper} sx={{ width: 400, padding: 5, margin: 5 }} elevation={5}>
              <CardHeader
                title="Reset Password"
                titleTypographyProps={{ variant: 'h4', align: 'center' }}
              />
              <Box padding={1}>
                <TextField
                  error={email !== "" && !isValidEmail()}
                  helperText={
                    email !== "" && !isValidEmail() ? "Email is invalid" : ""
                  }
                  label="Email"
                  placeholder="Email"
                  fullWidth
                  required
                  variant="standard"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></TextField>
              </Box>
              <Box padding={3} textAlign={'center'}>
                <Button
                  variant="contained"
                  sx={{ background: '#69CEE2', borderRadius: '8px', marginRight: 1 }}
                  onClick={handleResetPassword}
                >
                  Reset
                </Button>
                <Button
                  variant="outlined"
                  sx={{ borderRadius: '8px' }}
                  onClick={() => navigator("/accounts/signin")}
                >
                  Cancel
                </Button>
              </Box>  
            </Card>
          )}
        </Grid>
      </Box>
      <Box sx={{ mt: "auto" }}>
        <Footer></Footer>
      </Box>
    </Box>
  );
};

export default ResetPassword;
