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
import { formatSampleId, formatValuationId } from '../../../Foramat';



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

  const getSelectDiamond = (id) =>{
    axios
    .get("http://localhost:8080/api/request-detail/find/" + id)
    .then(resp => setSelectedDiamond(resp.data))
    .catch(err => console.log(err));
  }

  const handleAction = (idDiamond) => {
    const assignment = assignments.find((a) => a.valuationRequestDetailId === idDiamond);
    setSelectedAssignment(assignment);
    getSelectDiamond(assignment.valuationRequestDetailId);
  };

  console.log(selectedAssignment);
  const handleSave = (selectedAssignment) =>{
    axios
      .put("http://localhost:8080/api/assignment/update", selectedAssignment)
      .then((resp) => {
        console.log(resp.data);
        getAssignments();
        handleClose(); 
      })
      .catch((err) => console.log(err));
  }

  console.log(selectedAssignment);

  return (
    <div>
      <Box display="flex" sx={{backgroundColor: "#FAF6EF",width: "100%", minHeight: "100vh"}}>
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
                      <TableRow key={assign.id}>
                        <TableCell>{formatValuationId(assign.id)}</TableCell>
                        <TableCell>{formatSampleId(assign.valuationRequestDetailId)}</TableCell>
                        <TableCell>{assign.price === 0 ? 'No Price': assign.price}</TableCell>
                        <TableCell>{assign.note ? assign.note : 'No Note'}</TableCell>
                        <TableCell>
                          <Link
                            href="#"
                            sx={{
                              color: selectedDiamond && selectedDiamond.id === assign.valuationRequestDetailId ? "grey" : "#69CEE2",
                              paddingLeft: "16px"
                            }}
                            underline="none"
                            onClick={() => handleAction(assign.valuationRequestDetailId)}
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
                  <Typography variant="h6">Edit Diamond - {formatSampleId(selectedDiamond.id)}</Typography>
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
                        <TableCell colSpan={2} sx={{ color: 'black', fontSize: '20px' }}>Diamond Details - {formatSampleId(selectedDiamond.id)}</TableCell>
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
