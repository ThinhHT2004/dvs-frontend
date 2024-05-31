import React from "react";
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
import { manager_navigator } from "../Naviate";
import StaffDrawer from "../StaffDrawer";
const Manager_Home = () => {
    const drawerWidth = 240;
    return (
        <div>
            <Box sx={{ display: "flex" }}>
                <StaffDrawer
                    mylist={[
                        "Home",
                        "Pending Request",
                        "Receipt Management",
                        "Sign Out",
                    ]}
                    state="Home"
                    handleClick={manager_navigator}
                ></StaffDrawer>
            </Box>
        </div>
    );
};

export default Manager_Home;
