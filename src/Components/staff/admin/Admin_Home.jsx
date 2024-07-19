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
} from "@mui/material";
import StaffDrawer from "../StaffDrawer";
import { useRequests } from "../consulting_staff/RequestContext";
import { PieChart } from '@mui/x-charts/PieChart';
import PropTypes from 'prop-types';
import protectedApi from '../../../APIs/ProtectedApi';
import { toast, Toaster } from 'sonner';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import { BarChart } from '@mui/x-charts/BarChart';
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
        return `${(numPrice / 1000000).toFixed(1)}tr`;
    } else if (numPrice >= 1000) {
        return numPrice.toLocaleString('vi-VN');
    } else {
        return numPrice.toString();
    }
}
const Admin_Home = () => {
    const { acceptedRequests, getAllAcceptedRequests } = useRequests();
    const { waitingRequests, getAllWaitingRequests } = useRequests();

    const drawerWidth = 240;
    const [statusData, setStatusData] = useState([]);
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [dbLoading, setDbLoading] = useState(false);
    const [formattedList, setFormattedList] = useState([]);
    const [staffs, setStaffs] = useState([]);
    const [services, setServices] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [forms, setForms] = useState([]);
    const [quantity, setQuantity] = useState([]);
    const [appointment, setAppointment] = useState([]);
    useEffect(() => {
        getAllAcceptedRequests();
    }, [acceptedRequests]);
    useEffect(() => {
        getAllWaitingRequests();
    }, [waitingRequests]);
    useEffect(() => {
        getStaffs();
    }, [staffs]);
    useEffect(() => {
        getServices();
    }, [services]);
    useEffect(() => {
        getForms();
    }, [forms]);
    useEffect(() => {
        getCustomers();
    }, [customers]);
    useEffect(() => {
        getStatusData();
    }, [statusData]);
    const getServices = async () => {
        try {
            const resp = await protectedApi.get("/services/");
            const filterdServices = resp.data.filter(service => service.active === true);
            setServices(filterdServices);
        } catch (err) {
            console.log(err);
        }
    };
    const getStatusData = async () => {
        try {
            const statusCounts1 = acceptedRequests.reduce((acc, { status }) => {
                acc[status] = (acc[status] || 0) + 1;
                return acc;
            }, {});
            const statusCounts2 = waitingRequests.reduce((acc, { status }) => {
                acc[status] = (acc[status] || 0) + 1;
                return acc;
            }, {});
            const statusCounts = { ...statusCounts1, ...statusCounts2 };
            const formattedStatusData = Object.keys(statusCounts).map(key => ({
                label: key,
                value: statusCounts[key],
            }));
            setStatusData(formattedStatusData);
            const sortedWaitingRequests = waitingRequests.sort((a, b) => new Date(a.requestDate) - new Date(b.requestDate));
            const sortedAcceptedRequests = acceptedRequests.sort((a, b) => new Date(a.requestDate) - new Date(b.requestDate));
            const mergedRequests = [...sortedWaitingRequests, ...sortedAcceptedRequests];
            const requestCountByDate = mergedRequests.reduce((acc, { requestDate }) => {
                const date = new Date(requestDate).toDateString();
                acc[date] = (acc[date] || 0) + 1;
                return acc;
            }, {});
            const formattedRequestCountByDate = Object.keys(requestCountByDate).map(date => ({
                date,
                quantity: requestCountByDate[date],
            }));
            const formattedQuantity = formattedRequestCountByDate.map(request => request.quantity);
            const formattedAppointment = formattedRequestCountByDate.map(request => {
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
            // setLoading(true);
            const reader = new FileReader();
            // reader.onloadstart = () => {
            //     setProgress(0);
            // };
            // reader.onprogress = (data) => {
            //     if (data.lengthComputable) {
            //         const progress = Math.round((data.loaded / data.total) * 100);
            //         setProgress(progress);
            //     }
            // };
            // reader.onloadend = (e) => {
            //     const content = e.target.result;
            //     setFileContent(content);
            //     // setLoading(false);
            //     setProgress(100);
            //     formatFileContent(content);
            // };
            reader.readAsText(file);
        }
    };
    const getForms = async () => {
        try {
            const resp = await protectedApi.get("/forms/receipt");
            setForms(resp.data);
        } catch (err) {
            console.log(err);
        }
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
                                                {formatPrice(forms.reduce((acc, form) => acc + parseFloat(form.note), 0).toString())}
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
                                                Total Customers
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: {
                                                        xl: '4rem',
                                                        lg: '3rem',
                                                    }
                                                }}
                                            >
                                                {customers.length}
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
                                            <PeopleAltIcon
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
                                                {acceptedRequests.length + waitingRequests.length}
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
                        <Grid item lg={3} xl={3} md={3} sm={3} xs={3}>
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
                                        <Grid item lg={9} xl={9} md={9} sm={9} xs={9}>
                                            {dbLoading && <LinearProgressWithLabel value={progress} />}
                                        </Grid>
                                        <Grid item lg={3} xl={3} md={3} sm={3} xs={3}>
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
                            <Card sx={{ borderRadius: 3, height: '100%' }}>
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
                                        xAxis={[{ scaleType: 'band', data: appointment }]}
                                        series={[{ data: quantity }]}
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
                            <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
                                <CardHeader
                                    title="STAFFS"
                                    titleTypographyProps={{ variant: 'h6', color: 'white' }}
                                    sx={{ backgroundColor: "#30D5C8" }}
                                />
                                <Table>
                                    <TableBody>
                                        {staffs.map((staff) => (
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
                        <Grid item lg={6} xl={6} md={6} sm={6} xs={6}>
                            <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
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
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default Admin_Home;
