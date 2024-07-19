import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import {
  Box,
  Grid,
  Card,
  CardHeader,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import Footer from "../footer/Footer";
import publicApi from "../../APIs/PublicApi";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

const WaitingVerification = () => {
  const [token, setToken] = useState("");
  const navigator = useNavigate();
  const location = useLocation();
  const type = location.state?.type
  const username = location.state?.username

  console.log(username)
  console.log(type)

  const confirmToken = async () => {
    try {
      await publicApi.get("/auth/confirm/" + type + "/" + token).then((resp) => {
        console.log(resp.data);
        if (resp.data.code === 1) {
          if(resp.data.type === 'Register'){
            navigator("/accounts/signin");
          }else{
            navigator("/accounts/newpassword", {
              state: {username}
            });
          }
        } else {
          toast.error(resp.data.text);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

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
            sx={{ width: 500, padding: 5, margin: 5 }}
            elevation={5}
          >
            <CardHeader
              title="Input Validation Code"
              titleTypographyProps={{ variant: "h4", align: "center" }}
            />
            <Box padding={3} textAlign={"center"}>
              <TextField
                fullWidth
                required
                inputProps={{
                  style: {
                    textAlign: "center",
                    fontSize: 20,
                  },
                }}
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
            </Box>
            <Box padding={3} textAlign={"center"}>
              <Button variant="contained" onClick={() => confirmToken()}>
                Verify
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

export default WaitingVerification;
