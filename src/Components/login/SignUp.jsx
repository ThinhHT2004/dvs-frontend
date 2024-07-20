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
  FormHelperText,
} from "@mui/material";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import Footer from "../footer/Footer";
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { FlashAuto, Visibility, VisibilityOff } from "@mui/icons-material";
import DiasecurWhiteLogo from "../../assets/DiasecurWhiteLogo.png";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import publicApi from "../../APIs/PublicApi";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigator = useNavigate();
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassowrd] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const type = "register";

  function handleSignUp() {
    publicApi
      .post("/auth/register", {
        username: username,
        password: password,
        email: email,
        firstName: firstName,
        lastName: lastName,
        dob: dateOfBirth,
        phoneNumber: phoneNumber,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.code === 1) {
          navigator("/accounts/verification", {
            state: { type },
          });
        } else {
          return toast.error(response.data.mess);
        }
      })
      .catch((error) => console.log());
  }

  function checkFullFilled() {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      username === "" ||
      password === "" ||
      confirmPassword === "" ||
      dateOfBirth === null ||
      phoneNumber === ""
    ) {
      return false;
    } else {
      if (!checkPassword()) {
        return false;
      }
      if (!isValidEmailIgnoringTail()) {
        return false;
      }
      if (!checkPhoneNumber()) {
        return false;
      }
      if (!checkPhoneNumberString()) {
        return false;
      }
      if(checkEmailLength()){
        return false;
      }
      if(checkPasswordLength()){
        return false;
      }
      if(checkuUsernameLength()){
        return false;
      }
      return true;
    }
  }

  function checkEmailLength(){
    return email.length > 200;
  }

  function checkPasswordLength(){
    return password.length > 100;
  }

  function checkuUsernameLength(){
    return username.length > 50;
  }

  function checkPhoneNumber() {
    if (phoneNumber.length !== 10) {
      return false;
    } else {
      return true;
    }
  }

  function checkPhoneNumberString() {
    const digitRegex = /^\d+$/;
    return digitRegex.test(phoneNumber);
  }

  function checkDate() {
    return dateOfBirth > new Date();
  }

  function checkPassword() {
    return confirmPassword === password;
  }

  function isValidEmailIgnoringTail() {
    const emailRegex = /^[^\s@]+@[^\s@]+$/;

    return emailRegex.test(email);
  }
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Toaster position="top-center" richColors></Toaster>
      <Box>
        <Navbar></Navbar>
      </Box>
      <Box marginTop={10} marginBottom={5}>
        <Grid
          container
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Card
            component={Paper}
            sx={{ width: 900, padding: 0, margin: 5, borderRadius: 2 }}
            elevation={5}
          >
            <Grid container padding={0}>
              <Grid item lg={6} md={6} sm={6} xs={6} xl={6} padding={5}>
                <CardHeader
                  title="Sign Up"
                  titleTypographyProps={{ variant: "h4", align: "center" }}
                />
                <Box marginTop={1} marginBottom={1}>
                  <Box padding={1}>
                    <TextField
                      error={username === '' ? false : checkuUsernameLength()}
                      helperText={
                        username === '' ? false : checkuUsernameLength() ? "Username must not exceed 50 characters" : ''
                      }
                      label="Username"
                      placeholder="Username"
                      fullWidth
                      required
                      variant="standard"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value.replace(/\s/g, ''));
                        checkFullFilled();
                      }}
                    ></TextField>
                  </Box>
                  <Box padding={1}>
                    <TextField
                      error={email === "" ? false : !isValidEmailIgnoringTail()}
                      helperText={
                        email === ""
                          ? false
                          : !isValidEmailIgnoringTail()
                          ? "Email is invalid"
                          : ""
                      }
                      label="Email"
                      placeholder="Email"
                      fullWidth
                      required
                      variant="standard"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value.replace(/\s/g, ''));
                        checkFullFilled();
                      }}
                    ></TextField>
                  </Box>
                  <Box padding={1}>
                    <FormControl fullWidth required variant="standard"
                    >
                    
                      <TextField
                      label="Password"
                      required
                      type="password"
                      error={password === '' ? false : checkPasswordLength()}
                      helperText={password === '' ? false : checkPasswordLength() ? "The password must not exceed 100 characters" : ''}
                      id="password"
                      variant="standard"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value.replace(/\s/g, ''));
                        checkFullFilled();
                      }}>

                      </TextField>
                      
                    </FormControl>
                    
                  </Box>
                  <Box padding={1}>
                    <FormControl
                      fullWidth
                      required
                      variant="standard"
                      error={confirmPassword === "" ? false : !checkPassword()}
                    >
                      <TextField
                      label="Confirm Password"
                      required
                      type="password"
                      error={confirmPassword === '' ? false : checkPasswordLength() ? true : password !== confirmPassword ? true : false}
                      helperText={confirmPassword === '' ? '' : password !== confirmPassword ? 'Confirm Password does not match': ''}
                      id="password"
                      variant="standard"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassowrd(e.target.value.replace(/\s/g, ''));
                        checkFullFilled();
                      }}>

                      </TextField>
                    </FormControl>
                  </Box>
                  <Box padding={1}>
                    <Grid container spacing={2}>
                      <Grid item lg={6} md={6} sm={6} xs={6} xl={6}>
                        <TextField
                          label="First Name"
                          placeholder="First Name"
                          fullWidth
                          required
                          variant="standard"
                          value={firstName}
                          onChange={(e) => {
                            setFirstName(e.target.value);
                            checkFullFilled();
                          }}
                        ></TextField>
                      </Grid>
                      <Grid item lg={6} md={6} sm={6} xs={6} xl={6}>
                        <TextField
                          label="Last Name"
                          placeholder="Last Name"
                          fullWidth
                          required
                          variant="standard"
                          value={lastName}
                          onChange={(e) => {
                            setLastName(e.target.value);
                            checkFullFilled();
                          }}
                        ></TextField>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box padding={1}>
                    {/* <TextField label='Date of Birth' placeholder='Date of Birth' fullWidth required variant='standard' value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}></TextField> */}
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        inputFormat="dd/MM/yyyy"
                        value={dateOfBirth}
                        onChange={(newValue) => {
                          setDateOfBirth(newValue);
                          checkFullFilled();
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Date of Birth"
                            placeholder="Date of Birth"
                            fullWidth
                            required
                            variant="standard"
                          />
                        )}
                      ></DatePicker>
                    </LocalizationProvider>
                  </Box>
                  <Box padding={1} textAlign={"center"}>
                    <TextField
                      error={phoneNumber === "" ? false : !checkPhoneNumber()}
                      helperText={
                        phoneNumber === ""
                          ? false
                          : !checkPhoneNumberString()
                          ? "Phone must contain only digit"
                          : !checkPhoneNumber()
                          ? "Lenght must be 10"
                          : ""
                      }
                      label="Phone Number"
                      placeholder="Phone Number"
                      fullWidth
                      required
                      variant="standard"
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value.replace(/\s/g, ''));
                        checkFullFilled();
                      }}
                    ></TextField>
                  </Box>
                </Box>
                <Box padding={3} textAlign={"center"}>
                  <Button
                    variant="contained"
                    sx={{ background: "#69CEE2", borderRadius: "8px" }}
                    onClick={() => handleSignUp()}
                    disabled={!checkFullFilled()}
                  >
                    Sign Up
                  </Button>
                </Box>
              </Grid>
              <Grid
                item
                lg={6}
                md={6}
                sm={6}
                xs={6}
                xl={6}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                sx={{
                  backgroundColor: "#69CEE2",
                  padding: 0,
                }}
              >
                <img
                  src={DiasecurWhiteLogo}
                  alt="Diasecur Logo"
                  style={{
                    width: 300,
                    height: "auto",
                    objectFit: "cover",
                    padding: 10,
                  }}
                ></img>
                <Typography padding={2} textAlign={"center"} color={"white"}>
                  Already have an account?
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="outlined"
                    sx={{
                      color: "white",
                      borderColor: "white",
                      borderRadius: 10,
                    }}
                    onClick={() => navigator("/accounts/signin")}
                  >
                    Sign In
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Box>
      <Box sx={{ mt: "auto" }}>
        <Footer></Footer>
      </Box>
    </Box>
  );
};

export default SignUp;
