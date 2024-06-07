import React, { useEffect, useState } from 'react';
import StaffDrawer from "../StaffDrawer";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Link,
  TextField,
  Grid
} from "@mui/material";
import { valuation_staff_navigator } from '../Naviate';
import axios from 'axios';

const diamondData = [
  {
    idDiamond: "D001",
    carat_weight: 1.25,
    clarity: "VS1",
    origin: "NATURAL",
    polish: "EX.",
    color: "G",
    symmetry: "V.GOOD",
    fluorescence: "FNT",
    shape: "ROUND",
    measurement: "6.5 x 6.5 x 4.0 mm",
    proportion: "blob data here",
    price: "$4,000",
    notes: "Have GIA report",
    idValuationStaff: "VD001",
    idRequest: "#00001",
    market_price: "$3.000 ~ $4.000"
  },
  {
    idDiamond: "D002",
    carat_weight: 0.95,
    clarity: "SI1",
    origin: "LAB",
    polish: "V.GOOD",
    color: "E",
    symmetry: "GOOD",
    fluorescence: "NON",
    shape: "PRINCESS",
    measurement: "5.5 x 5.5 x 3.5 mm",
    proportion: "blob data here",
    price: "$3,000",
    notes: "Have GIA report",
    idValuationStaff: "VD001",
    idRequest: "#00002",
    market_price: "$3.000 ~ $4.000"
  },
  {
    idDiamond: "D003",
    carat_weight: 1.50,
    clarity: "VVS2",
    origin: "NATURAL",
    polish: "GOOD",
    color: "D",
    symmetry: "EX.",
    fluorescence: "VSTG",
    shape: "EMERALD",
    measurement: "7.0 x 5.0 x 3.5 mm",
    proportion: "blob data here",
    price: "$7,000",
    notes: "Have GIA report",
    idValuationStaff: "VD001",
    idRequest: "#00003",
    market_price: "$3.000 ~ $4.000"
  },
  {
    idDiamond: "D004",
    carat_weight: 2.00,
    clarity: "IF",
    origin: "LAB",
    polish: "EX.",
    color: "F",
    symmetry: "V.GOOD",
    fluorescence: "MED",
    shape: "HEART",
    measurement: "8.0 x 8.0 x 4.5 mm",
    proportion: "blob data here",
    price: "$10,000",
    notes: "Have GIA report",
    idValuationStaff: "VD001",
    idRequest: "#00004",
    market_price: "$3.000 ~ $4.000"
  },
  {
    idDiamond: "D005",
    carat_weight: 1.10,
    clarity: "VS2",
    origin: "NATURAL",
    polish: "FAIR",
    color: "H",
    symmetry: "GOOD",
    fluorescence: "STG",
    shape: "OVAL",
    measurement: "6.0 x 4.0 x 3.0 mm",
    proportion: "blob data here",
    price: "$2,500",
    notes: "Have GIA report",
    idValuationStaff: "VD001",
    idRequest: "#00005",
    market_price: "$3.000 ~ $4.000"
  }
];

const ValuationStaff_DiamondsAppraisal = () => {
  const staffId = sessionStorage.getItem("valuationStaffId");
  const [selectedDiamond, setSelectedDiamond] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState();
  const drawerWidth = 240;
  const [assignments, setAssignments] = useState([]);

  console.log(staffId);

  useEffect(() =>{
    getAssignments()
  }, [])

  const getAssignments = () =>{
    axios
      .get("http://localhost:8080/api/assignment/ASSIGNED/" + staffId)
      .then(resp => setAssignments(resp.data))
      .catch(err => console.log(err));
  }

  const handleAction = (idDiamond) => {
    const assignment = assignments.find((a) => a.valuationRequestDetail.id === idDiamond);
    setSelectedAssignment(assignment);
    setSelectedDiamond(assignment?.valuationRequestDetail);
  };

  const handleSave = (selectedAssignment) =>{
    axios
      .put("http://localhost:8080/api/assignment/update", selectedAssignment)
      .then(resp => console.log(resp.data))
      .catch(err => console.log(err));
  }

  console.log(selectedAssignment);

  return (
    <div>
      <Box display="flex" sx={{backgroundColor: "#FAF6EF",}}>
        <Box>
          <StaffDrawer
            mylist={["Home", "Diamonds Appraisal", "Sign Out"]}
            state="Diamonds Appraisal"
            handleClick={valuation_staff_navigator}
          />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            marginTop: "5%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            
          }}
        >
          <Grid container spacing={3} >
            <Grid item xs={7} >
              <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
                <Table sx={{ minWidth: 700, borderRadius: 10 }}>
                  <TableHead sx={{ backgroundColor: "#69CEE2" }}>
                    <TableRow>
                      <TableCell>ID Valuation</TableCell>
                      <TableCell>ID Sample</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Note</TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {assignments.map((assign) => (
                      <TableRow key={assign.valuationRequestDetail.id}>
                        <TableCell>{assign.id}</TableCell>
                        <TableCell>{assign.valuationRequestDetail.id}</TableCell>
                        <TableCell>{assign.price === 0 ? 'No Price': assign.price}</TableCell>
                        <TableCell>{assign.note ? assign.note : 'No Note'}</TableCell>
                        <TableCell>
                          <Link
                            href="#"
                            sx={{
                              color: selectedDiamond && selectedDiamond.id === assign.valuationRequestDetail.id ? "grey" : "#69CEE2",
                              paddingLeft: "16px"
                            }}
                            underline="none"
                            onClick={() => handleAction(assign.valuationRequestDetail.id)}
                          >
                            Edit
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            {selectedDiamond && (
              <Grid item xs={5} >
                <Box sx={{ marginBottom: 4 }}>
                  <Typography variant="h6">Edit Diamond - {selectedDiamond.id}</Typography>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Price"
                    value={selectedDiamond.price}
                    onChange={(e) =>
                      setSelectedAssignment({ ...selectedAssignment, price: e.target.value })
                    }
                    type='number'
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Notes"
                    value={selectedDiamond.note}
                    onChange={(e) =>
                      setSelectedAssignment({ ...selectedAssignment, note: e.target.value })
                    }
                  />
                  <Box sx={{ marginTop: 2 }}>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: '#69CEE2' }}
                      onClick={() => {
                        handleSave(selectedAssignment);
                        setSelectedDiamond(null);
                        setSelectedAssignment(null);
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{ marginLeft: 2, color: "red", borderColor: 'red' }}
                      onClick={() => setSelectedDiamond(null)}
                    >
                      Cancel
                    </Button>
                  </Box>
                </Box>
              </Grid>
            )}
            {selectedDiamond && (
              <Grid item xs={12} >
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700, borderRadius: 10 }}>
                    <TableHead sx={{ backgroundColor: "#69CEE2" }}>
                      <TableRow>
                        <TableCell colSpan={2} sx={{ color: 'black', fontSize: '20px' }}>Diamond Details - {selectedDiamond.id}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Carat Weight</TableCell>
                        <TableCell>{selectedDiamond.valuationReport.caratWeight}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Clarity</TableCell>
                        <TableCell>{selectedDiamond.valuationReport.clarity}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Origin</TableCell>
                        <TableCell>{selectedDiamond.valuationReport.origin}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Polish</TableCell>
                        <TableCell>{selectedDiamond.valuationReport.polish}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Color</TableCell>
                        <TableCell>{selectedDiamond.valuationReport.color}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Symmetry</TableCell>
                        <TableCell>{selectedDiamond.valuationReport.symmetry}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Fluorescence</TableCell>
                        <TableCell>{selectedDiamond.valuationReport.fluorescence}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Shape</TableCell>
                        <TableCell>{selectedDiamond.valuationReport.shape}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Measurement</TableCell>
                        <TableCell>{selectedDiamond.valuationReport.measurement}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Proportion</TableCell>
                        <TableCell>{selectedDiamond.valuationReport.proportion}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Market price</TableCell>
                        <TableCell>N/A</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default ValuationStaff_DiamondsAppraisal;
