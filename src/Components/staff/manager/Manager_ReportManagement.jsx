import React, { useState, useCallback, useEffect, Fragment } from "react";
import {
  Box,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Collapse,
  Button,
  FormControl,
  InputLabel,
  InputBase,
  TextField,
  Grid,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { manager_navigator } from "../Naviate";
import StaffDrawer from "../StaffDrawer";
import axios from "axios";
import { formatPrice, formatSampleId } from "../../../Foramat";
import { Diamond } from "@mui/icons-material";
import protectedApi from "../../../APIs/ProtectedApi";

const Manager_ReportManagement = () => {
  const [samples, setSamples] = useState([]);
  const [editPriceOpen, setEditPriceOpen] = useState(false);
  const [currentDiamond, setCurrentDiamond] = useState("");
  const [currentValuationReport, setCurrentValuationReport] = useState("");
  const [finalPrice, setFinalPrice] = useState(0);
  const drawerWidth = 240;

  useEffect(() => {
    getSamples();
  }, []);

  const handleEditPriceClick = (diamond) => {
    setCurrentDiamond(diamond);
    setCurrentValuationReport(diamond.valuationReport);
    setEditPriceOpen(true);
  };
  const handleMaxPrice = (diamond) => {
    let max = diamond.assignmentList[0].price;
    for (let i = 1; i < diamond.assignmentList.length; ++i) {
      if (diamond.assignmentList[i].price > max) {
        max = diamond.assignmentList[i].price;
      }
    }
    setCurrentValuationReport({ ...currentValuationReport, finalPrice: max });
    return max;
  };

  const handleMinPrice = (diamond) => {
    let min = diamond.assignmentList[0].price;
    for (let i = 1; i < diamond.assignmentList.length; ++i) {
      if (diamond.assignmentList[i].price < min) {
        min = diamond.assignmentList[i].price;
      }
    }
    setCurrentValuationReport({ ...currentValuationReport, finalPrice: min });
    return min;
  };

  const handleAverage = (diamond) => {
    let avg = 0;
    for (let i = 0; i < diamond.assignmentList.length; ++i) {
      avg += diamond.assignmentList[i].price;
    }

    avg /= diamond.assignmentList.length;
    avg = avg.toFixed(2);
    setCurrentValuationReport({ ...currentValuationReport, finalPrice: avg });
    return avg;
  };
  const renderSampleStatus = (status) => {
    switch (status) {
      case "VALUATED":
        return "success";
        break;
    }
  };
  const handleSave = (diamond) => {
    currentValuationReport.createdDate = new Date();
    diamond.valuationReport = currentValuationReport;
    protectedApi
      .put("/request-detail/update", diamond)
      .then((resp) => {
        console.log(resp.data);
        getSamples();
        handleCancel();
      })
      .catch((err) => console.log(err));

  };

  const handleCancel = () => {
    setEditPriceOpen(false);
    setCurrentDiamond();
  };

  const getSamples = () => {
    protectedApi
      .get("/request-detail/VALUATED")
      .then((resp) => setSamples(resp.data))
      .catch((err) => console.log(err));
  };

  return (

    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#FAF6EF",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <StaffDrawer
        mylist={["Home", "Pending Request", "Receipt", "Report", "Sign Out"]}
        state="Report"
        handleClick={manager_navigator}
      />
      <Box
        sx={{
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xl={6} lg={6}>
            <TableContainer sx={{ borderRadius: 3}} component={Paper}>
              <CardHeader
                title='MANAGE REQUESTS'
                titleTypographyProps={{
                  variant: 'h5',
                  color: 'white',
                }}
                sx={{ backgroundColor: '#30D5C8' }}
              />
              <Table>
                <TableBody>
                  <TableRow sx={{ backgroundColor: "white" }}>
                    <TableCell sx={{ fontSize: 20, width: 150, color: '#69CEE2' }} align="center">Request ID</TableCell>

                    <TableCell sx={{ fontSize: 20, width: 150, color: '#69CEE2' }} align="center">Status</TableCell>
                    <TableCell sx={{ width: 100 }}></TableCell>
                  </TableRow>

                  {samples.map((sample) => (
                    <Fragment key={sample.id}>
                      <TableRow>
                        <TableCell align="center">
                          {formatSampleId(sample.id)}
                        </TableCell>
                        <TableCell align="center">
                          <Chip label={sample.status} color={renderSampleStatus(sample.status)}/>
                        </TableCell>
                        <TableCell>
                          <Button>
                            <Link
                              href="#"
                              sx={{ color: "#69CEE2", paddingLeft: "16px" }}
                              underline="none"
                              onClick={() => handleEditPriceClick(sample)}
                            >
                              Edit Price
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    </Fragment>
                  ))}
                </TableBody>

              </Table>
            </TableContainer>
          </Grid>
          <Grid item xl={6} lg={6}>
            {editPriceOpen && (
              <Box key={currentDiamond.id}>
                <TableContainer component={Paper} sx={{borderRadius: 3}}>
                  <CardHeader
                    title={`DIAMOND PRICES - ${formatSampleId(currentDiamond.id)}`}
                    titleTypographyProps={{ variant: 'h5', color: 'white' }}
                    sx={{ backgroundColor: "#30D5C8" }}
                  />
                  <Grid container spacing={0.5}>
                    {currentDiamond.assignmentList.map((assignment) => (
                      <Grid item lg={4} xl={4} key={assignment.id}>
                        <Card sx={{ maxWidth: '260px', margin: 1, backgroundColor: '#F2F2F2' }}>
                          <CardHeader
                            title={assignment.valuationStaff.firstName}
                          />
                          <CardContent>
                            <Typography>
                              Price: ${assignment.price}
                            </Typography>
                            <Typography sx={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                              Note: {assignment.note === null ? "none" : assignment.note}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>

                    ))}
                  </Grid>
                  <Table>
                    <TableBody>
                      <TableRow >
                        <TableCell
                          sx={{
                            borderBottom: "none",
                            display: "flex",
                            alignItems: "center",

                          }}
                        >
                          <Typography  marginRight={2}>Final price: {" "}</Typography>
                            <FormControl
                              variant="standard">
                              <InputLabel htmlFor="final-price-input" />
                              <TextField
                                value={currentValuationReport.finalPrice || ""}
                                placeholder="Enter final price"
                                onChange={(e) =>
                                  setCurrentValuationReport({ ...currentValuationReport, finalPrice: e.target.value })
                                }
                                type="number"

                              />
                            </FormControl>
                          
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={3} style={{ borderBottom: "none" }}>

                          <Grid container spacing={2}>
                            <Grid item xs={4}>
                              <Button
                                variant="contained"
                                sx={{ background: "#30D5C8" }}
                                fullWidth
                                onClick={() => handleMinPrice(currentDiamond)}
                              >
                                Min
                              </Button>
                            </Grid>
                            <Grid item xs={4}>
                              <Button
                                variant="contained"
                                sx={{ background: "#30D5C8" }}
                                fullWidth
                                onClick={() => handleAverage(currentDiamond)}
                              >
                                Average
                              </Button>
                            </Grid>
                            <Grid item xs={4}>
                              <Button
                                variant="contained"
                                sx={{
                                  background: "#30D5C8"
                                }}
                                fullWidth
                                onClick={() => handleMaxPrice(currentDiamond)}
                              >
                                Max
                              </Button>
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                      <TableRow sx={{ "& td": { borderBottom: "none" } }}>
                        <TableCell
                        sx={{
                          borderBottom: "none",
                          display: "flex",
                        }}
                        >
                   
                          <Typography marginRight={2}>Notes:</Typography>
                            <FormControl variant='standard'>
                              <InputLabel htmlFor="note-input" />
                              <TextField
                                placeholder="Enter note"
                                value={currentValuationReport.note || ""}
                                multiline
                                rows={4}
                                onChange={(e) =>
                                  setCurrentValuationReport({ ...currentValuationReport, note: e.target.value })
                                }
                                
                              />
                            </FormControl>
                          
                
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{ backgroundColor: "#FFF", borderBottom: "none" }}
                      >
                        <TableCell
                          sx={{ borderBottom: "none", textAlign: "left" }}
                        >
                          <Box display={"flex"} justifyContent={"right"} padding={2}>
                            <Button

                              variant="contained"
                              sx={{ backgroundColor: "#69CEE2" }}
                              onClick={() =>
                                handleSave(currentDiamond)
                              }

                            >
                              Save

                            </Button>
                            <Button
                              variant="outlined"
                              sx={{ marginLeft: 2, color: "red", borderColor: "red" }}
                              onClick={() => handleCancel()}
                            >
                              Cancel
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box >

  );
};

export default Manager_ReportManagement;
