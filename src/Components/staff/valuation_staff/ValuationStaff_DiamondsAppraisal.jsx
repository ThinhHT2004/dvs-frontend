import React, { useState } from 'react';
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
  TextField
} from "@mui/material";
import { valuation_staff_navigator } from '../Naviate';

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
  const [diamonds, setDiamonds] = useState(diamondData);
  const [selectedDiamond, setSelectedDiamond] = useState(null);
  const drawerWidth = 240;

  const handleAction = (idDiamond) => {
    const diamond = diamonds.find((d) => d.idDiamond === idDiamond);
    setSelectedDiamond(diamond);
  };

  return (
    <div>
      <Box display="flex">
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
          <TableContainer component={Paper} sx={{ width: 1000, marginBottom: 4 }}>
            <Table sx={{ minWidth: 700, borderRadius: 10 }}>
              <TableHead sx={{ backgroundColor: "#69CEE2" }}>
                <TableRow>
                  <TableCell>ID Request</TableCell>
                  <TableCell>ID Diamond</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Note</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {diamonds.map((diamond) => (
                  <TableRow key={diamond.idDiamond}>
                    <TableCell>{diamond.idRequest}</TableCell>
                    <TableCell>{diamond.idDiamond}</TableCell>
                    <TableCell>{diamond.price}</TableCell>
                    <TableCell>{diamond.notes}</TableCell>
                    <TableCell>
                    <Link
                        href="#"
                        sx={{
                          color: selectedDiamond && selectedDiamond.idDiamond === diamond.idDiamond ? "grey" : "#69CEE2",
                          paddingLeft: "16px"
                        }}
                        underline="none"
                        onClick={() => handleAction(diamond.idDiamond)}
                      >
                        Edit
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {selectedDiamond && (
            <>
              <TableContainer component={Paper} sx={{ width: 1000 }}>
                <Table sx={{ minWidth: 700, borderRadius: 10 }}>
                  <TableHead sx={{ backgroundColor: "#69CEE2" }}>
                    <TableRow>
                      <TableCell colSpan={2} sx={{ color: 'black', fontSize: '20px' }}>Diamond Details - {selectedDiamond.idDiamond}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    
                    <TableRow>
                      <TableCell>Carat Weight</TableCell>
                      <TableCell>{selectedDiamond.carat_weight}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Clarity</TableCell>
                      <TableCell>{selectedDiamond.clarity}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Origin</TableCell>
                      <TableCell>{selectedDiamond.origin}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Polish</TableCell>
                      <TableCell>{selectedDiamond.polish}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Color</TableCell>
                      <TableCell>{selectedDiamond.color}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Symmetry</TableCell>
                      <TableCell>{selectedDiamond.symmetry}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Fluorescence</TableCell>
                      <TableCell>{selectedDiamond.fluorescence}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Shape</TableCell>
                      <TableCell>{selectedDiamond.shape}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Measurement</TableCell>
                      <TableCell>{selectedDiamond.measurement}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Proportion</TableCell>
                      <TableCell>{selectedDiamond.proportion}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Market price</TableCell>
                      <TableCell>{selectedDiamond.market_price}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: 1000,
                  marginBottom: 4,
                }}
              >
                <Box sx={{ width: '50%', marginTop:'20px'}}>
                  <Typography variant="h6">Edit Diamond - {selectedDiamond.idDiamond}</Typography>
                  
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Price"
                    value={selectedDiamond.price}
                    onChange={(e) =>
                      setSelectedDiamond({ ...selectedDiamond, price: e.target.value })
                    }
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Notes"
                    value={selectedDiamond.notes}
                    onChange={(e) =>
                      setSelectedDiamond({ ...selectedDiamond, notes: e.target.value })
                    }
                  />
                  <Button
                    variant="contained"
     
                    sx={{ mt: 2, backgroundColor: '#69CEE2'}}
                    onClick={() => {
                      setDiamonds(diamonds.map(d => d.idDiamond === selectedDiamond.idDiamond ? selectedDiamond : d));
                      setSelectedDiamond(null);
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    
                    sx={{ mt: 2, ml: 2, color: "red", borderColor:'red'}}
                    onClick={() => setSelectedDiamond(null)}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default ValuationStaff_DiamondsAppraisal;
