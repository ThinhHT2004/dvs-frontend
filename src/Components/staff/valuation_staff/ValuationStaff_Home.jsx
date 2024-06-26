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
  Grid,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import { valuation_staff_navigator } from '../Naviate';
import WelcomeImg from "../../../assets/welcome_Img.png";

const ValuationStaff_Home = () => {
    const drawerWidth = 240;
  return (
    
        <Box sx={{ display: "flex", flexDirection: "row", backgroundColor: "#FAF6EF", width: "100%", minHeight: "100vh" }}>
            
                <StaffDrawer mylist={[
                    "Home",
                    "Diamonds Appraisal",
                    "Sign Out",
                ]}
                state="Home"
                handleClick={valuation_staff_navigator}
                ></StaffDrawer>
            <Box
                sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Grid container spacing={2}>
                    <Grid item lg={6} xl={6} md={6} sm={6} xs={6}>
                    <Card sx={{ borderRadius: 3 }}>
                    <CardContent>
                        <Typography variant="h4">Welcome <span style={{ color: "#69CEE2" }}>Hua Tan Thinh</span></Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <img src={WelcomeImg} alt="" style={{ width: '230px', height: '172px' }} />
                        </Box>
                    </CardContent>
                </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    
  );

}

export default ValuationStaff_Home