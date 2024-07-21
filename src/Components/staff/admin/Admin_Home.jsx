import React, { useEffect, useState } from 'react';
import { admin_navigator } from '../Naviate';
import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    CardHeader,
    LinearProgress,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    TableFooter,
    Avatar,
    Stack,
    Link,
    TextField,
} from "@mui/material";
import StaffDrawer from "../StaffDrawer";
import { PieChart } from '@mui/x-charts/PieChart';
import PropTypes from 'prop-types';
import protectedApi from '../../../APIs/ProtectedApi';
import { toast, Toaster } from 'sonner';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import { BarChart } from '@mui/x-charts/BarChart';
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: 'auto', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box >
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
};
function formatPrice(price) {
    const numPrice = Number(price);
    if (numPrice >= 1000000) {
        return `${(numPrice / 1000000).toFixed(2)}tr`;
    } else if (numPrice >= 1000) {
        return numPrice.toLocaleString('vi-VN');
    } else {
        return numPrice.toString();
    }
}
const Admin_Home = () => {
    const drawerWidth = 240;
    const [statusData, setStatusData] = useState([]);
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [dbLoading, setDbLoading] = useState(false);
    const [staffs, setStaffs] = useState([]);
    const [services, setServices] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [quantity, setQuantity] = useState([]);
    const [appointment, setAppointment] = useState([]);
    const [requests, setRequests] = useState([]);
    const [receipts, setReceipts] = useState([]);
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const [startDate, setStartDate] = useState(firstDayOfMonth.toLocaleDateString('en-CA'));
    const [endDate, setEndDate] = useState(lastDayOfMonth.toLocaleDateString('en-CA'));

    useEffect(() => {
        getStaffs();
        getServices();
        getCustomers();
        getStatusData()
    }, []);
    useEffect(() => {
        const getDataRequests = async () => {
            const fetchRequests = await getRequests();
            getStatusData(fetchRequests);
        }
        getDataRequests();
        getReceipts();
    }, [startDate, endDate]);
    const getServices = async () => {
        try {
            const resp = await protectedApi.get("/services/");
            const filterdServices = resp.data.filter(service => service.active === true);
            setServices(filterdServices);
        } catch (err) {
            console.log(err);
        }
    };
    const getStatusData = async (data) => {
        try {
            const statusCounts = (data || []).reduce((acc, { status }) => {
                acc[status] = (acc[status] || 0) + 1;
                return acc;
            }, {});
            const formattedStatusData = Object.keys(statusCounts).map(key => ({
                label: key,
                value: statusCounts[key],
            }));
            setStatusData(formattedStatusData);
            const sortedRequests = (data || []).sort((a, b) => new Date(a.requestDate) - new Date(b.requestDate));
            const requestCountByDate = sortedRequests.reduce((acc, { requestDate }) => {
                const date = new Date(requestDate).toDateString();
                acc[date] = (acc[date] || 0) + 1;
                return acc;
            }, {});
            const formattedRequestCountByDate = Object.keys(requestCountByDate).map(date => ({
                date,
                quantity: requestCountByDate[date],
            }));
            const sortedRequestCountByDate = formattedRequestCountByDate.sort((a, b) => new Date(a.date) - new Date(b.date));
            const formattedQuantity = sortedRequestCountByDate.map(request => request.quantity);
            const formattedAppointment = sortedRequestCountByDate.map(request => {
                const date = new Date(request.date);
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const year = date.getFullYear();
                return `${day}/${month}/${year}`;
            });
            setQuantity(formattedQuantity);
            setAppointment(formattedAppointment);
        } catch (err) {
            console.log(err);
        }
    };
    const getStaffs = async () => {
        try {
            const staffResp = await protectedApi.get("/staffs/");
            const staffData = staffResp.data;
            const staffWithRoles = await Promise.all(
                staffData.map(async (sf) => {
                    const roleResp = await protectedApi.get(`/accounts/${sf.id}`);
                    const roleData = roleResp.data;
                    return { ...sf, role: roleData.role, active: roleData.active, username: roleData.username, password: roleData.password };
                })
            );
            const fillteredStaffs = staffWithRoles.filter(
                (sf) => sf.role !== "ADMIN" &&
                    sf.active === true
            );
            setStaffs(fillteredStaffs);
        } catch (err) {
            console.log(err);
        }
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
            const reader = new FileReader();
            reader.readAsText(file);
        }
    };
    const getReceipts = async () => {
        try {
            const resp = await protectedApi.get("/forms/receipt/" + startDate + "/" + endDate);
            setReceipts(resp.data);
        }
        catch (err) {
            console.log(err);
        }
    }
    const getRequests = async () => {
        try {
            const resp = await protectedApi.get("/request/valuation-request/filter/" + startDate + "/" + endDate);
            setRequests(resp.data);
            return resp.data;
        }
        catch (err) {
            console.log(err);
        }
    }
    const handleChangeStartDate = (date) => {
        setStartDate(date.toLocaleDateString('en-CA'));
        setEndDate(endDate);
    };
    const handleChangeEndDate = (date) => {
        setEndDate(date.toLocaleDateString('en-CA'));
        setStartDate(startDate);
    };
    const getCustomers = async () => {
        try {
            const resp = await protectedApi.get("/customers/all");
            setCustomers(resp.data);
        } catch (err) {
            console.log(err);
        }
    };
    const handleAddToDb = async () => {
        setDbLoading(true);
        setProgress(0);

        try {
            const formData = new FormData();
            formData.append("file", file);
            await protectedApi
                .post("/files/read", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
        } catch (err) {
            console.log(err);
        }

        const duration = 5000; // 5 seconds
        const intervalTime = 100; // 0.1 seconds
        const increment = 100 / (duration / intervalTime);

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setDbLoading(false);
                    toast.success("Data addeed to Database");
                    return 100;
                }
                return prev + increment;
            });
        }, intervalTime);
    };
    return (
        <Box sx={{ display: "flex", flexDirection: "row", backgroundColor: "#FAF6EF", width: "100%", minHeight: "100vh" }}>
            <Toaster position='top-center' richColors></Toaster>
            <StaffDrawer
                mylist={[
                    "Home",
                    "Services",
                    "Staffs",
                    "Customers",
                    "Sign Out",
                ]}
                state="Home"
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
                <Grid container spacing={5}>
                    <Grid item lg={12} xl={12} md={12} sm={12} xs={12}
                        container
                        spacing={4}
                    >
                        <Grid item lg={3} xl={3} md={3} sm={3} xs={3}>
                            <Card sx={{ borderRadius: 3, height: 150 }}>
                                <CardContent>
                                    <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
                                        <Stack spacing={1}>
                                            <Typography color="text.secondary"
                                                sx={{
                                                    fontSize: {
                                                        xl: '1.2rem',
                                                        lg: '1rem',
                                                    }
                                                }}
                                            >
                                                Total Profit
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: {
                                                        xl: '4rem',
                                                        lg: '3rem',
                                                    }
                                                }}
                                            >
                                                {formatPrice(receipts.reduce((acc, form) => acc + parseFloat(form.note), 0).toString())}
                                            </Typography>
                                        </Stack>
                                        <Avatar sx={{
                                            backgroundColor: '#30D5C8',
                                            height: {
                                                xl: '70px',
                                                lg: '45px',
                                            },
                                            width: {
                                                xl: '70px',
                                                lg: '45px',
                                            }
                                        }}
                                        >
                                            <ReceiptIcon
                                                sx={{
                                                    fontSize: {
                                                        xl: '35px',
                                                        lg: '25px',
                                                    }
                                                }}
                                            />
                                        </Avatar>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item lg={3} xl={3} md={3} sm={3} xs={3}>
                            <Card sx={{ borderRadius: 3, height: 150 }}>
                                <CardContent>
                                    <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
                                        <Stack spacing={1}>
                                            <Typography color="text.secondary"
                                                sx={{
                                                    fontSize: {
                                                        xl: '1.2rem',
                                                        lg: '1rem',
                                                    }
                                                }}
                                            >
                                                Total Requests
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: {
                                                        xl: '4rem',
                                                        lg: '3rem',
                                                    }
                                                }}
                                            >
                                                {requests.length}
                                            </Typography>
                                        </Stack>
                                        <Avatar sx={{
                                            backgroundColor: '#30D5C8',
                                            height: {
                                                xl: '70px',
                                                lg: '45px',
                                            },
                                            width: {
                                                xl: '70px',
                                                lg: '45px',
                                            }
                                        }}>
                                            <RequestQuoteIcon
                                                sx={{
                                                    fontSize: {
                                                        xl: '35px',
                                                        lg: '25px',
                                                    }
                                                }}
                                            />
                                        </Avatar>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item lg={3.3} xl={3.3} md={3} sm={3} xs={3}>
                            <Card sx={{ borderRadius: 3, height: "100%" }}>
                                <CardHeader
                                    title="FILTER"
                                    titleTypographyProps={{ variant: 'h6', color: 'white' }}
                                    sx={{ backgroundColor: "#30D5C8" }}
                                />
                                <Box display={'flex'} padding={2}>
                                    <Typography color="text.secondary" marginRight={1} marginTop={1} marginBottom={1}>
                                        From
                                    </Typography>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            inputFormat="yyyy-MM-dd"
                                            value={startDate}
                                            onChange={(value) => handleChangeStartDate(value)}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    placeholder="Start Date"
                                                    variant="outlined"
                                                    sx={{ backgroundColor: "#fff", fontSize: '10px' }}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                    <Typography color="text.secondary" margin={1}>
                                        To
                                    </Typography>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            inputFormat="yyyy-MM-dd"
                                            value={endDate}
                                            onChange={(value) => handleChangeEndDate(value)}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    placeholder="End Date"
                                                    variant="outlined"
                                                    sx={{ backgroundColor: "#fff" , fontSize: '10px'}}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Box>
                            </Card>
                        </Grid>
                        <Grid item lg={2.7} xl={2.7} md={3} sm={3} xs={3}>
                            <Card sx={{ borderRadius: 3, height: 150 }}>
                                <CardHeader
                                    title="FILE UPLOAD"
                                    titleTypographyProps={{ variant: 'h6', color: 'white' }}
                                    sx={{ backgroundColor: "#30D5C8" }}
                                />
                                <CardContent>
                                    <input type="file" accept=".txt" onChange={handleFileChange} />
                                    <Grid container
                                        spacing={0}
                                    >
                                        <Grid item lg={9.5} xl={9.5} md={9} sm={9} xs={9}>
                                            {dbLoading && <LinearProgressWithLabel value={progress} />}
                                        </Grid>
                                        <Grid item lg={2.5} xl={2.5} md={3} sm={3} xs={3}>
                                            <Button
                                                variant="contained"
                                                sx={{ backgroundColor: "#30D5C8", color: "white" }}
                                                onClick={handleAddToDb}
                                            >
                                                Add
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid item lg={12} xl={12} md={12} sm={12} xs={12}
                        container
                        spacing={4}
                    >
                        <Grid item lg={4} xl={4} md={4} sm={4} xs={4}>
                            <Card sx={{ borderRadius: 3, height: 'auto' }}>
                                <CardHeader
                                    title="REQUESTS STATUS"
                                    titleTypographyProps={{ variant: 'h6', color: 'white' }}
                                    sx={{ backgroundColor: "#30D5C8" }}
                                />
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <PieChart
                                        series={[
                                            {
                                                data: statusData,
                                                innerRadius: 80,
                                                outerRadius: 120,
                                                cx: 200,


                                            },
                                        ]}
                                        slotProps={{
                                            legend: {
                                                direction: 'row',
                                                position: { vertical: 'bottom', horizontal: 'middle' },
                                                padding: 10,

                                            },
                                        }}
                                        height={400}
                                    />
                                </Box>
                            </Card>
                        </Grid>
                        <Grid item lg={8} xl={8} md={8} sm={8} xs={8}>
                            <Card sx={{ borderRadius: 3, height: '100%' }}>
                                <CardHeader
                                    title="REQUESTS STATISTICS"
                                    titleTypographyProps={{ variant: 'h6', color: 'white' }}
                                    sx={{ backgroundColor: "#30D5C8" }}
                                />
                                <CardContent>
                                    <BarChart
                                        xAxis={[{ scaleType: 'band', data: appointment, label: 'Request Date' }]}
                                        series={[{ data: quantity, label: 'Quantity', color: '#2c98ec' }]}
                                        height={400}
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    <Grid item lg={12} xl={12} md={12} sm={12} xs={12}
                        container
                        spacing={4}
                    >
                        <Grid item lg={6} xl={6} md={6} sm={6} xs={6}>
                            <Card sx={{ borderRadius: 3, }}>
                                <CardContent
                                    sx={{
                                        display: 'flex',
                                    }}
                                >
                                    <Avatar sx={{
                                        backgroundColor: '#30D5C8',
                                        height: {
                                            xl: '70px',
                                            lg: '45px',
                                        },
                                        width: {
                                            xl: '70px',
                                            lg: '45px',
                                        },
                                        marginRight: { xl: '20px', lg: '10px' }
                                    }}
                                    >
                                        <PeopleAltIcon
                                            sx={{
                                                fontSize: {
                                                    xl: '35px',
                                                    lg: '25px',
                                                }
                                            }}
                                        />
                                    </Avatar>
                                    <Typography color="text.secondary"
                                        sx={{
                                            fontSize: {
                                                xl: '3rem',
                                                lg: '3rem',
                                            }
                                        }}
                                    >
                                        Total Customers: <span style={{ fontSize: { xl: '4rem', lg: '3rem' }, color: 'black' }}>{customers.length}</span>
                                    </Typography>
                                </CardContent>
                            </Card>
                            <TableContainer component={Paper} sx={{ borderRadius: 3, marginTop: 5 }}>
                                <CardHeader
                                    title="SERVICES"
                                    titleTypographyProps={{ variant: 'h6', color: 'white' }}
                                    sx={{ backgroundColor: "#30D5C8" }}
                                />
                                <Table>
                                    <TableBody>
                                        {services.map((service) => (
                                            <TableRow
                                                key={service.id}
                                            >
                                                <TableCell component="th" scope="row">{service.name}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell align='right'>
                                                <Link href="/admin/services" underline="hover" sx={{ color: '#69CEE2', display: 'flex', justifyContent: 'flex-end', textDecoration: 'underline' }}>View All</Link>
                                            </TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </TableContainer>

                        </Grid>
                        <Grid item lg={6} xl={6} md={6} sm={6} xs={6}>
                            <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
                                <CardHeader
                                    title="STAFFS"
                                    titleTypographyProps={{ variant: 'h6', color: 'white' }}
                                    sx={{ backgroundColor: "#30D5C8" }}
                                />
                                <Table>
                                    <TableBody>
                                        {staffs.slice(0, 6).map((staff) => (
                                            <TableRow
                                                key={staff.id}
                                            >
                                                <TableCell component="th" scope="row">{staff.lastName} {staff.firstName}</TableCell>
                                                <TableCell align="right">{staff.role}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell></TableCell>
                                            <TableCell align='right'>
                                                <Link href="/admin/staffs" underline="hover" sx={{ color: '#69CEE2', display: 'flex', justifyContent: 'flex-end', textDecoration: 'underline' }}>View All</Link>
                                            </TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>

                            </TableContainer>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default Admin_Home;
