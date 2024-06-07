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
} from "@mui/material";
import React, { useEffect, useState } from "react";
import StaffDrawer from "../StaffDrawer";
import { consulting_staff_navigator } from "../Naviate";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { formatRequestId, formatSampleId } from "../../../Foramat";
import axios from "axios";
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
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Table>
        <TableHead sx={{ backgroundColor: "#30D5C8" }}>
          <TableRow>
            <TableCell
              colSpan={2}
              sx={{
                color: "black",
                fontSize: "20px",
                backgroundColor: "#69CEE2",
              }}
            >
              Diamond Details - {formatSampleId(diamond.id)}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="detailed-diamond">
            <TableBody>
              <TableRow>
                <TableCell>Carat Weight</TableCell>
                <TableCell>{diamond.valuationReport.caratWeight}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Clarity</TableCell>
                <TableCell>{diamond.valuationReport.clarity}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Origin</TableCell>
                <TableCell>{diamond.valuationReport.origin}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Polish</TableCell>
                <TableCell>{diamond.valuationReport.polish}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Color</TableCell>
                <TableCell>{diamond.valuationReport.color}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Symmetry</TableCell>
                <TableCell>{diamond.valuationReport.symmetry}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fluorescence</TableCell>
                <TableCell>{diamond.valuationReport.fluorescence}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Shape</TableCell>
                <TableCell>{diamond.valuationReport.shape}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Measurement</TableCell>
                <TableCell>{diamond.valuationReport.measurement}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Proportion</TableCell>
                <TableCell>{diamond.valuationReport.proportion}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Price</TableCell>
                <TableCell>{diamond.valuationReport.finalPrice}$</TableCell>
              </TableRow>
              {/* <TableRow>
                <TableCell>Notes</TableCell>
                <TableCell>{diamond.valuationReport.notes}</TableCell>
              </TableRow> */}
              {/* <TableRow>
                <TableCell>Valuation Staff</TableCell>
                <TableCell>{diamond.idValuationStaff}</TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
        </TableContainer>
      </Table>
    </Collapse>
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
