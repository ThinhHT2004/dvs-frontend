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
import { useBadge } from "../BadgeContext";
const ConsultingStaff_IncommingRequest = () => {
  const [requests, setRequests] = useState([]);
  const [newRequestCount, setNewRequestCount] = useState(0);
  const staffId = 3;
  const drawerWidth = 240;
  const { badgeCounts, updateBadgeCount } = useBadge();
  useEffect(() => {
    
      getAllWaitingRequests();


    
  }, []);

  const getAllWaitingRequests = () => {
    axios
      .get("https://dvs-backend-production.up.railway.app/api/request/waiting")
      .then((response) => {
        if (response.data.length > requests.length) {
        
          updateBadgeCount("Incomming Request", response.data.length - requests.length);
        }
        setRequests(response.data);
      })
      .catch((error) => console.log(error));
  };

  const acceptRequest = (requestId) => {
    axios
      .put(
        "https://dvs-backend-production.up.railway.app/api/request/" + requestId + "/assign/" + staffId
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
    <Box sx={{ display: "flex", flexDirection: "row", backgroundColor: "#FAF6EF",width: "100%", minHeight: "100vh"}}>
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
          badgeCount={badgeCounts["Incomming Request"]}
        />
      </Box>
      <Box sx={{
          p: 3,
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
