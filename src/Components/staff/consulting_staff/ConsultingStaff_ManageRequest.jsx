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
import React, { Fragment, useState } from "react";
import StaffDrawer from "../StaffDrawer";
import { consulting_staff_navigator } from "../Naviate";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Label } from "@mui/icons-material";

const ConsultingStaff_ManageRequest = () => {
  const drawerWidth = 240;

  const [requestId, setRequestId] = useState("");

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

  const [returnPolish, setReturnPolish] = useState("");
  const [returnSymmetry, setReturnSymmetry] = useState("");
  const [returnClarity, setReturnClarity] = useState("");
  const [returnColorGrade, setReturnColorGrade] = useState("");
  const [returnShape, setReturnShape] = useState("");
  const [returnFluorescence, setReturnFluorescence] = useState("");

  const rows = [
    createData("#1212321", "Tan Thinh", "3h", 2, "1st June"),
    createData("#1212324", "Tuan Khang", "5h", 3, "12th Jyly"),
    createData("#1211321", "Truong Thinh", "3h", 2, "23th June"),
    createData("#4212321", "The Anh", "3h", 2, "2nd August"),
    createData("#1252321", "Moc Nguyen", "5h", 1, "3rd July"),
  ];

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

  function createData(
    requestId,
    customerName,
    service,
    quantity,
    appointmentDate
  ) {
    return {
      requestId,
      customerName,
      service,
      quantity,
      appointmentDate,
      sample: [
        {
          idSample: "#DA123",
          status: "FILLED",
        },
        {
          idSample: "#DA312",
          status: "EMPTY",
        },
      ],
    };
  }

  function displayBox(text) {
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
                  ></TextField>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <TextField
                    type="text"
                    placeholder="Depth"
                    fullWidth
                    variant="standard"
                  ></TextField>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <TextField
                    type="text"
                    placeholder="Table"
                    fullWidth
                    variant="standard"
                  ></TextField>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <TextField
                    type="text"
                    placeholder="Girdle"
                    fullWidth
                    variant="standard"
                  ></TextField>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <TextField
                    type="text"
                    placeholder="Culet"
                    fullWidth
                    variant="standard"
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
                      {clarityGrade.map((fl) => (
                        <MenuItem key={fl} value={fl}>
                          {fl}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
              <TableRow>
                <Box display={"flex"} justifyContent={"center"} sx={{marginTop: '5%'}}>
                  <Button variant="contained" sx={{marginRight: '10%'}}>Save</Button>
                  <Button variant="contained" color="error">Deny</Button>
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
          <TableCell>{row.requestId}</TableCell>
          <TableCell>{row.customerName}</TableCell>
          <TableCell>{row.service}</TableCell>
          <TableCell>{row.quantity}</TableCell>
          <TableCell>{row.appointmentDate}</TableCell>
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
                    {row.sample.map((sample) => (
                      <TableRow key={sample.idSample}>
                        <TableCell component="th" scope="row">
                          {sample.idSample}
                        </TableCell>
                        {changeColor(sample.status)}
                        <TableCell align="right">
                          <Button onClick={() => setRequestId(sample.idSample)}>
                            Edit Information
                          </Button>
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
              "Manage Request",
              "Report",
              "Form",
              "Sign Out",
            ]}
            state="Manage Request"
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
                    <TableCell>Appointment Date</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <Row key={row.requestId} row={row}></Row>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
        <Grid item xs={4}>
          {displayBox(requestId)}
        </Grid>
      </Grid>
    </div>
  );
};

export default ConsultingStaff_ManageRequest;
