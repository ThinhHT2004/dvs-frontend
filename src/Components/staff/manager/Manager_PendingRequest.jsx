import React, { useState } from 'react';
import {
  Box,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { manager_navigator } from '../Naviate';
import StaffDrawer from '../StaffDrawer';
const initRequestList = [
  { id: '#00001', name: 'Hua Tan Thinh', date: '13/6/2024', status: 'Commitment' },
  { id: '#00002', name: 'Hua Tan Thinh', date: '13/6/2024', status: 'Commitment' },
  { id: '#00003', name: 'Hua Tan Thinh', date: '13/6/2024', status: 'Sealed' },
  { id: '#00004', name: 'Hua Tan Thinh', date: '13/6/2024', status: 'Sealed' }
];



const Manager_PendingRequest = () => {
  const [data, setData] = useState(initRequestList);
  const drawerWidth = 240;

  const handleAction = (id) => {
    setData(prevData => prevData.filter(row => row.id !== id));
  };

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <StaffDrawer
          mylist={[
            "Home",
            "Pending Request",
            "Receipt Management",
            "Report Management",
            "Sign Out",
          ]}
          state="Pending Request"
          handleClick={manager_navigator}
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
                  <TableCell>Request ID</TableCell>
                  <TableCell>Customer</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell colSpan={3}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>
                      <Link href="#" sx={{ color: "#32D82E", paddingLeft: "16px" }} underline="none"
                        onClick={() => handleAction(row.id)}>Approve</Link>
                    </TableCell>
                    <TableCell>
                      <Link href="#" sx={{ color: "#F00", paddingLeft: "16px" }} underline="none"
                        onClick={() => handleAction(row.id)}>Decline</Link>
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

export default Manager_PendingRequest;
