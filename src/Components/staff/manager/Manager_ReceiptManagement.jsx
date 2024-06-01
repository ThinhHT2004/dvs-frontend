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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
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

function createDiamond(diamondID) {
    return {
        diamondID,
        appraiser1: '',
        appraiser2: '',
        appraiser3: '',
    };
}



const diamondList = [
    createDiamond("#DIA01"),
    createDiamond("#DIA02"),
    createDiamond("#DIA03"),
];

const initRequestList = [
    createData("#00001", "5", "Appraising", diamondList),
    createData("#00002", "5", "Appraising", diamondList),
    createData("#00003", "5", "Appraising", diamondList),
    createData("#00004", "5", "Appraising", diamondList),
    createData("#00005", "5", "Appraising", diamondList),
];

const appraiserList = ["T.Thinh", "H.Thinh", "T.Liem", "T.Khang"];


const Manager_ReceiptManagement = () => {

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
                                                        {row.diamondList.map((diamondRow) => (
                                                            <TableRow key={diamondRow.id}>
                                                                <TableCell>{diamondRow.diamondID}</TableCell>
                                                                <TableCell>
                                                                    <FormControl fullWidth>
                                                                        <InputLabel id={`appraiser1-label-${diamondRow.diamondID}`}>Appraiser 1</InputLabel>
                                                                        <Select
                                                                            labelId={`appraiser1-label-${diamondRow.diamondID}`}
                                                                            id={`appraiser1-select-${diamondRow.diamondID}`}
                                                                            value={appraisers[diamondRow.diamondID]?.appraiser1 || ''}
                                                                            label="Appraiser 1"
                                                                            onChange={(event) => handleAppraiserChange(diamondRow.diamondID, 'appraiser1', event)}
                                                                        >
                                                                            {appraiserList.map((name) => (
                                                                                <MenuItem key={name} value={name}>
                                                                                    {name}
                                                                                </MenuItem>
                                                                            ))}
                                                                        </Select>
                                                                    </FormControl>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <FormControl fullWidth>
                                                                        <InputLabel id={`appraiser2-label-${diamondRow.diamondID}`}>Appraiser 2</InputLabel>
                                                                        <Select
                                                                            labelId={`appraiser2-label-${diamondRow.diamondID}`}
                                                                            id={`appraiser2-select-${diamondRow.diamondID}`}
                                                                            value={appraisers[diamondRow.diamondID]?.appraiser2 || ''}
                                                                            label="Appraiser 2"
                                                                            onChange={(event) => handleAppraiserChange(diamondRow.diamondID, 'appraiser2', event)}
                                                                        >
                                                                            {appraiserList.map((name) => (
                                                                                <MenuItem key={name} value={name}>
                                                                                    {name}
                                                                                </MenuItem>
                                                                            ))}
                                                                        </Select>
                                                                    </FormControl>
                                                                </TableCell>
                                                                <TableCell>
                                                                    <FormControl fullWidth>
                                                                        <InputLabel id={`appraiser3-label-${diamondRow.diamondID}`}>Appraiser 3</InputLabel>
                                                                        <Select
                                                                            labelId={`appraiser3-label-${diamondRow.diamondID}`}
                                                                            id={`appraiser3-select-${diamondRow.diamondID}`}
                                                                            value={appraisers[diamondRow.diamondID]?.appraiser3 || ''}
                                                                            label="Appraiser 1"
                                                                            onChange={(event) => handleAppraiserChange(diamondRow.diamondID, 'appraiser3', event)}
                                                                        >
                                                                            {appraiserList.map((name) => (
                                                                                <MenuItem key={name} value={name}>
                                                                                    {name}
                                                                                </MenuItem>
                                                                            ))}
                                                                        </Select>
                                                                    </FormControl>
                                                                </TableCell>
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
