
import Navbar from '../Navbar/Navbar'

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { DateTimePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Link, Grid, Button, Select, FormControl, CardHeader, Typography, Card, CardContent, Paper } from '@mui/material';
import tickXanh from '../../assets/tichxanh.png';
import background from '../../assets/diamondAppraisalBackground.jpg';
import axios from 'axios';
import Footer from '../footer/Footer';
import diaApp01 from '../../assets/diamondAppraisal01.png';
import diaApp02 from '../../assets/diamondAppraisal02.png';
import exampleReport from '../../assets/exampleReport.png';
import protectedApi from '../../APIs/ProtectedApi';
const UserDiamondAppraisalBody = () => {
  const username = sessionStorage.getItem("username");
  const customerId = sessionStorage.getItem("customerId");
  const [services, setServices] = useState([])
  const [service, setService] = useState('');
  const [quantity, setQuantity] = useState('');
  const [date, setDate] = useState(null);
  const [message, setMessage] = useState('');
  const [customer, setCustomer] = useState(() => {
    protectedApi.get('/customers/' + customerId)
      .then(response => {
        setCustomer(response.data);
      })
      .catch(error => console.log(error));
  });
  const [serviceObject, setServiceObject] = useState(null);
  function getAllServices() {
    protectedApi
      .get('/services/active')
      .then(resp => setServices(resp.data))
      .catch(err => console.log(err));
  }
  useEffect(() => {
    getAllServices();
    getService();
  }, [service]);

  function getService(){
    protectedApi.get("/services/" + service)
    .then(resp =>{
      setServiceObject(resp.data);
    })
    .catch(err => console.log(err));
  }


  const request = { consultingStaffId: null, customer: customer, service: serviceObject, quantity: quantity, status: 'WAITING', appointmentDate: date, receivingDate: null, requestDate: new Date() };


  const handleInputChange = (event) => {
    const newValue = event.target.value;
    if(event.target.value.match(/[^0-9]/)){
      event.preventDefault();
    }else{
      if (!isNaN(newValue) && newValue !== '') {
        setQuantity(Number(newValue));
      } else if (newValue === '') {
        setQuantity('');
      }
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage('Request sent');
  };

  const submitRequest = () => {
    protectedApi.post('/request/create', request)
      .catch(error => console.log(error))
  }


  function checkFullFilled(){
    if(serviceObject === null || quantity === '' || date === null || date === 'Invalid Date' || isNaN(date.getTime())) return false;
    if(date === 'Invalid Date') return false;
    return true;
  }

  if (username === null) {
    return (
      <Box margin={4}>
        <Typography
          sx={{
            fontSize: {
              xs: '16px',
              sm: '18px',
              md: '20px',
              lg: '22px',
              xl: '24px',
            },
            textAlign: 'center',
            color: '#989898',
          }}
        >
          Please <span>
            <Link href="/accounts/signin" underline='none' sx={{ color: '#69CEE2', textDecoration: 'underline' }}>
              Sign in
            </Link>
          </span> to send request
        </Typography>
      </Box>
    );
  } else {
    return (
      <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off" >
        {message === 'Request sent' ? (
          
            <Grid container spacing={2}>
            <Grid item lg={12}
             container
             
             direction="row"
             justifyContent="center"
             alignItems="center">
            <img src={tickXanh} alt="" style={{ width: '150px', height: '150px' }} />
            <Typography 
            
            sx={{
            fontSize: {
              xs: '16px',
              sm: '18px',
              md: '20px',
              lg: '22px',
              xl: '24px',
            },
            color: '#989898',
          }}>
            Request had been sent successfully
          </Typography>
              </Grid>
              
            </Grid>
        ) : (
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <FormControl  sx={{ backgroundColor: '#fff', fontSize: '20px', borderRadius: '4px', width: 800 }}>
                <Select
                  id="service-select"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  displayEmpty
                  renderValue={(selected) => {
                    if (selected === '' || selected === null) {
                      return <em style={{ color: '#989898', fontStyle: 'normal' }}>Select Type of Appraisal</em>;
                    }
                    return services.find(option => option.id === selected)?.name;
                  }}
                  sx={{
                    borderRadius: '4px',
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
                value={quantity}
                onChange={handleInputChange}
                placeholder="Amount of Diamonds"
                type="number"
              
                sx={{ backgroundColor: '#fff', fontSize: '20px', borderRadius: '4px', width: 800 }}
              />
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  disablePast
                  inputFormat="dd/MM/yyyy hh:mm aa"
                  value={date}
                  onChange={(newValue) => setDate(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      
                      variant="outlined"
                      placeholder="dd/MM/yyyy hh:mm aa"
                      sx={{ backgroundColor: "#fff", fontSize: "20px", borderRadius: '4px' , width: 800 }}
                    />
                  )}
                ></DateTimePicker>
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
                disabled={!checkFullFilled()}
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
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box >
        <Navbar />
      </Box>
     <Box 
      marginTop={5}
     marginBottom={5}
     >
     <Box
        sx={{ 
        backgroundImage: `url(${background})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat', 
        paddingTop: 5,
      }}
      >

        <Card variant='outlined' sx={{ borderRadius: 0, border: 0, margin: 5, background: 0 }} >

          <CardHeader
            title={
              <Typography
                variant="h3"
                sx={{
                  fontSize: {
                    xs: '1.5rem',
                    sm: '1rem',
                    md: '3rem',
                    lg: '3rem',
                    xl: '3rem',
                  }
                }}
              >
                REQUEST AN APPOINTMENT
              </Typography>
            }
          />
          <CardContent>
            <Box>
              <Box padding={1} >
                <Typography
                  sx={{
                    fontSize: {
                      xs: '16px',
                      sm: '18px',
                      md: '24px',
                      lg: '24px',
                      xl: '24px',
                    },
                    color: '#989898'
                  }}
                >
                  You can request an appraisal appointment by submitting the form below and we will promptly with my appointment availability.
                </Typography>
              </Box>
              <Box padding={1}>
                <Typography
                  sx={{
                    fontSize: {
                      xs: '16px',
                      sm: '18px',
                      md: '20px',
                      lg: '22px',
                      xl: '24px',
                    },
                    color: '#989898'
                  }}
                >
                  You can also email us directly at : <span style={{ color: '#69CEE2' }}>diasecurappraiser@gmail.com</span>
                </Typography>
              </Box>
              <Box padding={1}>
                <Typography
                  sx={{
                    fontSize: {
                      xs: '16px',
                      sm: '18px',
                      md: '20px',
                      lg: '22px',
                      xl: '24px',
                    },
                    color: '#989898'
                  }}
                >
                  You can also set up an appointment by calling us directly at : <span style={{ color: '#69CEE2' }}>(+84)84913-5986</span>
                </Typography>
              </Box>
            </Box>
            <Box padding={2}>
              {UserDiamondAppraisalBody()}
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box>
        <Card variant='outlined' sx={{ borderRadius: 0, border: 0 }}>
          <CardHeader
            title="The Appraisal Process"
            titleTypographyProps={{ variant: 'h4' }}
          />
          <CardContent>
            <Card variant='outlined' sx={{ borderRadius: 0, border: 0 }}>
              <CardHeader
                title="What Happens First ?"
              />
              <CardContent>

                <Typography>
                  When you arrive for your appointment you will need to fill out an intake form that asks some brie questions. I will then explain a little about the appraisal process and begin the physical evaluation of your jewelry item(s). During the appraisal, you sit directly across from me and your jewelry items are always in plain view. The physical evaluation of your jewelry items includes measuring, testing, note taking, calculating and photography. As I am conducting the inspection of your jewelry, I will explain to you what I am doing and answer any questions or concerns you may have during the process.
                </Typography>

              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </Box>
      <Box>
        <Card variant='outlined' sx={{ borderRadius: 0, border: 0 }}>
          <CardHeader
            title="The Evaluation Process"
            titleTypographyProps={{ variant: 'h4' }}
          />
          <CardContent>
            <Grid container spacing={2} >
              <Grid item lg={6} xl={6} md={12}>
                <Card variant='outlined' sx={{ borderRadius: 0, border: 0 }}>

                  <CardHeader
                    title="Clarity Grading :"
                  />
                  <CardContent>

                    <Typography>
                      The internal characteristic or inclusions of your diamond will be observed under a high powered gemological microscope and a plot diagram will show the location and type of inclusion. A clarity grade using the GIA clarity grading system will be assigned and noted in the report.
                    </Typography>

                  </CardContent>
                </Card>
                <Card variant='outlined' sx={{ borderRadius: 0, border: 0 }}>
                  <CardHeader
                    title="Color Grading :"
                  />
                  <CardContent>
                    <Typography>
                      The amount of inherent color in your diamond will be evaluated and compared to GIA master graded diamonds under proper daylight diamond grading lamps. A letter grade from D to Z will be assigned based on the amount of color or (lack there of) your diamond is exhibiting. The color grade assigned will use the GIA's color grading system and noted in the report. * I have a full set of master graded diamonds used for comparison that have been graded and certified by the Gemological Institute of America (GIA).
                    </Typography>

                  </CardContent>
                </Card>
                <Card variant='outlined' sx={{ borderRadius: 0, border: 0 }}>
                  <CardHeader
                    title="Carat Weight :"
                  />
                  <CardContent>

                    <Typography>
                      If your diamond is mounted, the carat weight is estimated by using a standard formula for the type of cut for your stone. If your stone un-mounted, it is directly weighed on a digital carat weight scale. The weight is noted in the report.
                    </Typography>

                  </CardContent>

                </Card>
              </Grid>
              <Grid
                item
                lg={6} xl={6} md={12}
                container
                direction="column"
                justifyContent="center"
                alignItems="center">
                <Box >
                  <img src={diaApp01} alt="" style={{ width: '600px', height: '450px' }} />
                </Box>
              </Grid>
            </Grid>

            <Grid container spacing={2} marginTop={1}>

              <Grid
                item
                lg={6} xl={6} md={12}
              >
                <Card variant='outlined' sx={{ borderRadius: 0, border: 0 }}>
                  <CardHeader
                    title="Finish :"
                  />
                  <CardContent>

                    <Typography>
                      Symmetry and Polish will be assessed and given a grade of Poor to Excellent and noted in the report.
                    </Typography>

                  </CardContent>
                </Card>
                <Card variant='outlined' sx={{ borderRadius: 0, border: 0 }}>
                  <CardHeader
                    title="Cutting Proportions :"
                  />
                  <CardContent>

                    <Typography>
                      The cutting proportions of your diamond are evaluated. This includes, measurements of the diameter or length & width, along with the depth of your diamond. Depth%, Table%, Crown Angle, and Girdle Thickness are evaluated and noted in the final report.
                    </Typography>

                  </CardContent>
                </Card>
                <Card variant='outlined' sx={{ borderRadius: 0, border: 0 }}>
                  <CardHeader
                    title="Cut Grade :"
                  />
                  <CardContent>

                    <Typography>
                      Any and all enhancements that are detectable by gemological testing and or observation will be noted in the report.
                    </Typography>

                  </CardContent>
                </Card>
                <Card variant='outlined' sx={{ borderRadius: 0, border: 0 }}>
                  <CardHeader
                    title="Enhancements :"
                  />
                  <CardContent>

                    <Typography>
                      The internal characteristic or inclusions of your diamond will be observed under a high powered gemological microscope and a plot diagram will show the location and type of inclusion. A clarity grade using the GIA clarity grading system will be assigned and noted in the report.
                    </Typography>

                  </CardContent>
                </Card>
              </Grid>
              <Grid
                item
                lg={6} xl={6} md={12}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <img src={diaApp02} alt="" />
              </Grid>
            </Grid>
            <Grid container spacing={2} marginTop={2}>
              <Grid
                item
                lg={6} xl={6} md={12}
              >
                <Card variant='outlined' sx={{ borderRadius: 0, border: 0 }}>
                  <CardHeader
                    title="The Final Hard Copy Appraisal Report :"
                  />
                  <CardContent>

                    <Typography>
                      All the quality analysis information gathered from the physical inspection is documented in a methodical and clear easy to understand format in the final written appraisal report. Digital Photographs of all jewelry items are taken and included in the appraisal document. Your appraisal report will include the specific intended use and appropriate market level researched in the report, as well as explain the grading systems used. An explanation and the definition of market level used will be included, along with the instructions for the appropriate use of the appraisal report.
                    </Typography>

                  </CardContent>
                </Card>
                <Card variant='outlined' sx={{ borderRadius: 0, border: 0 }}>
                  <CardHeader
                    title="Partial List of Gemological Instruments Available at DiAsecur :"
                  />
                  <CardContent>

                    <Typography>
                      Diamond Proportion analyzer, Electronic Carat Weight Gem Scale, Electronic Metal Scale, Dichroscope, Polaroid Filter Lenses for Microscope, Refractometer, Day Light Diamond Grading Light, 10X Hand Loupe, Master Diamond Comparison Set / GIA, Polariscope, GIA Proportion Scope, Ideal Scope, Hearts & Arrow Scope, Heavy Testing Liquids, Fiber Optic Light Source, Chelsea Filter, Millimeter Micrometer, Presidium Electronic Gemstone Gauge Presidium Electronic Gemstone Tester, Presidium Gem Weight Scale, GIA GEM Spectroscope, G-1 Electronic Gold Tester, Ultra-Violet Light (long and short wave), Leverage Gauge and Tables, Electronic Moissanite Tester, Electronic Diamond Tester.
                    </Typography>

                  </CardContent>
                </Card>
              </Grid>
              <Grid
                item
                lg={6} xl={6} md={12}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <img src={exampleReport} alt="" style={{ width: '550px', height: '750px' }} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
     </Box>
      <Box >
        <Footer></Footer>
      </Box>
    </Box>
  )
}

export default DiamondAppraisal