import { Box, Paper, Table, TableCell, TableContainer, TableHead } from "@mui/material";
import React from "react";
import StaffDrawer from "../StaffDrawer";
import { consulting_staff_navigator } from "../Naviate";

const ConsultingStaff_ManageRequest = () => {
  const drawerWidth = 240;
  return (
    <div>
      <Box sx={{ display: "flex" }}>
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
            state="Manage Request"
            handleClick={consulting_staff_navigator}
          ></StaffDrawer>
        </Box>
        <Box sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            marginTop: "5%",
            display: "flex",
            justifyContent: "center",
          }}>
          <TableContainer component={Paper} sx={{ width: 1000 }}>
            <Table sx={{ minWidth: 700, borderRadius: 10 }}>
              <TableHead sx={{ backgroundColor: "#69CEE2" }}>
                <TableCell>
                  Request ID
                </TableCell>
                <TableCell>
                  Customer Name
                </TableCell>
                <TableCell>
                  Service
                </TableCell>
                <TableCell>
                  Quantity
                </TableCell>
                <TableCell>
                  Appointment Date
                </TableCell>
                <TableCell></TableCell>
              </TableHead>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </div>
  );
};

export default ConsultingStaff_ManageRequest;
