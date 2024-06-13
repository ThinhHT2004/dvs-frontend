import React, { useEffect, useState } from "react";
import { consulting_staff_navigator } from "../Naviate";
import StaffDrawer from "../StaffDrawer";
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
  TextField,
  Chip,
  Typography,
} from "@mui/material";
import axios from "axios";
import { formatRequestId } from "../../../Foramat";
import { Toaster, toast } from "sonner";

const ConsultingStaff_Form = () => {
  const drawerWidth = 240;
  const consultignStaffId = 3;
  const [open, setOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [requests, setRequests] = useState([]);
  const [listSample, setListSample] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    getAcceptedRquest();
  }, []);

  console.log(currentRequest);

  useEffect(() => {
    getTotalPrice();
  }, [listSample]);

  function getAcceptedRquest() {
    axios
      .get(
        "http://localhost:8080/api/request/valuation-request/" +
          consultignStaffId +
          "/ACCEPTED/COMPLETED"
      )
      .then((resp) => setRequests(resp.data))
      .catch((err) => console.log(err));
  }

  function checkNegative(list){
    let check = false;
    let i = 0;
    for(i=0;i<list.length;++i){
      if(parseFloat(list[i].size) < 0) check = true;
    }
    return check;
  }

  function checkFullFilled(){
    let i = 0;
    let check = true;
    const list = currentRequest.valuationRequestDetailList;
    for(i;i<list.length;++i){
      if(list[i].size === 0 || list[i].size === ''){
        check = false;
      }
    }
    return check;
  }

  function createReceipt(requestDetailList, requestId) {
    if(checkNegative(requestDetailList)){
      toast.error("The size must not be negative");
    }else{
      axios
      .post(
        "http://localhost:8080/api/request/create-receipt/" + requestId,
        requestDetailList
      )
      .then((resp) => {
        handleClose();
        getAcceptedRquest();  
      })
      .catch((err) => console.log(err));
    }
    
  }

  const getServicePrice = (id, size, index) => {
    if (size === "") {
      let newListSample = [...listSample];
      newListSample[index] = 0; 
      setListSample(newListSample);
      return;
    }
    axios
      .get("http://localhost:8080/api/service-prices/price/" + id + "/" + size)
      .then((resp) => {
        let newListSample = [...listSample];
        newListSample[index] = resp.data;
        setListSample(newListSample);
      })
      .catch((err) => console.log(err));
  };

  const getTotalPrice = () => {
    let total = 0;
    listSample.forEach((price) => {
      total += price || 0;
    });
    setTotalPrice(total);
  };

  const handleClickOpen = (event, request) => {
    setCurrentRequest(request);
    setListSample(new Array(request.valuationRequestDetailList.length).fill(0));
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
    setSelectedOption("");
  };

  const handleSizeChange = (e, index, sample) => {
    const size = e.target.value;
    sample.size = size; 
    getServicePrice(currentRequest.service.id, size, index);
  };

  const renderStatus = (status) => {
    switch (status) {
      case "ACCEPTED":
        return "success";
      case "COMPLETED":
        return "info";
      default:
        return "default";
    }
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
      <Toaster position="top-center" richColors></Toaster>
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
          state="Form"
          handleClick={consulting_staff_navigator}
        />
      </Box>
      <Box
        sx={{
          p: 3,
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid container spacing={3}>
          <Grid item md={8} xs={12}>
            <Box>
              <TableContainer component={Paper} sx={{ width: "100%" }}>
                <Table sx={{ minWidth: 300 }}>
                  <TableHead sx={{ backgroundColor: "#30D5C8" }}>
                    <TableRow>
                      <TableCell>ID Request</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {requests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>{formatRequestId(request.id)}</TableCell>
                        <TableCell>{request.customer.first_name}</TableCell>
                        <TableCell className="status" align="center">
                          <Chip
                            label={request.status}
                            color={renderStatus(request.status)}
                          />
                        </TableCell>
                        <TableCell>
                          <Button>
                            <Link
                              href="#"
                              onClick={(event) =>
                                handleClickOpen(event, request)
                              }
                              underline="none"
                            >
                              Create Form
                            </Link>
                          </Button>
                          <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                          >
                            {["Receipt", "Sealed", "Committed", "Handover"].map(
                              (option) => (
                                <MenuItem
                                  key={option}
                                  onClick={() => handleMenuItemClick(option)}
                                >
                                  {option}
                                </MenuItem>
                              )
                            )}
                          </Menu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
          <Grid item xs={4}>
            {open && (
              <Box>
                <Box>
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 200 }}>
                      <TableHead sx={{ backgroundColor: "#30D5C8" }}>
                        <TableRow>
                          <TableCell>{selectedOption} Form</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow sx={{ "& td": { borderBottom: "none" } }}>
                          <TableCell>
                            Name : {currentRequest.customer.first_name}
                          </TableCell>
                        </TableRow>
                        <TableRow sx={{ "& td": { borderBottom: "none" } }}>
                          <TableCell>
                            Phone : {currentRequest.customer.phoneNumber}
                          </TableCell>
                        </TableRow>
                        {currentRequest.valuationRequestDetailList.map(
                          (sample, index) => (
                            <TableRow
                              key={sample.id}
                              sx={{
                                "& td": {
                                  borderBottom: "none",
                                  alignItems: "center",
                                },
                              }}
                            >
                              <TableCell>
                                <Box display="flex" alignItems="center">
                                  <Box width={"50%"} display={"flex"}>
                                    <Typography>
                                      ID Sample {sample.id}:
                                    </Typography>
                                    <TextField
                                      sx={{ marginLeft: 2, width: "40%" }}
                                      onChange={(e) =>
                                        handleSizeChange(e, index, sample)
                                      }
                                      value={sample.size}
                                      label="Size"
                                      type="number"
                                    />
                                  </Box>
                                  <Box>
                                    <TextField
                                      sx={{ width: "70%" }}
                                      value={listSample[index] || 0}
                                      label="Service Price"
                                      disabled
                                    />
                                  </Box>
                                </Box>
                              </TableCell>
                            </TableRow>
                          )
                        )}
                        <TableRow sx={{ "& td": { borderBottom: "none" } }}>
                          <TableCell>
                            <Typography>Total: {totalPrice}</Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell colSpan={2} align="right">
                            <Button
                              onClick={() =>
                                createReceipt(
                                  currentRequest.valuationRequestDetailList,
                                  currentRequest.id
                                )
                              }
                              variant="contained"
                              sx={{ backgroundColor: "#69CEE2" }}
                              disabled={!checkFullFilled()}
                            >
                              Create
                            </Button>
                            <Button
                              onClick={() => handleClose()}
                              variant="outlined"
                              sx={{
                                marginLeft: 2,
                                color: "red",
                                borderColor: "red",
                              }}
                            >
                              Cancel
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ConsultingStaff_Form;
