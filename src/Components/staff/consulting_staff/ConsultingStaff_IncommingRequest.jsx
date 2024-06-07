import React, { useEffect, useState } from "react";
import StaffDrawer from "../StaffDrawer";
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { consulting_staff_navigator } from "../Naviate";
import axios from "axios";
import moment from "moment";
const ConsultingStaff_IncommingRequest = () => {
  const [requests, setRequests] = useState([]);
  const [newRequestCount, setNewRequestCount] = useState(0);
  const staffId = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      getAllWaitingRequests();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getAllWaitingRequests = () => {
    axios
      .get("http://localhost:8080/api/request/waiting")
      .then((response) => {
        if (response.data.length > requests.length) {
          setNewRequestCount(response.data.length - requests.length);
        }
        setRequests(response.data);
      })
      .catch((error) => console.log(error));
  };

  const acceptRequest = (requestId) => {
    axios
      .put(
        "http://localhost:8080/api/request/" + requestId + "/assign/" + staffId
      )
      .then(() => {
        setRequests((prevRequests) =>
          prevRequests.filter((req) => req.id !== requestId)
        );
        setNewRequestCount((prevCount) => Math.max(prevCount - 1, 0));
      })
      .catch((err) => console.log(err));
  };

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
          state="Incomming Request"
          handleClick={consulting_staff_navigator}
          badgeCount={newRequestCount}
        />
      </Box>
      <Box sx={{
          flexGrow: 1,
          p: 3,
          marginTop: "5%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <TableContainer component={Paper} sx={{ width: "100%" }}>
          <Table sx={{ minWidth: 300, borderRadius: 10 }}>
            <TableHead sx={{ backgroundColor: "#30D5C8" }}>
              <TableRow>
                <TableCell>Customer Name</TableCell>
                <TableCell>Service</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Appointment Date</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>{request.customer.first_name}</TableCell>
                  <TableCell>{request.service.duration}</TableCell>
                  <TableCell>{request.quantity}</TableCell>
                  <TableCell>
                    {moment(request.appointmentDate).format("Do, MMM")}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{ background: "#30D5C8", borderRadius: "8px" }}
                      onClick={() => acceptRequest(request.id)}
                    >
                      Accept
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ConsultingStaff_IncommingRequest;
