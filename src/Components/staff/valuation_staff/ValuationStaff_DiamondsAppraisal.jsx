import React, { useEffect, useState } from "react";
import StaffDrawer from "../StaffDrawer";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Link,
  TextField,
  Grid,
  Chip,
  CardHeader,
  TableFooter,
  TablePagination,
} from "@mui/material";
import { valuation_staff_navigator } from "../Naviate";
import { formatSampleId, formatValuationId } from "../../../Foramat";
import { Toaster, toast } from "sonner";
import moment from "moment";
import protectedApi from "../../../APIs/ProtectedApi";
import publicApi from "../../../APIs/PublicApi";
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

const ValuationStaff_DiamondsAppraisal = () => {
  const staffId = sessionStorage.getItem("valuationStaffId");
  const [selectedDiamond, setSelectedDiamond] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState();
  const drawerWidth = 240;
  const [assignments, setAssignments] = useState([]);
  const [price, setPrice] = useState(0);
  const [origin, setOrigin] = useState("");
  const [shape, setShape] = useState("");
  const [carat, setCarat] = useState();
  const [color, setColor] = useState("");
  const [clarity, setClarity] = useState("");
  const [cut, setCut] = useState("");
  const [symmetry, setSymmetry] = useState("");
  const [polish, setPolish] = useState("");
  const [fluorescence, setFluorescence] = useState("");
  const [diamonds, setDiamonds] = useState([]);

  useEffect(() => {
    if(selectedDiamond){
      handleSearch();
    }
  }, [selectedDiamond]);
  useEffect(() => {
    getAssignments();
  }, [assignments]);
  function checkFullFilled() {
    if (selectedAssignment.price === 0 || selectedAssignment.price === "") {
      return false;
    } else {
      return true;
    }
  }

  async function handleSearch() {
    const data = {
      origin,
      shape,
      carat,
      color,
      clarity,
      cut,
      symmetry,
      polish,
      fluorescence,
    };
    try {
      await publicApi
        .get("/diamond/search/true/" + 1 + "?", {
          params: data,
        })
        .then((resp) => setDiamonds(resp.data));
    } catch (err) {
      console.log(err);
    }
  }

  function generateMaxMin(list) {
    if (list != null && list.length > 0) {
      const prices = list.map((d) => d.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);

      return "$" + min + " - " + "$" + max;
    } else {
      return "--";
    }
  }

  function displayDeadline(deadline) {
    const current = new Date();
    const deadlineTime = new Date(deadline);
    if (current > (deadlineTime.getTime() - 30 * 60 * 1000)) {
      return (
        <Chip color="error" label={moment(deadline).format("yyyy-MM-DD hh:mm a")}></Chip>
      )
    } else if (current > (deadlineTime.getTime() - 60 * 60 * 1000)) {
      return (
        <Chip color="warning" label={moment(deadline).format("yyyy-MM-DD hh:mm a")}></Chip>
      )
    } else {
      return (
        <Chip color="primary" label={moment(deadline).format("yyyy-MM-DD hh:mm a")}></Chip>
      )
    }
  }

  const getAssignments = () => {
    protectedApi
      .get("/assignment/ASSIGNED/" + staffId)
      .then((resp) => setAssignments(resp.data))
      .catch((err) => console.log(err));
  };

  const getSelectDiamond = async (id) => {
    return await protectedApi
      .get("/request-detail/find/" + id)
      .catch((err) => console.log(err));
  };

  const handleAction = async (idDiamond) => {
    const assignment = assignments.find(
      (a) => a.valuationRequestDetailId === idDiamond
    );
    setSelectedAssignment(assignment);
    const selected = await getSelectDiamond(assignment.valuationRequestDetailId);
    const selectedD = selected.data;

    setOrigin(selectedD?.valuationReport.origin);
    setShape(selectedD?.valuationReport.shape);
    setCarat(selectedD?.valuationReport.caratWeight);
    setColor(selectedD?.valuationReport.color);
    setClarity(selectedD?.valuationReport.clarity);
    setCut(selectedD?.valuationReport.cut);
    setSymmetry(selectedD?.valuationReport.symmetry);
    setFluorescence(selectedD?.valuationReport.fluorescence);
    setPolish(selectedD?.valuationReport.polish);
    
    setSelectedDiamond(selected.data);
    
  };

  const handleSave = (selectedAssignment) => {
    if (parseFloat(selectedAssignment.price) < 0) {
      toast.error("The price must not be negative");
    } else {
      protectedApi
        .put("/assignment/update", selectedAssignment)
        .then((resp) => {
          getAssignments();
          handleClose();
        })
        .catch((err) => console.log(err));
    }
  };

  function handleClose() {
    setSelectedDiamond(null);
    setSelectedAssignment(null);
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
    <Box sx={{ display: "flex", flexDirection: "row", backgroundColor: "#FAF6EF", width: "100%", minHeight: "100vh" }}>
      <Toaster position="top-center" richColors></Toaster>
      <Box>
        <StaffDrawer
          mylist={["Diamonds Appraisal", "Sign Out"]}
          state="Diamonds Appraisal"
          handleClick={valuation_staff_navigator}
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
          <Grid item xl={6} lg={12} md={12}>
            <TableContainer sx={{ borderRadius: 3 }} component={Paper}>
              <CardHeader
                title='DIAMONDS APPRAISAL'
                titleTypographyProps={{
                  variant: 'h5',
                  color: 'white',
                }}
                sx={{ backgroundColor: '#30D5C8' }}
              />
              <Table>
                <TableBody>
                  <TableRow sx={{ backgroundColor: "white" }}>
                    <TableCell sx={{ fontSize: 20, width: 150, color: '#69CEE2' }} align="center">Valuation ID</TableCell>
                    <TableCell sx={{ fontSize: 20, width: 150, color: '#69CEE2' }} align="center">Sample ID</TableCell>
                    <TableCell sx={{ fontSize: 20, width: 105, color: '#69CEE2' }}>Price</TableCell>
                    <TableCell sx={{ fontSize: 20, width: 150, color: '#69CEE2' }} align="center">Deadline</TableCell>
                    <TableCell sx={{ width: 100 }}></TableCell>
                  </TableRow>
                  {(rowsPerPage > 0 ? assignments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : assignments).map((assign) => (
                    <TableRow key={assign.id}>
                      <TableCell align="center">{formatValuationId(assign.id)}</TableCell>
                      <TableCell align="center">
                        {formatSampleId(assign.valuationRequestDetailId)}
                      </TableCell>
                      <TableCell>
                        {assign.price === 0 ? "No Price" : assign.price}
                      </TableCell>
                      <TableCell align="center">{displayDeadline(assign.deadline)}</TableCell>
                      <TableCell>
                        <Link
                          href="#"
                          sx={{
                            color:
                              selectedDiamond &&
                                selectedDiamond.id ===
                                assign.valuationRequestDetailId
                                ? "grey"
                                : "#69CEE2",
                            paddingLeft: "16px",
                          }}
                          underline="none"
                          onClick={() =>
                            handleAction(assign.valuationRequestDetailId)
                          }
                        >
                          Edit
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                      colSpan={5}
                      count={assignments.length}
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
          <Grid item xl={6} lg={12} md={12}>
            {selectedDiamond ? (
              <Box>
                <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
                  <CardHeader
                    title={`DIAMOND DETAILS - ${formatSampleId(selectedDiamond.id)}`}
                    titleTypographyProps={{
                      variant: 'h5',
                      color: 'white',
                    }}
                    sx={{ backgroundColor: '#30D5C8' }}
                  />
                  <Box sx={{ width: "100%", height: "auto" }}>
                        <Box width="100%" height="100%" display="flex">
                          <Box
                            width="50%"
                            borderRight={1}
                            sx={{ p: 2, wordSpacing: 3 }}
                          >
                            <Box marginBottom={1.5}>
                              <Typography>
                                Shape:{" "}
                                {selectedDiamond.valuationReport.shape}
                              </Typography>
                            </Box>
                            <Box marginBottom={1.5}>
                              <Typography>
                                Measurements:{" "}
                                {selectedDiamond.valuationReport.measurement}
                              </Typography>
                            </Box>
                            <Box marginBottom={1.5}>
                              <Typography>
                                Carat Weight:{" "}
                                {selectedDiamond.valuationReport.caratWeight}{" "}
                                carat
                              </Typography>
                            </Box>
                            <Box marginBottom={1.5}>
                              <Typography>
                                Clarity Grade:{" "}
                                {selectedDiamond.valuationReport.clarity}
                              </Typography>
                            </Box>
                            <Box marginBottom={1.5}>
                              <Typography>
                                Color Grade:{" "}
                                {selectedDiamond.valuationReport.color}
                              </Typography>
                            </Box>
                            <Box marginBottom={1.5}>
                              <Typography>
                                Polish:{" "}
                                {selectedDiamond.valuationReport.polish}
                              </Typography>
                            </Box>
                            <Box marginBottom={1.5}>
                              <Typography>
                                Symmetry:{" "}
                                {selectedDiamond.valuationReport.symmetry}
                              </Typography>
                            </Box>
                            <Box marginBottom={1.5}>
                              <Typography>
                                Fluorescence:{" "}
                                {selectedDiamond.valuationReport.fluorescence}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography>
                                Market Price: {diamonds.length > 0 ? generateMaxMin(diamonds) : "N/A"}
                              </Typography>
                            </Box>
                            <Box>
                              <TextField
                                fullWidth
                                margin="normal"
                                label="Price"
                                value={selectedDiamond.price}
                                onChange={(e) =>
                                  setSelectedAssignment({
                                    ...selectedAssignment,
                                    price: e.target.value,
                                  })
                                }
                                type="number"
                              />
                              <TextField
                                fullWidth
                                margin="normal"
                                label="Notes"
                                multiline
                                rows={4}
                                value={selectedDiamond.note}
                                onChange={(e) =>
                                  setSelectedAssignment({
                                    ...selectedAssignment,
                                    note: e.target.value,
                                  })
                                }
                              />
                            </Box>
                            <Box sx={{ marginTop: 2 }}>
                              <Button
                                variant="contained"
                                sx={{ backgroundColor: "#69CEE2" }}
                                onClick={() => {
                                  handleSave(selectedAssignment);
                                }}
                                disabled={!checkFullFilled()}
                              >
                                Save
                              </Button>
                              <Button
                                variant="outlined"
                                sx={{
                                  marginLeft: 2,
                                  color: "red",
                                  borderColor: "red",
                                }}
                                onClick={() => setSelectedDiamond(null)}
                              >
                                Cancel
                              </Button>
                            </Box>
                          </Box>
                          <Box
                            width="50%"
                            sx={{ p: 2, wordSpacing: 3 }}
                            height="90%"
                          >
                            <Box display="flex" height="40%">
                              <Box width="40%">
                                <Box marginBottom={1.5}>
                                  <Typography>
                                    Depth:{" "}
                                    {selectedDiamond.valuationReport.depth}
                                  </Typography>
                                </Box>
                                <Box marginBottom={1.5}>
                                  <Typography>
                                    Table:{" "}
                                    {selectedDiamond.valuationReport.table}
                                  </Typography>
                                </Box>
                                <Box marginBottom={1.5}>
                                  <Typography>
                                    Girdle:{" "}
                                    {selectedDiamond.valuationReport.girdle}
                                  </Typography>
                                </Box>
                                <Box marginBottom={1.5}>
                                  <Typography>
                                    Culet:{" "}
                                    {selectedDiamond.valuationReport.culet}
                                  </Typography>
                                </Box>
                              </Box>
                              <Box width="100%">
                                <img
                                  src={
                                    selectedDiamond.valuationReport.proportion
                                  }
                                  alt=""
                                  width="100%"
                                  height="auto"
                                />
                              </Box>
                            </Box>
                            <Box height="60%" sx={{ paddingTop: 3 }}>
                              <Box>
                                <Typography variant="h5">
                                  Clarity Characteristic
                                </Typography>
                              </Box>
                              <Box height="100%">
                                <img
                                  src={
                                    selectedDiamond.valuationReport
                                      .characteristic
                                  }
                                  alt=""
                                  height="auto"
                                  width="100%"
                                />
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                </TableContainer>
              </Box>
            ) : (
              <Typography></Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ValuationStaff_DiamondsAppraisal;
