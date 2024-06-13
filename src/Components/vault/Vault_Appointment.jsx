import React, { useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    TableContainer,
    TableHead,
    Table,
    TableBody,
    Paper,
    TableRow,
    TableCell,
    Link,
} from "@mui/material";
import { vault_navigator } from "../staff/Naviate";
import StaffDrawer from "../staff/StaffDrawer";
import WelcomeImg from "../../assets/welcome_Img.png";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const initRequestList = [
    { id: '#00001', service: '3h', date: '12/6/2024' },
    { id: '#00002', service: '10h', date: '12/6/2024' },
    { id: '#00003', service: '10h', date: '13/6/2024' },
    { id: '#00004', service: '3h', date: '13/6/2024' }
];

const Vault = () => {
    const [data, setData] = useState(initRequestList);
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "#FAF6EF",
                width: "100%",
                minHeight: "100vh",
                // overflow: "hidden",
            }}
        >
            <StaffDrawer
                mylist={["Home", "Appointments", "Receipt", "Report", "Sign Out"]}
                state="Appointments"
                handleClick={vault_navigator}
            />
            <Box
                sx={{
                    p: 3,
                    flexGrow: 1,
                    justifyContent: "center",
                    transition: "margin 0.3s ease",
                    width: "100%",
                }}
            >
                <TableContainer component={Paper} sx={{ width: { xs: "100%", sm: `calc(70%)` }}}>
                    <Table sx={{ minWidth: 450, height: 'auto', overflow: 'visible', borderRadius: 10 }}>
                        <TableHead sx={{ backgroundColor: "#30D5C8" }}>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Request ID</TableCell>
                                <TableCell>Serivce</TableCell>
                                <TableCell>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell sx={{ borderBottom: 'none',paddingLeft: '20px',width: '10%' }}>
                                        <CalendarMonthIcon sx={{ color: '#4CE6DA', fontSize: 60, borderBottom: 'none' }} />
                                    </TableCell>
                                    <TableCell sx={{ borderBottom: 'none',width: '30%' }}>{row.id}</TableCell>
                                    <TableCell sx={{ borderBottom: 'none',width: '30%' }}>{row.service}</TableCell>
                                    <TableCell sx={{ borderBottom: 'none',width: '30%' }}>{row.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default Vault;
