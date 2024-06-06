import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Collapse,
  Link,
  Button,
  Grid,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import StaffDrawer from "../StaffDrawer";
import { consulting_staff_navigator } from "../Naviate";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Label } from "@mui/icons-material";
import axios from "axios";
import moment from "moment";
import '../../staff/StaffStyle.css'
const ConsultingStaff_ManageRequest = () => {
  const drawerWidth = 240;
  const staffId = 3;

  const [requestId, setRequestId] = useState("");
  const [sampleId, setSampleId] = useState("");

  const polish = ["FAIR", "GOOD", "V.GOOD", "EX."];
  const symmetry = ["FAIR", "GOOD", "V.GOOD", "EX."];
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


  const [measurement, setMeausurement] = useState("");
  const [caratWeight, setCaratWeight] = useState("");
  const [returnPolish, setReturnPolish] = useState("");
  const [returnSymmetry, setReturnSymmetry] = useState("");
  const [returnClarity, setReturnClarity] = useState("");
  const [returnColorGrade, setReturnColorGrade] = useState("");
  const [returnShape, setReturnShape] = useState("");
  const [returnFluorescence, setReturnFluorescence] = useState("");
  const [rows, setRows] = useState([]);

  const valuationReport = {measurement: measurement, caratWeight: caratWeight, 
                        polish: returnPolish, symmetry: returnSymmetry, clarity: returnClarity,
                        color: returnColorGrade, shape: returnShape, fluorescence: returnFluorescence};


  useEffect(() => {
    getAcceptedRequest();
  }, []);

  function getAcceptedRequest() {
    axios
      .get(
        "http://localhost:8080/api/request/valuation-request/not/" +
          staffId +
          "/WAITING"
      )
      .then((resp) => setRows(resp.data))
      .catch((err) => console.log(err));
  }

  function saveReport(requestId, sampleId, report){
    axios
      .put("http://localhost:8080/api/reports/update/" + requestId + "/" + sampleId, report)
      .then(resp => console.log(resp.data))
      .catch(err => console.log(err));
  }

  function changeColor(text) {
    if (text === "EMPTY") {
      return (
        <TableCell align="right" sx={{ color: "grey" }}>
          {text}
        </TableCell>
      );
    } else {
      return (
        <TableCell align="right" sx={{ color: "green" }}>
          {text}
        </TableCell>
      );
    }
  }

  function displayButton(status, sample, requestId) {
    if (status !== "ACCEPTED") {
      return (
        <Button onClick={() => {setSampleId(sample.id); setRequestId(requestId)}}>
          Edit Information
        </Button>
      );
    } else {
      return (
        <Button onClick={() => {setSampleId(sample.id); setRequestId(requestId)}} disabled>
          Edit Information
        </Button>
      );
    }
  }

  function displayBox(text, requestId) {
    if (text !== "") {
      return (
        <Box
          sx={{
            width: 485,
            marginTop: "10%",
            marginRight: 100,
            display: "flex",
            justifyContent: "center",
            p: 3,
            border: 1,
          }}
        >
          <Table>
            <TableHead>
              <TableRow>{text}</TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <TextField
                    type="text"
                    placeholder="Measurements"
                    fullWidth
                    variant="standard"
                    onChange={(e) => setMeausurement(e.target.value)}
                  ></TextField>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <TextField
                    type="text"
                    placeholder="Carat Weight"
                    fullWidth
                    variant="standard"
                    onChange={(e) => setCaratWeight(e.target.value)}
                  ></TextField>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <FormControl sx={{ width: "33.33%" }}>
                    <InputLabel>Polish</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={returnPolish}
                      label="Polish"
                      onChange={(e) => setReturnPolish(e.target.value)}
                    >
                      {polish.map((pol) => (
                        <MenuItem key={pol} value={pol}>
                          {pol}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ width: "33.33%" }}>
                    <InputLabel>Symmetry</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={returnSymmetry}
                      label="Symmetry"
                      onChange={(e) => setReturnSymmetry(e.target.value)}
                    >
                      {symmetry.map((sym) => (
                        <MenuItem key={sym} value={sym}>
                          {sym}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ width: "33.33%" }}>
                    <InputLabel>Shape</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={returnShape}
                      label="Shape"
                      onChange={(e) => setReturnShape(e.target.value)}
                    >
                      {shape.map((sh) => (
                        <MenuItem key={sh} value={sh}>
                          {sh}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <FormControl sx={{ width: "33.33%" }}>
                    <InputLabel>Clarity</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={returnClarity}
                      label="Symmetry"
                      onChange={(e) => setReturnClarity(e.target.value)}
                    >
                      {clarityGrade.map((sym) => (
                        <MenuItem key={sym} value={sym}>
                          {sym}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ width: "33.33%" }}>
                    <InputLabel>Color</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={returnColorGrade}
                      label="Color"
                      onChange={(e) => setReturnColorGrade(e.target.value)}
                    >
                      {colorGrade.map((col) => (
                        <MenuItem key={col} value={col}>
                          {col}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ width: "33.33%" }}>
                    <InputLabel>Fluorescence</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={returnFluorescence}
                      label="Fluorescence"
                      onChange={(e) => setReturnFluorescence(e.target.value)}
                    >
                      {fluorescence.map((fl) => (
                        <MenuItem key={fl} value={fl}>
                          {fl}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
              <TableRow>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  sx={{ marginTop: "5%" }}
                >
                  <Button variant="contained" sx={{ marginRight: "10%" }} onClick={() => saveReport(requestId, text, valuationReport)}>
                    Save
                  </Button>
                  <Button variant="contained" color="error">
                    Cancel
                  </Button>
                </Box>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      );
    } else {
    }
  }

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);

    return (
      <Fragment>
        <TableRow>
          <TableCell>{row.id}</TableCell>
          <TableCell>{row.customer.first_name}</TableCell>
          <TableCell>{row.service.duration}</TableCell>
          <TableCell>{row.quantity}</TableCell>
          <TableCell className="status">{row.status}</TableCell>
          <TableCell>{moment(row.appointmentDate).format("Do, MMM")}</TableCell>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID Sample</TableCell>
                      <TableCell align="right">Status</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.valuationRequestDetailList.map((sample) => (
                      <TableRow key={sample.id}>
                        <TableCell component="th" scope="row">
                          {sample.id}
                        </TableCell>
                        {changeColor(sample.status)}
                        <TableCell align="right">
                          {displayButton(row.status, sample, row.id)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </Fragment>
    );
  }

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <StaffDrawer
            mylist={[
              "Home",
              "Incomming Request",
              "Request",
              "Report",
              "Form",
              "Sign Out",
            ]}
            state="Request"
            handleClick={consulting_staff_navigator}
          ></StaffDrawer>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              flexGrow: 1,
              p: 3,
              width: 700,
              marginTop: "5%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TableContainer component={Paper} sx={{ width: "100%" }}>
              <Table sx={{ minWidth: 300, borderRadius: 10 }}>
                <TableHead sx={{ backgroundColor: "#69CEE2" }}>
                  <TableRow>
                    <TableCell>Request ID</TableCell>
                    <TableCell>Customer Name</TableCell>
                    <TableCell>Service</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Appointment Date</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <Row key={row.id} row={row}></Row>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
        <Grid item xs={4}>
          {displayBox(sampleId, requestId)}
        </Grid>
      </Grid>
    </div>
  );
};

export default ConsultingStaff_ManageRequest;
