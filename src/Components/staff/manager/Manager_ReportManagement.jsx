import React, { useState, useCallback, useEffect } from "react";
import {
  Box,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Collapse,
  Button,
  FormControl,
  InputLabel,
  InputBase,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { manager_navigator } from "../Naviate";
import StaffDrawer from "../StaffDrawer";
import axios from "axios";
import { formatPrice, formatSampleId } from "../../../Foramat";

const Manager_ReportManagement = () => {
  const [samples, setSamples] = useState([]);
  const [editPriceOpen, setEditPriceOpen] = useState(false);
  const [currentDiamond, setCurrentDiamond] = useState();
  const [finalPrice, setFinalPrice] = useState(0);
  const drawerWidth = 240;

  useEffect(() => {
    getSamples();
  }, []);

  const handleEditPriceClick = (diamond) => {
    setCurrentDiamond(diamond);
    setEditPriceOpen(true);
  };

  const handleMaxPrice = (diamond) =>{
    let max = diamond.assignmentList[0].price;
    for(let i = 1; i < diamond.assignmentList.length; ++i){
        if(diamond.assignmentList[i].price > max){
            max = diamond.assignmentList[i].price
        }
    }
    return max
  }

  const handleMinPrice = (diamond) =>{
    let min = diamond.assignmentList[0].price;
    for(let i = 1; i < diamond.assignmentList.length; ++i){
        if(diamond.assignmentList[i].price < min){
            min = diamond.assignmentList[i].price
        }
    }
    return min;
  }

  const handleAverage = (diamond) =>{
    let avg = 0;
    for(let i = 0; i < diamond.assignmentList.length; ++i){
        avg += diamond.assignmentList[i].price;
    }

    avg /= diamond.assignmentList.length;
    avg = avg.toFixed(2);
    return avg;
  }

  const handleSave = (diamond) =>{
    diamond.valuationReport.finalPrice = finalPrice;
    diamond.valuationReport.createdDate = new Date();
    axios
    .put("http://localhost:8080/api/request-detail/update", diamond)
    .then(resp => console.log(resp.data))
    .catch(err => console.log(err));

    handleCancel();
  }


  const handleCancel = () =>{
    setEditPriceOpen(false);
    setCurrentDiamond();
    setFinalPrice(0);
  }

  const getSamples = () => {
    axios
      .get("http://localhost:8080/api/request-detail/VALUATED")
      .then((resp) => setSamples(resp.data))
      .catch((err) => console.log(err));
  };

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  }));
  const handleFinalPriceChange = useCallback(
    (event) => {
      setCurrentDiamond({ ...currentDiamond, final_price: event.target.value });
    },
    [currentDiamond]
  );

  return (
    <div>
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
          mylist={["Home", "Pending Request", "Receipt", "Report", "Sign Out"]}
          state="Report"
          handleClick={manager_navigator}
        ></StaffDrawer>
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <TableContainer
            component={Paper}
            sx={{ width: "65%", marginRight: "8px" }}
          >
            <Table sx={{ minWidth: 550, borderRadius: 10 }}>
              <TableHead sx={{ backgroundColor: "#30D5C8" }}>
                <TableRow>
                  <TableCell style={{ width: "33%" }}>Sample ID</TableCell>
                  <TableCell style={{ width: "33%" }}>Status</TableCell>
                  <TableCell style={{ width: "33%" }}></TableCell>
                </TableRow>
              </TableHead>
              <React.Fragment>
                <TableBody>
                  {samples.map((sample) => (
                    <TableRow key={sample.id}>
                      <TableCell style={{ width: "25%" }}>
                        {formatSampleId(sample.id)}
                      </TableCell>

                      <TableCell>{sample.status}</TableCell>
                      <TableCell style={{ width: "25%" }}>
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
                  ))}
                </TableBody>
              </React.Fragment>
            </Table>
          </TableContainer>
          {editPriceOpen && (
            <Box>
              <TableContainer component={Paper} sx={{ width: "100%" }}>
                <Table sx={{ minWidth: 300, borderRadius: 10 }}>
                  <TableHead sx={{ backgroundColor: "#69CEE2" }}>
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        sx={{ color: "white", fontSize: "25px" }}
                      >
                        {formatSampleId(currentDiamond.id)}
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {currentDiamond.assignmentList.map((assignment) => (
                      <TableRow>
                        <TableCell>
                          {assignment.valuationStaff.firstName} Price:{" "}
                          {assignment.price}$
                        </TableCell>
                      </TableRow>
                    ))}

                    <TableRow sx={{ mb: -2, p: 0 }}>
                      <TableCell
                        sx={{
                          borderBottom: "none",
                          display: "flex",
                          alignItems: "center",
                          p: 0,
                          pl: 2,
                        }}
                      >
                        <div style={{ marginRight: 8 }}>Final Price:</div>
                        <FormControl
                          variant="standard"
                          sx={{
                            display: "flex",
                            width: "50%",
                            height: "auto",
                            pb: 2.5,
                          }}
                        >
                          <InputLabel htmlFor="final-price-input" />
                          <BootstrapInput
                            id="final-price-input"
                            value={
                              finalPrice == 0 ? 'None': finalPrice
                            }
                            placeholder="Enter final price"
                            onChange={(e) => {
                                handleFinalPriceChange
                                setFinalPrice(e.target.value)
                            }}
                          />
                        </FormControl>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3} style={{ borderBottom: "none" }}>
                        <Button
                          variant="contained"
                          sx={{
                            background: "#69CEE2",
                            borderRadius: "8px",
                            mr: 5,
                            ml: 3,
                          }}
                          onClick={() => setFinalPrice(handleMinPrice(currentDiamond))}
                        >
                          Min
                        </Button>
                        <Button
                          variant="contained"
                          sx={{ background: "#69CEE2", borderRadius: "8px" }}
                          onClick={() => setFinalPrice(handleAverage(currentDiamond))}
                        >
                          Average
                        </Button>
                        <Button
                          variant="contained"
                          sx={{
                            background: "#69CEE2",
                            borderRadius: "8px",
                            ml: 6,
                          }}
                          onClick={() => setFinalPrice(handleMaxPrice(currentDiamond))}
                        >
                          Max
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow
                      sx={{ backgroundColor: "#FFF", borderBottom: "none" }}
                    >
                      <TableCell
                        sx={{ borderBottom: "none", textAlign: "left" }}
                      >
                        <Button>
                        <Link
                          href="#"
                          sx={{
                            color: "#69CEE2",
                            fontWeight: "bold",
                            fontSize: "16px",
                            textDecoration: "none",
                          }}
                          onClick={() => handleSave(currentDiamond)}
                        >
                          Save
                        </Link>
                        </Button>
                        <Button>
                        <Link
                          href="#"
                          sx={{
                            color: "red",
                            fontWeight: "bold",
                            fontSize: "16px",
                            textDecoration: "none",
                          }}
                          onClick={() => handleCancel()}
                        >
                          Cancel
                        </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Manager_ReportManagement;
