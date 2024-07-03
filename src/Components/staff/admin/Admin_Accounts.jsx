import React from 'react'
import { admin_navigator } from '../Naviate'
import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
} from "@mui/material";

import StaffDrawer from "../StaffDrawer";


const Admin_Accounts = () => {
    const drawerWidth = 240;
    return (
        <Box sx={{ display: "flex", flexDirection: "row", backgroundColor: "#FAF6EF", width: "100%", minHeight: "100vh" }}>
            <StaffDrawer
                mylist={[
                    "Home",
                    "Services",
                    "Accounts",
                    "Sign Out",
                ]}
                state="Accounts"
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
               
            </Box>
        </Box>

    )
}

export default Admin_Accounts