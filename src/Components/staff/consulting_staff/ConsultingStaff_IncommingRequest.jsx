import React, { useEffect, useState } from "react";
import StaffDrawer from "../StaffDrawer";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { consulting_staff_navigator } from "../Naviate";
import axios from "axios";
import moment from "moment";
const ConsultingStaff_IncommingRequest = () => {
  const drawerWidth = 240;
  const [requests, setRequests] = useState([]);
  const staffId = 3;

  useEffect(() => {
    getAllWaitingRequests();
  });

  function getAllWaitingRequests() {
    axios
      .get("http://localhost:8080/api/request/waiting")
      .then((response) => setRequests(response.data))
      .catch((error) => console.log(error));
  }

  function acceptRequest(requestId){
    axios
    .put("http://localhost:8080/api/request/" + requestId + "/assign/" + staffId)
    .catch(err => console.log(err))
  }


  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <StaffDrawer
          mylist={[
            "Home",
            "Incomming Request",
            "Manage Request",
            "Report",
            "Form",
            "Sign Out",
          ]}
          state="Incomming Request"
          handleClick={consulting_staff_navigator}
        ></StaffDrawer>
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            marginTop: "5%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TableContainer component={Paper} sx={{ width: 1000 }}>
            <Table sx={{ minWidth: 700, borderRadius: 10 }}>
              <TableHead sx={{ backgroundColor: "#69CEE2" }}>
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
                  <TableRow>
                    <TableCell>{request.customer.first_name}</TableCell>
                    <TableCell>{request.service.duration}</TableCell>
                    <TableCell>{request.quantity}</TableCell>
                    <TableCell>
                      {moment(request.appointmentDate).format("Do, MMM")}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        sx={{ background: "#69CEE2", borderRadius: "8px" }}
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
    </div>
  );
};

export default ConsultingStaff_IncommingRequest;
