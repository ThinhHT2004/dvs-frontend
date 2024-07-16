import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Collapse,
  Typography,
  Link,
  Grid,
  Button,
  Dialog,
  DialogContent,
  CardHeader,
  Chip,
  List,
  ListItem,
  ListItemText,
  TableFooter,
  TablePagination,
} from "@mui/material";
import React, { Fragment, useEffect, useState, useRef } from "react";
import StaffDrawer from "../StaffDrawer";
import { consulting_staff_navigator } from "../Naviate";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { formatRequestId, formatSampleId } from "../../../Foramat";
import logoWeb from "../../../assets/logo_v4.png";
import moment from "moment";
import protectedApi from "../../../APIs/ProtectedApi";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import DiasecurStamp from "../../../assets/DiasecurStamp.png";
import diasecurLogo from "../../../assets/diasecurLogo.png";
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
const drawerWidth = 240;

const ConsultingStaff_Report = () => {
  const [open, setOpen] = useState({});
  const [reportOpen, setReportOpen] = useState(false);
  const [selectedDiamond, setSelectedDiamond] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState();
  const [requests, setRequests] = useState([]);
  const pdfRef = useRef();

  useEffect(() => {
    getRequests();
  }, []);

  const generatePdf = () => {
    const input = pdfRef.current;
    html2canvas(input, { useCORS: true, logging: true, allowTaint: true }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

      // Create a Blob from the PDF
      const pdfBlob = pdf.output('blob');

      // Create a URL for the Blob and open it in a new window
      const pdfUrl = URL.createObjectURL(pdfBlob);
      window.open(pdfUrl);
    }).catch(error => {
      console.error('Error generating PDF:', error);
    });
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
  const getRequests = () => {
    protectedApi
      .get("/request/valuation-request/status/PROCESSING/COMPLETED")
      .then((resp) => {
        setRequests(resp.data)
        console.log(resp.data)
      })
      .catch((err) => console.log(err));
  };

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

  const renderStatus = (status) => {
    switch (status) {
      case "PROCESSING":
        return "warning";
      case "COMPLETED":
        return "info";
    }
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
        action={
          <Button onClick={generatePdf} sx={{ color: 'white' }}>
            View PDF
          </Button>
        }
      />
      {console.log(diamond.valuationReport)}
      <DialogContent>
        <Box height="100%" width={'auto'} padding={5} ref={pdfRef}>
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
            <Typography variant="h4" align="center" fontWeight={'bold'} padding={1}>
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
              <Typography variant="h5" fontWeight={'bold'}>Introduction</Typography>
              <Typography>
                {diamond.valuationReport.note}
              </Typography>
            </Box>
            <Box padding={2}>
              <Grid container>
                <Grid item xl={7} lg={7}>
                  <Box>
                    <Box >
                      <Typography variant="h5" fontWeight={'bold'}>Diamond Details</Typography>
                      <Typography variant="h6" padding={1}>
                        Shape
                        .........................................{" "}
                        {diamond.valuationReport.shape}
                      </Typography>
                      <Typography variant="h6" padding={1}>
                        Carat Weight
                        .........................................{" "}
                        {diamond.valuationReport.caratWeight}
                      </Typography>
                      <Typography variant="h6" padding={1}>
                        Measurement
                        ........................................{" "}
                        {diamond.valuationReport.measurement}
                      </Typography>
                      <Typography variant="h6" padding={1}>
                        Origin
                        ..............................................{" "}
                        {diamond.valuationReport.origin}
                      </Typography>
                    </Box>
                    <Box paddingTop={1}>
                      <Typography variant="h5" fontWeight={'bold'}>Grading Details</Typography>
                      <Typography variant="h6" padding={1}>
                        Color Grade
                        ...........................................{" "}
                        {diamond.valuationReport.color}
                      </Typography>
                      <Typography variant="h6" padding={1}>
                        Clarity Grade
                        .........................................{" "}
                        {diamond.valuationReport.clarity}
                      </Typography>
                      <Typography variant="h6" padding={1}>
                        Cut Grade
                        ........................................{" "}
                        {diamond.valuationReport.cut}
                      </Typography>
                      <Typography variant="h6" padding={1}>
                        Polish
                        ........................................{" "}
                        {diamond.valuationReport.polish}
                      </Typography>
                      <Typography variant="h6" padding={1}>
                        Symmetry
                        ........................................{" "}
                        {diamond.valuationReport.symmetry}
                      </Typography>
                      <Typography variant="h6" padding={1}>
                        Culet
                        ..............................................{" "}
                        {diamond.valuationReport.culet}
                      </Typography>
                      <Typography variant="h6" padding={1}>
                        Girdle
                        ............................................{" "}
                        {diamond.valuationReport.girdle}
                      </Typography>
                      <Typography variant="h6" padding={1}>
                        Table
                        ..............................................{" "}
                        {diamond.valuationReport.table}
                      </Typography>
                      <Typography variant="h6" padding={1}>
                        Depth
                        ..............................................{" "}
                        {diamond.valuationReport.depth}
                      </Typography>
                      <Typography variant="h6" padding={1}>
                        Fluorescence
                        .....................................{" "}
                        {diamond.valuationReport.fluorescence}
                      </Typography>
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
          state="Report"
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
        <Grid container spacing={2}>
          <Grid item xl={12} lg={12}>
            <TableContainer sx={{ borderRadius: 3 }} component={Paper}>
              <CardHeader
                title="MANAGE REPORTS"
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
                    <TableCell sx={{ fontSize: 20, width: 200, color: "#69CEE2" }}>
                      Customer Name
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: 20, width: 200, color: "#69CEE2" }}
                      align="center"
                    >
                      Status
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: 20, width: 200, color: "#69CEE2" }}
                      align="center"
                    >
                      Receiving Date
                    </TableCell>
                    <TableCell sx={{ width: 100 }}></TableCell>
                  </TableRow>

                  {requests.map((request) => (
                    <Fragment key={request.id}>
                      <TableRow>
                        <TableCell align="center">
                          {formatRequestId(request.id)}
                        </TableCell>
                        <TableCell>
                          {request.customer.last_name} {request.customer.first_name}
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={request.status}
                            color={renderStatus(request.status)}
                          ></Chip>
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            color="primary"
                            size="small"
                            label={moment(request.receivingDate).format(
                              "yyyy-MM-DD hh:mm A"
                            )}
                          ></Chip>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            aria-label="expand row"
                            size="small"
                            sx={{ backgroundColor: "#69CEE2" }}
                            onClick={() => handleClick(request.id)}
                          >
                            {open[request.id] ? (
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
                            in={open[request.id]}
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
                                        Sample ID
                                      </Typography>
                                    </Grid>
                                    <Grid item lg={6} xl={6}></Grid>
                                  </Grid>
                                  <ListItemText />
                                </ListItem>
                                {request.valuationRequestDetailList.map((sample) => (
                                  <ListItem
                                    key={sample.id}
                                    sx={{ borderBottom: 1, borderColor: "#c7ced9" }}
                                  >
                                    <Grid container>
                                      <Grid item lg={6} xl={6}>
                                        <ListItemText
                                          primary={formatSampleId(sample.id)}
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
          </Grid>
          <Grid item xl={12} lg={12}>
            {selectedDiamond && renderDiamondReport(selectedDiamond)}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ConsultingStaff_Report;
