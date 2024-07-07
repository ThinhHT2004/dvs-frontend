import React, { useEffect, useState } from "react";
import StaffDrawer from "../StaffDrawer";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Link,
  TextField,
  Grid,
  Chip,
  CardHeader,

} from "@mui/material";
import { valuation_staff_navigator } from "../Naviate";
import axios from "axios";
import { formatSampleId, formatValuationId } from "../../../Foramat";
import { Toaster, toast } from "sonner";
import moment from "moment";
import protectedApi from "../../../APIs/ProtectedApi";

const ValuationStaff_DiamondsAppraisal = () => {
  const staffId = sessionStorage.getItem("valuationStaffId");
  const [selectedDiamond, setSelectedDiamond] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState();
  const drawerWidth = 240;
  const [assignments, setAssignments] = useState([]);
  const [price, setPrice] = useState(0);

  console.log(staffId);

  useEffect(() => {
    getAssignments();
  }, []);

  console.log(selectedAssignment);

  function checkFullFilled() {
    if (selectedAssignment.price === 0 || selectedAssignment.price === "") {
      return false;
    } else {
      return true;
    }
  }

  function displayDeadline(deadline) {
    const current = new Date();
    const deadlineTime = new Date(deadline);
    if (current > (deadlineTime.getTime() - 30 * 60 * 1000)) {
      return (
        <Chip color="error" label={moment(deadline).format("yyyy-MM-DD hh:mm a")}></Chip>
      )
    } else if (current > (deadlineTime.getTime() - 60 * 60 * 1000)) {
      return (
        <Chip color="warning" label={moment(deadline).format("yyyy-MM-DD hh:mm a")}></Chip>
      )
    } else {
      return (
        <Chip color="primary" label={moment(deadline).format("yyyy-MM-DD hh:mm a")}></Chip>
      )
    }
  }

  const getAssignments = () => {
    protectedApi
      .get("/assignment/ASSIGNED/" + staffId)
      .then((resp) => setAssignments(resp.data))
      .catch((err) => console.log(err));
  };

  const getSelectDiamond = (id) => {
    protectedApi
      .get("/request-detail/find/" + id)
      .then((resp) => setSelectedDiamond(resp.data))
      .catch((err) => console.log(err));
  };

  const handleAction = (idDiamond) => {
    const assignment = assignments.find(
      (a) => a.valuationRequestDetailId === idDiamond
    );
    setSelectedAssignment(assignment);
    getSelectDiamond(assignment.valuationRequestDetailId);
  };

  console.log(selectedAssignment);
  const handleSave = (selectedAssignment) => {
    if (parseFloat(selectedAssignment.price) < 0) {
      toast.error("The price must not be negative");
    } else {
      protectedApi
        .put("/assignment/update", selectedAssignment)
        .then((resp) => {
          console.log(resp.data);
          getAssignments();
          handleClose();
        })
        .catch((err) => console.log(err));
    }
  };

  function handleClose() {
    setSelectedDiamond(null);
    setSelectedAssignment(null);
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "row", backgroundColor: "#FAF6EF", width: "100%", minHeight: "100vh" }}>
      <Toaster position="top-center" richColors></Toaster>
      <Box>
        <StaffDrawer
          mylist={["Home", "Diamonds Appraisal", "Sign Out"]}
          state="Diamonds Appraisal"
          handleClick={valuation_staff_navigator}
        />
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xl={5} lg={5} md={12}>
            <TableContainer sx={{ borderRadius: 3 }} component={Paper}>
              <CardHeader
                title='DIAMONDS APPRAISAL'
                titleTypographyProps={{
                  variant: 'h5',
                  color: 'white',
                }}
                sx={{ backgroundColor: '#30D5C8' }}
              />
              <Table>
                <TableBody>
                  <TableRow sx={{ backgroundColor: "white" }}>
                    <TableCell sx={{ fontSize: 20, width: 150, color: '#69CEE2' }} align="center">Valuation ID</TableCell>
                    <TableCell sx={{ fontSize: 20, width: 150, color: '#69CEE2' }} align="center">Sample ID</TableCell>
                    <TableCell sx={{ fontSize: 20, width: 150, color: '#69CEE2' }}>Price</TableCell>
                    <TableCell sx={{ fontSize: 20, width: 200, color: '#69CEE2' }} align="center">Deadline</TableCell>
                    <TableCell sx={{ width: 100 }}></TableCell>
                  </TableRow>
                  {assignments.map((assign) => (
                    <TableRow key={assign.id}>
                      <TableCell align="center">{formatValuationId(assign.id)}</TableCell>
                      <TableCell align="center">
                        {formatSampleId(assign.valuationRequestDetailId)}
                      </TableCell>
                      <TableCell>
                        {assign.price === 0 ? "No Price" : assign.price}
                      </TableCell>
                      <TableCell align="center">{displayDeadline(assign.deadline)}</TableCell>
                      <TableCell>
                        <Link
                          href="#"
                          sx={{
                            color:
                              selectedDiamond &&
                                selectedDiamond.id ===
                                assign.valuationRequestDetailId
                                ? "grey"
                                : "#69CEE2",
                            paddingLeft: "16px",
                          }}
                          underline="none"
                          onClick={() =>
                            handleAction(assign.valuationRequestDetailId)
                          }
                        >
                          Edit
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid xl={7} lg={7} md={12}>
            {selectedDiamond ? (
              <Box sx={{ p: 3 }}>
                <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
                  <CardHeader
                    title={`DIAMOND DETAILS - ${formatSampleId(selectedDiamond.id)}`}
                    titleTypographyProps={{
                      variant: 'h5',
                      color: 'white',
                    }}
                    sx={{ backgroundColor: '#30D5C8' }}
                  />
                  <Table>
                    <TableBody>
                      <Box sx={{ width: "100%", height: "77vh" }}>
                        <Box width="100%" height="100%" display="flex">
                          <Box
                            width="50%"
                            borderRight={1}
                            sx={{ p: 2, wordSpacing: 3 }}
                          >
                            <Box marginBottom={1.5}>
                              <Typography>
                                Cutting Style:{" "}
                                {selectedDiamond.valuationReport.shape}
                              </Typography>
                            </Box>
                            <Box marginBottom={1.5}>
                              <Typography>
                                Measurements:{" "}
                                {selectedDiamond.valuationReport.measurement}
                              </Typography>
                            </Box>
                            <Box marginBottom={1.5}>
                              <Typography>
                                Carat Weight:{" "}
                                {selectedDiamond.valuationReport.caratWeight}{" "}
                                carat
                              </Typography>
                            </Box>
                            <Box marginBottom={1.5}>
                              <Typography>
                                Clarity Grade:{" "}
                                {selectedDiamond.valuationReport.clarity}
                              </Typography>
                            </Box>
                            <Box marginBottom={1.5}>
                              <Typography>
                                Color Grade:{" "}
                                {selectedDiamond.valuationReport.color}
                              </Typography>
                            </Box>
                            <Box marginBottom={1.5}>
                              <Typography>
                                Polish:{" "}
                                {selectedDiamond.valuationReport.polish}
                              </Typography>
                            </Box>
                            <Box marginBottom={1.5}>
                              <Typography>
                                Symmetry:{" "}
                                {selectedDiamond.valuationReport.symmetry}
                              </Typography>
                            </Box>
                            <Box marginBottom={1.5}>
                              <Typography>
                                Fluorescence:{" "}
                                {selectedDiamond.valuationReport.fluorescence}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography>
                                Market Price: $3400 ~ $5000
                              </Typography>
                            </Box>
                            <Box>
                              <TextField
                                fullWidth
                                margin="normal"
                                label="Price"
                                value={selectedDiamond.price}
                                onChange={(e) =>
                                  setSelectedAssignment({
                                    ...selectedAssignment,
                                    price: e.target.value,
                                  })
                                }
                                type="number"
                              />
                              <TextField
                                fullWidth
                                margin="normal"
                                label="Notes"
                                multiline
                                rows={4}
                                value={selectedDiamond.note}
                                onChange={(e) =>
                                  setSelectedAssignment({
                                    ...selectedAssignment,
                                    note: e.target.value,
                                  })
                                }
                              />
                            </Box>
                            <Box sx={{ marginTop: 2 }}>
                              <Button
                                variant="contained"
                                sx={{ backgroundColor: "#69CEE2" }}
                                onClick={() => {
                                  handleSave(selectedAssignment);
                                }}
                                disabled={!checkFullFilled()}
                              >
                                Save
                              </Button>
                              <Button
                                variant="outlined"
                                sx={{
                                  marginLeft: 2,
                                  color: "red",
                                  borderColor: "red",
                                }}
                                onClick={() => setSelectedDiamond(null)}
                              >
                                Cancel
                              </Button>
                            </Box>
                          </Box>
                          <Box
                            width="50%"
                            sx={{ p: 2, wordSpacing: 3 }}
                            height="90%"
                          >
                            <Box display="flex" height="40%">
                              <Box width="40%">
                                <Box marginBottom={1.5}>
                                  <Typography>
                                    Depth:{" "}
                                    {selectedDiamond.valuationReport.depth}
                                  </Typography>
                                </Box>
                                <Box marginBottom={1.5}>
                                  <Typography>
                                    Table:{" "}
                                    {selectedDiamond.valuationReport.table}
                                  </Typography>
                                </Box>
                                <Box marginBottom={1.5}>
                                  <Typography>
                                    Girdle:{" "}
                                    {selectedDiamond.valuationReport.girdle}
                                  </Typography>
                                </Box>
                                <Box marginBottom={1.5}>
                                  <Typography>
                                    Culet:{" "}
                                    {selectedDiamond.valuationReport.culet}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box width="60%">
                                <img
                                  src={
                                    selectedDiamond.valuationReport.proportion
                                  }
                                  alt=""
                                  width="100%"
                                  height="100%"
                                />
                              </Box>
                            </Box>
                            <Box height="60%" sx={{ paddingTop: 3 }}>
                              <Box>
                                <Typography>
                                  Clarity Characteristic
                                </Typography>
                              </Box>
                              <Box height="100%">
                                <img
                                  src={
                                    selectedDiamond.valuationReport
                                      .characteristic
                                  }
                                  alt=""
                                  height="100%"
                                  width="100%"
                                />
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            ) : (
              <Typography></Typography>
            )}
          </Grid>
          {/* {selectedDiamond && (
              <Grid item xs={12} >
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700, borderRadius: 10 }}>
                    <TableHead sx={{ backgroundColor: "#69CEE2" }}>
                      <TableRow>
                        <TableCell colSpan={2} sx={{ color: 'black', fontSize: '20px' }}>Diamond Details - {formatSampleId(selectedDiamond.id)}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Carat Weight</TableCell>
                        <TableCell>{selectedDiamond.valuationReport.caratWeight}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Clarity</TableCell>
                        <TableCell>{selectedDiamond.valuationReport.clarity}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Origin</TableCell>
                        <TableCell>{selectedDiamond.valuationReport.origin}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Polish</TableCell>
                        <TableCell>{selectedDiamond.valuationReport.polish}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Color</TableCell>
                        <TableCell>{selectedDiamond.valuationReport.color}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Symmetry</TableCell>
                        <TableCell>{selectedDiamond.valuationReport.symmetry}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Fluorescence</TableCell>
                        <TableCell>{selectedDiamond.valuationReport.fluorescence}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Shape</TableCell>
                        <TableCell>{selectedDiamond.valuationReport.shape}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Measurement</TableCell>
                        <TableCell>{selectedDiamond.valuationReport.measurement}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Proportion</TableCell>
                        <TableCell>{selectedDiamond.valuationReport.proportion}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Market price</TableCell>
                        <TableCell>N/A</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            )} */}
        </Grid>
      </Box>
    </Box>
  );
};

export default ValuationStaff_DiamondsAppraisal;
