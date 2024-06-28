import React, { useEffect, useState } from "react";
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
  Chip,
  CardHeader,
  ListItem,
  ListItemText,
  List,
} from "@mui/material";
import { manager_navigator } from "../Naviate";
import StaffDrawer from "../StaffDrawer";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from "axios";
import { formatRequestId, formatSampleId } from "../../../Foramat";
import { flushSync } from "react-dom";
import { Toaster, toast } from "sonner";

const Manager_ReceiptManagement = () => {
  const [open, setOpen] = useState({});
  const [rows, setRows] = useState([]);
  const [appraiserList, setAppraiserList] = useState(() => getAppraisers());
  const [staff1, setStaff1] = useState({ firstName: "" });
  const [staff2, setStaff2] = useState({ firstName: "" });
  const [staff3, setStaff3] = useState({ firstName: "" });
  const [boxOpen, setBoxOpen] = useState(false);
  const [currentDiamond, setCurrentDiamond] = useState(null);
  const [currentrRequest, setCurrentRequest] = useState();
  const appraisers = [staff1, staff2, staff3];
  const drawerWidth = 240;
  useEffect(() => {
    getProcessingRequest();
  }, []);

  function checkFullFilled() {
    let check = true;
    if (staff1 === undefined) check = false;
    if (staff2 === undefined) check = false;
    if (staff3 === undefined) check = false;

    return check;
  }

  function checkDuplicate() {
    if (
      staff1.id === staff2.id ||
      staff1.id === staff3.id ||
      staff2.id === staff3.id ||
      staff1.id == staff3.id
    )
      return true;
    else return false;
  }

  function getProcessingRequest() {
    axios
      .get(
        "https://dvs-backend-production.up.railway.app/api/request/valuation-request/status/PROCESSING"
      )
      .then((resp) => setRows(resp.data))
      .catch((err) => console.log(err));
  }

  function getAppraisers() {
    axios
      .get("https://dvs-backend-production.up.railway.app/api/staff/valuation-staffs")
      .then((resp) => setAppraiserList(resp.data))
      .catch((err) => console.log(err));
  }

  const handleToggle = (id) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [id]: !prevOpen[id],
    }));
  };

  console.log(currentrRequest);

  const handleBoxOpen = (diamond, request) => {
    setCurrentDiamond(diamond);
    setCurrentRequest(request);
    setBoxOpen(true);
  };

  const handleBoxClose = () => {
    setBoxOpen(false);
    setCurrentDiamond(null);
    setStaff1(undefined);
    setStaff2(undefined);
    setStaff3(undefined);
  };

  const handleSave = (currentSample, staffList) => {
    if (checkDuplicate()) {
      toast.error("The Staff is duplicated");
    } else {
      axios
        .put(
          "https://dvs-backend-production.up.railway.app/api/assignment/assign/" + currentrRequest.id + "/" + currentSample.id, staffList
        )
        .then((resp) => {
          console.log(resp.data);
          getProcessingRequest();
          handleBoxClose();
        })
        .catch((err) => console.log(err));
    }
  };

  function displayLink(sample, request) {
    if (sample.status === "FILLED") {
      return (
        <Button>
          <Link
            href="#"
            sx={{
              color: "#69CEE2",
            }}
            underline="none"
            onClick={() => handleBoxOpen(sample, request)}
          >
            Assign
          </Link>
        </Button>
      );
    } else {
      return (
        <Button>
          <Link
            href="#"
            sx={{
              color: "grey",
            }}
            underline="none"
            onClick={() => handleBoxOpen(sample, request)}
            disabled
          >
            Assign
          </Link>
        </Button>
      );
    }
  }

  const renderStatus = (status) => {
    switch (status) {
      case "PROCESSING":
        return "warning";
        break;
    }
  };

  const renderSampleStatus = (status) => {
    switch (status) {
      case "ASSIGNED":
        return "success";
      case "FILLING":
        return "primary";
      case "FILLED":
        return "primary";
      case "APPROVED":
        return "success"
    }
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
      <Toaster position="top-center" richColors></Toaster>
      <StaffDrawer
        mylist={["Home", "Pending Request", "Receipt", "Report", "Sign Out"]}
        state="Receipt"
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
          <Grid item xl={8} lg={8}>
            <Box>
              <TableContainer sx={{ borderRadius: 3, backgroundColor: "#F0F0F0" }} component={Paper}>
                <CardHeader
                  title='MANAGE RECEIPTS'
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
                      <TableCell sx={{ fontSize: 20, width: 250, color: '#69CEE2' }}>Customer Name</TableCell>
                      <TableCell sx={{ fontSize: 20, width: 150, color: '#69CEE2' }} align="center">Quantity</TableCell>
                      <TableCell sx={{ fontSize: 20, width: 150, color: '#69CEE2' }} align="center">Status</TableCell>
                      <TableCell sx={{ width: 100 }}></TableCell>
                    </TableRow>
                    {rows.map((row) => (
                      <React.Fragment key={row.id}>
                        <TableRow sx={{ backgroundColor: "white" }}>
                          <TableCell align="center">{formatRequestId(row.id)}</TableCell>
                          <TableCell>{row.customer.last_name} {row.customer.first_name}</TableCell>
                          <TableCell align="center">{row.quantity}</TableCell>
                          <TableCell align="center">
                            <Chip
                              label={row.status}
                              color={renderStatus(row.status)}
                            ></Chip>
                          </TableCell>
                          <TableCell>
                            <IconButton
                              sx={{ backgroundColor: "#69CEE2" }}
                              size="small"
                              onClick={() => handleToggle(row.id)}
                            >
                              {open[row.id] ? (
                                <KeyboardArrowUpIcon />
                              ) : (
                                <KeyboardArrowDownIcon />
                              )}
                            </IconButton>
                          </TableCell>
                        </TableRow>
                        <TableRow sx={{ border: 0 }}>
                          <TableCell
                            style={{ padding: 0, border: 0 }} colSpan={6}
                          >
                            <Collapse
                              in={open[row.id]}
                              timeout="auto"
                              unmountOnExit
                            >
                              <List disablePadding >
                              <Box>
                                <ListItem sx={{ borderBottom: 1, borderColor: "#c7ced9" }}>
                                  <Grid container>
                                    <Grid item lg={4} xl={4}>
                                      <Typography variant="h6" sx={{ textAlign: 'center' }}>Sample ID</Typography>
                                    </Grid>
                                    <Grid item lg={4} xl={4}>
                                      <Typography variant="h6" sx={{ textAlign: 'center' }}>Status</Typography>
                                    </Grid>
                                  </Grid>
                                  <ListItemText />
                                </ListItem>
                                    {row.valuationRequestDetailList.map(
                                      (diamondRow) => (
                                        <ListItem key={diamondRow.id}>
                                          <Grid container>
                                            <Grid item lg={4} xl={4}>
                                              <ListItemText primary={formatRequestId(diamondRow.id)} />
                                            </Grid>
                                            <Grid item lg={4} xl={4}>
                                              <ListItemText sx={{ textAlign: 'center' }}>
                                                <Chip
                                                  label={diamondRow.status}
                                                  color={renderSampleStatus(diamondRow.status)}
                                                  size="small"
                                                ></Chip>
                                              </ListItemText>
                                            </Grid>
                                            <Grid item lg={4} xl={4}>
                                              <ListItemText primary={displayLink(diamondRow, row)} sx={{ textAlign: 'center' }} />
                                            </Grid>
                                          </Grid>
                                        </ListItem>
                                     
                                    )
                                  )}
                                  
                              </Box>
                              </List>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
          {boxOpen && currentDiamond && (
            <Grid item xl={4} lg={4}>
              <Box
              >
                <TableContainer component={Paper} sx={{borderRadius:3}}>
              <CardHeader
                    title={`Edit Appraiser - ${formatRequestId(currentDiamond.id)}`}
                    titleTypographyProps={{ variant: 'h5', color: 'white' }}
                    sx={{ backgroundColor: "#30D5C8"}}
                  />
                  <Table >
                    <TableBody>
                      <TableRow sx={{ "& td": { borderBottom: "none" } }}>
                        <TableCell>
                          <FormControl fullWidth margin="normal">
                            <InputLabel id="demo-simple-select-label">
                              Appraiser 1
                            </InputLabel>
                            <Select
                              defaultValue=""
                              labelId="demo-simple-select-label"
                              value={staff1?.firstName ?? ""}
                              onChange={(event) => {
                                setStaff1(event.target.value);
                              }}
                              label="Appraiser 1"
                              renderValue={(selected) => {
                                if (selected === "") {
                                  return (
                                    <em
                                      style={{
                                        color: "#989898",
                                        fontStyle: "normal",
                                      }}
                                    >
                                      Appraiser 1
                                    </em>
                                  );
                                }
                                return appraisers.find(
                                  (option) => option.firstName === selected
                                )?.firstName;
                              }}
                            >
                              {appraiserList.map((appraiser) => (
                                <MenuItem key={appraiser.id} value={appraiser}>
                                  {appraiser.firstName}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </TableCell>
                      </TableRow>
                      <TableRow sx={{ "& td": { borderBottom: "none" } }}>
                        <TableCell>
                          <FormControl fullWidth margin="normal">
                            <InputLabel id="demo-simple-select-label">
                              Appraiser 2
                            </InputLabel>
                            <Select
                              defaultValue=""
                              labelId="demo-simple-select-label"
                              value={staff2?.firstName ?? ""}
                              onChange={(event) => {
                                setStaff2(event.target.value);
                              }}
                              label="Appraiser 2"
                              renderValue={(selected) => {
                                if (selected === "") {
                                  return (
                                    <em
                                      style={{
                                        color: "#989898",
                                        fontStyle: "normal",
                                      }}
                                    >
                                      Appraiser 2
                                    </em>
                                  );
                                }
                                return appraisers.find(
                                  (option) => option.firstName === selected
                                )?.firstName;
                              }}
                            >
                              {appraiserList.map((appraiser) => (
                                <MenuItem key={appraiser.id} value={appraiser}>
                                  {appraiser.firstName}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </TableCell>
                      </TableRow>
                      <TableRow sx={{ "& td": { borderBottom: "none" } }}>
                        <TableCell>
                          <FormControl fullWidth margin="normal">
                            <InputLabel id="demo-simple-select-label">
                              Appraiser 3
                            </InputLabel>
                            <Select
                              defaultValue=""
                              labelId="demo-simple-select-label"
                              value={staff3?.firstName ?? ""}
                              onChange={(event) => {
                                setStaff3(event.target.value);
                              }}
                              label="Appraiser 3"
                              renderValue={(selected) => {
                                if (selected === "") {
                                  return (
                                    <em
                                      style={{
                                        color: "#989898",
                                        fontStyle: "normal",
                                      }}
                                    >
                                      Appraiser 3
                                    </em>
                                  );
                                }
                                return appraisers.find(
                                  (option) => option.firstName === selected
                                )?.firstName;
                              }}
                            >
                              {appraiserList.map((appraiser) => (
                                <MenuItem key={appraiser.id} value={appraiser}>
                                  {appraiser.firstName}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          colSpan={2}
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginTop: 2,
                          }}
                        >
                          <Button
                            onClick={() => handleSave(currentDiamond, appraisers)}
                            sx={{ backgroundColor: "#69CEE2" }}
                            variant="contained"
                            disabled={!checkFullFilled()}
                          >
                            Save
                          </Button>
                          <Button
                            onClick={handleBoxClose}
                            variant="outlined"
                            sx={{
                              marginLeft: 1,
                              borderColor: "red",
                              color: "red",
                            }}
                          >
                            Cancel
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Grid>


          )}
        </Grid>
      </Box>
    </Box>

  );
};

export default Manager_ReceiptManagement;
