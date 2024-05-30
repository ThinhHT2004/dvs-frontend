import React from "react";
import ManagerDrawer from "./ManagerDrawer";
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
  colors,
} from "@mui/material";

const Manager_PendingRequest = () => {
  const drawerWidth = 240;
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <ManagerDrawer
          mylist={[
            "Home",
            "Pending Request",
            "Receipt Management",
            "Report Management",
            "Chat",
            "Sign Out",
          ]}
          state="Pending Request"
        ></ManagerDrawer>
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
                  <TableCell colSpan={6} sx={{ color: 'white', fontSize: '25px' }}>Diamond Appraisal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {/* ROW 1 ---------------------------------------- */}

                <TableRow>
                  <TableCell>#00001</TableCell>
                  <TableCell>Hua Tan Thinh</TableCell>
                  <TableCell>13/6/2024</TableCell>
                  <TableCell>Commitment</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{ background: "#69CEE2", borderRadius: "8px" }}
                    >
                      Approve
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{ background: "#69CEE2", borderRadius: "8px" }}
                    >
                      Decline
                    </Button>
                  </TableCell>
                </TableRow>

                {/* ROW 2 ---------------------------------------- */}

                <TableRow>
                  <TableCell>#00002</TableCell>
                  <TableCell>Hua Tan Thinh</TableCell>
                  <TableCell>13/6/2024</TableCell>
                  <TableCell>Commitment</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{ background: "#69CEE2", borderRadius: "8px" }}
                    >
                      Approve
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{ background: "#69CEE2", borderRadius: "8px" }}
                    >
                      Decline
                    </Button>
                  </TableCell>
                </TableRow>
                {/* ROW 3 ---------------------------------------- */}

                <TableRow>
                  <TableCell>#00003</TableCell>
                  <TableCell>Hua Tan Thinh</TableCell>
                  <TableCell>13/6/2024</TableCell>
                  <TableCell>Sealed</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{ background: "#69CEE2", borderRadius: "8px" }}
                    >
                      Approve
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{ background: "#69CEE2", borderRadius: "8px" }}
                    >
                      Decline
                    </Button>
                  </TableCell>
                </TableRow>
                {/* ROW 4 ---------------------------------------- */}

                <TableRow>
                  <TableCell>#00004</TableCell>
                  <TableCell>Hua Tan Thinh</TableCell>
                  <TableCell>13/6/2024</TableCell>
                  <TableCell>Sealed</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{ background: "#69CEE2", borderRadius: "8px" }}
                    >
                      Approve
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{ background: "#69CEE2", borderRadius: "8px" }}
                    >
                      Decline
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

export default Manager_PendingRequest;
