import React, { useState } from 'react'
import { admin_navigator } from '../Naviate'
import {
    Box,
    CardContent,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    Typography,
    TableRow,
    TableHead,
    TableContainer,
    Paper,
    Button,
    TextField,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    MenuItem,

} from "@mui/material";
import StaffDrawer from "../StaffDrawer";
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
const Admin_Services = () => {
    const serviceList = [
        { id_service: 1, name_service: 'Fast Appraisal in 3 hours', size_from: 0, size_to: 4, init_price: 350000, price_unit: 0 },
        { id_service: 1, name_service: 'Fast Appraisal in 3 hours', size_from: 4, size_to: 4.5, init_price: 400000, price_unit: 0 },
        { id_service: 1, name_service: 'Fast Appraisal in 3 hours', size_from: 4.5, size_to: 5, init_price: 450000, price_unit: 0 },
        { id_service: 1, name_service: 'Fast Appraisal in 3 hours', size_from: 5, size_to: 5.5, init_price: 500000, price_unit: 0 },
        { id_service: 1, name_service: 'Fast Appraisal in 3 hours', size_from: 5.5, size_to: 6, init_price: 550000, price_unit: 0 },
        { id_service: 1, name_service: 'Fast Appraisal in 3 hours', size_from: 6, size_to: 6.5, init_price: 600000, price_unit: 0 },
        { id_service: 1, name_service: 'Fast Appraisal in 3 hours', size_from: 6.5, size_to: 7, init_price: 650000, price_unit: 0 },
        { id_service: 1, name_service: 'Fast Appraisal in 3 hours', size_from: 7, size_to: 7.5, init_price: 700000, price_unit: 0 },
        { id_service: 1, name_service: 'Fast Appraisal in 3 hours', size_from: 7.5, size_to: 8, init_price: 750000, price_unit: 0 },
        { id_service: 1, name_service: 'Fast Appraisal in 3 hours', size_from: 8, size_to: 8.5, init_price: 800000, price_unit: 0 },
        { id_service: 1, name_service: 'Fast Appraisal in 3 hours', size_from: 8.5, size_to: 9, init_price: 850000, price_unit: 0 },
        { id_service: 1, name_service: 'Fast Appraisal in 3 hours', size_from: 9, size_to: 10, init_price: 1000000, price_unit: 0 },
        { id_service: 1, name_service: 'Fast Appraisal in 3 hours', size_from: 10, size_to: 11, init_price: 1500000, price_unit: 0 },
        { id_service: 1, name_service: 'Fast Appraisal in 3 hours', size_from: 11, size_to: 12, init_price: 2000000, price_unit: 0 },
        { id_service: 1, name_service: 'Fast Appraisal in 3 hours', size_from: 12, size_to: 13, init_price: 2500000, price_unit: 0 },
        { id_service: 1, name_service: 'Fast Appraisal in 3 hours', size_from: 13, size_to: 14, init_price: 3000000, price_unit: 0 },
        { id_service: 1, name_service: 'Fast Appraisal in 3 hours', size_from: 14, size_to: 15, init_price: 3500000, price_unit: 0 },
        { id_service: 1, name_service: 'Fast Appraisal in 3 hours', size_from: 15, size_to: 100, init_price: 3500000, price_unit: 1500000 },
        { id_service: 2, name_service: 'Normal Appraisal in 10 hours', size_from: 0, size_to: 4, init_price: 300000, price_unit: 0 },
        { id_service: 2, name_service: 'Normal Appraisal in 10 hours', size_from: 4, size_to: 4.5, init_price: 350000, price_unit: 0 },
        { id_service: 2, name_service: 'Normal Appraisal in 10 hours', size_from: 4.5, size_to: 5, init_price: 400000, price_unit: 0 },
        { id_service: 2, name_service: 'Normal Appraisal in 10 hours', size_from: 5, size_to: 5.5, init_price: 450000, price_unit: 0 },
        { id_service: 2, name_service: 'Normal Appraisal in 10 hours', size_from: 5.5, size_to: 6, init_price: 500000, price_unit: 0 },
        { id_service: 2, name_service: 'Normal Appraisal in 10 hours', size_from: 6, size_to: 6.5, init_price: 550000, price_unit: 0 },
        { id_service: 2, name_service: 'Normal Appraisal in 10 hours', size_from: 6.5, size_to: 7, init_price: 600000, price_unit: 0 },
        { id_service: 2, name_service: 'Normal Appraisal in 10 hours', size_from: 7, size_to: 7.5, init_price: 650000, price_unit: 0 },
        { id_service: 2, name_service: 'Normal Appraisal in 10 hours', size_from: 7.5, size_to: 8, init_price: 700000, price_unit: 0 },
        { id_service: 2, name_service: 'Normal Appraisal in 10 hours', size_from: 8, size_to: 8.5, init_price: 750000, price_unit: 0 },
        { id_service: 2, name_service: 'Normal Appraisal in 10 hours', size_from: 8.5, size_to: 9, init_price: 800000, price_unit: 0 },
        { id_service: 2, name_service: 'Normal Appraisal in 10 hours', size_from: 9, size_to: 10, init_price: 950000, price_unit: 0 },
        { id_service: 2, name_service: 'Normal Appraisal in 10 hours', size_from: 10, size_to: 11, init_price: 1100000, price_unit: 0 },
        { id_service: 2, name_service: 'Normal Appraisal in 10 hours', size_from: 11, size_to: 12, init_price: 1500000, price_unit: 0 },
        { id_service: 2, name_service: 'Normal Appraisal in 10 hours', size_from: 12, size_to: 13, init_price: 1800000, price_unit: 0 },
        { id_service: 2, name_service: 'Normal Appraisal in 10 hours', size_from: 13, size_to: 14, init_price: 2100000, price_unit: 0 },
        { id_service: 2, name_service: 'Normal Appraisal in 10 hours', size_from: 14, size_to: 15, init_price: 2500000, price_unit: 0 },
        { id_service: 2, name_service: 'Normal Appraisal in 10 hours', size_from: 15, size_to: 100, init_price: 2800000, price_unit: 1300000 }
    ];
    const [servicePriceList, setServicePriceList] = useState(serviceList);
    const [tempServiceList, setTempServiceList] = useState(serviceList);
    const [selectedService, setSelectedService] = useState('');

    const handlePriceChange = (id_service, fieldName, value) => {
        // Find the index of the service with the given id_service in the tempServiceList
        const index = tempServiceList.findIndex(service => service.id_service === id_service);
      
        // If the service was found in the tempServiceList
        if (index !== -1) {
          // Create a copy of the tempServiceList
          let updatedServiceList = [...tempServiceList];
      
          // Update the specific field in the selected service
          updatedServiceList[index][fieldName] = value;
      
          // Update the state
          setTempServiceList(updatedServiceList);
        }
      };
    const handleUpdateClick = () => {
        setServicePriceList(tempServiceList);
        console.log("Updated service price list:", tempServiceList);
    };

    const drawerWidth = 240;
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    return (
        <Box sx={{ display: "flex", flexDirection: "row", backgroundColor: "#FAF6EF", width: "100%", minHeight: "100vh" }}>
            <StaffDrawer
                mylist={[
                    "Home",
                    "Services",
                    "Sign Out",
                ]}
                state="Services"
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
                <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
                    <CardHeader title="Service Price List"
                        titleTypographyProps={{ variant: 'h5', color: 'white' }}
                        sx={{ backgroundColor: "#30D5C8" }}
                    />
                    <CardContent>
                        <TextField
                            id="select-service"
                            select
                            label="Select Service to Update"
                            fullWidth
                            variant="outlined"
                            value={selectedService}
                            onChange={(event) => setSelectedService(event.target.value)}
                        >
                            {serviceList.filter((service, index, self) =>
                                index === self.findIndex((t) => (
                                    t.name_service === service.name_service
                                ))
                            ).map((option) => (
                                <MenuItem key={option.id_service} value={option.name_service}>
                                    {option.name_service}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Box display='flex' justifyContent='flex-end'>
                            <Button variant="contained" color="primary" onClick={handleUpdateClick}>Update</Button>
                        </Box>
                    </CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align='center'>No</StyledTableCell>
                                <StyledTableCell align='center'>Size From</StyledTableCell>
                                <StyledTableCell align='center'>Size To</StyledTableCell>
                                <StyledTableCell align='center'>Initial Price</StyledTableCell>
                                <StyledTableCell align='center'>Price Unit</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tempServiceList.filter(service => service.name_service === selectedService).map((service, index) => (
                                <StyledTableRow key={`${service.id_service}-${service.size_from}-${service.size_to}`}>
                                    <StyledTableCell align='center'> {index +1}</StyledTableCell>
                                    <StyledTableCell align='center'>{service.size_from}</StyledTableCell>
                                    <StyledTableCell align='center'>{service.size_to}</StyledTableCell>
                                    <StyledTableCell align='center'>
                                        <FormControl>
                                            <InputLabel htmlFor={`init_price-${index}`}></InputLabel>
                                            <OutlinedInput
                                                type='number'
                                                defaultValue={service.init_price}
                                                onBlur={(e) => handlePriceChange(service.id_service, 'init_price', parseFloat(e.target.value))}
                                                onChange={(e) => { }}
                                            />
                                        </FormControl>
                                    </StyledTableCell>
                                    <StyledTableCell align='center'>
                                        <FormControl>
                                            <InputLabel htmlFor={`price_unit-${index}`}></InputLabel>
                                            <OutlinedInput
                                                type='number'
                                                id={`price_unit-${index}`}
                                                defaultValue={service.price_unit}
                                                onBlur={(e) => handlePriceChange(service.id_service, 'price_unit', parseFloat(e.target.value))}
                                                onChange={(e) => { }}
                                            />
                                        </FormControl>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default Admin_Services