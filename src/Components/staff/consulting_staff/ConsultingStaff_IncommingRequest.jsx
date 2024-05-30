import React from "react";
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
const ConsultingStaff_IncommingRequest = () => {
  const drawerWidth = 240;

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
          handleClick = {consulting_staff_navigator}
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
                <TableRow>
                  <TableCell>Tran Duc Anh</TableCell>
                  <TableCell>3 hours</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>19th, May</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{ background: "#69CEE2", borderRadius: "8px" }}
                    >
                      Accept
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tran Duc Anh</TableCell>
                  <TableCell>3 hours</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>19th, May</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{ background: "#69CEE2", borderRadius: "8px" }}
                    >
                      Accept
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tran Duc Anh</TableCell>
                  <TableCell>3 hours</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>19th, May</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{ background: "#69CEE2", borderRadius: "8px" }}
                    >
                      Accept
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tran Duc Anh</TableCell>
                  <TableCell>3 hours</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>19th, May</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{ background: "#69CEE2", borderRadius: "8px" }}
                    >
                      Accept
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tran Duc Anh</TableCell>
                  <TableCell>3 hours</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>19th, May</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{ background: "#69CEE2", borderRadius: "8px" }}
                    >
                      Accept
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tran Duc Anh</TableCell>
                  <TableCell>3 hours</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>19th, May</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{ background: "#69CEE2", borderRadius: "8px" }}
                    >
                      Accept
                    </Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tran Duc Anh</TableCell>
                  <TableCell>3 hours</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>19th, May</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{ background: "#69CEE2", borderRadius: "8px" }}
                    >
                      Accept
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </div>
  );
};

export default ConsultingStaff_IncommingRequest;
