import React, { useEffect, useState , Fragment} from 'react'
import protectedApi from '../../../APIs/ProtectedApi';
import { Box, Button, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TablePagination, TableRow } from '@mui/material';
import StaffDrawer from '../StaffDrawer';
import { Toaster, toast } from "sonner";
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import {admin_navigator} from '../Naviate';
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
const Admin_Customers = () => {
    const drawerWidth = 240;
    const [customers, setCustomers] = useState([]);
    useEffect(() => {
        getCustomers();
    }, [customers]);
    const getCustomers = async () => {
        const resp = await protectedApi.get('/customers/all');
        setCustomers(resp.data);
    }
    const handleDisable = async (customer) => {
        try {
          await protectedApi
            .put("/accounts/disable/" + customer.id)
            .then((resp) => toast.success(resp.data));
          getCustomers();
        } catch (err) {
          console.log(err);
        }
      };
    
      const handleEnable = async (customer) => {
        try {
          await protectedApi
            .put("/accounts/enable/" + customer.id)
            .then((resp) => toast.success(resp.data));
          getCustomers();
        } catch (err) {
          console.log(err);
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
            <StaffDrawer
                mylist={["Home", "Services", "Staffs", "Customers", "Sign Out"]}
                state="Customers"
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
                        title="CUSTOMERS MANAGEMENT"
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
                                >
                                    Name
                                </TableCell>
                                <TableCell sx={{ fontSize: 20, width: 300, color: "#69CEE2" }}>
                                    Email
                                </TableCell>
                                <TableCell sx={{ fontSize: 20, width: 300, color: "#69CEE2" }}>
                                    Phone number
                                </TableCell>
                                <TableCell width={150}></TableCell>
                            </TableRow>
                            {(rowsPerPage > 0 ? customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : customers).map((customer, index) => (
                                <Fragment key={customer.id || index}>
                                    <TableRow>
                                        <TableCell align="center">{index + 1}</TableCell>
                                        <TableCell>
                                            {customer.last_name} {customer.first_name}
                                        </TableCell>
                                        <TableCell>{customer.email}</TableCell>
                                        <TableCell>
                                            {customer.phoneNumber}
                                        </TableCell>
                                        <TableCell align="center">
                                            {customer.active === true ? (
                                                <Button
                                                    sx={{ color: "red" }}
                                                    onClick={() => handleDisable(customer)}
                                                >
                                                    Disable
                                                </Button>
                                            ) : (
                                                <Button
                                                    sx={{ color: "green" }}
                                                    onClick={() => handleEnable(customer)}
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
                                    count={customers.length}
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
    )
}

export default Admin_Customers