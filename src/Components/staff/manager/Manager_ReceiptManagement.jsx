import React, { useState } from 'react';
import {
    Box,
    Button,
    Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    IconButton,
    Collapse,
} from "@mui/material";
import { manager_navigator } from '../Naviate';
import StaffDrawer from '../StaffDrawer';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(id, amount, status, diamondList = []) {
    diamondList = diamondList || [];
    return {
        id,
        amount,
        status,
        diamondList,
    };
}

function createDiamond(diamondID, appraiser1, appraiser2, appraiser3) {
    return {
        diamondID,
        appraiser1,
        appraiser2,
        appraiser3,
    };
}
// const initRequestList = [
//     { id: '#00001', amount: '5', status: 'Appraising' },
//     { id: '#00002', amount: '5', status: 'Appraising' },
//     { id: '#00003', amount: '5', status: 'Appraising' },
//     { id: '#00004', amount: '5', status: 'Appraising' },
//     { id: '#00005', amount: '5', status: 'Appraising' },
// ];
const diamondList = [
    createDiamond("#DIA01", "T.Thinh", "H.Thinh", "T.Liem"),
    createDiamond("#DIA02", "None", "None", "None"),
    createDiamond("#DIA03", "None", "None", "None"),
];

const initRequestList = [
    createData("#00001", "5", "Appraising", diamondList),
    createData("#00002", "5", "Appraising", diamondList),
    createData("#00003", "5", "Appraising", diamondList),
];


const Manager_ReceiptManagement = () => {
    const [data, setData] = useState(initRequestList);
    const drawerWidth = 240;
    const [open, setOpen] = useState(false);

    const handleToggle = (id) => {
        setOpen(prevOpen => ({
            ...prevOpen,
            // Toggle the state for the clicked row and set others to false
            [id]: !prevOpen[id],
        }));
    };

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
                    state="Receipt Management"
                    handleClick={manager_navigator}
                ></StaffDrawer>
                <Box
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        marginTop: "5%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <TableContainer component={Paper} sx={{ width: 1000 }}>
                        <Table sx={{ minWidth: 700, borderRadius: 10 }}>
                            <TableHead sx={{ backgroundColor: "#69CEE2" }}>
                                <TableRow>
                                    <TableCell colSpan={4} sx={{ color: 'white', fontSize: '25px' }}>Receipt Management</TableCell>
                                </TableRow>
                            </TableHead>
                            <React.Fragment>
                                {data.map((row) => (<TableBody>
                                    <TableRow key={row.id}>
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>{row.amount}</TableCell>
                                        <TableCell>{row.status}</TableCell>
                                        <TableCell>View Details
                                            <IconButton
                                                aria-label="expand row"
                                                size="small"
                                                onClick={() => handleToggle(row.id)}
                                            >
                                                {open[row.id] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                            <Collapse in={open[row.id]} timeout="auto" unmountOnExit>
                                                <Box sx={{ margin: 1 }}>
                                                    <Table size="small" aria-label="purchases">
                                                        {row.diamondList.map((diamondRow) => (
                                                            <TableRow key={diamondRow.id}>
                                                                <TableCell>{diamondRow.diamondID}</TableCell>
                                                                <TableCell>Appraiser#1: {diamondRow.appraiser1}</TableCell>
                                                                <TableCell>Appraiser#2:{diamondRow.appraiser2}</TableCell>
                                                                <TableCell>Appraiser#3:{diamondRow.appraiser3}</TableCell>
                                                                <TableCell><Link href="#" sx={{ color: "#69CEE2", paddingLeft: "16px" }} underline="none"
                                                                    onClick={() => handleAction(row.id)}>Save</Link>
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </Table><div></div>
                                                </Box>
                                            </Collapse>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                                ))}
                            </React.Fragment>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </div>
    );
};

export default Manager_ReceiptManagement;