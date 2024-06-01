import React, { useState } from 'react';
import {
    Box,
    Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
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

function createDiamond(diamondID, price1, price2, price3) {
    return {
        diamondID,
        price1,
        price2,
        price3,
        final_price: '0',
    };
}

function diamondAveragePrice(diamond) {
    const prices = [diamond.price1, diamond.price2, diamond.price3]
        .filter(price => price !== "None")
        .map(price => parseFloat(price));
    const finalPrice = prices.length > 0 ? (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2) : "None";
    return finalPrice;
}

const diamondList = [
    createDiamond("#DIA01", "4000", "5000", "4500"),
    createDiamond("#DIA02", "None", "None", "None"),
    createDiamond("#DIA03", "None", "None", "None"),
];

const initRequestList = [
    createData("#00001", "5", "Appraised", diamondList),
    createData("#00002", "5", "Appraised", diamondList),
    createData("#00003", "5", "Appraised", diamondList),
];

const Manager_ReportManagement = () => {
    const [data, setData] = useState(initRequestList);
    const [open, setOpen] = useState(false);
    const [appraisers, setAppraisers] = useState(() => {
        const initialAppraisers = {};
        diamondList.forEach(diamond => {
            initialAppraisers[diamond.diamondID] = {
                appraiser1: '',
                appraiser2: '',
                appraiser3: '',
            };
        });
        return initialAppraisers;
    });

    const drawerWidth = 240;

    const handleToggle = (id) => {
        setOpen(prevOpen => ({
            ...prevOpen,
            // Toggle the state for the clicked row and set others to false
            [id]: !prevOpen[id],
        }));
    };

    const handleAppraiserChange = (diamondID, appraiserNumber, event) => {
        setAppraisers(prevAppraisers => {
            const updatedAppraisers = {
                ...prevAppraisers,
                [diamondID]: {
                    ...prevAppraisers[diamondID],
                    [appraiserNumber]: event.target.value,
                },
            };
            return updatedAppraisers;
        });
    };

    return (
        <div>
            <Box sx={{ display: "flex" }}>
                <StaffDrawer
                    mylist={[
                        "Home",
                        "Pending Request",
                        "Receipt Management",
                        "Report Management",
                        "Sign Out",
                    ]}
                    state="Report Management"
                    handleClick={manager_navigator}
                ></StaffDrawer>
                <Box
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        marginTop: "5%",
                        display: "flex",
                        // justifyContent: "center",
                    }}
                >
                    <TableContainer component={Paper} sx={{ width: 700 }}>
                        <Table sx={{ minWidth: 550, borderRadius: 10 }}>
                            <TableHead sx={{ backgroundColor: "#69CEE2" }}>
                                <TableRow>
                                    <TableCell colSpan={4} sx={{ color: 'white', fontSize: '25px' }}>Report Management</TableCell>
                                </TableRow>
                            </TableHead>
                            <React.Fragment>
                                {data.map((row) => (<TableBody>
                                    <TableRow key={row.id} style={{ display: 'flex' }}>
                                        <TableCell style={{ flex: 1 }}>{row.id}</TableCell>
                                        <TableCell style={{ flex: 1 }}>{row.amount}</TableCell>
                                        <TableCell style={{ flex: 1 }}>{row.status}</TableCell>
                                        <TableCell style={{ flex: 1, textAlign: 'right' }}>View Details
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
                                                <Box sx={{ margin: 0 }}>
                                                    <Table size="small" aria-label="purchases">
                                                        {row.diamondList.map((diamondRow, index) => (
                                                            <TableRow key={diamondRow.id} style={{
                                                                display: 'flex',
                                                                borderBottom: index === row.diamondList.length - 1 ? 'none' : ''
                                                            }}>
                                                                <TableCell style={{flex: '6'}}>{diamondRow.diamondID}</TableCell>
                                                                <TableCell style={{flex: '6'}}>Price: {diamondAveragePrice(diamondRow)}</TableCell>
                                                                <TableCell style={{flex: '1', textAlign: 'right'}}><Link href="#" sx={{ color: "#69CEE2", paddingLeft: "16px" }} underline="none"
                                                                    onClick={() => handleAction(row.id)}>Edit</Link>
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

export default Manager_ReportManagement;
