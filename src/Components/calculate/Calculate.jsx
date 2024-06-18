import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../footer/Footer";
import moment from "moment";

const Calculate = () => {
  const [origin, setOrigin] = useState("Natural");
  const [shape, setShape] = useState("ROUND");

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box>
        <Navbar></Navbar>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Box padding={4}>
          <Box>
            <Typography variant="h5">Diamond Price Calculator</Typography>
            <Box width="40%">
              <Typography fontSize="1em" color="#ACACAC">
                Use our free diamond price calculator to estimate the current
                retail price for diamonds.Our price estimates are updated daily
                based on our massive database of online jeweler inventory
                sourced from top-rated jewelers.
              </Typography>
            </Box>
            <Box>
              <Typography>
                Updated:{" "}
                <span style={{ color: "#159413" }}>
                  {moment(new Date()).format("dddd MMMM DD, yyyy")}
                </span>
              </Typography>
            </Box>
          </Box>
          <Box>
            <Box marginTop="3%">
              <Grid container>
                <Grid item md={4}>
                  <Box>
                    <Typography variant="h5">Calculator Input</Typography>
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: "#FFFCFC",
                      borderRadius: "8px",
                      border: 1,
                    }}
                  >
                    <Box width="100%">
                      <Typography variant="h6">Diamond Origin</Typography>
                      <Box>
                        <Grid container spacing={1}>
                          <Grid item md={6}>
                            <Button
                              variant={
                                origin === "Natural" ? "contained" : "outlined"
                              }
                              onClick={() => setOrigin("Natural")}
                              fullWidth
                            >
                              Natural
                            </Button>
                          </Grid>
                          <Grid item md={6}>
                            <Button
                              variant={
                                origin === "Lab" ? "contained" : "outlined"
                              }
                              onClick={() => setOrigin("Lab")}
                              fullWidth
                            >
                              Lab
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                      <Typography variant="h6">
                        SHAPE & CUT
                      </Typography>
                      <Box>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <Button variant={shape === "ROUND" ? 'contained' : 'outlined'} sx={{width: "18%", marginRight: "2%", marginLeft: "1%"}} onClick={() => setShape("ROUND")}>ROUND</Button>
                              <Button variant={shape === "CUSHION" ? 'contained' : 'outlined'} sx={{width: "18%", marginRight: "2%"}} onClick={() => setShape("CUSHION")}>CUSHION</Button>
                              <Button variant={shape === "EMERALD" ? 'contained' : 'outlined'} sx={{width: "18%", marginRight: "2%"}} onClick={() => setShape("EMERALD")}>EMERALD</Button>
                              <Button variant={shape === "OVAL" ? 'contained' : 'outlined'} sx={{width: "18%", marginRight: "2%"}} onClick={() => setShape("OVAL")}>OVAL</Button>
                              <Button variant={shape === "PRINCESS" ? 'contained' : 'outlined'} sx={{width: "18%"}} onClick={() => setShape("PRINCESS")}>PRINCESS</Button>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} marginTop=".5%">
                            <Grid item xs={12}>
                              <Button variant={shape === "PEAR" ? 'contained' : 'outlined'} sx={{width: "18%", marginRight: "2%", marginLeft: "1%"}} onClick={() => setShape("PEAR")}>PEAR</Button>
                              <Button variant={shape === "RADIANT" ? 'contained' : 'outlined'} sx={{width: "18%", marginRight: "2%"}} onClick={() => setShape("RADIANT")}>RADIANT</Button>
                              <Button variant={shape === "MARQUISE" ? 'contained' : 'outlined'} sx={{width: "18%", marginRight: "2%"}} onClick={() => setShape("MARQUISE")}>MARQUISE</Button>
                              <Button variant={shape === "ASSCHER" ? 'contained' : 'outlined'} sx={{width: "18%", marginRight: "2%"}} onClick={() => setShape("ASSCHER")}>ASSCHER</Button>
                              <Button variant={shape === "HEART" ? 'contained' : 'outlined'} sx={{width: "18%"}} onClick={() => setShape("HEART")}>HEART</Button>
                            </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item md={8}></Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Footer></Footer>
      </Box>
    </Box>
  );
};

export default Calculate;
