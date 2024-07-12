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
    TableHead,
    TableRow,
    Paper,
    TableFooter,

} from "@mui/material";
import WelcomeImg from "../../../assets/welcome_Img.png";
import StaffDrawer from "../StaffDrawer";
import { useRequests } from "../consulting_staff/RequestContext";
import { PieChart } from '@mui/x-charts/PieChart';
import PropTypes from 'prop-types';
import protectedApi from '../../../APIs/ProtectedApi';
import { ca } from 'date-fns/locale';
import { toast, Toaster } from 'sonner';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { SmsFailedTwoTone } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
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

const Admin_Home = () => {
    const drawerWidth = 240;
    const staffID = sessionStorage.getItem("adminId");
    const { acceptedRequests, getAllAcceptedRequests } = useRequests([]);
    const { waitingRequests, getAllWaitingRequests } = useRequests([]);
    const [statusData, setStatusData] = useState([]);
    const [fileContent, setFileContent] = useState('');
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [dbLoading, setDbLoading] = useState(false);
    const [formattedList, setFormattedList] = useState([]);
    const [staff, setStaff] = useState({});
    const [staffs, setStaffs] = useState([]);
    const [services, setServices] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            await getAllAcceptedRequests();
            await getAllWaitingRequests();
            await getStatusData();
            await getStaffInfor();
            await getStaffs();
            await getServices();
        };
        fetchData().catch(console.error);
    }, [acceptedRequests, waitingRequests]);
    const getServices = async () => {
        try {
            const resp = await protectedApi.get("/services/");
            setServices(resp.data);
        } catch (err) {
            console.log(err);
        }
    };
    const getStaffInfor = async () => {
        try {
            const response = await protectedApi.get("/staffs/" + staffID);
            setStaff(response.data);
        } catch (error) {
            console.error(error);
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
        } catch (error) {
            console.error(error);
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
            console.error(err);
        }
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFile(file);
            setLoading(true);
            const reader = new FileReader();
            reader.onloadstart = () => {
                setProgress(0);
            };
            reader.onprogress = (data) => {
                if (data.lengthComputable) {
                    const progress = Math.round((data.loaded / data.total) * 100);
                    setProgress(progress);
                }
            };
            reader.onloadend = (e) => {
                const content = e.target.result;
                setFileContent(content);
                setLoading(false);
                setProgress(100);
                formatFileContent(content);
            };
            reader.readAsText(file);
        }
    };

    const formatFileContent = (content) => {
        const lines = content.split('\n');
        const keys = ["price", "shape", "carat_weight", "color", "clarity", "polish", "fluorescence", "symmetry", "cut", "measurement", "origin", "source", "proportion"];
        const formattedData = lines.map(line => {
            const values = line.split(',').map(item => item.trim());
            let formattedItem = {};
            keys.forEach((key, index) => {
                formattedItem[key] = values[index];
            });
            return formattedItem;
        });
        setFormattedList(formattedData);
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
                .then(resp => console.log(resp.data));
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
                    console.log("Formatted List:", formattedList);
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
                    "Accounts",
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
                    <Grid item lg={6} xl={6} md={6} sm={6} xs={6}>
                        <Card sx={{ borderRadius: 3 }}>
                            <CardContent>
                                <Typography variant="h4">Welcome <span style={{ color: "#69CEE2" }}>{staff.lastName} {staff.firstName}</span></Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <img src={WelcomeImg} alt="" style={{ width: '230px', height: '172px' }} />
                                </Box>
                            </CardContent>
                        </Card>
                        <Card sx={{ borderRadius: 3, marginTop: 5 }}>
                            <CardHeader
                                title="FILE UPLOAD"
                                titleTypographyProps={{ variant: 'h6', color: 'white' }}
                                sx={{ backgroundColor: "#30D5C8" }}
                            />
                            <CardContent>
                                <input type="file" accept=".txt" onChange={handleFileChange} />
                                {loading && <LinearProgressWithLabel value={progress} />}
                                {fileContent && (
                                    <Box sx={{ mt: 2 }}>
                                        <Button
                                            variant="contained"
                                            sx={{ mt: 2 }}
                                            onClick={handleAddToDb}
                                            disabled={dbLoading}
                                        >
                                            Add to Database
                                        </Button>
                                        {dbLoading && <LinearProgressWithLabel value={progress} />}
                                    </Box>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item lg={6} xl={6} md={6} sm={6} xs={6}>
                        <Card sx={{ borderRadius: 3 }}>
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
                                    height={300}
                                />
                            </Box>
                        </Card>
                        <Card sx={{ borderRadius: 3, marginTop: 5 }}>
                            <CardHeader
                                title="REQUESTS STATISTICS"
                                titleTypographyProps={{ variant: 'h6', color: 'white' }}
                                sx={{ backgroundColor: "#30D5C8" }}
                            />
                            <CardContent>
                                <Box>
                                    <Typography variant="h5">Finished Requests</Typography>
                                    <SparkLineChart
                                        data={[1, 4, 2, 5, 7, 2, 4, 6]}
                                        xAxis={{
                                            scaleType: 'time',
                                            data: [
                                                new Date(2022, 5, 1),
                                                new Date(2022, 5, 2),
                                                new Date(2022, 5, 5),
                                                new Date(2022, 5, 6),
                                                new Date(2022, 5, 7),
                                                new Date(2022, 5, 8),
                                                new Date(2022, 5, 11),
                                                new Date(2022, 5, 12),
                                            ],
                                        }}
                                        height={100}
                                        showTooltip
                                        showHighlight
                                    />
                                </Box>
                                <Box>
                                    <Typography variant="h5">Waiting Requests</Typography>
                                    <SparkLineChart
                                        data={[1, 4, 2, 5, 7, 2, 4, 6]}
                                        xAxis={{
                                            scaleType: 'time',
                                            data: [
                                                new Date(2022, 5, 1),
                                                new Date(2022, 5, 2),
                                                new Date(2022, 5, 5),
                                                new Date(2022, 5, 6),
                                                new Date(2022, 5, 7),
                                                new Date(2022, 5, 8),
                                                new Date(2022, 5, 11),
                                                new Date(2022, 5, 12),
                                            ],
                                        }}
                                        height={100}
                                        showTooltip
                                        showHighlight
                                    />
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item lg={12} xl={12} md={12} sm={12} xs={12}
                        container
                        spacing={2}
                    >
                        <Grid item lg={6} xl={6} md={6} sm={6} xs={6}>
                            <TableContainer component={Paper} sx={{borderRadius: 3}}>
                                <CardHeader
                                    title="STAFFS"
                                    titleTypographyProps={{ variant: 'h6', color: 'white' }}
                                    sx={{ backgroundColor: "#30D5C8" }}
                                />
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ fontSize: 20, color: '#69CEE2' }}>Staff Name</TableCell>
                                            <TableCell align="right" sx={{ fontSize: 20, color: '#69CEE2' }}>Role</TableCell>
                                        </TableRow>
                                    </TableHead>
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
                                                <Link to="/admin/accounts" color='black'>View All</Link>
                                            </TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>

                            </TableContainer>
                        </Grid>
                        <Grid item lg={6} xl={6} md={6} sm={6} xs={6}>
                            <TableContainer component={Paper} sx={{borderRadius: 3}}>
                                <CardHeader
                                    title="SERVICES"
                                    titleTypographyProps={{ variant: 'h6', color: 'white' }}
                                    sx={{ backgroundColor: "#30D5C8" }}
                                />
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ fontSize: 20, color: '#69CEE2' }}>Service Name</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {services.map((service) => (
                                            <TableRow
                                                key={service.id}
                                            >
                                                <TableCell component="th" scope="row">{service.serviceName}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell align='right'>
                                                <Link to="/admin/services" color='black'>View All</Link>
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
