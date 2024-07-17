import React, { useEffect, useState } from "react";
import {
  Box,
  TableContainer,
  Table,
  TableBody,
  Paper,
  TableRow,
  TableCell,
  Grid,
  CardHeader,
  Chip,
} from "@mui/material";
import { vault_navigator } from "../staff/Naviate";
import StaffDrawer from "../staff/StaffDrawer";
import moment from "moment";
import { formatRequestId } from "../../Foramat";
import protectedApi from "../../APIs/ProtectedApi";

const Vault = () => {
  const drawerWidth = 240;
  const customerId = sessionStorage.getItem("customerId");
  const [requests, setRequests] = useState([]);

  const renderRowStatus = (status) => {
    switch (status) {
      case "PROCESSING":
        return "warning";
        break;
      case "RECEIVED":
        return "info";
        break;
      case "ACCEPTED":
        return "success";
        break;
      case "COMPLETED":
        return "info";
        break;
      case "WAITING":
        return "primary";
        break;
      case "FINISHED":
        return "success";
        break;
      case "SEALED":
        return "error";
        break;
      default:
        return "default";
        break;
    }
  };
  useEffect(() => {
    getRequests();
  }, [requests]);

  const getRequests = () => {
    try {
      protectedApi.get("/customers/request/" + customerId).then((resp) => {
        setRequests(resp.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const nonFinishedRequests = requests.filter(
    (request) => request.status !== "FINISHED"
  );

  const finishedRequests = requests.filter(
    (request) => request.status === "FINISHED" 
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
      <StaffDrawer
        mylist={[
          "Vault",
          "Settings",
          "Calculate",
          "Check Certificates",
          "Diamonds Appraisal",
          "Sign Out",
        ]}
        state="Vault"
        handleClick={vault_navigator}
      />
      <Box
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Grid container>
          <Grid item lg={12} xl={12} md={12} sm={12} xs={12}>
            <TableContainer sx={{ borderRadius: 3 }} component={Paper}>
              <CardHeader
                title="REQUESTS"
                titleTypographyProps={{
                  variant: "h5",
                  color: "white",
                }}
                sx={{ backgroundColor: "#30D5C8" }}
              />
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{ fontSize: 20, width: 50, color: "#69CEE2" }}
                    >
                      Lab ID
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontSize: 20, width: 50, color: "#69CEE2" }}
                    >
                      Request ID
                    </TableCell>
                    <TableCell sx={{ fontSize: 20, width: 100, color: "#69CEE2" }}>
                      Service
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontSize: 20, width: 100, color: "#69CEE2" }}
                    >
                      Status
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontSize: 20, width: 100, color: "#69CEE2" }}
                    >
                      Appointment Date
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontSize: 20, width: 100, color: "#69CEE2" }}
                    >
                      Receive Date
                    </TableCell>
                  </TableRow>
                  {nonFinishedRequests.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell align="center">none</TableCell>
                      <TableCell align="center">
                        {formatRequestId(row.id)}
                      </TableCell>
                      <TableCell>{row.service.name}</TableCell>
                      <TableCell align="center">
                        <Chip
                          label={row.status}
                          color={renderRowStatus(row.status)}
                        />
                      </TableCell>
                      <TableCell align="center">
                        {moment(row.appointmentDate).format(
                          "yyyy-MM-DD hh:mm a"
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {row.receivingDate === null
                          ? "N/A"
                          : moment(row.receivingDate).format(
                            "yyyy-MM-DD hh:mm a"
                          )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {finishedRequests.map((row) =>
                    row.valuationRequestDetailList
                      .filter((detail) => detail.status == "APPROVED")
                      .map((detail) => (
                      <TableRow key={detail.valuationReport.labId}>
                        <TableCell align="center">{detail.valuationReport.labId}</TableCell>
                        <TableCell align="center">
                          {formatRequestId(row.id)} 
                        </TableCell>
                        <TableCell>{row.service.name}</TableCell>
                        <TableCell align="center">
                          <Chip
                            label={row.status}
                            color={renderRowStatus(row.status)}
                          />
                        </TableCell>
                        <TableCell align="center">
                          {moment(row.appointmentDate).format(
                            "yyyy-MM-DD hh:mm a"
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {row.receivingDate === null
                            ? "N/A"
                            : moment(row.receivingDate).format(
                              "yyyy-MM-DD hh:mm a"
                            )}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Vault;
