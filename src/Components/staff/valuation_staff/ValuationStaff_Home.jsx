import React from 'react'
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
} from "@mui/material";
import { valuation_staff_navigator } from '../Naviate';
const ValuationStaff_Home = () => {
    const drawerWidth = 240;
  return (
    <div>
        <Box sx={{backgroundColor: "#FAF6EF",width: "100%", minHeight: "100vh"}}>
            <Box>
                <StaffDrawer mylist={[
                    "Home",
                    "Diamonds Appraisal",
                    "Sign Out",
                ]}
                state="Home"
                handleClick={valuation_staff_navigator}
                ></StaffDrawer>
            </Box>
        </Box>
    </div>
  );

}

export default ValuationStaff_Home