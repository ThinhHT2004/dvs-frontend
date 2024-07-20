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
import protectedApi from "../../APIs/ProtectedApi";
import { toast, Toaster } from "sonner";

const Vault = () => {
  const customerId = sessionStorage.getItem("customerId");
  const [customerAcc, setCustomerAcc] = useState({});
  const [customer, setCustomer] = useState({});
  const [newPass, setNewPass] = useState("");
  const [originalCustomerAcc, setOriginalCustomerAcc] = useState({});
  const [originalCustomer, setOriginalCustomer] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await protectedApi.get("/customers/" + customerId);
        const responseAcc = await protectedApi.get("/accounts/" + customerId);
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
  const drawerWidth = 240;
  const handleChange = (field, value) => {
    setCustomer({ ...customer, [field]: value });
  };
  const handleSave = async () => {
    try {
      await protectedApi.put("/customers/update", customer).then((resp) => {
        if (resp.data.code == 0) {
          toast.error(resp.data.message);
        } else {
          toast.success(resp.data.message);
        }
      });
      if (newPass !== "") {
        setCustomerAcc({ ...customerAcc, password: newPass });
        await protectedApi
          .put("/accounts/update/" + customerAcc.id + "/" + newPass)
          .then((resp) => toast.success("Change Password Successfully"));
      }
    } catch (err) {
      console.log(err);
    }
  };

  function checkPhoneNumber() {
    if (customer.phoneNumber?.length !== 10) {
      return false;
    } else {
      return true;
    }
  }

  function checkFullFilled(){
    if(customer.first_name === '' || customer.last_name === '' || customer.address === '' || customer.email === '' || customer.dob === null || customer.phoneNumber === ''){
      return false;
    }

    if(!checkPhoneNumber() || !checkPhoneNumberString() || !isValidEmailIgnoringTail()){
      return false;
    }

    return true;
  }

  function checkPhoneNumberString() {
    const digitRegex = /^\d+$/;
    return digitRegex.test(customer.phoneNumber);
  }

  function isValidEmailIgnoringTail() {
    const emailRegex = /^[^\s@]+@[^\s@]+$/;

    return emailRegex.test(customer.email);
  }

  const handleCancel = () => {
    setCustomer(originalCustomer);
    setCustomerAcc(originalCustomerAcc);
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
      <Toaster position="top-center" richColors></Toaster>
      <StaffDrawer
        mylist={[
          "Vault",
          "Settings",
          "Calculate",
          "Check Certificates",
          "Diamonds Appraisal",
          "Sign Out",
        ]}
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
          titleTypographyProps={{ variant: "h4", sx: { fontWeight: "bold" } }}
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
              error={customer.email === "" ? false : !isValidEmailIgnoringTail()}
              helperText={
                customer.email === ""
                  ? false
                  : !isValidEmailIgnoringTail()
                  ? "Email is invalid"
                  : ""
              }
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
              error={customer.phoneNumber === "" ? false : !checkPhoneNumber()}
              helperText={
                customer.phoneNumber === ""
                  ? false
                  : !checkPhoneNumberString()
                  ? "Phone must contain only digit"
                  : !checkPhoneNumber()
                  ? "Lenght must be 10"
                  : ""
              }
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
                    label="Date of Birth"
                    placeholder="Date of Birth"
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
              onChange={(e) => setNewPass(e.target.value)}
            />
          </Box>
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "flex-end",
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
              disabled={!checkFullFilled()}
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
