import React from "react";
import {
    Box,
    CardContent,
    TextField,
    Button,
    CardHeader,
} from "@mui/material";
import { vault_navigator } from "../staff/Naviate";
import StaffDrawer from "../staff/StaffDrawer";

const Vault = () => {
    const data = {
        fullname: "Cumstomer 1",
        email: "Customer1@gmail.com",
        phone: "08012345678",
    };
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "row",
                backgroundColor: "#FAF6EF",
                width: "100%",
                minHeight: "100vh",
            }}
        >
            <StaffDrawer
                mylist={["Home", "Appointments", "Calculate", "Check Diamonds", "Diamonds Appraisal", "Settings", "Sign Out"]}
                state="Settings"
                handleClick={vault_navigator}
            />

            <Box
                sx={{ width: "40%" }}>
                <CardHeader
                    title="Vault Settings"
                    titleTypographyProps={{ variant: 'h4', sx: { fontWeight: 'bold' } }}
                />
                <CardContent sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: '20px',
                }}>
                    <TextField
                        sx={{ minWidth: '100%', backgroundColor: "#fff" }}
                        id="fullname"
                        label="Fullname"
                        defaultValue={data.fullname}
                        variant="outlined" />
                    <TextField
                        sx={{ minWidth: '100%', backgroundColor: "#fff" }}
                        id="Email"
                        label="Email"
                        defaultValue={data.email}
                        variant="outlined" />
                    <TextField
                        sx={{ minWidth: '100%', backgroundColor: "#fff" }}
                        id="Phone Number"
                        label="Phone Number"
                        defaultValue={data.phone}
                        variant="outlined" />
                    <Box>
                        <Button
                            variant="contained"
                            type="button"
                            sx={{
                                backgroundColor: '#69CEE2',
                                color: '#fff',
                                borderRadius: '8px',
                                marginTop: '10px'
                            }}>Save Changes</Button>
                    </Box>
                </CardContent>
            </Box>
        </Box>
    );
};

export default Vault;
