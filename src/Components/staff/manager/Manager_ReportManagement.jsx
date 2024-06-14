import React, { useState, useCallback, useEffect } from "react";
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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { manager_navigator } from "../Naviate";
import StaffDrawer from "../StaffDrawer";
import axios from "axios";
import { formatPrice, formatSampleId } from "../../../Foramat";
import { Diamond } from "@mui/icons-material";

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

  const handleSave = (diamond) => {
    currentValuationReport.createdDate = new Date();
    diamond.valuationReport = currentValuationReport;
    axios
      .put("http://localhost:8080/api/request-detail/update", diamond)
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
    axios
      .get("http://localhost:8080/api/request-detail/VALUATED")
      .then((resp) => setSamples(resp.data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
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
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TableContainer
                component={Paper}
                sx={{ width: "100%" }}
              >
                <Table sx={{ minWidth: 550, borderRadius: 10 }}>
                  <TableHead sx={{ backgroundColor: "#30D5C8" }}>
                    <TableRow>
                      <TableCell>Sample ID</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <React.Fragment>
                    <TableBody>
                      {samples.map((sample) => (
                        <TableRow key={sample.id}>
                          <TableCell>
                            {formatSampleId(sample.id)}
                          </TableCell>

                          <TableCell>{sample.status}</TableCell>

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
                      ))}
                    </TableBody>
                  </React.Fragment>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item xs={6}>
              {editPriceOpen && (
                <Box>
                  <TableContainer component={Paper} sx={{ width: "100%" }}>
                    <Table sx={{ minWidth: 300, borderRadius: 10 }}>
                      <TableHead sx={{ backgroundColor: "#30D5C8" }}>
                        <TableRow sx={{ "& td": { borderBottom: "none" } }}>
                          <TableCell
                            colSpan={5}
                            sx={{ color: "white", fontSize: "25px" }}
                          >
                            {formatSampleId(currentDiamond.id)}
                          </TableCell>

                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {currentDiamond.assignmentList.map((assignment) => (
                          <TableRow sx={{ "& td": { borderBottom: "none" } }}>
                            <TableCell>
                              <Grid container spacing={2}>
                                <Grid item xs={4}>
                                  Valuator : {assignment.valuationStaff.firstName}
                                </Grid>
                                <Grid item xs={4}>
                                  Price : ${assignment.price}
                                </Grid>
                                <Grid item xs={4}>
                                  Note : {assignment.note === null ? "none" : assignment.note}
                                </Grid>
                              </Grid>
                            </TableCell>
                          </TableRow>
                        ))}

                        <TableRow >
                          <TableCell
                            sx={{
                              borderBottom: "none",
                              display: "flex",
                              alignItems: "center",

                            }}
                          >
                            <div style={{ marginRight: 8 }}>Final Price:</div>
                            <FormControl
                              variant="standard">
                              <InputLabel htmlFor="final-price-input" />
                              <TextField
                                value={currentValuationReport.finalPrice}
                                placeholder="Enter final price"
                                onChange={(e) =>
                                  setCurrentValuationReport({ ...currentValuationReport, finalPrice: e.target.value })
                                }
                                type="number"
                                sx={{ paddingTop: 2 }}
                              ></TextField>
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
      </Box>
    </div>
  );
};

export default Manager_ReportManagement;
