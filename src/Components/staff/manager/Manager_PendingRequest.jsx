import React, { useEffect, useState } from 'react';
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
  CardHeader,
  
} from "@mui/material";
import { manager_navigator } from '../Naviate';
import StaffDrawer from '../StaffDrawer';
import axios from 'axios';
import moment from 'moment';
import { formatValuationId } from '../../../Foramat';
const initRequestList = [
  { id: '#00001', name: 'Hua Tan Thinh', date: '13/6/2024', status: 'Commitment' },
  { id: '#00002', name: 'Hua Tan Thinh', date: '13/6/2024', status: 'Commitment' },
  { id: '#00003', name: 'Hua Tan Thinh', date: '13/6/2024', status: 'Sealed' },
  { id: '#00004', name: 'Hua Tan Thinh', date: '13/6/2024', status: 'Sealed' }
];



const Manager_PendingRequest = () => {
  const [data, setData] = useState(initRequestList);
  const [listForms, setListForms] = useState([]);
  const drawerWidth = 240;

  const handleAction = (id) => {
    setData(prevData => prevData.filter(row => row.id !== id));
  };

  function approveForm(id){
    try{
      axios.post("https://dvs-backend-production.up.railway.app/api/forms/approve/" + id)
      .then(resp => console.log(resp.data))
    }catch(err){
      console.log(err);
    }
  }

  function denyForm(id){
    try{
      axios.post("https://dvs-backend-production.up.railway.app/api/forms/deny/" + id)
      .then(resp => console.log(resp.data))
    }catch(err){
      console.log(err);
    }
  }

  useEffect( () => {
    getWaitingForms();
  }, [])
  
  function getWaitingForms(){
    try{
      axios
      .get("https://dvs-backend-production.up.railway.app/api/forms/waiting")
      .then(resp => setListForms(resp.data));
    }catch(err){
      console.log(err);
    }
  }

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
          "Home",
          "Pending Request",
          "Receipt",
          "Report",
          "Sign Out",
        ]}
        state="Pending Request"
        handleClick={manager_navigator}
      ></StaffDrawer>
      <Box
        sx={{
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{width: '100%'}}>
          <TableContainer sx={{ borderRadius: 3, backgroundColor: "#F0F0F0" }} component={Paper}>
            <CardHeader
              title='MANAGE REQUESTS'
              titleTypographyProps={{
                variant: 'h5',
                color: 'white',
              }}
              sx={{ backgroundColor: '#30D5C8' }}
            />
            <Table>
              <TableBody>
                <TableRow sx={{ backgroundColor: "white" }}>
                  <TableCell sx={{ fontSize: 20, width: 150, color: '#69CEE2' }} align="center">Request ID</TableCell>
                  <TableCell sx={{ fontSize: 20, width: 150, color: '#69CEE2' }} align="center">Date</TableCell>
                  <TableCell sx={{ fontSize: 20, width: 150, color: '#69CEE2' }} align="center">Status</TableCell>
                  <TableCell sx={{ fontSize: 20, width: 150, color: '#69CEE2' }} align="center">Type</TableCell>
                  <TableCell sx={{ width: 100 }}></TableCell>
                  <TableCell sx={{ width: 100 }}></TableCell>
                </TableRow>
                {listForms.map((row) => (
                  <TableRow key={row.id} sx={{ backgroundColor: "white" }}>
                    <TableCell align="center">{formatValuationId(row.valuationRequestId)}</TableCell>
                    <TableCell align="center">{moment(row.createdDate).format("yyyy-MM-dd")}</TableCell>
                    <TableCell align="center">{row.status}</TableCell>
                    <TableCell align="center">{row.formType}</TableCell>
                    <TableCell>
                      <Link href="#" sx={{ color: "#69CEE2"}} underline="none"
                        onClick={() => approveForm(row.id)}>Approve</Link>
                    </TableCell>
                    <TableCell>
                      <Link href="#" sx={{ color: "red"}} underline="none"
                        onClick={() => denyForm(row.id)}>Decline</Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default Manager_PendingRequest;
