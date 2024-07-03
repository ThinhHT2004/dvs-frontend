import React from 'react'
import { admin_navigator } from '../Naviate'
import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";
import WelcomeImg from "../../../assets/welcome_Img.png";
import StaffDrawer from "../StaffDrawer";


const Admin_Accounts = () => {
    const drawerWidth = 240;
    return (
        <Box sx={{ display: "flex", flexDirection: "row", backgroundColor: "#FAF6EF", width: "100%", minHeight: "100vh" }}>
            <StaffDrawer
                mylist={[
                    "Home",
                    "Services",
                    "Sign Out",
                ]}
                state="Home"
                handleClick={admin_navigator}
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

    )
}

export default Admin_Accounts