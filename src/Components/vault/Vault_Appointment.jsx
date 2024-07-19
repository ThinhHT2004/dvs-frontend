import React, { Fragment, useEffect, useState, useRef } from "react";
import {
  Box,
  TableContainer,
  Table,
  TableBody,
  Paper,
  TableRow,
  TableCell,
  Grid,
  CardHeader,
  Chip,
  Collapse,
  List,
  ListItem,
  ListItemText,
  TableFooter,
  TablePagination,
  Typography,
  Button,
  Link,
  Dialog,
  DialogContent,
  styled,
} from "@mui/material";
import { vault_navigator } from "../staff/Naviate";
import StaffDrawer from "../staff/StaffDrawer";
import moment from "moment";
import { formatRequestId } from "../../Foramat";
import protectedApi from "../../APIs/ProtectedApi";
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { formatSampleId } from "../../Foramat";
import DiasecurStamp from "../../assets/DiasecurStamp.png";
import diasecurLogo from "../../assets/diasecurLogo.png";
import logoWeb from "../../assets/logo_v4.png";
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

const Vault = () => {
  const drawerWidth = 240;
  const customerId = sessionStorage.getItem("customerId");
  const [requests, setRequests] = useState([]);
  const [open, setOpen] = useState({});
  const [reportOpen, setReportOpen] = useState(false);
  const [selectedDiamond, setSelectedDiamond] = useState(null);
  const handleClick = (idRequest) => {
    setOpen((prev) => ({ ...prev, [idRequest]: !prev[idRequest] }));
  };
  const handleClose = () => {
    setReportOpen(false);
    setSelectedDiamond();
  };

  const handleReportClick = (diamond) => {
    setReportOpen(true);
    setSelectedDiamond(diamond);
  };
  const renderReportLink = (diamond) => {
    if (diamond.status === "APPROVED") {
      return (
        <Button>
          <Link
            href="#"
            onClick={() => handleReportClick(diamond)}
            underline="none"
          >
            View Report
          </Link>
        </Button>
      );
    } else {
      return (
        <Button disabled>
          <Link
            href="#"
            onClick={() => handleReportClick(diamond)}
            underline="none"
            sx={{ color: "grey" }}
          >
            View Report
          </Link>
        </Button>
      );
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
      case "WAITING":
        return "primary";
        break;
      case "FINISHED":
        return "success";
        break;
      case "SEALED":
        return "error";
        break;
      default:
        return "default";
        break;
    }
  };
  useEffect(() => {
    getRequests();
  }, []);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const sortedRequests = requests.sort((a, b) => {
    return new Date(b.requestDate) - new Date(a.requestDate);
  });
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const getRequests = () => {
    try {
      protectedApi.get("/customers/request/" + customerId).then((resp) => {
        setRequests(resp.data);
      });
    } catch (err) {
      console.log(err);
    }
  }
  const DottedLine = ({ label, value }) => {
    const labelRef = useRef(null);
    const valueRef = useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);
    const [valueWidth, setValueWidth] = useState(0);

    useEffect(() => {
      if (labelRef.current) {
        setLabelWidth(labelRef.current.offsetWidth);
      }
      if (valueRef.current) {
        setValueWidth(valueRef.current.offsetWidth);
      }
    }, [label, value]);

    const totalWidth = 500;
    const dotWidth = 6; 
    const remainingWidth = totalWidth - labelWidth - valueWidth;
    const numDots = Math.floor(remainingWidth / dotWidth);
    const dots = '.'.repeat(numDots);

    return (
      <Grid container alignItems="center" justifyContent="space-between" style={{ width: totalWidth }}>
        <Grid item>
          <Typography variant="h6" ref={labelRef}>
            {label}
          </Typography>
        </Grid>
        <Grid item style={{ flexGrow: 1 }}>
          <Typography variant="h6" style={{ textAlign: 'center' }}>
            {dots}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6" ref={valueRef}>
            {value}
          </Typography>
        </Grid>
      </Grid>
    );
  };
  const renderDiamondReport = (diamond) => (
    <Dialog
      open={reportOpen}
      onClose={() => handleClose()}
      maxWidth='lg'
      fullWidth={true}
    >
      <CardHeader
        title={`DIAMOND REPORT - ${formatSampleId(diamond.id)}`}
        titleTypographyProps={{
          variant: "h5",
          color: "white",
        }}
        sx={{ backgroundColor: "#30D5C8" }}

      />
      <DialogContent>
        <Box height="100%" width={'auto'} padding={5} sx={{userSelect: "none"}}>
          <Box>
            <Grid container>
              <Grid item xl={3} lg={3}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <img src={diasecurLogo} style={{ width: "180px", height: "auto", marginTop: -20, marginBottom: -20 }} />
              </Grid>
              <Grid item xl={9} lg={9} borderBottom={1}>
                <img src={logoWeb} style={{ width: "auto", height: "200px", marginTop: -70, marginBottom: -70 }} />
                <Typography variant="h5">
                  Diamond Appraisal
                </Typography>
                <Typography variant="h7">
                  Website: https://diasecur.systems - Email: diasecurappraiser@gmail.com - Phone: (+84)84913-5986
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <Typography variant="h3" align="center" fontWeight={'bold'} padding={1}>
              DIAMOND REPORT
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              padding={1}
            >
              <Typography>
                <span style={{ fontWeight: 'bold' }}>Date:</span>{" "}
                {moment(diamond.valuationReport.createdDate).format(
                  "YYYY-MM-DD"
                )}{" "}
              </Typography>
              <Typography>
                <span style={{ fontWeight: 'bold' }}>DAS Report:</span> {diamond.valuationReport.labId}
              </Typography>
            </Box>
            <Box padding={2}>
              <Typography variant="h4" fontWeight={'bold'}>Introduction</Typography>
              <Typography
                variant="h6"
                sx={{
                  wordBreak: 'break-word',
                  overflowWrap: 'break-word',
                  maxWidth: '100%',
                }}
                padding={1}
              >
                {diamond.valuationReport.note}
              </Typography>
            </Box>
            <Box padding={2}>
              <Grid container>
                <Grid item xl={7} lg={7}>
                  <Box>
                    <Box paddingBottom={2}>
                      <Typography variant="h4" fontWeight={'bold'}>Diamond Details</Typography>
                      <Box padding={1}>
                        <DottedLine label="Color Grade" value={diamond.valuationReport.color} />
                        <DottedLine label="Clarity Grade" value={diamond.valuationReport.clarity} />
                        <DottedLine label="Cut Grade" value={diamond.valuationReport.cut} />
                        <DottedLine label="Polish" value={diamond.valuationReport.polish} />
                      </Box>
                    </Box>
                    <Box paddingTop={2}>
                      <Typography variant="h4" fontWeight={'bold'}>Grading Details</Typography>
                      <Box padding={1}>
                        <DottedLine label="Color Grade" value={diamond.valuationReport.color} />
                        <DottedLine label="Clarity Grade" value={diamond.valuationReport.clarity} />
                        <DottedLine label="Cut Grade" value={diamond.valuationReport.cut} />
                        <DottedLine label="Polish" value={diamond.valuationReport.polish} />
                        <DottedLine label="Symmetry" value={diamond.valuationReport.symmetry} />
                        <DottedLine label="Culet" value={diamond.valuationReport.culet} />
                        <DottedLine label="Girdle" value={diamond.valuationReport.girdle} />
                        <DottedLine label="Table" value={diamond.valuationReport.table} />
                        <DottedLine label="Depth" value={diamond.valuationReport.depth} />
                        <DottedLine label="Fluorescence" value={diamond.valuationReport.fluorescence} />
                      </Box>
                    </Box>
                  </Box>

                </Grid>
                <Grid item xl={5} lg={5}>
                  <Box>
                    <Box>
                      <img
                        src={diamond.valuationReport.proportion}
                        style={{ width: "100%" }}
                      ></img>
                    </Box>
                    <Box>
                      <img
                        src={diamond.valuationReport.characteristic}
                        style={{ width: "100%" }}
                      ></img>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Typography variant="h5" fontWeight={'bold'} padding={1}>
                Estimated Retail Replacement Value
                ......................................................... $ {diamond.valuationReport.finalPrice}
              </Typography>
            </Box>
            <Box>
              <Box>
                <Grid container>
                  <Grid item xl={6} lg={6}
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >

                  </Grid>
                  <Grid item xl={6} lg={6}
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    marginTop={10}
                  >
                    <img src={DiasecurStamp} style={{ width: "150px", margin: 10 }} />
                    <Typography padding={1}>
                      2024-All Rights Reserved
                    </Typography>
                    <Typography>
                      DiAsecur Jewelry Appraisal
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
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
          "Vault",
          "Settings",
          "Calculate",
          "Check Certificates",
          "Diamonds Appraisal",
          "Sign Out",
        ]}
        state="Vault"
        handleClick={vault_navigator}
      />
      <Box
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Grid container>
          <Grid item lg={12} xl={12} md={12} sm={12} xs={12}>
            <TableContainer sx={{ borderRadius: 3 }} component={Paper}>
              <CardHeader
                title="REQUESTS"
                titleTypographyProps={{
                  variant: "h5",
                  color: "white",
                }}
                sx={{ backgroundColor: "#30D5C8" }}
              />
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{ fontSize: 20, width: 100, color: "#69CEE2" }}
                    >
                      Request ID
                    </TableCell>
                    <TableCell sx={{ fontSize: 20, width: 200, color: "#69CEE2" }}>
                      Service
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontSize: 20, width: 100, color: "#69CEE2" }}
                    >
                      Status
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontSize: 20, width: 180, color: "#69CEE2" }}
                    >
                      Appointment Date
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontSize: 20, width: 180, color: "#69CEE2" }}
                    >
                      Receive Date
                    </TableCell>
                    <TableCell sx={{ width: 100 }}></TableCell>
                  </TableRow>
                  {sortedRequests.map((row) => (
                    <Fragment key={row.id}>
                      <TableRow>
                        <TableCell align="center">
                          {formatRequestId(row.id)}
                        </TableCell>
                        <TableCell>{row.service.name}</TableCell>
                        <TableCell align="center">
                          <Chip
                            label={row.status}
                            color={renderRowStatus(row.status)}
                          />
                        </TableCell>
                        <TableCell align="center">
                          {moment(row.appointmentDate).format(
                            "yyyy-MM-DD hh:mm a"
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {row.receivingDate === null
                            ? "N/A"
                            : moment(row.receivingDate).format(
                              "yyyy-MM-DD hh:mm a"
                            )}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            sx={{ backgroundColor: "#69CEE2" }}
                            onClick={() => handleClick(row.id)}
                          >
                            {open[row.id] ? (
                              <KeyboardArrowUpIcon />
                            ) : (
                              <KeyboardArrowDownIcon />
                            )}
                          </IconButton>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ padding: 0 }} colSpan={6}>
                          <Collapse
                            in={open[row.id]}
                            sx={{ backgroundColor: "#F0F0F0" }}
                          >
                            <List disablePadding>
                              <Box>
                                <ListItem
                                  sx={{ borderBottom: 1, borderColor: "#c7ced9" }}
                                >
                                  <Grid container>
                                    <Grid item lg={6} xl={6}>
                                      <Typography variant="h6" sx={{ textAlign: "center" }}>
                                        Lab ID
                                      </Typography>
                                    </Grid>
                                    <Grid item lg={6} xl={6}></Grid>
                                  </Grid>
                                  <ListItemText />
                                </ListItem>
                                {row.valuationRequestDetailList.map((sample) => (
                                  <ListItem
                                    key={sample.id}
                                    sx={{ borderBottom: 1, borderColor: "#c7ced9" }}
                                  >
                                    <Grid container>
                                      <Grid item lg={6} xl={6}>
                                        <ListItemText
                                          primary={sample.valuationReport.labId ? sample.valuationReport.labId : "N/A"}
                                          sx={{ textAlign: "center" }}
                                        />
                                      </Grid>

                                      <Grid item lg={6} xl={6} sx={{ textAlign: "center" }}>
                                        {renderReportLink(sample)}
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
          <Grid item xl={12} lg={12}>
            {selectedDiamond && renderDiamondReport(selectedDiamond)}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Vault;
