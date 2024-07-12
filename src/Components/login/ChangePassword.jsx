import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import {
  Box,
  Grid,
  Paper,
  Button,
  CardHeader,
  Card,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import Footer from "../footer/Footer";
import publicApi from "../../APIs/PublicApi";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigator = useNavigate();
  const location = useLocation();
  const username = location.state?.username

  function handleResetPassword() {
    publicApi
      .put("/auth/change-password", { username,password})
      .then((response) => {
        if (response.data.code === 1) {
          toast.success("Updated password successfully", {timeOut: 1000});
          navigator("/accounts/signin");
        } else {
          toast.error(response.data.mess);
        }
      })
      .catch((error) => console.error(error));
  }

  function checkPassword() {
    return password === confirmPassword;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Toaster position="top-center" richColors></Toaster>
      <Box>
        <Navbar></Navbar>
      </Box>
      <Box marginTop={10} marginBottom={5}>
        <Grid container display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <Card component={Paper} sx={{ width: 400, padding: 5, margin: 5 }} elevation={5}>
            <CardHeader
              title="New Password"
              titleTypographyProps={{ variant: 'h4', align: 'center' }}
            />
            <Box padding={1}>
              <FormControl fullWidth required variant="standard">
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    checkFullFilled();
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
            <Box padding={1}>
              <FormControl fullWidth required variant="standard" error={confirmPassword === "" ? false : !checkPassword()}>
                <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        onMouseDown={(e) => e.preventDefault()}
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {confirmPassword !== "" && !checkPassword() && (
                  <FormHelperText>Password does not match</FormHelperText>
                )}
              </FormControl>
            </Box>
            <Box padding={3} textAlign={'center'}>
              <Button
                variant="contained"
                sx={{ background: '#69CEE2', borderRadius: '8px', marginRight: 1 }}
                onClick={handleResetPassword}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                sx={{ borderRadius: '8px' }}
                color="error"
                onClick={() => navigator("/accounts/signin")}
              >
                Cancel
              </Button>
            </Box>
          </Card>
        </Grid>
      </Box>
      <Box sx={{ mt: "auto" }}>
        <Footer></Footer>
      </Box>
    </Box>
  );
};

export default ResetPassword;
