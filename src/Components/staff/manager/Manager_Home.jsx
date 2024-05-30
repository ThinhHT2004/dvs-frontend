import React from "react";
import ManagerDrawer from "./ManagerDrawer";
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

const Manager_Home = () => {
    const drawerWidth = 240;
    return (
        <div>
            <Box sx={{ display: "flex" }}>
                <ManagerDrawer
                    mylist={[
                        "Home",
                        "Pending Request",
                        "Receipt Management",
                        "Report Management",
                        "Chat",
                        "Sign Out",
                    ]}
                    state="Home"
                ></ManagerDrawer>
            </Box>
        </div>
    );
};

export default Manager_Home;
