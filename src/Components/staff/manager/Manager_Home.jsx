import React from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
} from "@mui/material";
import { manager_navigator } from "../Naviate";
import StaffDrawer from "../StaffDrawer";
import WelcomeImg from "../../../assets/welcome_Img.png";
const Manager_Home = () => {
    const drawerWidth = 240;
    return (
        
            <Box sx={{ display: "flex", flexDirection: "row", backgroundColor: "#FAF6EF", width: "100%", minHeight: "100vh" }}>
                <StaffDrawer
                    mylist={[
                        "Home",
                        "Pending Request",
                        "Receipt",
                        "Report",
                        "Sign Out",
                    ]}
                    state="Home"
                    handleClick={manager_navigator}
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
};

export default Manager_Home;
