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
  TableFooter,
  TablePagination,
} from "@mui/material";

import StaffDrawer from "../StaffDrawer";
import protectedApi from "../../../APIs/ProtectedApi";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Toaster, toast } from "sonner";
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';


function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const Admin_Accounts = () => {
  const [staffs, setStaffs] = useState([]);
  const [editDiaLogOpen, setEditDiaLogOpen] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addDialogData, setAddDialogData] = useState(null);
  const [registerRequest, setRegisterRequest] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    dob: null,
    phoneNumber: "",
    role: "",
    address: "",
  });
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
          return { ...staff, role: roleData.role, active: roleData.active, username: roleData.username, password: roleData.password };
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
    console.log(staffData)
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
  };
  const handleUpdate = async () => {
    try {
      await protectedApi.put("/staffs/update", dialogData).then((resp) => {
        console.log(resp.data);
        toast.success("Update Successfully");
      });

      getStaffs();
      handleDialogClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDisable = async (staff) => {
    try {
      await protectedApi
        .put("/accounts/disable/" + staff.id)
        .then((resp) => toast.success(resp.data));
      getStaffs();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEnable = async (staff) => {
    try {
      await protectedApi
        .put("/accounts/enable/" + staff.id)
        .then((resp) => toast.success(resp.data));
      getStaffs();
    } catch (err) {
      console.log(err);
    }
  };
  const handleAddClick = () => {
    setAddDialogOpen(true);
  };
  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
    setRegisterRequest({
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      dob: null,
      phoneNumber: "",
      role: "",
      address: "",
    });
  };

  console.log(registerRequest);
  const handleAdd = async () => {
    try {
      await protectedApi
        .post("/staffs/create", registerRequest)
        .then((resp) => {
          if (resp.data.code === 1) {
            toast.success(resp.data.mess);
            handleAddDialogClose();
            getStaffs();
          } else {
            toast.error(resp.data.mess);
          }
        });


    } catch (err) {
      console.error(err);
    }
  };


  function checkFullFilled() {
    let check = true;

    for (let key in dialogData) {
      if (dialogData.hasOwnProperty(key)) {
        if (dialogData[key] === "") {
          check = false;
          break;
        }
      }
    }

    if (registerRequest.dob === null) {
      return false;
    }

    if (!check) {
      return false;
    } else {
      if (!isValidEmailIgnoringTail()) {
        return false;
      }
      if (!checkPhoneNumber()) {
        return false;
      }
      if (!checkPhoneNumberString()) {
        return false;
      }
      return true;
    }
  }

  function checkPhoneNumber() {
    if (registerRequest.phoneNumber.length !== 10) {
      return false;
    } else {
      return true;
    }
  }

  function checkPhoneNumberString() {
    const digitRegex = /^\d+$/;
    return digitRegex.test(registerRequest.phoneNumber);
  }

  function isValidEmailIgnoringTail() {
    const emailRegex = /^[^\s@]+@[^\s@]+$/;

    return emailRegex.test(registerRequest.email);
  }
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
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
        mylist={["Home", "Services", "Staffs", "Customers", "Sign Out"]}
        state="Staffs"
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
            title="STAFFS MANAGEMENT"
            titleTypographyProps={{ variant: "h5", color: "white" }}
            sx={{ backgroundColor: "#30D5C8" }}
            action={
              <Button
                onClick={handleAddClick}
                sx={{ color: 'white' }}
              >
                Add New Staff
              </Button>
            }
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
              {(rowsPerPage > 0 ? staffs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : staffs).map((staff, index) => (
                <Fragment key={staff.id || index}>
                  <TableRow>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{staff.role}</TableCell>
                    <TableCell>
                      {staff.lastName} {staff.firstName}
                    </TableCell>
                    <TableCell align="center">
                      <Button onClick={() => handleViewEditClick(staff)}
                        sx={{ color: '#30D5C8' }}
                      >
                        View & Edit
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      {staff.active === true ? (
                        <Button
                          sx={{ color: "red" }}
                          onClick={() => handleDisable(staff)}
                        >
                          Disable
                        </Button>
                      ) : (
                        <Button
                          sx={{ color: "green" }}
                          onClick={() => handleEnable(staff)}
                        >
                          Enable
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                </Fragment>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={5}
                  count={staffs.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      inputProps: {
                        'aria-label': 'rows per page',
                      },
                      native: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
      <Dialog
        open={editDiaLogOpen}
        onClose={() => setEditDiaLogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <CardHeader
          title={"Username: " + dialogData?.username}
          titleTypographyProps={{ variant: "h5", color: "white" }}
          sx={{ backgroundColor: "#30D5C8" }}
        />
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
          <Button onClick={handleUpdate} sx={{ color: "#30D5C8" }}>Update</Button>
          <Button onClick={handleDialogClose} color="error">Cancel</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={addDialogOpen}
        onClose={handleAddDialogClose}
        fullWidth
        maxWidth="md"
      >
        <DialogContent>
          <Box padding={1}>
            <Grid container spacing={2}>
              <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                <TextField
                  variant="standard"
                  label="Username"
                  fullWidth
                  required
                  onChange={(e) => {
                    setRegisterRequest({
                      ...registerRequest,
                      username: e.target.value,
                    });
                    checkFullFilled();
                  }}
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                <FormControl fullWidth>
                  <InputLabel>Role</InputLabel>
                  <Select
                    label="Role"
                    required
                    fullWidth
                    onChange={(e) => {
                      setRegisterRequest({
                        ...registerRequest,
                        role: e.target.value,
                      });
                      checkFullFilled();
                    }}
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
            <TextField
              error={
                registerRequest.email === ""
                  ? false
                  : !isValidEmailIgnoringTail()
              }
              helperText={
                registerRequest.email === ""
                  ? false
                  : !isValidEmailIgnoringTail()
                    ? "Email is invalid"
                    : ""
              }
              variant="standard"
              label="Email"
              fullWidth
              required
              onChange={(e) => {
                setRegisterRequest({
                  ...registerRequest,
                  email: e.target.value,
                });
                checkFullFilled();
              }}
            />
          </Box>
          <Box padding={1}>
            <TextField
              variant="standard"
              label="Password"
              fullWidth
              required
              onChange={(e) => {
                setRegisterRequest({
                  ...registerRequest,
                  password: e.target.value,
                });
                checkFullFilled();
              }}
            />
          </Box>
          <Box padding={1}>
            <Grid container spacing={2}>
              <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                <TextField
                  variant="standard"
                  label="First Name"
                  fullWidth
                  required
                  onChange={(e) => {
                    setRegisterRequest({
                      ...registerRequest,
                      firstName: e.target.value,
                    });
                    checkFullFilled();
                  }}
                />
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                <TextField
                  variant="standard"
                  label="Last Name"
                  fullWidth
                  required
                  onChange={(e) => {
                    setRegisterRequest({
                      ...registerRequest,
                      lastName: e.target.value,
                    });
                    checkFullFilled();
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <Box padding={1}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                inputFormat="dd/MM/yyyy"
                value={registerRequest.dob}
                onChange={(newValue) => {
                  setRegisterRequest({
                    ...registerRequest,
                    dob: newValue,
                  });
                  checkFullFilled();
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
              fullWidth
              required
              onChange={(e) => {
                setRegisterRequest({ ...registerRequest, address: e.target.value })
                checkFullFilled();
              }}
            />
          </Box>
          <Box padding={1}>
            <TextField
              error={registerRequest.phoneNumber === "" ? false : !checkPhoneNumber()}
              helperText={registerRequest.phoneNumber === "" ? false : !checkPhoneNumberString() ? "Phone must contain only digit" : !checkPhoneNumber() ? "Lenght must be 10" : ""}
              variant="standard"
              label="Phone Number"
              fullWidth
              required
              onChange={(e) => {
                setRegisterRequest({ ...registerRequest, phoneNumber: e.target.value })
                checkFullFilled();
              }
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAdd} disabled={!checkFullFilled()}>Add</Button>
          <Button onClick={handleAddDialogClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Admin_Accounts;
