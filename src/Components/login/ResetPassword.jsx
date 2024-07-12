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
import publicApi from "../../APIs/PublicApi";

const ResetPassword = () => {
  const [username, setUsername] = useState('');
  const navigator = useNavigate();
  const type = 'reset'

  function handleResetPassword() {
  

    publicApi
      .get("/auth/send-verification/" + username)
      .then((response) => {
        if (response.data === 1) {
          navigator("/accounts/verification", {
            state: {type: type, username: username}
          });
        }
      })
      .catch((error) => console.error(error));
  }

  function checkFullFilled(){
    if(username === ''){
      return false;
    }
    return true;
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
        <Card component={Paper} sx={{ width: 400, padding: 5, margin: 5 }} elevation={5}>
              <CardHeader
                title="Reset Password"
                titleTypographyProps={{ variant: 'h4', align: 'center' }}
              />
              <Box padding={1}>
                <TextField
                  label="Username"
                  placeholder="Username"
                  fullWidth
                  required
                  variant="standard"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                ></TextField>
              </Box>
              <Box padding={3} textAlign={'center'}>
                <Button
                  variant="contained"
                  sx={{ background: '#69CEE2', borderRadius: '8px', marginRight: 1 }}
                  onClick={handleResetPassword}
                >
                  Send
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
