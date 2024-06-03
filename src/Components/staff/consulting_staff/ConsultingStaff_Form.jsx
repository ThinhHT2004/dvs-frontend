import React, { useState } from 'react';
import { consulting_staff_navigator } from '../Naviate';
import StaffDrawer from '../StaffDrawer';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
  Menu,
  MenuItem,
  Button,
  Grid,
} from '@mui/material';

const diamondData = [
  {
    idRequest: '#00001',
    name: 'hua tan thinh',
    phone: '0877962524',
    status: 'Completed',
    completeDate: '2023-12-31',
    diamonds: [
      {
        idDiamond: 'D001',
        carat_weight: 1.25,
      },
      {
        idDiamond: 'D002',
        carat_weight: 1.50,
      },
    ],
  },
  {
    idRequest: '#00002',
    status: 'Completed',
    name: 'hua tan thinh',
    phone: '0877962524',
    completeDate: '2023-12-31',
    diamonds: [
      {
        idDiamond: 'D003',
        carat_weight: 1.00,
      },
      {
        idDiamond: 'D004',
        carat_weight: 2.00,
      },
    ],
  },
];

const ConsultingStaff_Form = () => {
  const [open, setOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');

  const handleClickOpen = (event, request) => {
    setCurrentRequest(request);
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (option) => {
    setSelectedOption(option);
    setOpen(true);
    handleMenuClose();
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentRequest(null);
    setSelectedOption('');
  };

  return (
    <Box display="flex">
      <Box>
        <StaffDrawer
          mylist={[
            'Home',
            'Incomming Request',
            'Manage Request',
            'Report',
            'Form',
            'Sign Out',
          ]}
          state="Form"
          handleClick={consulting_staff_navigator}
        />
      </Box>
      <Grid container spacing={3} sx={{ p: 3 }}>
        <Grid item xs={12} md={8}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }}>
              <TableHead sx={{backgroundColor: "#69CEE2"}}>
                <TableRow>
                  <TableCell>ID Request</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {diamondData.map((request) => (
                  <TableRow key={request.idRequest}>
                    <TableCell>{request.idRequest}</TableCell>
                    <TableCell>{request.name}</TableCell>
                    <TableCell>{request.status}</TableCell>
                    <TableCell>
                      <Link href="#" onClick={(event) => handleClickOpen(event, request)}>
                        Create Form
                      </Link>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                      >
                        {['Receipt', 'Sealed', 'Committed', 'Handover'].map((option) => (
                          <MenuItem
                            key={option}
                            onClick={() => handleMenuItemClick(option)}
                          >
                            {option}
                          </MenuItem>
                        ))}
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12} md={4}>
          {open && (
            <Box
              sx={{border: "1px"}}
            >
              <Box>
                
                <TableContainer component={Paper} >
                  <Table 
                  sx={{ minWidth: 200}}>
                    <TableHead sx={{backgroundColor: "#69CEE2"}}>
                      {selectedOption} Form
                      <TableCell></TableCell>
                    </TableHead>
                    <TableBody>
                      <TableRow sx={{ '& td': { borderBottom: 'none' } }}>
                        <TableCell>Name:</TableCell>
                        <TableCell>{currentRequest?.name}</TableCell>
                      </TableRow>
                      <TableRow sx={{ '& td': { borderBottom: 'none' } }}>
                        <TableCell>Phone:</TableCell>
                        <TableCell>{currentRequest?.phone}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Table >
                    <TableBody>
                      {currentRequest?.diamonds.map((diamond) => (
                        <TableRow key={diamond.idDiamond} sx={{ '& td': { borderBottom: 'none' } }}>
                          <TableCell>ID Sample: {diamond.idDiamond}</TableCell>
                          <TableCell>Size: {diamond.carat_weight}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Button onClick={handleClose}>Create</Button>
                </TableContainer>
                
                
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConsultingStaff_Form;