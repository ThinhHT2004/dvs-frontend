import React, { Fragment, useEffect, useState } from "react";
import { consulting_staff_navigator } from "../Naviate";
import StaffDrawer from "../StaffDrawer";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Menu,
  MenuItem,
  Button,
  Grid,
  TextField,
  Chip,
  Typography,
  CardHeader,
  TableFooter,
  TablePagination,
} from "@mui/material";
import { formatRequestId } from "../../../Foramat";
import { Toaster, toast } from "sonner";
import protectedApi from "../../../APIs/ProtectedApi";
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
  const [form, setForm] = useState({
    valuationRequestId: 0,
    formType: selectedOption,
    note: "",
  });

  useEffect(() => {
    getAcceptedRquest();
  }, [requests]);

  useEffect(() => {
    getTotalPrice();
  }, [listSample]);

  function getAcceptedRquest() {
    protectedApi
      .get(
        "/request/valuation-request/" +
        consultignStaffId +
        "/ACCEPTED/COMPLETED/SEALED"
      )
      .then((resp) => {
        setRequests(resp.data);
      })
      .catch((err) => console.log(err));
  }

  function checkNegative(list) {
    let check = false;
    let i = 0;
    for (i = 0; i < list.length; ++i) {
      if (parseFloat(list[i].size) < 0) check = true;
    }
    return check;
  }

  function checkFullFilled() {
    let i = 0;
    let check = true;
    const list = currentRequest.valuationRequestDetailList;
    for (i; i < list.length; ++i) {
      if (list[i].size === 0 || list[i].size === "") {
        check = false;
      }
    }
    return check;
  }

  function createForm() {
    if (selectedOption === "RECEIPT") {
      createReceipt(
        currentRequest.valuationRequestDetailList,
        currentRequest.id
      );
    } else {
      try {
        protectedApi
          .post("/forms/create-form", form)
          .then((resp) => {
            handleClose();
            getAcceptedRquest();
            setForm({});
          });
      } catch (err) {
        console.log(err);
      }
    }
  }

  function createReceipt(requestDetailList, requestId) {
    if (checkNegative(requestDetailList)) {
      toast.error("The size must not be negative");
    } else {
      let data = new FormData();
      data.append("total", totalPrice);
      protectedApi
        .post(
          "/forms/create-receipt/" + requestId + "/" + totalPrice,
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
    protectedApi
      .get("/service-prices/price/" + id + "/" + size)
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
    setForm({
      ...form,
      valuationRequestId: currentRequest?.id,
      formType: option,
    });
    setOpen(true);
    handleMenuClose();
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentRequest(null);
    setSelectedOption("");
    setForm({});
  };

  const handleSizeChange = (e, index, sample) => {
    const size = e.target.value;
    sample.size = size;
    getServicePrice(currentRequest.service.id, size, index);
  };
  const selectTypeForm = (type) => {
    if (type === "RECEIPT") {
      return (
        <Fragment>
          {currentRequest.valuationRequestDetailList.map((sample, index) => (
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
                <Box >
                  <Box>
                    <Typography>ID Sample {sample.id}:</Typography>
                  </Box>
                  <Box>
                    <Grid container spacing={2}>
                      <Grid item xl={4} lg={4}>
                        <TextField
                          fullWidth
                          onChange={(e) => handleSizeChange(e, index, sample)}
                          label="Size"
                          type="number"
                        />
                      </Grid>
                      <Grid item xl={8} lg={8}>
                        <TextField
                          fullWidth
                          value={listSample[index] || 0}
                          label="Service Price"
                          disabled
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </TableCell>
            </TableRow>
          ))}
          <TableRow sx={{ "& td": { borderBottom: "none" } }}>
            <TableCell>
              <Typography>Total: {totalPrice} VND</Typography>
            </TableCell>
          </TableRow>
        </Fragment>
      );
    } else {
      return (
        <TableRow sx={{ "& td": { borderBottom: "none" } }}>
          <TableCell>
            <TextField
              fullWidth
              margin="normal"
              label="Notes"
              multiline
              rows={4}
              value={form.note}
              onChange={(e) =>
                setForm({
                  ...form,
                  note: e.target.value,
                })
              }
            />
          </TableCell>
        </TableRow>
      );
    }
  };
  const renderStatus = (status) => {
    switch (status) {
      case "ACCEPTED":
        return "success";
      case "COMPLETED":
        return "info";
      case "SEALED":
        return "error";
      case "COMMITTED":
        return "error";
      default:
        return "default";
    }
  };
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
      <Toaster position="top-center" richColors></Toaster>
      <Box>
        <StaffDrawer
          mylist={[
            "Home",
            "Incoming Request",
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
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xl={8} lg={8}>
            <Box>
              <TableContainer sx={{ borderRadius: 3 }} component={Paper}>
                <CardHeader
                  title="MANAGE FORMS"
                  titleTypographyProps={{
                    variant: "h5",
                    color: "white",
                  }}
                  sx={{ backgroundColor: "#30D5C8" }}
                />
                <Table>
                  <TableBody>
                    <TableRow sx={{ backgroundColor: "white" }}>
                      <TableCell
                        sx={{ fontSize: 20, width: 150, color: "#69CEE2" }}
                        align="center"
                      >
                        Request ID
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: 20, width: 250, color: "#69CEE2" }}
                      >
                        Customer Name
                      </TableCell>
                      <TableCell
                        sx={{ fontSize: 20, width: 150, color: "#69CEE2" }}
                        align="center"
                      >
                        Status
                      </TableCell>
                      <TableCell sx={{ width: 200 }}></TableCell>
                    </TableRow>
                    {(rowsPerPage > 0 ? requests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : requests).map((request) => (
                      <TableRow key={request.id}>
                        <TableCell align="center">
                          {formatRequestId(request.id)}
                        </TableCell>
                        <TableCell>
                          {request.customer.last_name}{" "}
                          {request.customer.first_name}
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={request.status}
                            color={renderStatus(request.status)}
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Button
                            onClick={(event) => handleClickOpen(event, request)}
                          >
                            Create Form
                          </Button>
                          <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                          >
                            {["RECEIPT", "SEAL", "COMMITMENT", "HAND OVER"].map(
                              (option) => (
                                <MenuItem
                                  key={option}
                                  disabled={
                                    (currentRequest?.status === "ACCEPTED" && option !== "RECEIPT") ||
                                    (currentRequest?.status === "SEALED" && option !== "HAND OVER") ||
                                    (currentRequest?.status === "COMPLETED" && option === "RECEIPT")
                                  }
                                  onClick={() => {
                                    handleMenuItemClick(option)
                                  }}
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
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        colSpan={5}
                        count={requests.length}
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
          </Grid>
          <Grid item xl={4} lg={4}>
            {open && (
              <Box>
                <TableContainer sx={{ borderRadius: 3 }} component={Paper}>
                  <CardHeader
                    title={`${selectedOption} FORM`}
                    titleTypographyProps={{ variant: "h5", color: "white" }}
                    sx={{ backgroundColor: "#30D5C8" }}
                  />
                  <Table>
                    <TableBody>
                      <TableRow sx={{ "& td": { borderBottom: "none" } }}>
                        <TableCell>
                          <Typography>
                            {" "}
                            Request ID : {formatRequestId(currentRequest.id)}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow sx={{ "& td": { borderBottom: "none" } }}>
                        <TableCell>
                          <Typography>
                            {" "}
                            Service : {currentRequest.service.name}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow sx={{ "& td": { borderBottom: "none" } }}>
                        <TableCell>
                          <Typography>
                            {" "}
                            Name : {currentRequest.customer.last_name}{" "}
                            {currentRequest.customer.first_name}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow sx={{ "& td": { borderBottom: "none" } }}>
                        <TableCell>
                          <Typography>
                            Phone : {currentRequest.customer.phoneNumber}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      {selectTypeForm(selectedOption)}
                      <TableRow>
                        <TableCell colSpan={2} align="right">
                          <Button
                            onClick={() =>
                              createForm(
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
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ConsultingStaff_Form;
