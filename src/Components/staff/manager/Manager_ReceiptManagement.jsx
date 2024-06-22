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
  const [staff1, setStaff1] = useState({firstName: ""});
  const [staff2, setStaff2] = useState({firstName: ""});
  const [staff3, setStaff3] = useState({firstName: ""});
  const [boxOpen, setBoxOpen] = useState(false);
  const [currentDiamond, setCurrentDiamond] = useState(null);
  const [currentrRequest, setCurrentRequest] = useState();
  const appraisers = [staff1, staff2, staff3];

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
          "https://dvs-backend-production.up.railway.app/api/assignment/assign/" + currentrRequest.id + "/"  + currentSample.id, staffList
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
    <Grid container spacing={0}>
      <Toaster position="top-center" richColors></Toaster>
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
          state="Receipt"
          handleClick={manager_navigator}
        />

        <Grid item xs={6}>
          <Box
            sx={{
              p: 3,

              display: "flex",
              justifyContent: "center",
            }}
          >
            <TableContainer component={Paper} sx={{ width: 800 }}>
              <Table sx={{ minWidth: 600, borderRadius: 10 }}>
                <TableHead sx={{ backgroundColor: "#30D5C8" }}>
                  <TableRow>
                    <TableCell>Request ID</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell align="center">Status</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <React.Fragment key={row.id}>
                      <TableRow>
                        <TableCell>{formatRequestId(row.id)}</TableCell>
                        <TableCell>{row.quantity}</TableCell>
                        <TableCell align="center">
                          <Chip
                            label={row.status}
                            color={renderStatus(row.status)}
                          ></Chip>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            aria-label="expand row"
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
                      <TableRow>
                        <TableCell
                          style={{ paddingBottom: 0, paddingTop: 0 }}
                          colSpan={6}
                        >
                          <Collapse
                            in={open[row.id]}
                            timeout="auto"
                            unmountOnExit
                          >
                            <TableContainer>
                              <Table size="small" aria-label="purchases">
                                <TableHead>
                                  <TableRow>
                                    <TableCell>Sample Id</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell></TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {row.valuationRequestDetailList.map(
                                    (diamondRow, diamondIndex) => (
                                      <TableRow
                                        key={diamondRow.id}
                                        sx={
                                          diamondIndex ===
                                          row.valuationRequestDetailList
                                            .length -
                                            1
                                            ? { borderBottom: 0 }
                                            : {}
                                        }
                                      >
                                        <TableCell>
                                          {formatSampleId(diamondRow.id)}
                                        </TableCell>
                                        <TableCell align="center">
                                          <Chip
                                            label={diamondRow.status}
                                            color={renderSampleStatus(
                                              diamondRow.status
                                            )}
                                            size="small"
                                          ></Chip>
                                        </TableCell>
                                        <TableCell>
                                          {displayLink(diamondRow, row)}
                                        </TableCell>
                                      </TableRow>
                                    )
                                  )}
                                </TableBody>
                              </Table>
                            </TableContainer>
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
          <Grid item xs={4}>
            <Box
              sx={{
                p: 3,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 400 }}>
                  <TableHead sx={{ backgroundColor: "#30D5C8" }}>
                    <TableRow>
                      <TableCell colSpan={2}>
                        Edit Appraiser - {currentDiamond.id}
                      </TableCell>
                    </TableRow>
                  </TableHead>
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
      </Box>
    </Grid>
  );
};

export default Manager_ReceiptManagement;
