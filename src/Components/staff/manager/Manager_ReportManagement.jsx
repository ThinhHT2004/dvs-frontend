import React, { useState, useCallback, useEffect, Fragment } from "react";
import {
  Box,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Button,
  FormControl,
  InputLabel,
  TextField,
  Grid,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Chip,
  TableFooter,
  TablePagination,
} from "@mui/material";
import { manager_navigator } from "../Naviate";
import StaffDrawer from "../StaffDrawer";
import { formatSampleId } from "../../../Foramat";
import protectedApi from "../../../APIs/ProtectedApi";
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { toast, Toaster } from "sonner";


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

const Manager_ReportManagement = () => {
  const [samples, setSamples] = useState([]);
  const [editPriceOpen, setEditPriceOpen] = useState(false);
  const [currentDiamond, setCurrentDiamond] = useState("");
  const [currentValuationReport, setCurrentValuationReport] = useState("");
  const [finalPrice, setFinalPrice] = useState(0);
  const drawerWidth = 240;

  useEffect(() => {
    getSamples();
  }, [samples]);

  const handleEditPriceClick = (diamond) => {
    setCurrentDiamond(diamond);
    setCurrentValuationReport(diamond.valuationReport);
    setEditPriceOpen(true);
  };
  const handleMaxPrice = (diamond) => {
    let max = diamond.assignmentList[0].price;
    for (let i = 1; i < diamond.assignmentList.length; ++i) {
      if (diamond.assignmentList[i].price > max) {
        max = diamond.assignmentList[i].price;
      }
    }
    setCurrentValuationReport({ ...currentValuationReport, finalPrice: max });
    return max;
  };

  const handleMinPrice = (diamond) => {
    let min = diamond.assignmentList[0].price;
    for (let i = 1; i < diamond.assignmentList.length; ++i) {
      if (diamond.assignmentList[i].price < min) {
        min = diamond.assignmentList[i].price;
      }
    }
    setCurrentValuationReport({ ...currentValuationReport, finalPrice: min });
    return min;
  };


  function checkFullFilled(){
    if(currentValuationReport.finalPrice === '') return false;
    if(currentValuationReport.note === '' || currentValuationReport.note === null) return false

    return true;
  }

  const handleAverage = (diamond) => {
    let avg = 0;
    for (let i = 0; i < diamond.assignmentList.length; ++i) {
      avg += diamond.assignmentList[i].price;
    }

    avg /= diamond.assignmentList.length;
    avg = avg.toFixed(2);
    setCurrentValuationReport({ ...currentValuationReport, finalPrice: avg });
    return avg;
  };
  const renderSampleStatus = (status) => {
    switch (status) {
      case "VALUATED":
        return "success";
        break;
    }
  };

  console.log(currentValuationReport)
  const handleSave = (diamond) => {
    currentValuationReport.createdDate = new Date();
    diamond.valuationReport = currentValuationReport;
    
    if(!checkFullFilled()){
      toast.error("The price and note must not be empty");
    }else{
      if(parseFloat(diamond.valuationReport.finalPrice) < 0){
        toast.error("The input must not be negative")
      }else{
        protectedApi
        .put("/request-detail/update", diamond)
        .then((resp) => {
          getSamples();
          handleCancel();
          toast.success("Edit final price successfully");
        })
        .catch((err) => console.log(err));
      }
    }
    

  };

  const handleCancel = () => {
    setEditPriceOpen(false);
    setCurrentDiamond();
  };

  const getSamples = () => {
    protectedApi
      .get("/request-detail/VALUATED")
      .then((resp) => setSamples(resp.data))
      .catch((err) => console.log(err));
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
      <StaffDrawer
        mylist={[ "Request","Pending Request", "Report", "Sign Out"]}
        state="Report"
        handleClick={manager_navigator}
      />
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
          <Grid item xl={6} lg={6}>
            <TableContainer sx={{ borderRadius: 3}} component={Paper}>
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

                    <TableCell sx={{ fontSize: 20, width: 150, color: '#69CEE2' }} align="center">Status</TableCell>
                    <TableCell sx={{ width: 100 }}></TableCell>
                  </TableRow>

                  {(rowsPerPage > 0 ? samples.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : samples).map((sample) => (
                    <Fragment key={sample.id}>
                      <TableRow>
                        <TableCell align="center">
                          {formatSampleId(sample.id)}
                        </TableCell>
                        <TableCell align="center">
                          <Chip label={sample.status} color={renderSampleStatus(sample.status)}/>
                        </TableCell>
                        <TableCell>
                          <Button>
                            <Link
                              href="#"
                              sx={{ color: "#69CEE2", paddingLeft: "16px" }}
                              underline="none"
                              onClick={() => handleEditPriceClick(sample)}
                            >
                              Edit Price
                            </Link>
                          </Button>
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
                      count={samples.length}
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
          <Grid item xl={6} lg={6}>
            {editPriceOpen && (
              <Box key={currentDiamond.id}>
                <TableContainer component={Paper} sx={{borderRadius: 3}}>
                  <CardHeader
                    title={`DIAMOND PRICES - ${formatSampleId(currentDiamond.id)}`}
                    titleTypographyProps={{ variant: 'h5', color: 'white' }}
                    sx={{ backgroundColor: "#30D5C8" }}
                  />
                  <Grid container spacing={0.1}>
                    {currentDiamond.assignmentList.map((assignment) => (
                      <Grid item lg={4} xl={4} key={assignment.id}>
                        <Card sx={{  margin: 1, backgroundColor: '#F2F2F2' }}>
                          <CardHeader
                            title={assignment.valuationStaff.firstName}
                          />
                          <CardContent>
                            <Typography>
                              Price: ${assignment.price}
                            </Typography>
                            <Typography sx={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                              Note: {assignment.note === null ? "none" : assignment.note}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>

                    ))}
                  </Grid>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",

                          }}
                          padding={2}
                        >
                          <Typography  marginRight={2}>Final price: {" "}</Typography>
                            <FormControl
                              variant="standard">
                              <InputLabel htmlFor="final-price-input" />
                              <TextField
                                value={currentValuationReport.finalPrice || ""}
                                placeholder="Enter final price"
                                onChange={(e) =>
                                  setCurrentValuationReport({ ...currentValuationReport, finalPrice: e.target.value })
                                }
                                type="number"

                              />
                            </FormControl>
                          
                        </Box>
                      
                        <Box padding={2}>
                          <Grid container spacing={2}>
                            <Grid item xl={4} lg={4}>
                              <Button
                                variant="contained"
                                sx={{ background: "#30D5C8" }}
                                fullWidth
                                onClick={() => handleMinPrice(currentDiamond)}
                              >
                                Min
                              </Button>
                            </Grid>
                            <Grid item xl={4} lg={4}>
                              <Button
                                variant="contained"
                                sx={{ background: "#30D5C8" }}
                                fullWidth
                                onClick={() => handleAverage(currentDiamond)}
                              >
                                Average
                              </Button>
                            </Grid>
                            <Grid item xl={4} lg={4}>
                              <Button
                                variant="contained"
                                sx={{
                                  background: "#30D5C8"
                                }}
                                fullWidth
                                onClick={() => handleMaxPrice(currentDiamond)}
                              >
                                Max
                              </Button>
                            </Grid>
                          </Grid>
                        </Box>
                      
                        <Box
                        sx={{
                          display: "flex",
                          width: "100%",
                        }}
                        padding={2}
                        
                        >
                   
                          <Typography marginRight={2}>Notes:</Typography>
                            <FormControl variant='standard'
                            fullWidth
                            >
                              <InputLabel htmlFor="note-input" />
                              <TextField
                                placeholder="Enter note"
                                value={currentValuationReport.note || ""}
                                multiline
                                fullWidth
                                rows={4}
                                onChange={(e) =>
                                  setCurrentValuationReport({ ...currentValuationReport, note: e.target.value })
                                }
                                
                              />
                            </FormControl>
                          
                
                        </Box>
                      
                          <Box display={"flex"} justifyContent={"right"} padding={2}>
                            <Button
                              variant="contained"
                              sx={{ backgroundColor: "#69CEE2" }}
                              onClick={() =>
                                handleSave(currentDiamond)
                              }
                              
                            >
                              Save

                            </Button>
                            <Button
                              variant="outlined"
                              sx={{ marginLeft: 2, color: "red", borderColor: "red" }}
                              onClick={() => handleCancel()}
                            >
                              Cancel
                            </Button>
                          </Box>
                </TableContainer>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box >

  );
};

export default Manager_ReportManagement;
