import React, { useEffect, useState } from "react";
import {
    Box,
    CardContent,
    TextField,
    Button,
    CardHeader,
    Grid,
    CardActions,
} from "@mui/material";
import { vault_navigator } from "../staff/Naviate";
import StaffDrawer from "../staff/StaffDrawer";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import protectedApi from '../../APIs/ProtectedApi';

const Vault = () => {
    const customerId = sessionStorage.getItem("customerId");
    const [customerAcc, setCustomerAcc] = useState({});
    const [customer, setCustomer] = useState({});
    const [originalCustomerAcc, setOriginalCustomerAcc] = useState({});
    const [originalCustomer, setOriginalCustomer] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await protectedApi.get('/customers/' + customerId);
                const responseAcc = await protectedApi.get('/accounts/' + customerId);
                setCustomer(response.data);
                setCustomerAcc(responseAcc.data);
                setOriginalCustomer(response.data);
                setOriginalCustomerAcc(responseAcc.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    console.log(customer);
    console.log(customerAcc);
    const drawerWidth = 240;
    const handleChange = (field, value) => {
        setCustomer({ ...customer, [field]: value });
    };
    const handleSave = () => {
    }
    const handleCancel = () => {
        setCustomer(originalCustomer);
        setCustomerAcc(originalCustomerAcc);
    }
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
                mylist={["Vault", "Settings", "Calculate", "Check Diamonds", "Diamonds Appraisal", "Sign Out"]}
                state="Settings"
                handleClick={vault_navigator}
            />

            <Box
                sx={{
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "left",
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}
            >

                <CardHeader
                    title="Vault Settings"
                    titleTypographyProps={{ variant: 'h4', sx: { fontWeight: 'bold' } }}
                />
                <CardContent>
                    <Box padding={1}>
                        <Grid container spacing={2}>
                            <Grid item lg={6} xl={6} md={6} sm={6} xs={6}>
                                <TextField
                                    label="First Name"
                                    variant="outlined"
                                    
                                    fullWidth
                                    sx={{ backgroundColor: "#fff" }}
                                    value={customer?.first_name || ""}
                                    onChange={(e) => handleChange("first_name", e.target.value)}
                                />
                            </Grid>
                            <Grid item lg={6} xl={6} md={6} sm={6} xs={6}>
                                <TextField
                                    label="Last Name"
                                    variant="outlined"
                                    placeholder="Last Name"
                                    fullWidth
                                    sx={{ backgroundColor: "#fff" }}
                                    value={customer?.last_name || ""}
                                    onChange={(e) => handleChange("last_name", e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                    <Box padding={1}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            placeholder="Email"
                            fullWidth
                            sx={{ backgroundColor: "#fff" }}
                            value={customer?.email || ""}
                            onChange={(e) => handleChange("email", e.target.value)}
                        />
                    </Box>
                    <Box padding={1}>
                        <TextField
                            label="Phone Number"
                            variant="outlined"
                            placeholder="Phone Number"
                            fullWidth
                            sx={{ backgroundColor: "#fff" }}
                            value={customer?.phoneNumber || ""}
                            onChange={(e) => handleChange("phoneNumber", e.target.value)}
                        />
                    </Box>
                    <Box padding={1}>
                        <TextField
                            label="Address"
                            variant="outlined"
                            placeholder="Address"
                            fullWidth
                            sx={{ backgroundColor: "#fff" }}
                            value={customer?.address || ""}
                            onChange={(e) => handleChange("address", e.target.value)}
                        />
                    </Box>
                    <Box padding={1}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                inputFormat="dd/MM/yyyy"
                                value={customer?.dob || null}
                                onChange={(value) => handleChange("dob", value)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Day of Birth"
                                        placeholder="Day of Birth"
                                        fullWidth
                                        variant="outlined"
                                        sx={{ backgroundColor: "#fff" }}
                                    />
                                )}
                            ></DatePicker>
                        </LocalizationProvider>
                    </Box>
                    <Box padding={1}>
                        <TextField
                            label="New Password"
                            variant="outlined"
                            fullWidth
                            sx={{ backgroundColor: "#fff" }}
                            onChange={(e) => handleChange("password", e.target.value)}
                        />
                    </Box>
                    <CardActions
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: "flex-end",
                            padding: 1,
                        }}
                    >
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "#30D5C8",
                                color: "#fff",
                                borderRadius: "10px",
                            }}
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{
                                color: "red",
                                borderColor: "red",
                                borderRadius: "10px",
                            }}
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    </CardActions>
                </CardContent>

            </Box>
        </Box>
    );
};

export default Vault;
