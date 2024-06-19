import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Input,
  Slider,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../footer/Footer";
import moment from "moment";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Calculate = () => {
  const shape1 = ["ROUND", "CUSHION", "EMERALD", "OVAL", "PRINCESS"];
  const shape2 = ["PEAR", "RADIANT", "MARQUISE", "ASSCHER", "HEART"];
  const colorMap = ["K", "J", "I", "H", "G", "F", "E", "D"];
  const clarityMap = ["SI2", "SI1", "VS2", "VS1", "VSS2", "VVS1", "IF", "FL"];
  const cutMap = ["FAIR", "GOOD", "V.GOOD", "EX."];
  const polishMap = ["FAIR", "GOOD", "V.GOOD", "EX."];
  const symmetryMap = ["FAIR", "GOOD", "V.GOOD", "EX."];
  const fluorescenceMap = ["VSTG", "STG", "MED", "FNT", "NON"];
  const [open, setOpen] = useState(false);

  const [origin, setOrigin] = useState("Natural");
  const [shape, setShape] = useState("ROUND");
  const [carat, setCarat] = useState(0.0);
  const [color, setColor] = useState("K");
  const [clarity, setClarity] = useState("SI2");
  const [cut, setCut] = useState("FAIR");
  const [symmetry, setSymmetry] = useState("FAIR");
  const [polish, setPolish] = useState("FAIR");
  const [fluorescence, setFluorescence] = useState("VSTG");

  function handleOpen() {
    setOpen(!open);
  }

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
              <Grid container spacing={2}>
                <Grid item md={4}>
                  <Box>
                    <Typography variant="h5">Calculator Input</Typography>
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: "#FFFCFC",
                      borderRadius: "8px",
                    }}
                  >
                    <Box>
                      <Box paddingLeft={1} paddingRight={1}>
                        <Typography variant="h6">Diamond Origin</Typography>
                        <Box>
                          <Grid container spacing={1}>
                            <Grid item md={6}>
                              <Button
                                variant={
                                  origin === "Natural"
                                    ? "contained"
                                    : "outlined"
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
                      </Box>
                      <Box paddingLeft={1} paddingRight={1}>
                        <Typography variant="h6">SHAPE & CUT</Typography>
                        <Box>
                          <Box paddingBottom={1}>
                            <Grid container>
                              <Grid item md={12}>
                                {shape1.map((s) => (
                                  <Button
                                    variant={
                                      shape === s ? "contained" : "outlined"
                                    }
                                    sx={{
                                      width: "18%",
                                      "&:not(:last-child)": {
                                        marginRight: "2.5%",
                                      },
                                    }}
                                    onClick={() => setShape(s)}
                                  >
                                    {s}
                                  </Button>
                                ))}
                              </Grid>
                            </Grid>
                          </Box>
                          <Box>
                            <Grid container>
                              <Grid item md={12}>
                                {shape2.map((s) => (
                                  <Button
                                    variant={
                                      shape === s ? "contained" : "outlined"
                                    }
                                    sx={{
                                      width: "18%",
                                      "&:not(:last-child)": {
                                        marginRight: "2.5%",
                                      },
                                    }}
                                    onClick={() => setShape(s)}
                                  >
                                    {s}
                                  </Button>
                                ))}
                              </Grid>
                            </Grid>
                          </Box>
                        </Box>
                        <Box paddingLeft={1} paddingRight={1}>
                          <Typography variant="h6">Carat</Typography>
                          <Box>
                            <Box display="flex" justifyContent="center">
                              <Chip
                                label={parseFloat(carat).toFixed(2)}
                                color="primary"
                              ></Chip>
                            </Box>
                            <Slider
                              size="small"
                              defaultValue={0.25}
                              step={0.01}
                              min={0.25}
                              max={5.0}
                              valueLabelDisplay="auto"
                              onChange={(e) => setCarat(e.target.value)}
                            ></Slider>
                          </Box>
                        </Box>
                      </Box>
                      <Box paddingLeft={1} paddingRight={1}>
                        <Typography>COLOR</Typography>
                        <Box>
                          <Grid container item md={12} spacing={1}>
                            {colorMap.map((c) => (
                              <Grid item md={3} key={c}>
                                <Button
                                  variant={
                                    color === c ? "contained" : "outlined"
                                  }
                                  onClick={() => setColor(c)}
                                  fullWidth
                                >
                                  {c}
                                </Button>
                              </Grid>
                            ))}
                          </Grid>
                        </Box>
                      </Box>
                      <Box paddingLeft={1} paddingRight={1}>
                        <Typography>CLARITY</Typography>
                        <Box>
                          <Grid container spacing={1}>
                            {clarityMap.map((c) => (
                              <Grid item md={3} key={c}>
                                <Button
                                  variant={
                                    clarity === c ? "contained" : "outlined"
                                  }
                                  onClick={() => setClarity(c)}
                                  fullWidth
                                >
                                  {c}
                                </Button>
                              </Grid>
                            ))}
                          </Grid>
                        </Box>
                      </Box>
                      {!open ? (
                        <Box marginTop={2}>
                          <Box display="flex" justifyContent="center">
                            <Button variant="contained" sx={{ width: "50%" }}>
                              Submit
                            </Button>
                          </Box>
                          <Box
                            paddingLeft={1}
                            paddingRight={1}
                            display="flex"
                            sx={{ justifyContent: "space-between" }}
                          >
                            <Box>
                              <Typography>More Input</Typography>
                            </Box>
                            <Box>
                              <IconButton onClick={handleOpen}>
                                <ArrowDropDownIcon></ArrowDropDownIcon>
                              </IconButton>
                            </Box>
                          </Box>
                        </Box>
                      ) : (
                        <Box paddingLeft={1} paddingRight={1}>
                          <Box>
                            <Typography>CUT</Typography>
                            <Box>
                              <Grid container spacing={1}>
                                {cutMap.map((c) => (
                                  <Grid item md={3} key={c}>
                                    <Button
                                      variant={
                                        cut === c ? "contained" : "outlined"
                                      }
                                      onClick={() => setCut(c)}
                                      fullWidth
                                    >
                                      {c}
                                    </Button>
                                  </Grid>
                                ))}
                              </Grid>
                            </Box>
                          </Box>
                          <Box>
                            <Typography>SYMMETRY</Typography>
                            <Box>
                              <Grid container spacing={1}>
                                {symmetryMap.map((s) => (
                                  <Grid item md={3} key={s}>
                                    <Button
                                      variant={
                                        symmetry === s
                                          ? "contained"
                                          : "outlined"
                                      }
                                      onClick={() => setSymmetry(s)}
                                      fullWidth
                                    >
                                      {s}
                                    </Button>
                                  </Grid>
                                ))}
                              </Grid>
                            </Box>
                          </Box>
                          <Box>
                            <Typography>POLISH</Typography>
                            <Box>
                              <Grid container spacing={1}>
                                {polishMap.map((p) => (
                                  <Grid item md={3} key={p}>
                                    <Button
                                      variant={
                                        polish === p ? "contained" : "outlined"
                                      }
                                      onClick={() => setPolish(p)}
                                      fullWidth
                                    >
                                      {p}
                                    </Button>
                                  </Grid>
                                ))}
                              </Grid>
                            </Box>
                          </Box>
                          <Box>
                            <Typography>FLUORESCENCE</Typography>
                            <Box paddingBottom={1}>
                              <Grid container>
                                <Grid item md={12}>
                                  {fluorescenceMap.map((f) => (
                                    <Button
                                      variant={
                                        fluorescence === f
                                          ? "contained"
                                          : "outlined"
                                      }
                                      sx={{
                                        width: "18%",
                                        "&:not(:last-child)": {
                                          marginRight: "2.5%",
                                        },
                                      }}
                                      onClick={() => setFluorescence(f)}
                                    >
                                      {f}
                                    </Button>
                                  ))}
                                </Grid>
                              </Grid>
                            </Box>
                          </Box>
                          <Box display="flex" justifyContent="center">
                            <Button variant="contained" sx={{ width: "50%" }}>
                              Submit
                            </Button>
                          </Box>
                          <Box
                            display="flex"
                            sx={{ justifyContent: "space-between" }}
                          >
                            <Typography>Fewer Input</Typography>
                            <IconButton onClick={handleOpen}>
                              <ArrowDropUpIcon></ArrowDropUpIcon>
                            </IconButton>
                          </Box>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Grid>
                <Grid item md={8}>
                  <Box>
                    <Box>
                      <Typography variant="h5">Calculator Output</Typography>
                    </Box>
                    <Box
                      paddingTop={6}
                      sx={{
                        backgroundColor: "#FFFCFC",
                        borderRadius: "8px",
                      }}
                    >
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{ flexDirection: "column" }}
                      >
                        <Box>
                          <Typography color="#ACACAC" variant="h6">
                            Fair Price Estimate
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="h3" fontWeight="bold">
                            $5,267
                          </Typography>
                        </Box>
                        <Box marginTop={1}>
                          <Typography color="#ACACAC" variant="h7">
                            Round 1 Carat G VS2
                          </Typography>
                        </Box>
                        <Box marginTop={6}>
                          <Chip
                            label="Natural Diamond"
                            color="success"
                            size="small"
                          ></Chip>
                        </Box>
                        <Box width="100%" marginTop={2}>
                          <Grid container>
                            <Grid item md={4}>
                            <Box
                                fullWidth
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                sx={{
                                  flexDirection: "column",
                                  borderRight: 3,
                                  borderColor: "#e6e3e3",
                                  backgroundColor: "#ACACAC33",
                                  borderRadius: "0px 0px 0px 8px"
                                }}
                              >
                                <Typography>Estimate Range</Typography>
                                <Box><Typography variant="h6" fontWeight="bold">$4,215 - $6,374</Typography></Box>
                              </Box>
                            </Grid>
                            <Grid item md={4}>
                              <Box
                                fullWidth
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                sx={{
                                  flexDirection: "column",
                                  borderRight: 3,
                                  borderColor: "#e6e3e3",
                                  backgroundColor: "#ACACAC33"
                                }}
                              >
                                <Typography>Last 30 Days Change</Typography>
                                <Box><Typography variant="h6" fontWeight="bold">+10.28%</Typography></Box>
                              </Box>
                            </Grid>
                            <Grid item md={4}>
                              <Box
                                fullWidth
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                sx={{ flexDirection: "column", backgroundColor: "#ACACAC33", borderRadius: "0px 0px 8px 0px" }}
                              >
                                <Typography>Estimate Price per Carat</Typography>
                                <Box><Typography variant="h6" fontWeight="bold">$5,267</Typography></Box>
                                
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
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
