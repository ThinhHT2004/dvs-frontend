import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Collapse,
  Button,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Card,
  CardHeader,
  CardContent,
  Input,
  ListItem,
  ListItemText,
  List,
  TableFooter,
  TablePagination,
  Menu,

} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import StaffDrawer from "../StaffDrawer";
import { consulting_staff_navigator } from "../Naviate";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import moment from "moment";
import { formatRequestId, formatSampleId } from "../../../Foramat";
import { useRequests } from "./RequestContext";
import protectedApi from "../../../APIs/ProtectedApi";
import { toast } from "sonner";
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import FilterListIcon from '@mui/icons-material/FilterList';
//TablePaginationActions
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange, onFilterChange } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setFilter] = useState('');

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

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    onFilterChange(value);
    handleMenuClose();
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5, display: 'flex' }}>
      <Button onClick={handleMenuOpen} startIcon={<FilterListIcon />}
        sx={{ textTransform: 'none', fontFamily: 'arial-label', fontSize: 16, color: '#000000DE' }}
      >
        Filter
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleFilterChange('')}>All</MenuItem>
        <MenuItem onClick={() => handleFilterChange('ACCEPTED')}>Accepted</MenuItem>
        <MenuItem onClick={() => handleFilterChange('RECEIVED')}>Received</MenuItem>
        <MenuItem onClick={() => handleFilterChange("PROCESSING")}>Processing</MenuItem>
      </Menu>
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
  onFilterChange: PropTypes.func.isRequired,
};
//End of TablePaginationActions

const ConsultingStaff_ManageRequest = () => {
  const drawerWidth = 240;
  const [filter, setFilter] = useState('');
  const [open, setOpen] = useState(false);
  const [proportionImage, setProportionImage] = useState(null);
  const [clarityImage, setClarityImage] = useState(null);
  const [diamondImage, setDiamondImage] = useState(null);
  const [requestId, setRequestId] = useState("");
  const [sampleId, setSampleId] = useState("");
  const polish = ["FAIR", "GOOD", "V.GOOD", "EX."];
  const symmetry = ["FAIR", "GOOD", "V.GOOD", "EX."];
  const cutGrade = ["FAIR", "GOOD", "V.GOOD", "EX."];
  const clarityGrade = ["SI2", "SI1", "VS2", "VS1", "VVS2", "VVS1", "IF", "FL"];
  const colorGrade = ["K", "J", "I", "H", "G", "F", "E", "D"];
  const fluorescence = ["VSTG", "STG", "MED", "FNT", "NON"];
  const shape = [
    "ROUND",
    "CUSHION",
    "EMERALD",
    "OVAL",
    "PRINCESS",
    "PEAR",
    "RADIANT",
    "MARQUISE",
    "ASSCHER",
    "HEART",
  ];
  const origin = ["LAB", "NATURAL"];
  const [measurement, setMeausurement] = useState("");
  const [caratWeight, setCaratWeight] = useState("");
  const [returnOrigin, setReturnOrigin] = useState("");
  const [returnPolish, setReturnPolish] = useState("");
  const [returnSymmetry, setReturnSymmetry] = useState("");
  const [returnClarity, setReturnClarity] = useState("");
  const [returnColorGrade, setReturnColorGrade] = useState("");
  const [returnCutGrade, setCutGrade] = useState("");
  const [returnShape, setReturnShape] = useState("");
  const [returnFluorescence, setReturnFluorescence] = useState("");
  const [table, setTable] = useState("");
  const [depth, setDepth] = useState("");
  const [girdle, setGirdle] = useState("");
  const [culet, setCulet] = useState("");
  const [proportionImageUrl, setProportionImageUrl] = useState("");
  const [clarityImageUrl, setClarityImageUrl] = useState("");
  const [diamondImageUrl, setDiamondImageUrl] = useState("");
  const { acceptedRequests, getAllAcceptedRequests } = useRequests([]);

  // Need to under the acceptedRequests data structure to implement the following function
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setPage(0); // Reset to first page when filter changes
  };
  //End of TablePaginationActions

  const valuationReport = {
    measurement: measurement,
    caratWeight: caratWeight,
    polish: returnPolish,
    symmetry: returnSymmetry,
    clarity: returnClarity,
    color: returnColorGrade,
    shape: returnShape,
    fluorescence: returnFluorescence,
    table: table,
    culet: culet,
    depth: depth,
    girdle: girdle,
    origin: returnOrigin,
    cut: returnCutGrade,
  };
  function checkFullFilled() {
    let check = true;
    for (let key in valuationReport) {
      if (valuationReport.hasOwnProperty(key)) {
        if (valuationReport[key] === "") {
          check = false;
          break;
        }
      }
    }
    if (proportionImage === null) {
      check = false;
    }
    if (clarityImage === null) {
      check = false;
    }
    if (diamondImage === null) {
      check = false;
    }

    return check;
  }

  async function saveReport(requestId, sampleId, valuationReport) {
    try {
      const resp = await protectedApi.put(
        "/reports/update/" +
        requestId +
        "/" +
        sampleId,
        valuationReport
      );
      const detail = await getValuationRequestDetail(sampleId);
      saveImage(detail.valuationReport.id);
      handleClose();
    } catch (err) {
      console.log(err);
    }
  }

  function saveImage(reportId) {
    const data = new FormData();
    data.append("file1", proportionImage);
    data.append("file2", clarityImage);
    data.append("file3", diamondImage);
    data.append("valuationReportId", reportId);
    protectedApi
      .post("/cloudinary/upload", data)
      .catch((err) => console.log(err));
  }

  async function getValuationRequestDetail(requestDetailId) {
    try {
      const resp = await protectedApi.get(
        "/request-detail/find/" + requestDetailId
      );
      return resp.data;
    } catch (err) {
      console.log(err);
    }
  }

  function displayEditButton(sample, requestId) {
    if (sample.status === "FILLING" || sample.status === "FILLED") {
      return (
        <Button
          onClick={() => {
            setSampleId(sample.id);
            setRequestId(requestId);
            handleOpen();
          }}
          sx={{ color: '#30D5C8' }}
        >
          Edit Information
        </Button>
      );
    } else {
      return (
        <Button
          onClick={() => {
            setSampleId(sample.id);
            setRequestId(requestId);
            handleOpen();
          }}
          disabled
        >
          Edit Information
        </Button>
      );
    }
  }

  async function denySample(sample) {
    try {
      await protectedApi.
        put("/request-detail/deny/" + sample.id)
        .then(resp => {
          toast.success("Sample Denied")
          getAllAcceptedRequests();
        })
    } catch (err) {
      console.log(err);
    }
  }

  function displayDenyButton(sample) {
    switch (sample.status) {
      case "FILLING":
        return (
          <Button
            color="error"
            onClick={() => denySample(sample)}
          >
            Deny
          </Button>
        );
        break;
      default:
        return (
          <Button
            color="error"
            disabled
          >
            Deny
          </Button>
        );
        break;
    }
  }
  const handleClose = () => {
    setOpen(false);
    setMeausurement("");
    setCaratWeight("");
    setReturnOrigin("");
    setReturnPolish("");
    setReturnSymmetry("");
    setReturnClarity("");
    setReturnColorGrade("");
    setReturnShape("");
    setReturnFluorescence("");
    setTable("");
    setDepth("");
    setGirdle("");
    setCulet("");
    setCutGrade("");
    setProportionImageUrl("");
    setClarityImageUrl("");
    setDiamondImageUrl("");
    getAllAcceptedRequests();
  };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleProportionImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProportionImage(file);
      setProportionImageUrl(URL.createObjectURL(file));
      checkFullFilled();
    }
  };
  const handleDiamondImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setDiamondImage(file);
      setDiamondImageUrl(URL.createObjectURL(file));
      checkFullFilled();
    }
  };
  const handleClarityImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setClarityImage(file);
      setClarityImageUrl(URL.createObjectURL(file));
      checkFullFilled();
    }
  };
  const renderRowStatus = (status) => {
    switch (status) {
      case "PROCESSING":
        return "warning";
        break;
      case "RECEIVED":
        return "info";
        break;
      case "ACCEPTED":
        return "success";
        break;
      case "COMPLETED":
        return "info";
        break;
      case "FINISHED":
        return "success";
        break;
      case "SEALED":
        return "error";
        break;
    }
  };

  const renderSampleStatus = (status) => {
    switch (status) {
      case "ASSIGNED":
        return "secondary";
        break;
      case "FILLING":
        return "primary";
        break;
      case "FILLED":
        return "primary";
        break;
      case "APPROVED":
        return "success";
        break;
      case "VALUATED":
        return "secondary";
        break;
      case "WAITING":
        return "primary";
        break;
      case "DENIED":
        return "error";
        break;
    }
  };

  function displayBox(text, requestId) {
    if (text !== "") {
      { console.log(requestId) }
      return (

        <Card component={Paper}>
          <CardHeader
            title={`SAMPLE ID: ${formatSampleId(text)}`}
            titleTypographyProps={{
              variant: 'h5',
              color: 'white',
            }}
            sx={{ backgroundColor: '#30D5C8' }}
          />
          <Grid container spacing={0}>
            <Grid item lg={6} borderRight={1}>
              <Card
                variant="outlined"
                sx={{
                  flex: 1,
                  borderRadius: 0,
                  height: "100%",
                  border: 0,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box borderBottom={1}>
                  <Box>
                    <CardHeader title="Grading" />
                    <CardContent>
                      <Box>
                        <Box padding={2}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <TextField
                                type="text"
                                placeholder="Measurements"
                                variant="standard"
                                fullWidth
                                onChange={(e) => {
                                  setMeausurement(e.target.value);
                                  checkFullFilled();
                                }}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                type="text"
                                placeholder="Carat Weight"
                                variant="standard"
                                fullWidth
                                onChange={(e) => {
                                  setCaratWeight(e.target.value);
                                  checkFullFilled();
                                }}
                              />
                            </Grid>
                          </Grid>
                        </Box>
                        <Box padding={2}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <FormControl fullWidth required>
                                <InputLabel>Origin</InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={returnOrigin}
                                  label="Origin"
                                  onChange={(e) => {
                                    setReturnOrigin(e.target.value);
                                    checkFullFilled();
                                  }}
                                >
                                  {origin.map((sh) => (
                                    <MenuItem key={sh} value={sh}>
                                      {sh}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                              <FormControl fullWidth>
                                <InputLabel>Shape</InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={returnShape}
                                  label="Shape"
                                  onChange={(e) => {
                                    setReturnShape(e.target.value);
                                    checkFullFilled();
                                  }}
                                >
                                  {shape.map((sh) => (
                                    <MenuItem key={sh} value={sh}>
                                      {sh}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box padding={2}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <FormControl fullWidth>
                                <InputLabel>Color</InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={returnColorGrade}
                                  label="Color"
                                  onChange={(e) => {
                                    setReturnColorGrade(e.target.value);
                                    checkFullFilled();
                                  }}
                                >
                                  {colorGrade.map((col) => (
                                    <MenuItem key={col} value={col}>
                                      {col}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                              <FormControl fullWidth>
                                <InputLabel>Clarity</InputLabel>
                                <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={returnClarity}
                                  label="Symmetry"
                                  onChange={(e) => {
                                    setReturnClarity(e.target.value);
                                    checkFullFilled();
                                  }}
                                >
                                  {clarityGrade.map((sym) => (
                                    <MenuItem key={sym} value={sym}>
                                      {sym}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                    </CardContent>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                  <Grid container spacing={0} sx={{ flex: 1 }}>
                    <Grid
                      item
                      lg={6}
                      sx={{ flex: 1, display: "flex", flexDirection: "column" }}
                    >
                      <CardHeader title="Clarity Characteristics" />
                      <CardContent
                        sx={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Box padding={2}>
                          <Input
                            type="file"
                            onChange={handleClarityImageUpload}
                          />
                        </Box>
                        <Box
                          padding={2}
                          sx={{
                            flex: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {clarityImageUrl && (
                            <img
                              src={clarityImageUrl}
                              alt="Clarity Characteristics"
                              style={{ width: "100%", height: "auto" }}
                            />
                          )}
                        </Box>
                      </CardContent>
                    </Grid>
                    <Grid
                      item
                      lg={6}
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        borderLeft: 1,
                      }}
                    >
                      <CardHeader title="Diamond Picture" />
                      <CardContent
                        sx={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Box padding={2}>
                          <Input
                            type="file"
                            onChange={handleDiamondImageUpload}
                          />
                        </Box>
                        <Box
                          padding={2}
                          sx={{
                            flex: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          {diamondImageUrl && (
                            <img
                              src={diamondImageUrl}
                              alt="Diamond Picture"
                              style={{ width: "100%", height: "auto" }}
                            />
                          )}
                        </Box>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </Grid>
            <Grid item lg={6}>
              <Card variant="outlined" sx={{ borderRadius: 0, border: 0 }}>
                <Box borderBottom={1}>
                  <CardHeader title="Finish" />
                  <CardContent>
                    <Box padding={2}>
                      <Grid container spacing={2}>
                        <Grid item lg={6}>
                          <FormControl fullWidth>
                            <InputLabel>Polish</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={returnPolish}
                              label="Polish"
                              onChange={(e) => {
                                setReturnPolish(e.target.value);
                                checkFullFilled();
                              }}
                            >
                              {polish.map((pol) => (
                                <MenuItem key={pol} value={pol}>
                                  {pol}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item lg={6}>
                          <FormControl fullWidth>
                            <InputLabel>Symmetry</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={returnSymmetry}
                              label="Symmetry"
                              onChange={(e) => {
                                setReturnSymmetry(e.target.value);
                                checkFullFilled();
                              }}
                            >
                              {symmetry.map((sym) => (
                                <MenuItem key={sym} value={sym}>
                                  {sym}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box padding={2}>
                      <Grid container spacing={2}>
                        <Grid item lg={6}>
                          <FormControl fullWidth>
                            <InputLabel>Fluorescence</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={returnFluorescence}
                              label="Fluorescence"
                              onChange={(e) => {
                                setReturnFluorescence(e.target.value);
                                checkFullFilled();
                              }}
                            >
                              {fluorescence.map((fl) => (
                                <MenuItem key={fl} value={fl}>
                                  {fl}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>

                        <Grid item lg={6}>
                          <FormControl fullWidth>
                            <InputLabel>Cut</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={returnCutGrade}
                              label="Cut"
                              onChange={(e) => {
                                setCutGrade(e.target.value);
                                checkFullFilled();
                              }}
                            >
                              {cutGrade.map((cut) => (
                                <MenuItem key={cut} value={cut}>
                                  {cut}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Box>
                  </CardContent>
                </Box>

                <Box>
                  <CardHeader title="Proportions" />
                  <CardContent sx={{ paddingBottom: "0px" }}>
                    <Box padding={2}>
                      <Grid container spacing={2}>
                      <Grid item lg={6} container>
                          <Grid item xl={12} lg={12}>
                            <TextField
                              type="text"
                              placeholder="Depth"
                              variant="standard"
                              fullWidth
                              sx={{ padding: 2 }}
                              onChange={(e) => setDepth(e.target.value)}
                            />
                          </Grid>
                          <Grid item xl={12} lg={12}>
                            <TextField
                              type="text"
                              placeholder="Table"
                              variant="standard"
                              fullWidth
                              sx={{ padding: 2 }}
                              onChange={(e) => setTable(e.target.value)}
                            />
                          </Grid>
                          <Grid item xl={12} lg={12}>
                            <TextField
                              type="text"
                              placeholder="Girdle"
                              variant="standard"
                              fullWidth
                              sx={{ padding: 2 }}
                              onChange={(e) => setGirdle(e.target.value)}
                            />
                          </Grid>
                          <Grid item xl={12} lg={12}>
                            <TextField
                              type="text"
                              placeholder="Culet"
                              variant="standard"
                              fullWidth
                              sx={{ padding: 2 }}
                              onChange={(e) => setCulet(e.target.value)}
                            />
                          </Grid>
                        </Grid>
                        <Grid item lg={6}>
                          <Box padding={2}>
                            <Input
                              type="file"
                              onChange={handleProportionImageUpload}
                            />
                          </Box>
                          <Box padding={2}
                            sx={{
                              flex: 1,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {proportionImageUrl && (
                              <img
                                src={proportionImageUrl}
                                alt="Proportions"
                                style={{ width: "100%", height: "auto" }}
                              />
                            )}
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box display={"flex"} justifyContent={"right"} padding={2} marginTop={6}>
                      <Button
                        variant="contained"
                        sx={{ backgroundColor: "#69CEE2" }}
                        onClick={() =>
                          saveReport(requestId, text, valuationReport)
                        }
                        disabled={!checkFullFilled()}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        sx={{ marginLeft: 2, color: "red", borderColor: "red" }}
                        onClick={() => handleClose()}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Card>
      );
    } else {
    }
  }
  // Sort and Filter
  const filteredStatusRequests = acceptedRequests.filter(request =>
    request.status !== 'FINISHED'
  );
  const statusOrder = ['ACCEPTED', 'RECEIVED', 'PROCESSING'];
  const sortedRequests = filteredStatusRequests.sort((a, b) => {
    const statusComparison = statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
    if (statusComparison !== 0) return statusComparison;
    return new Date(b.requestDate) - new Date(a.requestDate);
  });
  const filteredRequests = sortedRequests.filter((request) => {
    if (!filter) return true;
    console.log(filter);
    return request.status === filter;
  });
  useEffect(() => {
    getAllAcceptedRequests();
  }, []);

  function Row(props) {
    const { row } = props;
    const [openCollapse, setOpenCollapse] = useState(false);

    return (
      <Fragment>
        <TableRow sx={{ backgroundColor: "white" }}>
          <TableCell align="center">{formatRequestId(row.id)}</TableCell>
          <TableCell>{row.customer.last_name} {row.customer.first_name}</TableCell>
          <TableCell>{row.service.name}</TableCell>
          <TableCell align="center">{row.quantity}</TableCell>
          <TableCell align="center">
            <Chip label={row.status} color={renderRowStatus(row.status)}></Chip>
          </TableCell>
          <TableCell align="center">
            <Chip color="primary" size="small" label={moment(row.appointmentDate).format("yyyy-MM-DD hh:mm A")}>
            </Chip>
          </TableCell>
          <TableCell align="center">
            <IconButton
              sx={{ backgroundColor: "#69CEE2" }}
              size="small"
              onClick={() => setOpenCollapse(!openCollapse)}
            >
              {openCollapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow sx={{ border: 0 }} >
          <TableCell style={{ padding: 0, border: 0 }} colSpan={7}>
            <Collapse in={openCollapse}>
              <List disablePadding >
                <Box>
                  <ListItem sx={{ borderBottom: 1, borderColor: "#c7ced9" }}>
                    <Grid container>
                      <Grid item lg={3} xl={3}>
                        <Typography variant="h6" sx={{ textAlign: 'center' }}>Sample ID</Typography>
                      </Grid>
                      <Grid item lg={3} xl={3}>
                        <Typography variant="h6" sx={{ textAlign: 'center' }}>Status</Typography>
                      </Grid>
                    </Grid>
                    <ListItemText />
                  </ListItem>
                  {row.valuationRequestDetailList.map((sample) => (
                    <ListItem key={sample.id} sx={{ borderBottom: 1, borderColor: "#c7ced9" }}>
                      <Grid container>
                        <Grid item lg={3} xl={3}>
                          <ListItemText primary={formatSampleId(sample.id)} sx={{ textAlign: 'center' }} />
                        </Grid>
                        <Grid item lg={3} xl={3}>
                          <ListItemText sx={{ textAlign: 'center' }}>
                            <Chip
                              label={sample.status}
                              color={renderSampleStatus(sample.status)}
                              size="small"
                            ></Chip>
                          </ListItemText>
                        </Grid>
                        <Grid item lg={3} xl={3}>
                          <ListItemText primary={displayEditButton(sample, row.id)} sx={{ textAlign: 'center' }} />
                        </Grid>
                        <Grid item lg={3} xl={3}>
                          <ListItemText primary={displayDenyButton(sample, row.id)} sx={{ textAlign: 'center' }} />
                        </Grid>
                      </Grid>
                    </ListItem>

                  ))}

                </Box>
              </List>
            </Collapse>
          </TableCell>
        </TableRow>

      </Fragment>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#FAF6EF",
        width: "100%", minHeight: "100vh"

      }}
    >
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
          state="Request"
          handleClick={consulting_staff_navigator}
        ></StaffDrawer>
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
        <Grid container spacing={2}>
          <Grid item lg={12}>
            <Box>
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
                      <TableCell sx={{ fontSize: 20, width: 250, color: '#69CEE2' }}>Customer Name</TableCell>
                      <TableCell sx={{ fontSize: 20, width: 250, color: '#69CEE2' }}>Service</TableCell>
                      <TableCell sx={{ fontSize: 20, width: 100, color: '#69CEE2' }} align="center">Quantity</TableCell>
                      <TableCell sx={{ fontSize: 20, width: 150, color: '#69CEE2' }} align="center">Status</TableCell>
                      <TableCell sx={{ fontSize: 20, width: 250, color: '#69CEE2' }} align="center">Appointment Date</TableCell>
                      <TableCell sx={{ width: 100 }}></TableCell>
                    </TableRow>
                    {(rowsPerPage > 0 ? filteredRequests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : filteredRequests).map((row) => (
                      <Row key={row.id} row={row} />
                    ))}
                    {/* check emptyRows */}
                  </TableBody>
                  {/* TablePagination need to be in the Table component and out of the TableBody */}
                  <TableFooter>
                    <TableRow sx={{ backgroundColor: "white" }}>

                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        colSpan={7}
                        count={filteredRequests.length}
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
                        ActionsComponent={(subprops) => <TablePaginationActions {...subprops} onFilterChange={handleFilterChange} />}
                      />

                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Box>
          </Grid>
          <Grid item lg={12}>
            {open && displayBox(sampleId, requestId)}
          </Grid>
        </Grid>
      </Box>
    </Box>

  );
};

export default ConsultingStaff_ManageRequest;
