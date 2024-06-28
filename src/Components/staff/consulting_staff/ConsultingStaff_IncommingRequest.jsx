import React, { useEffect, useState } from "react";
import StaffDrawer from "../StaffDrawer";
import {
  Box,
  Button,
  CardContent,
  CardHeader,
  Grid,
  Paper,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
} from "@mui/material";
import { consulting_staff_navigator } from "../Naviate";
import axios from "axios";
import moment from "moment";

import { useRequests } from "./RequestContext";


const ConsultingStaff_IncommingRequest = () => {
  const drawerWidth = 240;

 
  const { waitingRequests, getAllWaitingRequests } = useRequests();
  const acceptRequest = (requestId) => {
    axios
      .put(
        "https://dvs-backend-production.up.railway.app/api/request/" + requestId + "/assign/3"
      )
      .then(() => {
        getAllWaitingRequests();
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
         
        />
      </Box>
      <Box sx={{
          p: 3,
          display: "flex",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          flexDirection: "column",
          alignItems: "center",
        }}>
          <Grid container>
          <Grid item lg={12} xl={12} md={12} sm={12} xs={12}>
          <TableContainer sx={{borderRadius: 3}} component={Paper}>
          <CardHeader
                    title='INCOMMING REQUESTS'
                    titleTypographyProps={{
                      variant: 'h5',
                      color: 'white',
                    }}
                    sx={{ backgroundColor: '#30D5C8' }}
                  />
          <Table>
            <TableBody>
            <TableRow>
                <TableCell sx={{fontSize: 20, width: 250 , color: '#69CEE2'}}>Customer Name</TableCell>
                <TableCell sx={{fontSize: 20 , width: 250 , color: '#69CEE2'}}>Service</TableCell>
                <TableCell sx={{fontSize: 20, width: 150 , color: '#69CEE2'}} align="center">Quantity</TableCell>
                <TableCell sx={{fontSize: 20, width: 200 , color: '#69CEE2'}} align="center">Appointment Date</TableCell>
                <TableCell sx={{ width: 150 }} align="center"></TableCell>
              </TableRow>
              {waitingRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell sx={{fontSize: 15}}>{request.customer.last_name} {request.customer.first_name}</TableCell>
                  <TableCell sx={{fontSize: 15}}>{request.service.name}</TableCell>
                  <TableCell sx={{fontSize: 15, textAlign: 'center'}}>{request.quantity}</TableCell>
                  <TableCell sx={{fontSize: 15, textAlign: 'center'}}>
                  <Chip color="primary" size="small" label={moment(request.appointmentDate).format("yyyy-MM-DD hh:mm A")}>
                  </Chip>
                  </TableCell>
                  <TableCell sx={{fontSize: 15}}  align="center">
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
        </Grid>
        <Grid item lg={12} xl={12} md={12} sm={12} xs={12}></Grid>
         </Grid>
      </Box>
    </Box>
  );
};

export default ConsultingStaff_IncommingRequest;
