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
  DialogTitle,
  Chip,
  ThemeProvider,
  List,
  ListItem,
  ListItemText,
  CardHeader,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import StaffDrawer from "../StaffDrawer";
import { consulting_staff_navigator } from "../Naviate";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { formatRequestId, formatSampleId } from "../../../Foramat";
import axios from "axios";
import logoWeb from "../../../assets/logo_v4.png";
import moment from "moment";
import protectedApi from "../../../APIs/ProtectedApi";
const drawerWidth = 240;

const ConsultingStaff_Report = () => {
  const [open, setOpen] = useState({});
  const [reportOpen, setReportOpen] = useState(false);
  const [selectedDiamond, setSelectedDiamond] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getRequests();
  }, []);

  console.log(selectedRequest);

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
            sx={{ color: "grey" }}
          >
            View Report
          </Link>
        </Button>
      );
    }
  };

  const handleSaveAppointment = (request) => {
    const formData = new FormData();
    formData.append("id", request.id);
    formData.append("receiveDate", request.receivingDate);
    console.log(formData.get("receiveDate"));
    protectedApi
      .put("/request/create-appointment", formData)
      .then((resp) => console.log(resp.data))
      .catch((err) => console.log(err));
    setSelectedRequest();
  };

  const getRequests = () => {
    protectedApi
      .get(
        "/request/valuation-request/status/PROCESSING/COMPLETED"
      )
      .then((resp) => setRequests(resp.data))
      .catch((err) => console.log(err));
  };

  const handleClick = (idRequest) => {
    setOpen((prev) => ({ ...prev, [idRequest]: !prev[idRequest] }));
  };

  const handleClose = () => {
    setReportOpen(false);
    setSelectedDiamond();
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
  const renderStatus = (status) => {
    switch (status) {
      case "PROCESSING":
        return "warning";
        break;
      case "COMPLETED":
        return "info";
        break;
    }
  };
  const renderDiamondReport = (diamond) => (
    <Dialog
      open={reportOpen}
      onClose={() => handleClose()}
      maxWidth="md"
      fullWidth={true}
    >
      <CardHeader
        title={`${formatSampleId(diamond.id)}  Report`}
                  titleTypographyProps={{
                    variant: 'h5',
                    color: 'white',
                  }}
                  sx={{ backgroundColor: '#30D5C8' }}
        />
      <DialogContent sx={{ padding: 1}}>
        
          <Box  height="100%">
            <Box height="6%">
              <img src={logoWeb} style={{ width: "12%", height: "auto" }} />
            </Box>
            <Box height="95%">
              <Typography
                sx={{
                  fontSize: "1em",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                DIAMOND APPRAISAL
              </Typography>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Typography sx={{ fontWeight: "bold", fontSize: "0.8em" }}>
                  Date:{" "}
                  {moment(diamond.valuationReport.createdDate).format(
                    "YYYY-MM-DD"
                  )}{" "}
                </Typography>
                <Typography
                  style={{
                    fontWeight: "bold",
                    marginLeft: "60%",
                    fontSize: "0.8em",
                  }}
                >
                  DAS Report: {formatSampleId(diamond.id)}
                </Typography>
              </div>
              <div style={{ marginTop: "15px", marginBottom: "3%" }}>
                <Typography fontSize="0.9em">Jack Gohyakuman</Typography>
                <Typography fontSize="0.9em">1664 Bulanku Street</Typography>
                <Typography fontSize="0.9em">
                  Santa Barbara, CA 92475
                </Typography>
              </div>
              <div sx={{ marginTop: "15%" }}>
                <h4>DIAMOND</h4>
                <Typography fontSize="0.9em">
                  A round brilliant cut diamond is bezel set in a vintage style.
                  A total of thirty single cut diamonds are bead set around the
                  center stone. A total of forty-two rubies accent the design.
                  The ring is cast, stamped 18k, and has a total gross weight of
                  5.80 grams.
                </Typography>
              </div>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Grid container>
                  <Grid item md={7}>
                    <Box>
                      <div style={{ marginTop: "15px" }}>
                        <h4>Diamond Attributes</h4>
                        <Typography fontSize="0.9em">
                          Cutting Style
                          ..............................................................{" "}
                          {diamond.valuationReport.shape}
                        </Typography>
                        <Typography fontSize="0.9em">
                          Measurement
                          ............................................................{" "}
                          {diamond.valuationReport.measurement}
                        </Typography>
                        <Typography fontSize="0.9em">
                          Carat Weight
                          .............................................................{" "}
                          {diamond.valuationReport.caratWeight} carat
                        </Typography>
                        <Typography fontSize="0.9em">
                          Polish
                          ........................................................................{" "}
                          {diamond.valuationReport.polish}
                        </Typography>
                        <Typography fontSize="0.9em">
                          Clarity Grade
                          .............................................................{" "}
                          {diamond.valuationReport.clarity}
                        </Typography>
                        <Typography fontSize="0.9em">
                          Color Grade
                          ...............................................................{" "}
                          {diamond.valuationReport.color}
                        </Typography>
                        <Typography fontSize="0.9em">
                          Symmetry
                          ..................................................................{" "}
                          {diamond.valuationReport.symmetry}
                        </Typography>
                        <Typography fontSize="0.9em">
                          Cut Grade
                          ..................................................................{" "}
                          {diamond.valuationReport.cut}
                        </Typography>
                        <Typography></Typography>
                      </div>
                    </Box>
                  </Grid>
                  <Grid item md={5}>
                    <Box display="flex" justifyContent="center" alignItems="center" sx={{ flexDirection: "column" }}>
                      <Box>
                        <img
                          src={diamond.valuationReport.proportion}
                          style={{ width: "100%" }}
                        ></img>
                      </Box>
                      <Box>
                        <img
                          src={diamond.valuationReport.characteristic}
                          style={{ width: "100%" }}
                        ></img>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              <Typography sx={{ fontSize: "0.9em" }}>
                *Gemological findings may vary if the same gemstones are
                evaluated un-mounted
              </Typography>
              <div style={{ display: "flex", marginTop: "15px" }}>
                <Typography
                  sx={{
                    fontSize: "1em",
                    fontWeight: "bold",
                    textDecoration: "underline",
                  }}
                >
                  Estimated Retail Replacement Value
                </Typography>
                <Typography sx={{ fontSize: "1em", fontWeight: "bold" }}>
                  ......................................................... $
                  {diamond.valuationReport.finalPrice}
                </Typography>
              </div>
              <Box sx={{ justifyContent: "left", mt: "15px", mb: "15px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Typography sx={{ paddingLeft: "10%", fontSize: "0.9em" }}>
                    02018-All Rights Reserved
                  </Typography>
                  <Typography sx={{ paddingLeft: "6%" }}>
                    GA-GemSecure Jewelry Appraisale
                  </Typography>
                  <Typography sx={{ paddingLeft: "2%" }}>
                    This appraisal is only valid including all 4 pages
                  </Typography>
                </div>
              </Box>
            </Box>
          </Box>
        
      </DialogContent>
    </Dialog>
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
          <Grid item xl={12} lg={12}>
                <TableContainer sx={{ borderRadius: 3}} component={Paper}>
                <CardHeader
                  title='MANAGE REPORTS'
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
                      <TableCell sx={{ fontSize: 20, width: 200, color: '#69CEE2' }}>Customer Name</TableCell>
                      <TableCell sx={{ fontSize: 20, width: 200, color: '#69CEE2' }} align="center">Status</TableCell>
                      <TableCell sx={{ fontSize: 20, width: 200, color: '#69CEE2' }} align="center">Receiving Date</TableCell>
                      <TableCell sx={{ width: 100 }}></TableCell>
                    </TableRow>
                
                  {requests.map((request) => (
                    <Fragment key={request.id}>
                      <TableRow>
                        <TableCell align="center">{formatRequestId(request.id)}</TableCell>
                        <TableCell>{request.customer.last_name} {request.customer.first_name}</TableCell>
                        <TableCell align="center">
                          <Chip
                            label={request.status}
                            color={renderStatus(request.status)}
                          ></Chip>
                        </TableCell>
                        <TableCell align="center">
                          <Chip color="primary" size="small" label={moment(request.receivingDate).format("yyyy-MM-DD hh:mm A")}>
                          </Chip>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            sx={{ backgroundColor: "#69CEE2" }}
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
                          style={{ padding: 0 }}
                          colSpan={6}
                        >
                        <Collapse in={open[request.id]} sx={{ backgroundColor: "#F0F0F0" }}>
                          <List disablePadding >
                            <Box>
                              <ListItem sx={{ borderBottom: 1, borderColor: "#c7ced9" }}>
                                <Grid container>
                                  <Grid item lg={6} xl={6}>
                                    <Typography variant="h6" sx={{ textAlign: 'center' }}>Sample ID</Typography>
                                  </Grid>
                                  <Grid item lg={6} xl={6}>
                                    
                                  </Grid>
                                </Grid>
                                <ListItemText />
                              </ListItem>
                              {request.valuationRequestDetailList.map((sample) => (
                                <ListItem key={sample.id} sx={{ borderBottom: 1, borderColor: "#c7ced9" }}>
                                  <Grid container>
                                    <Grid item lg={6} xl={6}>
                                      <ListItemText primary={formatSampleId(sample.id)} sx={{ textAlign: 'center' }} />
                                    </Grid>
                                    
                                    <Grid item lg={6} xl={6} sx={{ textAlign: 'center' }} >
                                    {renderReportLink(sample)} 
                                    </Grid>
                                  </Grid>
                                </ListItem>

                              ))}

                            </Box>
                          </List>
                        </Collapse>
                        </TableCell>
                      </TableRow>
                    </Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xl={12} lg={12}>
            {selectedDiamond && renderDiamondReport(selectedDiamond)}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ConsultingStaff_Report;
