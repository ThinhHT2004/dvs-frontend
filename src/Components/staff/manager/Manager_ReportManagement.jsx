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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { manager_navigator } from "../Naviate";
import StaffDrawer from "../StaffDrawer";
import axios from "axios";
import { formatPrice, formatSampleId } from "../../../Foramat";

const Manager_ReportManagement = () => {
  const [samples, setSamples] = useState([]);
  const [editPriceOpen, setEditPriceOpen] = useState(false);
  const [currentDiamond, setCurrentDiamond] = useState();
  const [currentValuationReport, setCurrentValuationReport] = useState();
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
    setCurrentValuationReport({...currentValuationReport, finalPrice: max});
    return max;
  };

  const handleMinPrice = (diamond) => {
    let min = diamond.assignmentList[0].price;
    for (let i = 1; i < diamond.assignmentList.length; ++i) {
      if (diamond.assignmentList[i].price < min) {
        min = diamond.assignmentList[i].price;
      }
    }
    setCurrentValuationReport({...currentValuationReport, finalPrice: min});
  };

  const handleAverage = (diamond) => {
    let avg = 0;
    for (let i = 0; i < diamond.assignmentList.length; ++i) {
      avg += diamond.assignmentList[i].price;
    }

    avg /= diamond.assignmentList.length;
    avg = avg.toFixed(2);
    setCurrentValuationReport({...currentValuationReport, finalPrice: avg});
    return avg;
  };

  const handleSave = (diamond) => {
    diamond.valuationReport.createdDate = new Date();
    diamond.valuationReport = currentValuationReport;
    axios
      .put("http://localhost:8080/api/request-detail/update", diamond)
      .then((resp) => console.log(resp.data))
      .catch((err) => console.log(err));
    getSamples();
    handleCancel();
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
        ></StaffDrawer>
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <TableContainer
            component={Paper}
            sx={{ width: "65%", marginRight: "8px" }}
          >
            <Table sx={{ minWidth: 550, borderRadius: 10 }}>
              <TableHead sx={{ backgroundColor: "#30D5C8" }}>
                <TableRow>
                  <TableCell style={{ width: "33%" }}>Sample ID</TableCell>
                  <TableCell style={{ width: "33%" }}>Status</TableCell>
                  <TableCell style={{ width: "33%" }}></TableCell>
                </TableRow>
              </TableHead>
              <React.Fragment>
                <TableBody>
                  {samples.map((sample) => (
                    <TableRow key={sample.id}>
                      <TableCell style={{ width: "25%" }}>
                        {formatSampleId(sample.id)}
                      </TableCell>

                      <TableCell>{sample.status}</TableCell>
                      <TableCell style={{ width: "25%" }}>
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
          {editPriceOpen && (
            <Box>
              <TableContainer component={Paper} sx={{ width: "100%" }}>
                <Table sx={{ minWidth: 300, borderRadius: 10 }}>
                  <TableHead sx={{ backgroundColor: "#69CEE2" }}>
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        sx={{ color: "white", fontSize: "25px" }}
                      >
                        {formatSampleId(currentDiamond.id)}
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentDiamond.assignmentList.map((assignment) => (
                      <TableRow>
                        <TableCell>
                          {assignment.valuationStaff.firstName} Price:{" "}
                          {assignment.price}$
                        </TableCell>
                      </TableRow>
                    ))}

                    <TableRow sx={{ mb: -2, p: 0 }}>
                      <TableCell
                        sx={{
                          borderBottom: "none",
                          display: "flex",
                          alignItems: "center",
                          p: 0,
                          pl: 2,
                        }}
                      >
                        <div style={{ marginRight: 8 }}>Final Price:</div>
                        <FormControl
                          variant="standard"
                          sx={{
                            display: "flex",
                            width: "50%",
                            height: "auto",
                            pb: 2.5,
                          }}
                        >
                          <InputLabel htmlFor="final-price-input" />
                          <TextField
                            value={currentValuationReport.finalPrice}
                            placeholder="Enter final price"
                            onChange={(e) =>
                              setCurrentValuationReport({...currentValuationReport, finalPrice: e.target.value})
                            }
                            type="number"
                            sx={{ paddingTop: 2 }}
                          ></TextField>
                        </FormControl>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3} style={{ borderBottom: "none" }}>
                        <Button
                          variant="contained"
                          sx={{
                            background: "#69CEE2",
                            borderRadius: "8px",
                            mr: 5,
                            ml: 3,
                          }}
                          onClick={() => handleMinPrice(currentDiamond)}
                        >
                          Min
                        </Button>
                        <Button
                          variant="contained"
                          sx={{ background: "#69CEE2", borderRadius: "8px" }}
                          onClick={() => handleAverage(currentDiamond)}
                        >
                          Average
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            background: "#69CEE2",
                            borderRadius: "8px",
                            ml: 6,
                          }}
                          onClick={() => handleMaxPrice(currentDiamond)}
                        >
                          Max
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ backgroundColor: "#FFF", borderBottom: "none" }}
                    >
                      <TableCell
                        sx={{ borderBottom: "none", textAlign: "left" }}
                      >
                        <Button>
                          <Link
                            href="#"
                            sx={{
                              color: "#69CEE2",
                              fontWeight: "bold",
                              fontSize: "16px",
                              textDecoration: "none",
                            }}
                            onClick={() => handleSave(currentDiamond)}
                          >
                            Save
                          </Link>
                        </Button>
                        <Button>
                          <Link
                            href="#"
                            sx={{
                              color: "red",
                              fontWeight: "bold",
                              fontSize: "16px",
                              textDecoration: "none",
                            }}
                            onClick={() => handleCancel()}
                          >
                            Cancel
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Manager_ReportManagement;
