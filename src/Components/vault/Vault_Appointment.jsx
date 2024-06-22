import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TableContainer,
  TableHead,
  Table,
  TableBody,
  Paper,
  TableRow,
  TableCell,
  Link,
} from "@mui/material";
import { vault_navigator } from "../staff/Naviate";
import StaffDrawer from "../staff/StaffDrawer";
import WelcomeImg from "../../assets/welcome_Img.png";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import axios from "axios";
import moment from "moment";
import { formatRequestId } from "../../Foramat";

const Vault = () => {
  const customerId = sessionStorage.getItem("customerId");
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getRequests();
  }, []);

  const getRequests = () => {
    try {
      axios
        .get("http://dvs-backend-production.up.railway.app/api/customers/request/" + customerId)
        .then((resp) => setRequests(resp.data));
    } catch (err) {
      console.log(err);
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
        // overflow: "hidden",
      }}
    >
      <StaffDrawer
        mylist={["Home", "Appointments", "Price Alert", "Report", "Sign Out"]}
        state="Appointments"
        handleClick={vault_navigator}
      />
      <Box
        sx={{
          p: 3,
          flexGrow: 1,
          justifyContent: "center",
          transition: "margin 0.3s ease",
          width: "100%",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{ width: { xs: "100%", sm: `calc(70%)` } }}
        >
          <Table
            sx={{
              minWidth: 450,
              height: "auto",
              overflow: "visible",
              borderRadius: 10,
            }}
          >
            <TableHead sx={{ backgroundColor: "#30D5C8" }}>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Request ID</TableCell>
                <TableCell>Serivce</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Appointment Date</TableCell>
                <TableCell>Receive Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((row) => (
                <TableRow key={row.id}>
                  <TableCell
                    sx={{
                      borderBottom: "none",
                      paddingLeft: "30px",
                      width: "10%",
                    }}
                  >
                    <CalendarMonthIcon
                      sx={{
                        color: "#4CE6DA",
                        fontSize: 60,
                        borderBottom: "none",
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none" }}>{formatRequestId(row.id)}</TableCell>
                  <TableCell sx={{ borderBottom: "none" }}>
                    {row.service.duration}h
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none" }}>
                    {row.status}
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none" }}>
                    {moment(row.appointmentDate).format("yyyy-MM-DD hh:mm a")}
                  </TableCell>
                  <TableCell sx={{ borderBottom: "none" }}>{row.receivingDate === null ? "N/A" : moment(row.receivingDate).format("yyyy-MM-DD hh:mm a")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Vault;
