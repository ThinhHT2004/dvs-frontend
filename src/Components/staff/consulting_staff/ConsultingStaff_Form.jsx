import React, { useEffect, useState } from "react";
import { consulting_staff_navigator } from "../Naviate";
import StaffDrawer from "../StaffDrawer";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
  Menu,
  MenuItem,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import axios from "axios";

const ConsultingStaff_Form = () => {
  const consultignStaffId = 3;
  const [open, setOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getAcceptedRquest();
  });

  function getAcceptedRquest() {
    axios
      .get(
        "http://localhost:8080/api/request/valuation-request/" +
          consultignStaffId +
          "/ACCEPTED"
      )
      .then((resp) => setRequests(resp.data))
      .catch((err) => console.log(err));
  }

  function createReceipt(requestDetailList, requestId) {
    axios
      .post(
        "http://localhost:8080/api/request/create-receipt/" + requestId,
        requestDetailList
      )
      .then((resp) => handleClose())
      .catch((err) => console.log(err));
  }

  const handleClickOpen = (event, request) => {
    setCurrentRequest(request);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (option) => {
    setSelectedOption(option);
    setOpen(true);
    handleMenuClose();
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentRequest(null);
    setSelectedOption("");
  };

  return (
    <Box display="flex">
      <Box>
        <StaffDrawer
          mylist={[
            "Home",
            "Incomming Request",
            "Manage Request",
            "Report",
            "Form",
            "Sign Out",
          ]}
          state="Form"
          handleClick={consulting_staff_navigator}
        />
      </Box>
      <Grid container spacing={3} sx={{ p: 3 }}>
        <Grid item xs={12} md={8}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }}>
              <TableHead sx={{ backgroundColor: "#69CEE2" }}>
                <TableRow>
                  <TableCell>ID Request</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>{request.id}</TableCell>
                    <TableCell>{request.customer.first_name}</TableCell>
                    <TableCell>{request.status}</TableCell>
                    <TableCell>
                      <Link
                        href="#"
                        onClick={(event) => handleClickOpen(event, request)}
                      >
                        Create Form
                      </Link>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                      >
                        {["Receipt", "Sealed", "Committed", "Handover"].map(
                          (option) => (
                            <MenuItem
                              key={option}
                              onClick={() => handleMenuItemClick(option)}
                            >
                              {option}
                            </MenuItem>
                          )
                        )}
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={4}>
          {open && (
            <Box sx={{ border: "1px" }}>
              <Box>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 200 }}>
                    <TableHead sx={{ backgroundColor: "#69CEE2" }}>
                      {selectedOption} Form
                      <TableCell></TableCell>
                    </TableHead>
                    <TableBody>
                      <TableRow sx={{ "& td": { borderBottom: "none" } }}>
                        <TableCell>Name:</TableCell>
                        <TableCell>
                          {currentRequest.customer.first_name}
                        </TableCell>
                      </TableRow>
                      <TableRow sx={{ "& td": { borderBottom: "none" } }}>
                        <TableCell>Phone:</TableCell>
                        <TableCell>
                          {currentRequest.customer.phoneNumber}
                        </TableCell>
                      </TableRow>
                      {currentRequest.valuationRequestDetailList.map(
                        (sample) => (
                          <TableRow
                            key={sample.id}
                            sx={{ "& td": { borderBottom: "none" } }}
                          >
                            <TableCell>ID Sample: {sample.id}</TableCell>
                            <TableCell sx={{ verticalAlign: "middle" }}>
                              <TextField
                                sx={{ width: 100, height: 32 }}
                                onChange={(e) => {
                                  sample.size = e.target.value;
                                }}
                                value={sample.size}
                                label="Size"
                              />
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                  <Button
                    onClick={() =>
                      createReceipt(
                        currentRequest.valuationRequestDetailList,
                        currentRequest.id
                      )
                    }
                  >
                    Create
                  </Button>
                </TableContainer>
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConsultingStaff_Form;
