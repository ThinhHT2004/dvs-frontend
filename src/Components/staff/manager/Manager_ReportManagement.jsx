import React, { useState, useCallback } from 'react';
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
    Button,
    FormControl,
    InputLabel,
    InputBase,
} from "@mui/material";
import { styled } from '@mui/material/styles';
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
        final_price: 'none',
    };
}

function diamondAveragePrice(diamond) {
    const prices = [diamond.price1, diamond.price2, diamond.price3]
        .filter(price => price !== "none")
        .map(price => parseFloat(price));
    const finalPrice = prices.length > 0 ? (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2) : "none";
    return finalPrice;
}

const diamondList = [
    createDiamond("#DIA01", "4000", "5000", "4500"),
    createDiamond("#DIA02", "none", "none", "none"),
    createDiamond("#DIA03", "none", "none", "none"),
];

const initRequestList = [
    createData("#00001", "5", "Appraised", diamondList),
    createData("#00002", "5", "Appraised", diamondList),
    createData("#00003", "5", "Appraised", diamondList),
];

const Manager_ReportManagement = () => {
    const [data, setData] = useState(initRequestList);
    const [open, setOpen] = useState(false);
    const [editPriceOpen, setEditPriceOpen] = useState(false);
    const [currentDiamond, setCurrentDiamond] = useState(null);

    const handleEditPriceClick = (diamond) => {
        setCurrentDiamond(diamond);
        setEditPriceOpen(true);
    };

    const drawerWidth = 240;

    const handleToggle = (id) => {
        setOpen(prevOpen => ({
            ...prevOpen,
            [id]: !prevOpen[id],
        }));
    };

    const BootstrapInput = styled(InputBase)(({ theme }) => ({
        'label + &': {
            marginTop: theme.spacing(3),
        },
        '& .MuiInputBase-input': {
            borderRadius: 4,
            position: 'relative',
            backgroundColor: theme.palette.background.paper,
            border: '1px solid #ced4da',
            fontSize: 16,
            padding: '10px 26px 10px 12px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            '&:focus': {
                borderRadius: 4,
                borderColor: '#80bdff',
                boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
            },
        },
    }));
    const handleFinalPriceChange = useCallback((event) => {
        setCurrentDiamond({ ...currentDiamond, final_price: event.target.value });
    }, [currentDiamond]);

    return (
        <div>
            <Box sx={{ display: "flex", flexDirection: "row" }}>
                <StaffDrawer
                    mylist={[
                        "Home",
                        "Pending Request",
                        "Receipt",
                        "Report",
                        "Sign Out",
                    ]}
                    state="Report"
                    handleClick={manager_navigator}
                ></StaffDrawer>
                <Box
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        marginTop: "5%",
                        display: "flex",
                        alignItems: 'flex-start', // Aligns children to the start of the cross axis
                        gap: "16px",
                    }}
                >
                    <TableContainer component={Paper} sx={{ width: '65%', marginRight: '8px' }}>
                        <Table sx={{ minWidth: 550, borderRadius: 10 }}>
                            <TableHead sx={{ backgroundColor: "#69CEE2" }}>
                                <TableRow>
                                    <TableCell style={{ width: '25%' }}>Request ID</TableCell>
                                    <TableCell style={{ width: '25%' }}>Diamond Amount</TableCell>
                                    <TableCell style={{ width: '25%' }}>Status</TableCell>
                                    <TableCell style={{ width: '25%' }}></TableCell>
                                </TableRow>
                            </TableHead>
                            <React.Fragment>
                                {data.map((row) => (<TableBody>
                                    <TableRow >
                                        <TableCell style={{ width: '25%' }}>{row.id}</TableCell>
                                        <TableCell style={{ width: '25%', paddingLeft: '65px' }}>{row.amount}</TableCell>
                                        <TableCell style={{ width: '25%', color: row.status === 'Appraised' ? '#32D82E' : 'inherit' }}>
                                            {row.status}
                                        </TableCell>
                                        <TableCell style={{ width: '25%' }}>View Details
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
                                                                <TableCell style={{ flex: '3' }}>{diamondRow.diamondID}</TableCell>
                                                                <TableCell style={{ flex: '3' }}>Price: {diamondAveragePrice(diamondRow)}</TableCell>
                                                                <TableCell style={{ flex: '1', textAlign: 'right' }}>
                                                                    <Link
                                                                        href="#"
                                                                        sx={{ color: "#69CEE2", paddingLeft: "16px" }}
                                                                        underline="none"
                                                                        onClick={() => handleEditPriceClick(diamondRow)}
                                                                    >
                                                                        Edit Price
                                                                    </Link>

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
                    {editPriceOpen && (
                        <Box>
                            <TableContainer component={Paper} sx={{ width: 400 }}>
                                <Table sx={{ minWidth: 300, borderRadius: 10 }}>
                                    <TableHead sx={{ backgroundColor: "#69CEE2" }}>
                                        <TableRow>
                                            <TableCell colSpan={5} sx={{ color: 'white', fontSize: '25px' }}>{currentDiamond.diamondID}</TableCell>
                                            <TableCell></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell sx={{ borderBottom: 'none' }}>
                                                Appraiser#1 Price: {currentDiamond.price1}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ flex: 100, borderBottom: 'none' }}>
                                                Appraiser#2 Price: {currentDiamond.price2}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell sx={{ borderBottom: 'none', margin: 'none', pb: 0 }}>
                                                Appraiser#3 Price: {currentDiamond.price3}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow sx={{ mb: -2, p: 0 }}>
                                            <TableCell sx={{ borderBottom: 'none', display: 'flex', alignItems: 'center', p: 0, pl: 2 }}>
                                                <div style={{ marginRight: 8 }}>Final Price:</div>
                                                <FormControl variant="standard" sx={{ display: 'flex', width: '50%', height: 'auto', pb: 2.5 }}>
                                                    <InputLabel htmlFor="final-price-input" />
                                                    <BootstrapInput
                                                        id="final-price-input"
                                                        value={currentDiamond.final_price ? currentDiamond.final_price.toString() : ''}
                                                        placeholder='Enter final price'
                                                        onChange={handleFinalPriceChange}
                                                    />
                                                </FormControl>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow >
                                            <TableCell colSpan={3} style={{ borderBottom: 'none' }}>
                                                <Button
                                                    variant="contained"
                                                    sx={{ background: "#69CEE2", borderRadius: "8px", mr: 5, ml: 3 }}
                                                >
                                                    Min
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    sx={{ background: "#69CEE2", borderRadius: "8px" }}
                                                >
                                                    Average
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    sx={{ background: "#69CEE2", borderRadius: "8px", ml: 6 }}
                                                >
                                                    Max
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow sx={{ backgroundColor: '#FFF', borderBottom: 'none' }}>
                                            <TableCell sx={{ borderBottom: 'none', textAlign: 'right' }}>
                                                <Link
                                                    href="#"
                                                    sx={{ color: "#69CEE2", fontWeight: 'bold', fontSize: '20px', textDecoration: 'none' }}
                                                    onClick={() => handleEditPriceClick(diamondRow)}
                                                >
                                                    Save
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>)}
                </Box>
            </Box>
        </div>
    );
};

export default Manager_ReportManagement;
