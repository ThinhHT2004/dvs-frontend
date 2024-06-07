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
import React, { useState } from "react";
import StaffDrawer from "../StaffDrawer";
import { consulting_staff_navigator } from "../Naviate";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import '../../staff/StaffStyle.css'
const drawerWidth = 240;

const diamondData = [
  {
    idRequest: "#00001",
    name: "hua tan thinh",
    phone: "0877962524",
    status: "Processing",
    diamonds: [
      {
        idDiamond: "D001",
        carat_weight: 1.25,
        clarity: "VS1",
        origin: "NATURAL",
        polish: "EX.",
        color: "G",
        symmetry: "V.GOOD",
        fluorescence: "FNT",
        shape: "ROUND",
        measurement: "6.5 x 6.5 x 4.0 mm",
        proportion: "blob data here",
        price: "$4,000",
        notes: "Have GIA report",
        idValuationStaff: "VD001"
      },
      {
        idDiamond: "D002",
        carat_weight: 1.50,
        clarity: "VVS2",
        origin: "LAB-GROWN",
        polish: "V.GOOD",
        color: "F",
        symmetry: "EX.",
        fluorescence: "NONE",
        shape: "PRINCESS",
        measurement: "6.0 x 6.0 x 4.2 mm",
        proportion: "blob data here",
        price: "$3,800",
        notes: "No GIA report",
        idValuationStaff: "VD002"
      }
    ]
  },
  {
    idRequest: "#00002",
    status: "Completed",
    name: "hua tan thinh",
    phone: "0877962524",
    completeDate: "2023-12-31",
    diamonds: [
      {
        idDiamond: "D003",
        carat_weight: 1.00,
        clarity: "SI1",
        origin: "NATURAL",
        polish: "GOOD",
        color: "H",
        symmetry: "GOOD",
        fluorescence: "MED",
        shape: "OVAL",
        measurement: "5.8 x 4.1 x 3.9 mm",
        proportion: "blob data here",
        price: "$2,500",
        notes: "Have GIA report",
        idValuationStaff: "VD003"
      },
      {
        idDiamond: "D004",
        carat_weight: 2.00,
        clarity: "VS2",
        origin: "NATURAL",
        polish: "EX.",
        color: "D",
        symmetry: "V.GOOD",
        fluorescence: "NONE",
        shape: "EMERALD",
        measurement: "7.0 x 5.0 x 4.0 mm",
        proportion: "blob data here",
        price: "$10,000",
        notes: "Have GIA report",
        idValuationStaff: "VD004"
      }
    ]
  }
];

const ConsultingStaff_Report = () => {
  const [open, setOpen] = useState({});
  const [reportOpen, setReportOpen] = useState({});
  const [selectedDiamond, setSelectedDiamond] = useState(null);
  const [appointmentOpen, setAppointmentOpen] = useState({});
  const [appointmentData, setAppointmentData] = useState({});

  const handleClick = (idRequest) => {
    setOpen((prev) => ({ ...prev, [idRequest]: !prev[idRequest] }));
  };

  const handleReportClick = (diamond) => {
    setReportOpen((prev) => ({ ...prev, [diamond.idDiamond]: !prev[diamond.idDiamond] }));
    setSelectedDiamond(diamond);
  };

  const handleAppointmentClick = (idRequest) => {
    setAppointmentOpen((prev) => ({ ...prev, [idRequest]: !prev[idRequest] }));
  };

  const handleAppointmentChange = (idRequest, field, value) => {
    setAppointmentData((prev) => ({
      ...prev,
      [idRequest]: {
        ...prev[idRequest],
        [field]: value,
      },
    }));
  };

  const handleSaveAppointment = (idRequest) => {
    console.log("Saved appointment for request:", idRequest, appointmentData[idRequest]);
    setAppointmentOpen((prev) => ({ ...prev, [idRequest]: false }));
  };

  const renderStatus = (status) =>{
    switch(status){
      case "ACCEPTED": return "success"; break;
    }
  }

  const renderDiamondReport = (diamond) => (
    <Collapse in={reportOpen[diamond.idDiamond]} timeout="auto" unmountOnExit>
      <Table>
        <TableHead sx={{ backgroundColor: "#30D5C8" }}>
          <TableRow>
            <TableCell colSpan={2} sx={{ color: 'black', fontSize: '20px', backgroundColor: "#69CEE2" }}>
              Diamond Details - {diamond.idDiamond}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="detailed-diamond">
            <TableBody>
              <TableRow>
                <TableCell>Carat Weight</TableCell>
                <TableCell>{diamond.carat_weight}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Clarity</TableCell>
                <TableCell>{diamond.clarity}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Origin</TableCell>
                <TableCell>{diamond.origin}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Polish</TableCell>
                <TableCell>{diamond.polish}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Color</TableCell>
                <TableCell>{diamond.color}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Symmetry</TableCell>
                <TableCell>{diamond.symmetry}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Fluorescence</TableCell>
                <TableCell>{diamond.fluorescence}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Shape</TableCell>
                <TableCell>{diamond.shape}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Measurement</TableCell>
                <TableCell>{diamond.measurement}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Proportion</TableCell>
                <TableCell>{diamond.proportion}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Price</TableCell>
                <TableCell>{diamond.price}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Notes</TableCell>
                <TableCell>{diamond.notes}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Valuation Staff</TableCell>
                <TableCell>{diamond.idValuationStaff}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Table>
    </Collapse>
  );

  const renderAppointmentForm = (request) => (
    
      <Box display={appointmentOpen[request.idRequest] ? 'block' : 'none'} sx={{ position: 'absolute', top: '10%', left: '30%', width: '40%', bgcolor: 'background.paper', boxShadow: 24, p: 4}}>
      <Typography variant="h6">Create Appointment - {request.idRequest}</Typography>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>{request.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Phone</TableCell>
            <TableCell>{request.phone}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>
              <TextField
                type="date"
                value={appointmentData[request.idRequest]?.date || ''}
                onChange={(e) => handleAppointmentChange(request.idRequest, 'date', e.target.value)}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Note</TableCell>
            <TableCell>
              <TextField
                type="text"
                value={appointmentData[request.idRequest]?.note || ''}
                onChange={(e) => handleAppointmentChange(request.idRequest, 'note', e.target.value)}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} align="right">
              <Button variant="contained" color="primary" onClick={() => handleSaveAppointment(request.idRequest)}>
                Save Appointment
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
    
  );

  return (
    <Box display="flex">
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
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          marginTop: "5%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={7} md={7}>
            <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
              <Table sx={{ minWidth: 300, borderRadius: 10 }}>
                <TableHead sx={{ backgroundColor: "#30D5C8" }}>
                  <TableRow>
                    <TableCell>ID Request</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Appointment</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {diamondData.map((request) => (
                    <React.Fragment key={request.idRequest}>
                      <TableRow>
                        <TableCell>{request.idRequest}</TableCell>
                        <TableCell>{request.name}</TableCell>
                        <TableCell className="status">{request.status}</TableCell>
                        <TableCell>
                          <Link href="#" onClick={() => handleAppointmentClick(request.idRequest)}>
                            {appointmentData[request.idRequest]?.date ? appointmentData[request.idRequest].date : 'Create Appointment'}
                          </Link>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => handleClick(request.idRequest)}
                          >
                            {open[request.idRequest] ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )}
                          </IconButton>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                          <Collapse in={open[request.idRequest]} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                              <Table size="small" aria-label="diamonds">
                                
                                <TableBody>
                                  {request.diamonds.map((diamond) => (
                                    <TableRow key={diamond.idDiamond}>
                                      <TableCell>{diamond.idDiamond}</TableCell>
                                      {request.status === "Completed" && <TableCell>{request.completeDate}</TableCell>}
                                      <TableCell>
                                        <Link href="#" onClick={() => handleReportClick(diamond)}>
                                          View Report
                                        </Link>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                      {renderAppointmentForm(request)}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={5} md={7}>
            {selectedDiamond && renderDiamondReport(selectedDiamond)}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ConsultingStaff_Report;
