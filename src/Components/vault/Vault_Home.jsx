import React from "react";
import {
    Box,
    Card,
    CardContent,
    Avatar,
} from "@mui/material";
import { vault_navigator } from "../staff/Naviate";
import StaffDrawer from "../staff/StaffDrawer";
import WelcomeImg from "../../assets/welcome_Img.png"
const Vault = () => {
    const drawerWidth = 240;
    return (
        <div>
            <Box sx={{ display: "flex", flexDirection: "row", backgroundColor: "#FAF6EF", width: "100%", minHeight: "100vh" }}>
                <StaffDrawer
                    mylist={[
                        "Home",
                        "Pending Request",
                        "Receipt",
                        "Report",
                        "Sign Out",
                    ]}
                    state="Home"
                    handleClick={vault_navigator}
                ></StaffDrawer>

                <Box
                    sx={{
                        p: 3,
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        display: "flex",
                    }}
                >
                    <Card sx={{ width: 674, height: 229 }}>
                        <CardContent>
                            <Typography gutterBottom variant="h4" component="div" display="flex" gap="8px">
                                Welcome <h4 style={{ color: '#69CEE2' }}>Nguyen Uyen</h4>!
                            </Typography>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <img src={WelcomeImg} alt="" style={{ width: '230px', height: '172px' }} />
                            </div>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </div >
    );
};

export default Vault;
