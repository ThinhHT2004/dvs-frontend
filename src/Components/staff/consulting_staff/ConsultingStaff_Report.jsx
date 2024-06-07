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
import { formatRequestId, formatSampleId } from "../../../Foramat";
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
  const [appointmentOpen, setAppointmentOpen] = useState({})
  const [selectedDiamond, setSelectedDiamond] = useState(null);
  const [appointmentData, setAppointmentData] = useState({});
  const [tempAppointmentData, setTempAppointmentData] = useState({});
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleClick = (idRequest) => {
    setOpen((prev) => ({ ...prev, [idRequest]: !prev[idRequest] }));
  };

  const handleReportClick = (diamond) => {
    setReportOpen((prev) => ({ ...prev, [diamond.idDiamond]: !prev[diamond.idDiamond] }));
    setSelectedDiamond(diamond);
  };

  const handleAppointmentClick = (idRequest) => {
    setAppointmentOpen((prev) => ({ ...prev, [idRequest]: !prev[idRequest] }));
    const request = diamondData.find((request) => request.idRequest === idRequest);
    setSelectedRequest(request);
    setTempAppointmentData(appointmentData[request.idRequest] || {});
  };

  const handleAppointmentChange = (idRequest, field, value) => {
    setTempAppointmentData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveAppointment = (idRequest) => {
    setAppointmentData((prev) => ({
      ...prev,
      [idRequest]: tempAppointmentData,
    }));
    setSelectedRequest(null);
  };

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
    <Box>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 100, borderRadius: 10 }}>
        <TableHead sx={{ backgroundColor: "#30D5C8" }}>
          <TableRow>
            <TableCell>Create Appointment - {request.idRequest}</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "& td": { borderBottom: "none" } }}>
            <TableCell>Name : {request.name}</TableCell>
            
          </TableRow>
          <TableRow sx={{ "& td": { borderBottom: "none" } }}>
            <TableCell>Phone : {request.phone}</TableCell>
           
          </TableRow>
          <TableRow sx={{ "& td": { borderBottom: "none" }, alignItems: "center" }}>
  <TableCell>
    <Box display="flex" alignItems="center">
      Date :
      <TextField
        type="date"
        value={tempAppointmentData?.date || ''}
        onChange={(e) => handleAppointmentChange(request.idRequest, 'date', e.target.value)}
        sx={{ marginLeft: 2 }}
      />
    </Box>
  </TableCell>
</TableRow>
<TableRow sx={{ "& td": { borderBottom: "none" }, alignItems: "center" }}>
  <TableCell>
    <Box display="flex" alignItems="center">
      Note : 
      <TextField
        type="text"
        value={tempAppointmentData?.note || ''}
        onChange={(e) => handleAppointmentChange(request.idRequest, 'note', e.target.value)}
        sx={{ marginLeft: 2 }}
      />
    </Box>
  </TableCell>
</TableRow>

          <TableRow sx={{ "& td": { borderBottom: "none" } }}>
            <TableCell colSpan={2} align="right">
              <Button 
              variant="contained" 
              sx={{ backgroundColor: '#69CEE2' }}
              onClick={() => handleSaveAppointment(request.idRequest)}>
                Save
              </Button>
              <Button
                variant="outlined"
                sx={{marginLeft: 2, color: "red", borderColor: 'red' }}
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
    <Box sx={{ display: "flex", flexDirection: "row", backgroundColor: "#FAF6EF", width: "100%", minHeight: "100vh" }}>
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
          <Grid item xs={8} >
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
                  {diamondData.map((request) => (
                    <React.Fragment key={request.idRequest}>
                      <TableRow>
                        <TableCell>{request.idRequest}</TableCell>
                        <TableCell>{request.name}</TableCell>
                        <TableCell>{request.status}</TableCell>
                        <TableCell>
                          <Link href="#" onClick={() => handleAppointmentClick(request.idRequest)} underline="none">
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
                                        <Link href="#" onClick={() => handleReportClick(diamond)} underline="none">
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
                      
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={4} >
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
