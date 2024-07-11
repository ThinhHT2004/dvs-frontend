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
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import Footer from "../footer/Footer";
import publicApi from "../../APIs/PublicApi";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigator = useNavigate();

  function handleForgetPassword() {
    setSubmitted(true);

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
              <Button variant="contained" sx={{ background: '#69CEE2', borderRadius: '8px' }} onClick={() => handleLogin()} >Sign In</Button>
            </Box>
            <Typography padding={3} textAlign={'center'}>
              Remembered your password? <Link href="/accounts/signin" underline='none'>Sign in</Link>
            </Typography>
          </Card>

        </Grid>
      </Box>
      <Box>
        <Footer></Footer>
      </Box>

    </Box >
    //       {submitted ? (
    //         <Box padding={5}>
    //           <Typography variant="h4" align="center">
    //             A reset password link has been sent to your email address
    //           </Typography>
    //           <Typography variant="h5" align="center">
    //             Please check your email to reset your password
    //           </Typography>
    //         </Box>
    //       ) : (
    //         <Card
    //           component={Paper}
    //           sx={{ width: 600, padding: 0, margin: 5, borderRadius: 2 }}
    //           elevation={5}
    //         >
    //           <Grid container padding={0}>
    //             <Grid item xs={12} padding={5}>
    //               <CardHeader
    //                 title="Reset Password"
    //                 titleTypographyProps={{ variant: "h4", align: "center" }}
    //               />
    //               <Box padding={1}>
    //                 <TextField
    //                   error={email !== "" && !isValidEmail()}
    //                   helperText={
    //                     email !== "" && !isValidEmail() ? "Email is invalid" : ""
    //                   }
    //                   label="Email"
    //                   placeholder="Email"
    //                   fullWidth
    //                   required
    //                   variant="standard"
    //                   value={email}
    //                   onChange={(e) => setEmail(e.target.value)}
    //                 ></TextField>
    //               </Box>
    //               <Box padding={3} textAlign={"center"} sx={{gap: '10px'}}>
    //                 <Button
    //                   variant="contained"
    //                   sx={{ background: "#69CEE2", borderRadius: "8px" }}
    //                   onClick={handleForgetPassword}
    //                   disabled={!isValidEmail()}
    //                 >
    //                   Submit
    //                 </Button>
    //                 <Button
    //                   variant="contained"
    //                   sx={{ background: "#CECECE", borderRadius: "8px" }}
    //                   onClick={navigator("/accounts/signin")}
    //                 >
    //                   Cancle
    //                 </Button>
    //               </Box>
    //             </Grid>
    //             <Grid
    //               item
    //               xs={12}
    //               container
    //               direction="column"
    //               justifyContent="center"
    //               alignItems="center"
    //               sx={{ backgroundColor: "#69CEE2", padding: 0 }}
    //             >
    //               <Typography padding={2} textAlign={"center"} color={"white"}>
    //                 Remember your password?
    //               </Typography>
    //               <Box
    //                 sx={{
    //                   display: "flex",
    //                   justifyContent: "center",
    //                   alignItems: "center",
    //                 }}
    //               >
    //                 <Button
    //                   variant="outlined"
    //                   sx={{
    //                     color: "white",
    //                     borderColor: "white",
    //                     borderRadius: 10,
    //                   }}
    //                   onClick={() => navigator("/accounts/signin")}
    //                 >
    //                   Sign In
    //                 </Button>
    //               </Box>
    //             </Grid>
    //           </Grid>
    //         </Card>
    //       )}
    //     </Grid>
    //   </Box>
    //   <Box sx={{ mt: "auto" }}>
    //     <Footer></Footer>
    //   </Box>
    // </Box>
  );
};

export default ResetPassword;
