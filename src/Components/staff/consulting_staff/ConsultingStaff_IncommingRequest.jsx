import React, { useEffect, useState } from "react";
import StaffDrawer from "../StaffDrawer";
import {
  Box,
  Button,
  CardContent,
  CardHeader,
  Grid,
  Paper,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
  TableFooter,
  TablePagination,

} from "@mui/material";
import { consulting_staff_navigator } from "../Naviate";
import axios from "axios";
import moment from "moment";
import { useRequests } from "./RequestContext";
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

const ConsultingStaff_IncommingRequest = () => {
  const staffId = sessionStorage.getItem("consultingStaffId");
  const { waitingRequests, getAllWaitingRequests } = useRequests();
  const acceptRequest = (requestId) => {
    protectedApi
      .put(
        "/request/" + requestId + "/assign/" + staffId
      )
      .then(() => {
        getAllWaitingRequests();
      })
      .catch((err) => console.log(err));
  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const sortedRequests = waitingRequests.sort((a, b) => {
    return new Date(b.requestDate) - new Date(a.requestDate);
  });
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const drawerWidth = 240;
  useEffect(() => {
    getAllWaitingRequests();
  }, [sortedRequests]);
  return (
    <Box sx={{ display: "flex", flexDirection: "row", backgroundColor: "#FAF6EF", width: "100%", minHeight: "100vh" }}>
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
          state="Incoming Request"
          handleClick={consulting_staff_navigator}

        />
      </Box>
      <Box sx={{
        p: 3,
        display: "flex",
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        flexDirection: "column",
        alignItems: "center",
      }}>
        <Grid container>
          <Grid item lg={12} xl={12} md={12} sm={12} xs={12}>
            <TableContainer sx={{ borderRadius: 3 }} component={Paper}>
              <CardHeader
                title='MANAGE INCOMING REQUESTS'
                titleTypographyProps={{
                  variant: 'h5',
                  color: 'white',
                }}
                sx={{ backgroundColor: '#30D5C8' }}
              />
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ fontSize: 20, width: 250, color: '#69CEE2' }}>Customer Name</TableCell>
                    <TableCell sx={{ fontSize: 20, width: 200, color: '#69CEE2' }}>Phone Number</TableCell>
                    <TableCell sx={{ fontSize: 20, width: 250, color: '#69CEE2' }}>Service</TableCell>
                    <TableCell sx={{ fontSize: 20, width: 150, color: '#69CEE2' }} align="center">Quantity</TableCell>
                    <TableCell sx={{ fontSize: 20, width: 250, color: '#69CEE2' }} align="center">Appointment Date</TableCell>
                    <TableCell sx={{ width: 150 }} align="center"></TableCell>
                  </TableRow>
                  {(rowsPerPage > 0 ? sortedRequests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : sortedRequests).map((request) => (
                    <TableRow key={request.id}>
                      <TableCell sx={{ fontSize: 15 }}>{request.customer.last_name} {request.customer.first_name}</TableCell>
                      <TableCell sx={{ fontSize: 15 }}>{request.customer.phoneNumber}</TableCell>
                      <TableCell sx={{ fontSize: 15 }}>{request.service.name}</TableCell>
                      <TableCell sx={{ fontSize: 15, textAlign: 'center' }}>{request.quantity}</TableCell>
                      <TableCell sx={{ fontSize: 15, textAlign: 'center' }}>
                        <Chip color="primary" size="small" label={moment(request.appointmentDate).format("yyyy-MM-DD hh:mm A")}>
                        </Chip>
                      </TableCell>
                      <TableCell sx={{ fontSize: 15 }} align="center">
                        <Button
                          variant="contained"
                          sx={{ background: "#30D5C8", borderRadius: "8px" }}
                          onClick={() => acceptRequest(request.id)}
                        >
                          Accept
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                      colSpan={6}
                      count={sortedRequests.length}
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
          </Grid>
          <Grid item lg={12} xl={12} md={12} sm={12} xs={12}></Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ConsultingStaff_IncommingRequest;
