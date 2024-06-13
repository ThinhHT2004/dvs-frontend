import React, { useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    TableContainer,
    TableHead,
    Table,
    TableBody,
    Paper,
    TableRow,
    TableCell,
    Link,
} from "@mui/material";
import { vault_navigator } from "../staff/Naviate";
import StaffDrawer from "../staff/StaffDrawer";
import WelcomeImg from "../../assets/welcome_Img.png";

const drawerWidth = 180;

const Vault = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "#FAF6EF",
                width: "100%",
                minHeight: "100vh",
                overflow: "hidden",
            }}
        >
            <StaffDrawer
                mylist={["Home", "Appointments", "Receipt", "Report", "Sign Out"]}
                state="Home"
                handleClick={vault_navigator}
            />
            <Box
                sx={{
                    p: 3,
                    flexGrow: 1,
                    display: "inline-flex",
                    justifyContent: "space-evenly",
                    flexDirection: { xs: "column", sm: "row" },
                    transition: "margin 0.3s ease",
                    width: "100%",
                }}
            >
                <Card
                    sx={{
                        width: { xs: '100%', sm: `calc(50% - 60px)` },
                        height: 229,
                    }}
                >
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div" display="flex" gap="8px">
                            Welcome <h4 style={{ color: '#69CEE2' }}>Nguyen Uyen</h4>!
                        </Typography>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <img src={WelcomeImg} alt="" style={{ width: '230px', height: '172px' }} />
                        </div>
                    </CardContent>
                </Card>
                    <TableContainer component={Paper} sx={{ width: { xs: "100%", sm: `calc(50% - 60px)` }, height: 229 }}>
                        <Table sx={{ minWidth: 450, height: '100%', borderRadius: 10 }}>
                            <TableHead sx={{ backgroundColor: "#30D5C8" }}>
                                <TableRow>
                                    <TableCell sx={{ fontSize: '20px', padding: '12px' }} colSpan={6}>Nearest Appoiment</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell height="23px" sx={{borderBottom: 'none', padding: '10px', fontSize: '16px'}} >Fast Diamond Appraisal - GIA ID 6495035512 - 5/13/2024</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <Link
                                            href="#"
                                            sx={{ color: "#69CEE2", paddingLeft: "16px" }}
                                            underline="none"
                                            onClick={() => handleAction()}
                                        >
                                            Approve
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            href="#"
                                            sx={{ color: "red", paddingLeft: "16px" }}
                                            underline="none"
                                            onClick={() => handleAction()}
                                        >
                                            Decline
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
            </Box>
        </Box>
    );
};

export default Vault;
