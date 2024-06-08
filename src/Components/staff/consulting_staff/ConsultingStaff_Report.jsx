import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Collapse,
  Typography,
  Link,
  Grid,
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogTitle
} from "@mui/material";
import React, { useEffect, useState } from "react";
import StaffDrawer from "../StaffDrawer";
import { consulting_staff_navigator } from "../Naviate";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { formatRequestId, formatSampleId } from "../../../Foramat";
import axios from "axios";
import logoWeb from '../../../assets/logo_v4.png'
const drawerWidth = 240;


const ConsultingStaff_Report = () => {
  const [open, setOpen] = useState({});
  const [reportOpen, setReportOpen] = useState(false);
  const [selectedDiamond, setSelectedDiamond] = useState(null);
  const [appointmentData, setAppointmentData] = useState({});
  const [tempAppointmentData, setTempAppointmentData] = useState({});
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requests, setRequests] = useState([]);
  
  useEffect(() => {
    getRequests();
  }, []);

  const renderLink = (request) => {
    if (request.status === "PROCESSING") {
      return (
        <Button disabled>
          <Link
            href="#"
            onClick={() => handleAppointmentClick(request)}
            underline="none"
            sx={{ color: "grey" }}
          >
            Create Appoinment
          </Link>
        </Button>
      );
    } else {
      return (
        <Button>
          <Link
            href="#"
            onClick={() => handleAppointmentClick(request)}
            underline="none"
          >
            Create Appoinment
          </Link>
        </Button>
      );
    }
  };

  const renderReportLink = (diamond) => {
    if (diamond.status === "APPROVED") {
      return (
        <Button>
          <Link
            href="#"
            onClick={() => handleReportClick(diamond)}
            underline="none"
          >
            View Report
          </Link>
        </Button>
      );
    } else {
      return (
        <Button disabled>
          <Link
            href="#"
            onClick={() => handleReportClick(diamond)}
            underline="none"
            sx={{color: "grey"}}
          >
            View Report
          </Link>
        </Button>
      );
    }
  };


  const handleSaveAppointment = (request) =>{
    axios
    .put("http://localhost:8080/api/request/create-appointment/" + request.id, request.receivingDate)
    .then(resp => console.log(resp.data))
    .catch(err => console.log(err));
    setSelectedRequest();
  }

  const getRequests = () => {
    axios
      .get(
        "http://localhost:8080/api/request/valuation-request/status/PROCESSING/COMPLETED"
      )
      .then((resp) => setRequests(resp.data))
      .catch((err) => console.log(err));
  };

  const handleClick = (idRequest) => {
    setOpen((prev) => ({ ...prev, [idRequest]: !prev[idRequest] }));
  };

  const handleClose = () =>{
    setReportOpen(false);
  }

  const handleReportClick = (diamond) => {
    setReportOpen(true);
    setSelectedDiamond(diamond);
  };

  const handleAppointmentClick = (request) => {
    setSelectedRequest(request);
  };

  const handleAppointmentChange = (idRequest, field, value) => {
    setTempAppointmentData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };


  const renderDiamondReport = (diamond) => (
    <Dialog open={reportOpen} onClose={() => handleClose()} maxWidth="lg" fullWidth>
                <DialogTitle>{""}</DialogTitle>
                <DialogContent>
                    <Paper>
                        <Box>
                            <div>
                                <img src={logoWeb} style={{ width: '30%', height: 'auto' }} />
                            </div>
                        </Box>
                        <hr></hr>
                        <Typography sx={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'center' }}>DIAMOND APPRAISAL</Typography>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Typography sx={{ fontWeight: 'bold' }}>Date:</Typography>
                            <Typography sx={{ paddingLeft: '5px' }}>{new Date().toLocaleString('default', { month: 'long' })} {new Date().getDate()},{new Date().getFullYear()}</Typography>
                            <Typography style={{ fontWeight: 'bold', marginLeft: '75%' }}>DAS Report: </Typography>
                            <Typography style={{ marginLeft: 'auto' }}>#00001</Typography>
                        </div>
                        <div style={{ marginTop: '15px' }}>
                            <Typography>Jack Gohyakuman</Typography>
                            <Typography>1664 Bulanku Street</Typography>
                            <Typography>Santa Barbara, CA 92475</Typography>
                        </div>
                        <div style={{ display: 'flex', marginTop: '20px', marginBottom: '20px' }}>
                            {/* <img src={microscope} style={{ width: "60px", height: 'auto' }}></img> */}
                            <div>
                                <Typography>Type of service: 3h</Typography>
                                <Typography>Subject Property: Diamond Ring</Typography>
                            </div>
                        </div>
                        <div sx={{ marginTop: '15px' }}>
                            <h3>DIAMOND RING</h3>
                            <Typography>Eighteen karat white gold, diamond, and ruby set ring.
                                A round brilliant cut diamond is bezel set in a vintage style.
                                A total of thirty single cut diamonds are bead set around the center stone.
                                A total of forty-two rubies accent the design. The ring is cast, stamped 18k,
                                and has a total gross weight of 5.80 grams.
                            </Typography>
                        </div>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Box>
                                <div style={{ marginTop: '15px' }}>
                                    <h4>Mounting Attributes</h4>
                                    <Typography>Metal ......................................................................... 18k</Typography>
                                    <Typography>Gross Weight ............................................................ 5.60 Grams</Typography>
                                    <Typography>Constraction ............................................................. Cast</Typography>
                                    <Typography>Setting ...................................................................... Bezel Bead</Typography>
                                    <Typography>Condition .................................................................. Very Good</Typography>
                                </div>
                                <div style={{ marginTop: '15px' }}>
                                    <h4>Diamond Attributes</h4>
                                    <Typography>Cutting Style ............................................................. Round Billent Cut</Typography>
                                    <Typography>1 Measures ............................................................... 3.50mm</Typography>
                                    <Typography>Carat Weight ............................................................. 0.15 Carats by formula estimation</Typography>
                                    <Typography>30 Measure ............................................................... 1.50 mm</Typography>
                                    <Typography>Individual Carat Weight ............................................ 0.01-0.02 Carats each by formula</Typography>
                                    <Typography>Carat Weight ............................................................. 0.50 Carats by formula estimation</Typography>
                                    <Typography>Clarity Grade ............................................................. VS2-511</Typography>
                                    <Typography>Color Grade ............................................................... G-H</Typography>
                                </div>
                            </Box>
                            {/* <img src={diamondRing} style={{ width: '45%', height: 'auto', right: 0 }}></img> */}
                        </Box>
                        <Typography sx={{ mt: '15px' }} >*Gemological findings may vary if the same gemstones are evaluated un-mounted</Typography>
                        <div style={{ display: 'flex', marginTop: '15px' }}>
                            <Typography sx={{ fontSize: '28px', fontWeight: 'bold', textDecoration: 'underline' }}>Estimated Retail Replacement Value</Typography>
                            <Typography sx={{ fontSize: '28px', fontWeight: 'bold' }}>.........................................................$2,000.</Typography>
                        </div>
                        <Box sx={{ justifyContent: 'left', mt: '15px', mb: '15px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography sx={{ paddingLeft: '120px' }}>02018-All Rights Reserved</Typography>
                                <Typography sx={{ paddingLeft: '85px' }}>GA-GemSecure Jewelry Appraisale</Typography>
                                <Typography sx={{ paddingLeft: '50px' }}>This appraisal is only valid including all 4 pages</Typography>
                            </div>
                        </Box>

                    </Paper>
                </DialogContent>
            </Dialog>

  );

  const renderAppointmentForm = (request) => (
    <Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 100, borderRadius: 10 }}>
          <TableHead sx={{ backgroundColor: "#30D5C8" }}>
            <TableRow>
              <TableCell>Create Appointment - {request.idRequest}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>{request.customer.first_name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Phone</TableCell>
              <TableCell>{request.customer.phoneNumber}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>
                <TextField
                  type="date"
                  onChange={(e) =>
                    request.receivingDate = e.target.value
                  }
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Note</TableCell>
              <TableCell>
                <TextField
                  type="text"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2} align="right">
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#69CEE2" }}
                  onClick={() => handleSaveAppointment(request)}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  sx={{ color: "red", borderColor: "red" }}
                  onClick={() => setSelectedRequest(null)}
                >
                  Cancel
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

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
      <Box>
        <StaffDrawer
          mylist={[
            "Home",
            "Incomming Request",
            "Request",
            "Report",
            "Form",
            "Sign Out",
          ]}
          state="Report"
          handleClick={consulting_staff_navigator}
        />
      </Box>
      <Box
        sx={{
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={4} md={7}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 100, borderRadius: 10 }}>
                <TableHead sx={{ backgroundColor: "#30D5C8" }}>
                  <TableRow>
                    <TableCell>ID Request</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Appointment</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {requests.map((request) => (
                    <React.Fragment key={request.id}>
                      <TableRow>
                        <TableCell>{formatRequestId(request.id)}</TableCell>
                        <TableCell>{request.customer.first_name}</TableCell>
                        <TableCell>{request.status}</TableCell>
                        <TableCell>{renderLink(request)}</TableCell>
                        <TableCell>
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => handleClick(request.id)}
                          >
                            {open[request.id] ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )}
                          </IconButton>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          style={{ paddingBottom: 0, paddingTop: 0 }}
                          colSpan={6}
                        >
                          <Collapse
                            in={open[request.id]}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Box margin={1}>
                              <Table size="small" aria-label="diamonds">
                                <TableBody>
                                  {request.valuationRequestDetailList.map(
                                    (diamond) => (
                                      <TableRow key={diamond.id}>
                                        <TableCell>
                                          {formatSampleId(diamond.id)}
                                        </TableCell>
                                        <TableCell>
                                          {renderReportLink(diamond)}
                                        </TableCell>
                                      </TableRow>
                                    )
                                  )}
                                </TableBody>
                              </Table>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={5}>
            {selectedRequest && renderAppointmentForm(selectedRequest)}
          </Grid>
          <Grid item xs={12} md={7}>
            {selectedDiamond && renderDiamondReport(selectedDiamond)}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ConsultingStaff_Report;
