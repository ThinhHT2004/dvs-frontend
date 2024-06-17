
import Navbar from '../Navbar/Navbar'

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Link, Grid, Button, Select, FormControl, CardHeader, Typography, Card, CardContent} from '@mui/material';
import tickXanh from '../../assets/tichxanh.png';

import axios from 'axios';
import Footer from '../footer/Footer';

const UserDiamondAppraisalBody = () => {
  const username = sessionStorage.getItem("username");
  const customerId = sessionStorage.getItem("customerId");
  const [services, setServices] = useState([])
  const [service, setService] = useState('');
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState(null);
  const [message, setMessage] = useState('');
  const [customer, setCustomer] = useState(() => {
    axios.get('http://localhost:8080/api/customers/' + customerId)
      .then(response => {
        console.log(response.data);
        setCustomer(response.data);
      })
      .catch(error => console.log(error));
  });
  const [serviceObject, setServiceObject] = useState(null);

  function getAllServices() {
    axios
      .get('http://localhost:8080/api/services/')
      .then(resp => setServices(resp.data))
      .catch(err => console.log(err));
  }


  useEffect(() => {
    getAllServices();
    fetchService();
  });

  function fetchService() {
    axios.get('http://localhost:8080/api/services/' + service)
      .then(response => {
        setServiceObject(response.data);
      })
      .catch(error => console.log(error));
  }




  const request = { consultingStaffId: null, customer: customer, service: serviceObject, quantity: quantity, status: 'WAITING', appointmentDate: date, receivingDate: null, requestDate: new Date() };


  const handleInputChange = (event) => {
    const newValue = event.target.value;
    if (!isNaN(newValue) && newValue !== '') {
      setQuantity(Number(newValue));
    } else if (newValue === '') {
      setQuantity('');
    }
  };



  const increment = () => {
    setQuantity((prevValue) => (prevValue !== '' ? prevValue + 1 : 1));
  };

  const decrement = () => {
    setValue((prevValue) => (prevValue !== '' ? prevValue - 1 : -1));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage('Request sent');
  };

  const submitRequest = () => {

    axios.post('http://localhost:8080/api/request/create', request)
      .then(response => console.log(response.data))
      .catch(error => console.log(error))
  }


  if (username === null) {
    return (
      <div className='boxi'>
        <p style={{ textAlign: 'center' }}>
          Please <span>
            <Link href="/accounts/signin" underline='none' sx={{ color: '#69CEE2', textDecoration: 'underline' }}>
              Sign in
            </Link>
          </span> to send request
        </p>
      </div>
    );
  } else {
    return (
      <Box className='boxi' component="form" onSubmit={handleSubmit} noValidate autoComplete="off" sx={{ width: '800px', maxWidth: '100%' }}>
        {message === 'Request sent' ? (
          <Box display="grid" gridTemplateColumns="auto auto" gap={1} alignItems="center" justifyContent="center" mt={2}>
            <img src={tickXanh} alt="" style={{ width: '150px', height: '150px' }} />
            <p>Request had been sent</p>
          </Box>


        ) : (
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ backgroundColor: '#fff', fontSize: '20px' }}>
                <Select
                  id="service-select"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  displayEmpty
                  renderValue={(selected) => {
                    if (selected === '') {
                      return <em style={{ color: '#989898', fontStyle: 'normal' }}>Select Type of Appraisal</em>;
                    }
                    return services.find(option => option.id === selected)?.name;
                  }}
                  sx={{
                    '& .MuiSelect-select': {
                      textAlign: 'left',
                    },
                  }}
                >
                  {services.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                value={quantity}
                onChange={handleInputChange}
                placeholder="Number"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Box display="flex" flexDirection="column">
                        <IconButton onClick={increment} sx={{ padding: '0px' }}>
                          <ArrowDropUpIcon />
                        </IconButton>
                        <IconButton onClick={decrement} sx={{ padding: '0px' }}>
                          <ArrowDropDownIcon />
                        </IconButton>
                      </Box>
                    </InputAdornment>
                  ),
                }}
                sx={{ backgroundColor: '#fff', fontSize: '20px' }}
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  inputFormat="dd/MM/yyyy"
                  value={date}
                  onChange={(newValue) => setDate(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      variant="outlined"
                      placeholder="dd/MM/yyyy"
                      sx={{ backgroundColor: '#fff', fontSize: '20px' }}
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  backgroundColor: "#69CEE2",
                  borderRadius: "8px",
                  textTransform: "none",
                  width: "100px",
                  display: 'flex',
                  justifyContent: 'center',
                }} onClick={() => submitRequest()}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        )}
      </Box>
    );
  }
}

const DiamondAppraisal = () => {
  return (
    <Box>
      <Box>
        <Navbar />
      </Box>
      <Box>
        <Card>
          <CardHeader
            title="REQUEST AN APPOINTMENT"
          />
          <CardContent>
            <Box>
              <Box>
              <Typography>
                You can request an appraisal appointment by submitting the form below and we will promptly with my appointment availability.
              </Typography>
              </Box>
              <Box>
              <Typography>
                You can also email us directly at : <span style={{ color: '#69CEE2' }}>diasecurappraiser@gmail.com</span>
              </Typography>
              </Box>
              <Box>
              <Typography>
                You can also set up an appointment by calling us directly at : <span style={{ color: '#69CEE2' }}>(+84)84913-5986</span>
              </Typography>
              </Box>
            </Box>
            <Box>
              {UserDiamondAppraisalBody()}
            </Box>
          </CardContent>
        </Card>
        
      </Box>

      <Box>
        <Footer></Footer>
      </Box>
    </Box>
  )
}

export default DiamondAppraisal