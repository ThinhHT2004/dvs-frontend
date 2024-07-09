import React, { Fragment, useEffect, useState } from 'react';
import { admin_navigator } from '../Naviate';
import {
    Box,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TableContainer,
    Paper,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TableHead,
} from "@mui/material";
import StaffDrawer from "../StaffDrawer";
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import axios from 'axios';
import protectedApi from '../../../APIs/ProtectedApi';
import { Toaster, toast } from 'sonner';
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

const initialServicePriceList = [
    { sizeFrom: 0, sizeTo: 4 },
    { sizeFrom: 4, sizeTo: 4.5 },
    { sizeFrom: 4.5, sizeTo: 5 },
    { sizeFrom: 5, sizeTo: 5.5 },
    { sizeFrom: 5.5, sizeTo: 6 },
    { sizeFrom: 6, sizeTo: 6.5 },
    { sizeFrom: 6.5, sizeTo: 7 },
    { sizeFrom: 7, sizeTo: 7.5 },
    { sizeFrom: 7.5, sizeTo: 8 },
    { sizeFrom: 8, sizeTo: 8.5 },
    { sizeFrom: 8.5, sizeTo: 9 },
    { sizeFrom: 9, sizeTo: 10 },
    { sizeFrom: 10, sizeTo: 11 },
    { sizeFrom: 11, sizeTo: 12 },
    { sizeFrom: 12, sizeTo: 13 },
    { sizeFrom: 13, sizeTo: 14 },
    { sizeFrom: 14, sizeTo: 15 },
    { sizeFrom: 15, sizeTo: 100 }
].map(range => ({
    ...range,
    initPrice: 0,
    priceUnit: 0
}));

const Admin_Services = () => {
    const [servicePriceList, setServicePriceList] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [newServiceDialogOpen, setNewServiceDialogOpen] = useState(false);
    const [newService, setNewService] = useState({
        name: '',
        duration: '',
        servicePriceList: initialServicePriceList.map((range) => ({
            ...range,
            initPrice: 0,
            priceUnit: 0
        }))
    });

    console.log(newService);

    useEffect(() => {
        getServices();
    }, []);


    async function updateService(){
        try{
            await protectedApi
            .put('/services/update', selectedService)
            .then(resp => console.log(resp.data))
        }catch(err){
            console.log(err);
        }
    }

    const getServices = async () => {
        try {
            const resp = await protectedApi.get("/services/");
            setServices(resp.data);
        } catch (err) {
            console.log(err);
        }
    };

    const resetNewService = () => {
        setNewService({
            name: '',
            duration: '',
            servicePriceList: initialServicePriceList.map((range) => ({
                ...range,
                initPrice: 0,
                priceUnit: 0
            }))
        });
    };

    const handleDelete = async service =>{
        console.log(service);
        try{
            protectedApi
            .delete("/services/delete/" + service.id)
            .then(resp => {
                toast.success(resp.data);
                getServices();
            });
            
        }catch(err){
            console.log(err);
        }
    }

    const handleDisable = async service =>{
        try{
            protectedApi
            .put("/services/disable/" + service.id)
            .then(resp => {
                toast.success(resp.data);
                getServices();
            });
        }catch(err){
            console.log(err);
        }
    }

    const handleEnable = async service =>{
        try{
            protectedApi
            .put("/services/enable/" + service.id)
            .then(resp => {
                toast.success(resp.data);
                getServices();
            });
        }catch(err){
            console.log(err);
        }
    }


    const handlePriceChange = (index, fieldName, value) => {
        const updatedServicePriceList = [...servicePriceList];
        console.log(parseFloat(value));
        updatedServicePriceList[index][fieldName] = parseFloat(value);
        setServicePriceList(updatedServicePriceList);
    };

    const handleNewServicePriceChange = (index, fieldName, value) => {
        const updatedServicePriceList = [...newService.servicePriceList];
        updatedServicePriceList[index][fieldName] = fieldName === 'initPrice' || fieldName === 'priceUnit' ? Number(value) : value;
        setNewService(prevState => ({
            ...prevState,
            servicePriceList: updatedServicePriceList
        }));
    };


    const handleUpdateClick = () => {
        updateService();
        const updatedServices = services.map(service =>
            service.id === selectedService.id
                ? { ...selectedService, servicePriceList }
                : service
        );
        setServices(updatedServices);
        
        setDialogOpen(false);
        console.log("Updated service price list:", servicePriceList);
    };

    const handleSaveNewService = async () => {

        try{
            await protectedApi
            .post("/services/create", newService)
            .then(console.log(resp => {
                console.log(resp.data);
            }))
        }catch(err){
            console.log(err);
        }


        
        setServices([...services, newService]);
        setNewServiceDialogOpen(false);
        console.log("New service added:", newService);
        resetNewService();
        getServices();
    };

    const handleViewEditClick = service => {
        setSelectedService(service);
        setServicePriceList(service.servicePriceList);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedService(null);
    };

    const handleCloseNewServiceDialog = () => {
        setNewServiceDialogOpen(false);
        setNewService({
            name: '',
            duration: '',
            servicePriceList: initialServicePriceList.map((range) => ({
                ...range,
                initPrice: 0,
                priceUnit: 0
            }))
        });
    };

    const handleCreateNewService = () => {
        setNewServiceDialogOpen(true);
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
                    <CardHeader title="SERVICE PRICING MANAGEMENT"
                        titleTypographyProps={{ variant: 'h5', color: 'white' }}
                        sx={{ backgroundColor: "#30D5C8" }}
                    />
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell sx={{ fontSize: 20, width: 150, color: '#69CEE2' }} align="center">No</TableCell>
                                <TableCell sx={{ fontSize: 20, width: 250, color: '#69CEE2' }}>Service Name</TableCell>
                                <TableCell sx={{ width: 100 }}></TableCell>
                                <TableCell sx={{ width: 100 }}></TableCell>
                            </TableRow>
                            {services.map((service, index) => (
                                <Fragment key={service.id || index}>
                                    <TableRow>
                                        <TableCell align="center">{index + 1}</TableCell>
                                        <TableCell>{service.name}</TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleViewEditClick(service)} sx={{color: "#30D5C8"}}>View & Edit</Button>
                                        </TableCell>
                                        <TableCell>
                                            {
                                                service.active === true ? (
                                                    <Button onClick={() => handleDisable(service)} sx={{color: "red"}}>Disable</Button>
                                                ) : (
                                                    <Button onClick={() => handleEnable(service)} sx={{color: "green"}}>Enable</Button>
                                                )
                                            }
                                        </TableCell>
                                    </TableRow>
                                </Fragment>
                            ))}
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell align='left'>
                                    <Button onClick={handleCreateNewService} sx={{color:"#30D5C8"}}>Create new Service</Button>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>
                    <TextField
                        defaultValue={selectedService?.name}
                        onChange={e => setSelectedService({ ...selectedService, name: e.target.value })}
                    />
                </DialogTitle>
                <DialogContent>
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
                            {servicePriceList.map((service, index) => (
                                <StyledTableRow key={service.id}>
                                    <StyledTableCell align='center'>{index + 1}</StyledTableCell>
                                    <StyledTableCell align='center'>{service.sizeFrom}</StyledTableCell>
                                    <StyledTableCell align='center'>{service.sizeTo}</StyledTableCell>
                                    <StyledTableCell align='center'>
                                        <TextField
                                            type='number'
                                            value={service.initPrice.toString()}
                                            onChange={e => handlePriceChange(index, 'initPrice', e.target.value)}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell align='center'>
                                        <TextField
                                            type='number'
                                            value={service.priceUnit.toString()}
                                            onChange={e => handlePriceChange(index, 'priceUnit', e.target.value)}
                                        />
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdateClick} sx={{color: "#30D5C8"}}>Update</Button>
                    <Button onClick={handleCloseDialog} color="error">Cancel</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={newServiceDialogOpen} onClose={handleCloseNewServiceDialog} maxWidth="md" fullWidth>
                <DialogTitle>
                    <TextField
                        label="Service Name"
                        value={newService.name || ''}
                        onChange={e => setNewService({ ...newService, name: e.target.value })}
                    />
                    <TextField
                        label="Service Duration"
                        value={newService.duration || ''}
                        onChange={e => setNewService({ ...newService, duration: parseInt(e.target.value) })}
                    />
                </DialogTitle>
                <DialogContent>
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
                            {newService.servicePriceList.map((service, index) => (
                                <StyledTableRow key={service.id || index}>
                                    <StyledTableCell align='center'>{index + 1}</StyledTableCell>
                                    <StyledTableCell align='center'>{service.sizeFrom}</StyledTableCell>
                                    <StyledTableCell align='center'>{service.sizeTo}</StyledTableCell>
                                    <StyledTableCell align='center'>
                                        <TextField
                                            type='number'
                                            value={service.initPrice}
                                            onChange={e => handleNewServicePriceChange(index, 'initPrice', e.target.value)}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell align='center'>
                                        <TextField
                                            type='number'
                                            value={service.priceUnit}
                                            onChange={e => handleNewServicePriceChange(index, 'priceUnit', e.target.value)}
                                        />
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSaveNewService} sx={{color:"#30D5C8"}}>Save</Button>
                    <Button onClick={handleCloseNewServiceDialog} color="error">Cancel</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Admin_Services;
