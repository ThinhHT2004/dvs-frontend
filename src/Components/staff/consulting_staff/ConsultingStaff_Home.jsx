import React, { useEffect } from "react";
import StaffDrawer from "../StaffDrawer";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CardHeader,
  Link,
  Chip,
} from "@mui/material";
import { consulting_staff_navigator } from "../Naviate";
import WelcomeImg from "../../../assets/welcome_Img.png"
import { useRequests } from "./RequestContext";
import moment from "moment";
import { formatRequestId} from "../../../Foramat";
const ConsultingStaff_Home = () => {
  const { waitingRequests , getAllWaitingRequests} = useRequests([]);
  const { acceptedRequests , getAllAcceptedRequests} = useRequests([]);
  const drawerWidth = 240;
  useEffect(() => {
    getAllWaitingRequests();
    getAllAcceptedRequests();
  }, []);
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
      case "SEALED":
        return "error";
        break;
      case "COMMITTED":
        return "error";
        break;
      case "FINISHED":
        return "success";
        break;
    }
  };


  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "row", backgroundColor: "#FAF6EF", width: "100%", minHeight: "100vh" }}>
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
            state="Home" handleClick={consulting_staff_navigator}
          ></StaffDrawer>
        </Box>
        <Box sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}>
          <Grid container spacing={5} >
            <Grid item lg={6} xl={6} md={6} sm={6} xs={6}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h4">Welcome <span style={{ color: "#69CEE2" }}>Hua Tan Thinh</span></Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <img src={WelcomeImg} alt="" style={{ width: '230px', height: '172px' }} />
                  </Box>
                </CardContent>
              </Card>
              <TableContainer  sx={{ borderRadius: 3 , marginTop: 5}} component={Paper}>
                <CardHeader
                title="REQUEST MANAGEMENT"
                titleTypographyProps={{ variant: 'h6', color: 'white'}}
                sx={{ backgroundColor: "#30D5C8"}}
                />
                <Table>   
                  <TableBody>
                    {acceptedRequests?.slice(0, 5).map((request) => (
                      <TableRow key={request.id}>
                        <TableCell sx={{ fontSize: 15 }}>{formatRequestId(request.id)}</TableCell>
                        <TableCell sx={{ fontSize: 15 }}>{request.service.name}</TableCell>
                        <TableCell sx={{ fontSize: 15, textAlign: 'center' }}>{request.quantity}</TableCell>
                        <TableCell sx={{ fontSize: 15, textAlign: 'center' }}>
                        <Chip label={request.status} color={renderRowStatus(request.status)}></Chip>
                        </TableCell>

                      </TableRow>
                    ))}
                    <TableRow>
                    <TableCell>
                        <Typography sx={{  color: "#989898", display: 'flex', justifyContent: 'flex-start'}}>Showing {Math.min(acceptedRequests.length, 5)} of {acceptedRequests.length}</Typography>
                      </TableCell>
                    <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell>
                        
                        <Link href="/consulting-staff/request" underline="hover" sx={{color: '#69CEE2', display: 'flex', justifyContent: 'flex-end', textDecoration: 'underline'}}>See more</Link>
                      </TableCell>
                     
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item lg={6} xl={6}>
              <TableContainer  sx={{ borderRadius: 3 }} component={Paper}>
              <CardHeader
                title="INCOMING REQUEST"
                titleTypographyProps={{ variant: 'h6', color: 'white'}}
                sx={{ backgroundColor: "#30D5C8"}}
                />
                <Table>
                  <TableBody>
                    {waitingRequests?.slice(0, 5).map((request) => (
                      <TableRow key={request.id}>
                        <TableCell sx={{ fontSize: 15 }}>{request.customer.last_name} {request.customer.first_name}</TableCell>
                        <TableCell sx={{ fontSize: 15 }}>{request.service.name}</TableCell>
                        <TableCell sx={{ fontSize: 15, textAlign: 'center' }}>{request.quantity}</TableCell>
                        <TableCell sx={{ fontSize: 15, textAlign: 'center' }}> 
                          <Chip color="primary" size="small" label={moment(request.appointmentDate).format("yyyy-MM-DD hh:mm A")}>
                          </Chip>
                        </TableCell>

                      </TableRow>
                    ))}
                    <TableRow>
                    <TableCell>
                        <Typography sx={{  color: "#989898", display: 'flex', justifyContent: 'flex-start'}}>Showing {Math.min(waitingRequests.length, 5)} of {waitingRequests.length}</Typography>
                      </TableCell>
                    <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell>
                        
                        <Link href="/consulting-staff/incomming-request" underline="hover" sx={{color: '#69CEE2', display: 'flex', justifyContent: 'flex-end', textDecoration: 'underline'}}>See more</Link>
                      </TableCell>
                     
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default ConsultingStaff_Home;
