import React, { useEffect, useState } from 'react'
import { admin_navigator } from '../Naviate'
import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    CardHeader,
} from "@mui/material";
import WelcomeImg from "../../../assets/welcome_Img.png";
import StaffDrawer from "../StaffDrawer";
import { useRequests } from "../consulting_staff/RequestContext";
import { PieChart } from '@mui/x-charts/PieChart';
import { he } from 'date-fns/locale';

const Admin_Home = () => {
    useEffect(() => {
        getAllAcceptedRequests();
        getAllWaitingRequests();
    }, []);
    const drawerWidth = 240;
    const { acceptedRequests, getAllAcceptedRequests } = useRequests([]);
    const { waitingRequests, getAllWaitingRequests } = useRequests([]);
    const [statusData, setStatusData] = useState([]);
    console.log(statusData);
    useEffect(() => {
        if (acceptedRequests.length > 0 && waitingRequests.length > 0) {
            const statusCounts1 = acceptedRequests.reduce((acc, { status }) => {
                acc[status] = (acc[status] || 0) + 1;
                return acc;
            }, {});
            const statusCounts2 = waitingRequests.reduce((acc, { status }) => {
                acc[status] = (acc[status] || 0) + 1;
                return acc;
            }
                , {});
            const statusCounts = { ...statusCounts1, ...statusCounts2 };
            const formattedStatusData = Object.keys(statusCounts).map(key => ({
                label: key,
                value: statusCounts[key],
            }));

            setStatusData(formattedStatusData);
        }
    }, [acceptedRequests]);
    return (
        <Box sx={{ display: "flex", flexDirection: "row", backgroundColor: "#FAF6EF", width: "100%", minHeight: "100vh" }}>
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
                <Grid container spacing={2}>
                    <Grid item lg={6} xl={6} md={6} sm={6} xs={6}>
                        <Card sx={{ borderRadius: 3 }}>
                            <CardContent>
                                <Typography variant="h4">Welcome <span style={{ color: "#69CEE2" }}>Hua Tan Thinh</span></Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <img src={WelcomeImg} alt="" style={{ width: '230px', height: '172px' }} />
                                </Box>
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

    )
}

export default Admin_Home