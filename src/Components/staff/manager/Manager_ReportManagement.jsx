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

// Moved createData function here or to a separate utility file
// ...

// function Row({ row }) {
//     const [open, setOpen] = useState(false);

//     return (
//         <>
//             <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
//                 {/* Table cells */}
//             </TableRow>
//             <TableRow>
//                 {/* Collapsible content */}
//             </TableRow>
//         </>
//     );
// }

// Row.propTypes = {
//     // propTypes definition
// };

// rows array
// ...

const initRequestList = [
    { id: '#00001', amount: '5', status: 'Appraising' },
    { id: '#00002', amount: '5', status: 'Appraising' },
    { id: '#00003', amount: '5', status: 'Appraising' },
    { id: '#00004', amount: '5', status: 'Appraising' },
    { id: '#00005', amount: '5', status: 'Appraising' },
];

const handleAction = (id) => {
    setData(prevData => prevData.filter(row => row.id !== id));
};

const Manager_ReportManagement = () => {
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
                                    <TableCell colSpan={4} sx={{ color: 'white', fontSize: '25px' }}>Report Management</TableCell>
                                </TableRow>
                            </TableHead>
                            <React.Fragment>
                                {data.map((row) => (<TableBody>
                                    <TableRow key={row.id}>
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>{row.amount}</TableCell>
                                        <TableCell>{row.status}</TableCell>
                                        <TableCell sx={{}}>View Details
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
                                                    <Typography variant="h6" gutterBottom component="div">
                                                        History
                                                    </Typography>
                                                    <Table size="small" aria-label="purchases">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Date</TableCell>
                                                                <TableCell>Customer</TableCell>
                                                                <TableCell align="right">Amount</TableCell>
                                                                <TableCell align="right">Total price ($)</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <h1>ádas</h1>
                                                        </TableBody>
                                                    </Table>
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
