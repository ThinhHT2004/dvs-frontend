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
import { Link, Grid, Button, Select, FormControl } from '@mui/material';
import tickXanh from '../../assets/tichxanh.png';
import './DiamondAppraisalBody.css';

const UserDiamondAppraisalBody = () => {
  const username = sessionStorage.getItem("username");
  const services = [
    { value: '10h', label: 'Normal Diamonds Appraisal - 10h' },
    { value: '3h', label: 'Fast Diamonds Appraisal - 3h' },
  ];

  const [service, setService] = useState('');
  const [value, setValue] = useState('');
  const [date, setDate] = useState(null);
  const [message, setMessage] = useState('');

  const handleInputChange = (event) => {
    const newValue = event.target.value;
    if (!isNaN(newValue) && newValue !== '') {
      setValue(Number(newValue));
    } else if (newValue === '') {
      setValue('');
    }
  };

  const increment = () => {
    setValue((prevValue) => (prevValue !== '' ? prevValue + 1 : 1));
  };

  const decrement = () => {
    setValue((prevValue) => (prevValue !== '' ? prevValue - 1 : -1));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage('Request sent');
  };

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
              <FormControl fullWidth sx={{ backgroundColor: '#fff', fontSize: '20px'}}>
                <Select
                  id="service-select"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  displayEmpty
                  renderValue={(selected) => {
                    if (selected === '') {
                      return <em style={{color:'#989898', fontStyle:'normal'}}>Select Type of Appraisal</em>;
                    }
                    return services.find(option => option.value === selected)?.label;
                  }}
                  sx={{
                    '& .MuiSelect-select': {
                      textAlign: 'left',
                    },
                  }}
                >
                  {services.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                value={value}
                onChange={handleInputChange}
                placeholder="Number"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Box display="flex" flexDirection="column">
                        <IconButton onClick={increment} sx={{padding: '0px'}}>
                          <ArrowDropUpIcon />
                        </IconButton>
                        <IconButton onClick={decrement}  sx={{padding: '0px'}}>
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
                }}
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

export default UserDiamondAppraisalBody;
