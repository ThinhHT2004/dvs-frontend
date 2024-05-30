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
import { Link, Stack, Button } from '@mui/material';
import './DiamondAppraisalBody.css';

const UserDiamondAppraisalBody = () => {
  const username = sessionStorage.getItem("username");
  const services = [
    { value: 'label', label: '----Select Type of Service----' },
    { value: '10h', label: 'Normal Diamonds Appraisal - 10h' },
    { value: '3h', label: 'Fast Diamonds Appraisal - 3h' },
  ];

  const [value, setValue] = useState('');
  const [date, setDate] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Clear message state when the component mounts
    setMessage('');
  }, []);

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
    setMessage('hello');
  };

  if (username === null) {
    return (
      <div>
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
      <Stack component="form" onSubmit={handleSubmit} noValidate autoComplete="off">
        {message ? (
          <Box textAlign="center" mt={2}>{message}</Box>
        ) : (
          <>
            <Box
              sx={{
                '& .MuiTextField-root': { m: 1, width: '800px', backgroundColor: '#fff', textAlign: 'left', fontSize: '20px', marginLeft: '0px' },
              }}
            >
              <div>
                <TextField
                  select
                  defaultValue="label"
                >
                  {services.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" p={2}>
              <div>
              <TextField
                variant="outlined"
                value={value}
                onChange={handleInputChange}
                placeholder="Number"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Box display="flex" flexDirection="column">
                        <IconButton onClick={increment} color="primary">
                          <ArrowDropUpIcon />
                        </IconButton>
                        <IconButton onClick={decrement} color="secondary">
                          <ArrowDropDownIcon />
                        </IconButton>
                      </Box>
                    </InputAdornment>
                  ),
                }}
                sx={{ width: '800px', backgroundColor: '#fff', textAlign: 'left', fontSize: '20px', marginLeft: '0px', m: 1 }}
              />
              </div>
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" p={2}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  inputFormat="dd/MM/yyyy"
                  value={date}
                  onChange={(newValue) => setDate(newValue)}
                  renderInput={(params) => (
                  <div>
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder="dd/MM/yyyy"
                      sx={{ width: '800px', backgroundColor: '#fff', textAlign: 'left', fontSize: '20px', marginLeft: '0px', m: 1 ,padding:'0px'}}
                    />
                  </div>
                  )}
                />
              </LocalizationProvider>
            </Box>
            <Box display="flex" alignItems="left" justifyContent="left" p={2} marginLeft= "-16px">
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: "#69CEE2",
                  borderRadius: "8px",
                  textTransform: "none",
                  
                }}
              >
                Submit
              </Button>
            </Box>
          </>
        )}
      </Stack>
    );
  }
}

export default UserDiamondAppraisalBody;
