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
} from "@mui/material";
import WelcomeImg from "../../../assets/welcome_Img.png";
import StaffDrawer from "../StaffDrawer";
import { useRequests } from "../consulting_staff/RequestContext";
import { PieChart } from '@mui/x-charts/PieChart';
import PropTypes from 'prop-types';
import protectedApi from '../../../APIs/ProtectedApi';
import { ca } from 'date-fns/locale';
import { toast, Toaster } from 'sonner';

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
    useEffect(() => {
        getAllAcceptedRequests();
        getAllWaitingRequests();
    }, []);
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
    useEffect(() => {
        if (acceptedRequests.length > 0 && waitingRequests.length > 0) {
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
            
        };
        const fetchData = async () => {
            try {
                const response = await protectedApi.get("/staffs/" + staffID);
                setStaff(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [acceptedRequests]);
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

    const handleAddToDb =async () => {
        setDbLoading(true);
        setProgress(0);

        try{
            const formData = new FormData();
            formData.append("file", file);
            await protectedApi
            .post("/files/read", formData, {
                headers:{
                    "Content-Type": "multipart/form-data"
                }
            })
            .then(resp => console.log(resp.data));
        }catch(err){
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
                        <Card sx={{ borderRadius: 3 , marginTop: 5}}>
                            <CardHeader
                                title="FILE UPLOAD"
                                titleTypographyProps={{ variant: 'h6' , color: 'white'}}
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
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default Admin_Home;
