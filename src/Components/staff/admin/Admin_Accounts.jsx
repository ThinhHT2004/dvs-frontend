import React, { Fragment, useEffect, useState } from "react";
import { admin_navigator } from "../Naviate";
import {
  Box,
  Button,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from "@mui/material";

import StaffDrawer from "../StaffDrawer";
import protectedApi from "../../../APIs/ProtectedApi";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Toaster, toast } from "sonner";

const Admin_Accounts = () => {
  const [staffs, setStaffs] = useState([]);
  const [editDiaLogOpen, setEditDiaLogOpen] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const roles = ["MANAGER", "CONSULTING_STAFF", "VALUATION_STAFF"];
  useEffect(() => {
    getStaffs();
  }, []);
  const getStaffs = async () => {
    try {
      const staffResp = await protectedApi.get("/staffs/");
      const staffData = staffResp.data;
      const staffWithRoles = await Promise.all(
        staffData.map(async (staff) => {
          const roleResp = await protectedApi.get(`/accounts/${staff.id}`);
          const roleData = roleResp.data;
          return { ...staff, role: roleData.role , active: roleData.active };
        })
      );
      const fillteredStaffs = staffWithRoles.filter(
        (staff) => staff.role !== "ADMIN"
      );
      setStaffs(fillteredStaffs);
    } catch (err) {
      console.error(err);
    }
  };
  const drawerWidth = 240;
  const handleViewEditClick = (staffData) => {
    setEditDiaLogOpen(true);
    setDialogData(staffData);
    console.log("View/Edit staff with id: ", staffData);
  };
  const handleDialogChange = (field, value) => {
    setDialogData({
      ...dialogData,
      [field]: value,
    });
  };
  const handleDialogClose = () => {
    setEditDiaLogOpen(false);
    setDialogData(null);
  };
  const handleUpdate = async () => {
    try {
        await protectedApi
        .put("/staffs/update", dialogData)
        .then(resp => {
            console.log(resp.data);
            toast.success("Update Successfully");
        })

      getStaffs();
      handleDialogClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDisable = async staff =>{
    try{
        await protectedApi
        .put("/accounts/disable/" + staff.id)
        .then(resp => toast.success(resp.data));
        getStaffs()
    }catch(err){
        console.log(err);
    }
  }

  const handleEnable = async staff =>{
    try{
        await protectedApi
        .put("/accounts/enable/" + staff.id)
        .then(resp => toast.success(resp.data));
        getStaffs();
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
        mylist={["Home", "Services", "Accounts", "Sign Out"]}
        state="Accounts"
        handleClick={admin_navigator}
      />
      <Toaster position="top-center" richColors></Toaster>

      <Box
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
          <CardHeader
            title="ACCOUNTS MANAGEMENT"
            titleTypographyProps={{ variant: "h5", color: "white" }}
            sx={{ backgroundColor: "#30D5C8" }}
          />
          <Table>
            <TableBody>
              <TableRow>
                <TableCell
                  sx={{ fontSize: 20, width: 150, color: "#69CEE2" }}
                  align="center"
                >
                  No
                </TableCell>
                <TableCell
                  sx={{ fontSize: 20, width: 200, color: "#69CEE2" }}
                  align="center"
                >
                  Role
                </TableCell>
                <TableCell sx={{ fontSize: 20, width: 300, color: "#69CEE2" }}>
                  Name
                </TableCell>
                <TableCell width={150}></TableCell>
                <TableCell width={150}></TableCell>
              </TableRow>
              {staffs.map((staff, index) => (
                <Fragment key={staff.id || index}>
                  <TableRow>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{staff.role}</TableCell>
                    <TableCell>
                      {staff.lastName} {staff.firstName}
                    </TableCell>
                    <TableCell align="center">
                      <Button onClick={() => handleViewEditClick(staff)}>
                        View & Edit
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      {staff.active === true ? (
                        <Button sx={{color: "red"}} onClick={() => handleDisable(staff)}>Disable</Button>
                      ) : (
                        <Button sx={{color: "green"}} onClick={() => handleEnable(staff)}>Enable</Button>
                      )}
                    </TableCell>
                  </TableRow>
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Dialog
        open={editDiaLogOpen}
        onClose={() => setEditDiaLogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <Box padding={1}>
            <Grid container spacing={2}>
              <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                <TextField
                  variant="standard"
                  label="First Name"
                  value={dialogData?.firstName}
                  fullWidth
                  required
                  onChange={(e) =>
                    handleDialogChange("firstName", e.target.value)
                  }
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                <TextField
                  variant="standard"
                  label="Last Name"
                  value={dialogData?.lastName}
                  fullWidth
                  required
                  onChange={(e) =>
                    handleDialogChange("lastName", e.target.value)
                  }
                />
              </Grid>
            </Grid>
          </Box>
          <Box padding={1}>
            <Grid container spacing={2}>
              <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                <TextField
                  variant="standard"
                  label="Email"
                  value={dialogData?.email}
                  fullWidth
                  required
                  onChange={(e) => handleDialogChange("email", e.target.value)}
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Role</InputLabel>
                  <Select
                    label="Role"
                    required
                    value={dialogData ? dialogData.role : ""}
                    onChange={(e) => handleDialogChange("role", e.target.value)}
                  >
                    {roles.map((role) => (
                      <MenuItem key={role} value={role}>
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <Box padding={1}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                inputFormat="dd/MM/yyyy"
                value={dialogData?.dob}
                onChange={(newValue) => {
                  handleDialogChange("dob", newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Day of Birth"
                    placeholder="Day of Birth"
                    fullWidth
                    required
                    variant="standard"
                  />
                )}
              ></DatePicker>
            </LocalizationProvider>
          </Box>
          <Box padding={1}>
            <TextField
              variant="standard"
              label="Address"
              value={dialogData?.address}
              fullWidth
              required
              onChange={(e) => handleDialogChange("address", e.target.value)}
            />
          </Box>
          <Box padding={1}>
            <TextField
              variant="standard"
              label="Phone Number"
              value={dialogData?.phoneNumber}
              fullWidth
              required
              onChange={(e) =>
                handleDialogChange("phoneNumber", e.target.value)
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdate}>Update</Button>
          <Button onClick={handleDialogClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
    // <Box padding={1}>
    //             <Grid container spacing={2}>
    //                 <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
    //                 <TextField
    //                 variant='standard'
    //                 label='Username'

    //                 fullWidth
    //             />
    //                 </Grid>
    //                 <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
    //                 <FormControl fullWidth>
    //                 <InputLabel>Role</InputLabel>
    //                 <Select
    //                 label="Role"
    //                 >
    //                     {roles.map((role) => (
    //                         <MenuItem key={role} value={role}>
    //                             {role}
    //                         </MenuItem>
    //                     ))}
    //                 </Select>
    //             </FormControl>
    //                 </Grid>
    //             </Grid>

    //         </Box>

    //         <Box padding={1}>
    //             <TextField
    //                 variant='standard'
    //                 label='Email'
    //                 fullWidth
    //             />
    //         </Box>
    //         <Box padding={1}>
    //             <TextField
    //                 variant='standard'
    //                 label='Password'
    //                 fullWidth
    //             />
    //         </Box>
    //         <Box padding={1}>
    //             <Grid container spacing={2}>
    //                 <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
    //                     <TextField
    //                         variant='standard'
    //                         label='First Name'
    //                         fullWidth
    //                     />
    //                 </Grid>
    //                 <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
    //                     <TextField
    //                         variant='standard'
    //                         label='Last Name'
    //                         fullWidth
    //                     />
    //                 </Grid>
    //             </Grid>
    //         </Box>
    //         <Box padding={1}>
    //             <TextField
    //                 variant='standard'
    //                 label='Day of Birth'
    //                 fullWidth
    //             />
    //         </Box>
    //         <Box padding={1}>
    //             <TextField
    //                 variant='standard'
    //                 label='Address'
    //                 fullWidth
    //             />
    //         </Box>
    //         <Box padding={1}>
    //             <TextField
    //                 variant='standard'
    //                 label='Phone Number'
    //                 fullWidth
    //             />
    //         </Box>
  );
};

export default Admin_Accounts;
