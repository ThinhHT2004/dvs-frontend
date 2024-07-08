import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../footer/Footer";
import background from "../../assets/diamondCheckBackground.png";
import Button from "@mui/material/Button";
import Imac from "../../assets/imac1.png";
import diamondDetails01 from "../../assets/diamondDetails01.png";
import diamondDetails02 from "../../assets/diamondDetails02.png";
import diamondCheckex from "../../assets/diamondCheckex.png";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Toaster, toast } from "sonner";
import publicApi from "../../APIs/PublicApi";
const CheckDiamondBody = () => {
  const [checkid, setCheckid] = useState("");
  const [diamondDetails, setDiamondDetails] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (diamondDetails) {
      navigate(`/certificates-check/${diamondDetails.labId}`, {
        state: { diamondDetails },
      });
    }
  });
  async function CheckID(){
    try {
      await publicApi
        .get(
          "/reports/diamond/" +
            checkid
        )
        .then((resp) => {
         setDiamondDetails(resp.data);
        });
    } catch (err) {
      toast.error("Diamond Not Found");
      
    }
  };

  return (
    <Box>
      <Toaster position="bottom-center" richColors></Toaster>
      <Box sx={{ position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundImage: `url(${background})`,
            backgroundSize: "100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.25,
            zIndex: -1,
          }}
        />

        <Grid container spacing={2}>
          <Grid
            item
            xl={6}
            sm={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                textAlign: "left",
                marginBottom: 15,
                marginTop: 15,
                marginLeft: 5,
                marginRight: 5,
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: {
                    xs: "2.5rem",
                    sm: "2.5rem",
                    md: "3rem",
                    lg: "3.5rem",
                    xl: "4rem",
                  },
                }}
              >
                Check any diamond's <br />
                <span style={{ color: "#69CEE2" }}>price & quality</span>
              </Typography>
              <Typography color={"#989898"} padding={1}>
                Transact with confidence — get fair price, cut score, visual
                carat and more{" "}
                <span style={{ color: "#69CEE2", textDecoration: "underline" }}>
                  for free
                </span>
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", padding: 2 }}>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item xl={8} md={8}>
                    <TextField
                      placeholder="Enter Certificate ID"
                      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                      fullWidth
                      variant="outlined"
                      value={checkid}
                      onChange={(e) => setCheckid(e.target.value)}
                      sx={{
                        fontSize: "20px",
                        "& fieldset": { borderRadius: 20 },
                        '&:hover': { backgroundColor: "white", 
                          borderRadius: 20,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xl={4} md={4}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        variant="contained"
                        type="submit"
                        sx={{
                          backgroundColor: "#69CEE2",
                          borderRadius: 20,
                          textTransform: "none",
                          fontSize: "20px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          '&:hover': { backgroundColor: "#69CEE2", 
                            borderRadius: 20,
                          },
                        }}
                        onClick={() => CheckID()}
                      >
                        Check
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
          <Grid
            item
            xl={6}
            sm={12}
            md={6}
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <img
              src={Imac}
              alt="imac"
              style={{ width: "400px", height: "320px" }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Box>
          <Card variant="outlined" sx={{ borderRadius: 0, border: 0 }}>
            <CardHeader
              title=" Welcome to DiAsecur Certificate Check"
              titleTypographyProps={{
                variant: "h4",
                color: "#69CEE2",
                fontWeight: "bold",
              }}
            />
            <CardContent>
              <Typography>
                We understand how important it is for you to have confidence in
                the quality and value of your diamond purchase. That's why we're
                here to provide you with comprehensive details about your
                diamond, ensuring transparency and peace of mind.
              </Typography>
              <Grid container spacing={2} marginTop={1}>
                <Grid item xl={6} sm={12} md={6}>
                  <Card variant="outlined" sx={{ borderRadius: 0, border: 0 }}>
                    <CardHeader
                      title="Fair Price and Origin"
                      titleTypographyProps={{ fontWeight: "bold" }}
                    />
                    <CardContent>
                      <Typography>
                        First, let’s talk about the fair price of this
                        magnificent diamond. Valued at $12,000, this diamond
                        offers not just beauty, but a great deal in terms of
                        value. It is of natural origin, ensuring its
                        authenticity and natural beauty, untouched by synthetic
                        processes.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  item
                  xl={6}
                  sm={12}
                  md={6}
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <img
                    src={diamondCheckex}
                    alt=""
                    style={{ width: "430px", height: "240px" }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xl={6} sm={12} md={6}>
                  <Card variant="outlined" sx={{ borderRadius: 0, border: 0 }}>
                    <CardHeader
                      title="Certificate Details"
                      titleTypographyProps={{ fontWeight: "bold" }}
                    />
                    <CardContent>
                      <Typography>
                        Every diamond comes with a unique Certificate of
                        Authenticity. This certificate contains crucial
                        information about your diamond, such as:
                      </Typography>
                      <Typography>
                        <FiberManualRecordIcon sx={{ fontSize: "small" }} />{" "}
                        <span style={{ fontWeight: "bold" }}>
                          Certificate Date:
                        </span>{" "}
                        The date the certificate was issued.
                      </Typography>
                      <Typography>
                        <FiberManualRecordIcon sx={{ fontSize: "small" }} />{" "}
                        <span style={{ fontWeight: "bold" }}>
                          Certificate Number:
                        </span>{" "}
                        A unique identifier for your diamond.
                      </Typography>
                      <Typography>
                        <FiberManualRecordIcon sx={{ fontSize: "small" }} />{" "}
                        <span style={{ fontWeight: "bold" }}>Origin:</span> The
                        source of the diamond, indicating if it is natural or
                        lab-grown.
                      </Typography>
                      <Typography>
                        <FiberManualRecordIcon sx={{ fontSize: "small" }} />{" "}
                        <span style={{ fontWeight: "bold" }}>Shape:</span> The
                        cut or shape of the diamond (e.g., round, princess).
                      </Typography>
                      <Typography>
                        <FiberManualRecordIcon sx={{ fontSize: "small" }} />{" "}
                        <span style={{ fontWeight: "bold" }}>
                          Measurements:
                        </span>{" "}
                        The dimensions of the diamond in millimeters.
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card variant="outlined" sx={{ borderRadius: 0, border: 0 }}>
                    <CardHeader
                      title="Grading Results"
                      titleTypographyProps={{ fontWeight: "bold" }}
                    />
                    <CardContent>
                      <Typography>
                        To ensure you understand the value and quality of your
                        diamond, we provide detailed grading results:
                      </Typography>
                      <Typography>
                        <FiberManualRecordIcon sx={{ fontSize: "small" }} />{" "}
                        <span style={{ fontWeight: "bold" }}>
                          Carat Weight:
                        </span>{" "}
                        The weight of the diamond in carats.
                      </Typography>
                      <Typography>
                        <FiberManualRecordIcon sx={{ fontSize: "small" }} />{" "}
                        <span style={{ fontWeight: "bold" }}>Color Grade:</span>{" "}
                        The color grade of the diamond, ranging from D
                        (colorless) to Z (light yellow).
                      </Typography>
                      <Typography>
                        <FiberManualRecordIcon sx={{ fontSize: "small" }} />{" "}
                        <span style={{ fontWeight: "bold" }}>
                          Clarity Grade:
                        </span>{" "}
                        The clarity grade of the diamond, ranging from Flawless
                        to Included.
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card variant="outlined" sx={{ borderRadius: 0, border: 0 }}>
                    <CardHeader
                      title="Additional Grading Information"
                      titleTypographyProps={{ fontWeight: "bold" }}
                    />
                    <CardContent>
                      <Typography>
                        For further assurance, we include additional grading
                        information:
                      </Typography>
                      <Typography>
                        <FiberManualRecordIcon sx={{ fontSize: "small" }} />{" "}
                        <span style={{ fontWeight: "bold" }}>Polish:</span> The
                        quality of the diamond's polish, ranging from Poor to
                        Excellent.
                      </Typography>
                      <Typography>
                        <FiberManualRecordIcon sx={{ fontSize: "small" }} />{" "}
                        <span style={{ fontWeight: "bold" }}>Symmetry:</span>{" "}
                        The quality of the diamond's symmetry, ranging from Poor
                        to Excellent.
                      </Typography>
                      <Typography>
                        <FiberManualRecordIcon sx={{ fontSize: "small" }} />{" "}
                        <span style={{ fontWeight: "bold" }}>
                          Fluorescence:
                        </span>{" "}
                        The presence or absence of fluorescence in the diamond.
                      </Typography>
                      <Typography>
                        <FiberManualRecordIcon sx={{ fontSize: "small" }} />{" "}
                        <span style={{ fontWeight: "bold" }}>Comments:</span>{" "}
                        Any additional comments or observations about the
                        diamond.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  item
                  xl={6}
                  sm={12}
                  md={6}
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Box>
                    <img
                      src={diamondDetails01}
                      alt=""
                      style={{ width: "600px", height: "450px" }}
                    />
                  </Box>
                </Grid>
              </Grid>

              <Grid container spacing={2} marginTop={1}>
                <Grid item xl={6} sm={12} md={6}>
                  <Card variant="outlined" sx={{ borderRadius: 0, border: 0 }}>
                    <CardHeader
                      title="Proportions"
                      titleTypographyProps={{ fontWeight: "bold" }}
                    />
                    <CardContent>
                      <Typography>
                        The proportions of your diamond play a significant role
                        in its overall appearance and brilliance. This includes:
                      </Typography>
                      <Typography>
                        <FiberManualRecordIcon sx={{ fontSize: "small" }} />{" "}
                        <span style={{ fontWeight: "bold" }}>Table:</span> The
                        width of the diamond's table facet as a percentage of
                        the diameter.
                      </Typography>
                      <Typography>
                        <FiberManualRecordIcon sx={{ fontSize: "small" }} />{" "}
                        <span style={{ fontWeight: "bold" }}>Girdle:</span> The
                        thickness of the diamond's girdle (e.g., thin, medium).
                      </Typography>
                      <Typography>
                        <FiberManualRecordIcon sx={{ fontSize: "small" }} />{" "}
                        <span style={{ fontWeight: "bold" }}>Depth:</span> The
                        depth of the diamond as a percentage of the diameter.
                      </Typography>
                      <Typography>
                        <FiberManualRecordIcon sx={{ fontSize: "small" }} />{" "}
                        <span style={{ fontWeight: "bold" }}>Culet:</span> The
                        presence or absence of a culet on the diamond.
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card variant="outlined" sx={{ borderRadius: 0, border: 0 }}>
                    <CardHeader
                      title="Clarity Characteristics"
                      titleTypographyProps={{ fontWeight: "bold" }}
                    />
                    <CardContent>
                      <Typography>
                        Understanding the clarity characteristics of your
                        diamond helps you appreciate its unique nature. We
                        provide detailed diagrams showing the diamond’s internal
                        and external features, ensuring you know exactly what
                        makes your diamond special.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid
                  item
                  xl={6}
                  sm={12}
                  md={6}
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <img
                    src={diamondDetails02}
                    alt=""
                    style={{ width: "600px", height: "450px" }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

const Check_Diamonds = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box>
        <Navbar />
      </Box>
      <Box 
      marginTop={5}
      marginBottom={5}
      >
        {CheckDiamondBody()}
        </Box>
      <Box>
        <Footer />
      </Box>
    </Box>
  );
};
export default Check_Diamonds;
