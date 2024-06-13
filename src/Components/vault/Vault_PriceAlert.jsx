import React, { useState } from "react";
import {
    Box,
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
import DiamondOutlinedIcon from '@mui/icons-material/DiamondOutlined';

const initRequestList = [
    { id: '#00001', cut_score: '8.6', carat: '0.8', clarity: 'VVS1H', color: 'F', bid_price: '2940', now_price: '2770' },
    { id: '#00002', cut_score: '8.7', carat: '0.85', clarity: 'VVS1H', color: 'F', bid_price: '2770', now_price: '2940' },
    { id: '#00003', cut_score: '8.4', carat: '0.8', clarity: 'VVS1H', color: 'F', bid_price: '2940', now_price: '2770' },
    { id: '#00004', cut_score: '8.5', carat: '0.75', clarity: 'VVS1H', color: 'F', bid_price: '2770', now_price: '2940' },
    { id: '#00005', cut_score: '8.6', carat: '0.8', clarity: 'VVS1H', color: 'F', bid_price: '2940', now_price: '2770' },
];

const Vault = () => {
    const deleteDiamond = (id) => {
        setData(prevData => prevData.filter(row => row.id !== id));
    };
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
                mylist={["Home", "Appointments", "Price Alert", "Report", "Sign Out"]}
                state="Price Alert"
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
                <TableContainer component={Paper} sx={{ width: { xs: "100%", sm: `calc(100%)` } }}>
                    <Table sx={{ minWidth: 450, height: 'auto', overflow: 'visible', borderRadius: 10 }}>
                        <TableHead sx={{ backgroundColor: "#30D5C8" }}>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Cut Score</TableCell>
                                <TableCell>Carat</TableCell>
                                <TableCell>Clarity</TableCell>
                                <TableCell>Color</TableCell>
                                <TableCell>Bid Price</TableCell>
                                <TableCell>Now Price</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell sx={{ borderBottom: 'none', paddingLeft: '30px', width: '10%' }}>
                                        <DiamondOutlinedIcon sx={{ color: '#4CE6DA', fontSize: 60, borderBottom: 'none' }} />
                                    </TableCell>
                                    <TableCell sx={{ borderBottom: 'none', width: '10%' }}>{row.cut_score}</TableCell>
                                    <TableCell sx={{ borderBottom: 'none', width: '10%' }}>{row.carat}</TableCell>
                                    <TableCell sx={{ borderBottom: 'none', width: '10%' }}>{row.clarity}</TableCell>
                                    <TableCell sx={{ borderBottom: 'none', width: '10%' }}>{row.color}</TableCell>
                                    <TableCell sx={{ borderBottom: 'none', width: '10%' }}>{row.bid_price}</TableCell>
                                    <TableCell sx={{ borderBottom: 'none', width: '10%' }}>{row.now_price}</TableCell>
                                    <TableCell sx={{ borderBottom: 'none', width: '10%' }}></TableCell>
                                    <TableCell sx={{ borderBottom: 'none', width: '10%' }}>
                                        <Link href="#" sx={{ color: "red", textAlign: 'center' }} underline="none"
                                            onClick={() => deleteDiamond(row.id)}>Delete</Link>
                                    </TableCell>
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
