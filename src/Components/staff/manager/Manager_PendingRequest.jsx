import React, { useEffect, useState } from 'react';
import {
  Box,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  CardHeader,
  TableFooter,
  TablePagination,
  Chip,
} from "@mui/material";
import { manager_navigator } from '../Naviate';
import StaffDrawer from '../StaffDrawer';
import moment from 'moment';
import { formatValuationId } from '../../../Foramat';
import protectedApi from '../../../APIs/ProtectedApi';
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

  function approveForm(id) {
    try {
      protectedApi
        .post("/forms/approve/" + id)

        .then(() => {
          getWaitingForms();
        })
    } catch (err) {
      console.log(err);
    }
  }

  function denyForm(id) {
    try {
      protectedApi.post("/forms/deny/" + id)
        .then(() => {
          getWaitingForms();
        })
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getWaitingForms();
  }, [listForms]);

  function getWaitingForms() {
    try {
      protectedApi
        .get("/forms/waiting")
        .then(resp => setListForms(resp.data));
    } catch (err) {
      console.log(err);
    }
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
  const renderStatus = (status) => {
    switch (status) {
      case "WAITING":
        return "info";
        break;
      default:
        return "info";
        break;
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
      <StaffDrawer
        mylist={[
          "Request",
          "Pending Request",
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
        <Box sx={{ width: '100%' }}>
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
                {(rowsPerPage > 0 ? listForms.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : listForms).map((row) => (
                  <TableRow key={row.id} sx={{ backgroundColor: "white" }}>
                    <TableCell align="center">{formatValuationId(row.valuationRequestId)}</TableCell>
                    <TableCell align="center">{moment(row.createdDate).format("dd-MM-yyyy")}</TableCell>
                    <TableCell align="center">
                    <Chip
                            label={row.status}
                            color={renderStatus(row.status)}
                          ></Chip>
                    </TableCell>
                    <TableCell align="center">{row.formType}</TableCell>
                    <TableCell>
                      <Link href="#" sx={{ color: "#69CEE2" }} underline="none"
                        onClick={() => approveForm(row.id)}>Approve</Link>
                    </TableCell>
                    <TableCell>
                      <Link href="#" sx={{ color: "red" }} underline="none"
                        onClick={() => denyForm(row.id)}>Decline</Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow
                  sx={{ backgroundColor: "white" }}
                >
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    colSpan={6}
                    count={listForms.length}
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
      </Box>
    </Box>
  );
};

export default Manager_PendingRequest;
