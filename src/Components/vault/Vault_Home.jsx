import React from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,

} from "@mui/material";
import { vault_navigator } from "../staff/Naviate";
import StaffDrawer from "../staff/StaffDrawer";
import WelcomeImg from "../../assets/welcome_Img.png";


const drawerWidth = 240;

const Vault = () => {
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
            <StaffDrawer
                mylist={["Home", "Appointments", "Settings", "Calculate", "Check Diamonds", "Diamonds Appraisal", "Sign Out"]}
                state="Home"
                handleClick={vault_navigator}
            />
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

export default Vault;
