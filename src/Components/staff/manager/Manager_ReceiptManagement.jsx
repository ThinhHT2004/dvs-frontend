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
} from "@mui/material";
import { manager_navigator } from "../Naviate";
import StaffDrawer from "../StaffDrawer";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from "axios";

const Manager_ReceiptManagement = () => {
  const [open, setOpen] = useState({});
  const [rows, setRows] = useState([]);
  const [appraiserList, setAppraiserList] = useState(() => getAppraisers());
  const [staff1, setStaff1] = useState();
  const [staff2, setStaff2] = useState();
  const [staff3, setStaff3] = useState();

  useEffect(() => {
    getProcessingRequest();
  }, []);

  function getProcessingRequest() {
    axios
      .get(
        "http://localhost:8080/api/request/valuation-request/status/PROCESSING"
      )
      .then((resp) => setRows(resp.data))
      .catch((err) => console.log(err));
  }

  function getAppraisers() {
    axios
      .get("http://localhost:8080/api/staff/valuation-staffs")
      .then((resp) => setAppraiserList(resp.data))
      .catch((err) => console.log(err));
  }

  const [boxOpen, setBoxOpen] = useState(false);
  const [currentDiamond, setCurrentDiamond] = useState(null);
  const appraisers = [staff1, staff2, staff3];

  const handleToggle = (id) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [id]: !prevOpen[id],
    }));
  };

  console.log(appraisers);

  const handleBoxOpen = (diamond) => {
    setCurrentDiamond(diamond);
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
    axios
      .put(
        "http://localhost:8080/api/assignment/assign/" + currentSample.id,
        staffList
      )
      .then((resp) => {
        handleBoxClose();
        console.log(resp.data);
      })
      .catch((err) => console.log(err));
  };

  function displayLink(sample) {
    if (sample.status === "FILLED") {
      return (
        <Link
          href="#"
          sx={{
            color: "#69CEE2",
            paddingLeft: "16px",
          }}
          underline="none"
          onClick={() => handleBoxOpen(sample)}
        >
          Edit
        </Link>
      );
    } else {
      return (
        <Link
          component="button"
          href="#"
          sx={{
            color: "grey",
            paddingLeft: "16px",
          }}
          underline="none"
          onClick={() => handleBoxOpen(sample)}
          disabled
        >
          Edit
        </Link>
      );
    }
  }

  return (
    <Grid container spacing={0}>
      <StaffDrawer
        mylist={[
          "Home",
          "Pending Request",
          "Receipt Management",
          "Report Management",
          "Sign Out",
        ]}
        state="Receipt Management"
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
              <TableHead sx={{ backgroundColor: "#69CEE2" }}>
                <TableRow>
                  <TableCell>Request ID</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <React.Fragment key={row.id}>
                    <TableRow>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.quantity}</TableCell>
                      <TableCell>{row.status}</TableCell>
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
                          <Box sx={{ margin: 0 }}>
                            <Table size="small" aria-label="purchases">
                              <TableBody>
                                {row.valuationRequestDetailList.map(
                                  (diamondRow, diamondIndex) => (
                                    <TableRow
                                      key={diamondRow.id}
                                      sx={
                                        diamondIndex ===
                                        row.valuationRequestDetailList.length -
                                          1
                                          ? { borderBottom: 0 }
                                          : {}
                                      }
                                    >
                                      <TableCell>{diamondRow.id}</TableCell>
                                      <TableCell>{diamondRow.status}</TableCell>
                                      <TableCell>
                                        {displayLink(diamondRow)}
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
                <TableHead sx={{ backgroundColor: "#69CEE2" }}>
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
                      >
                        Save
                      </Button>
                      <Button
                        onClick={handleBoxClose}
                        variant="outlined"
                        sx={{ marginLeft: 1, borderColor: "red", color: "red" }}
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
  );
};

export default Manager_ReceiptManagement;
