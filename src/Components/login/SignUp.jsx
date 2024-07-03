import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { Box, Grid, Paper, TextField, Button, Typography, Link, CardHeader, Card } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import Footer from '../footer/Footer'
import { FormControl, InputLabel, Input, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import DiasecurWhiteLogo from '../../assets/DiasecurWhiteLogo.png';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import publicApi from '../../APIs/PublicApi'


const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigator = useNavigate();
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassowrd] = useState('');
    const [dayOfBirth, setDayOfBirth] = useState(null); 
    const [phoneNumber, setPhoneNumber] = useState('');
    function handleSignUp() {
        publicApi
            .post("/auth/signup", { username: username, password: password, confirmPassword: confirmPassword })
            .then(response => {
                console.log(response.data)
                if (response.data.status === true) {
                    navigator('/accounts/signin');
                } else {
                    return toast.error(response.data.mess);
                }
            }
            )
            .catch(error => console.log())
    }
    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Toaster position="top-center" richColors></Toaster>
            <Box>
                <Navbar></Navbar>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container display={'flex'} justifyContent={'center'} alignItems={'center'}>

                    <Card component={Paper} sx={{ width: 900, padding: 0, margin: 5, borderRadius: 2 }} elevation={5}>
                        <Grid container padding={0}>
                            <Grid item lg={6} md={6} sm={6} xs={6} xl={6} padding={5}>
                                <CardHeader
                                    title="Sign Up"
                                    titleTypographyProps={{ variant: 'h4', align: 'center' }}
                                />
                                <Box marginTop={1} marginBottom={1}>
                                    <Box padding={1}>
                                        <TextField label='Username' placeholder='Username' fullWidth required variant='standard' value={username} onChange={(e) => setUsername(e.target.value)}></TextField>
                                    </Box>
                                    <Box padding={1}>
                                        <TextField label='Email' placeholder='Email' fullWidth required variant='standard' value={email} onChange={(e) => setEmail(e.target.value)}></TextField>
                                    </Box>
                                    <Box padding={1}>
                                        <FormControl
                                            fullWidth
                                            required
                                            variant='standard'
                                        >
                                            <InputLabel htmlFor="password">Password</InputLabel>
                                            <Input
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder='Password'
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                endAdornment={
                                                    <InputAdornment position="end" >
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                            onMouseDown={(e) => e.preventDefault()}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box padding={1}>
                                        <FormControl
                                            fullWidth
                                            required
                                            variant='standard'
                                        >
                                            <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
                                            <Input
                                                id="confirm-password"
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                placeholder='Confirm Password'
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassowrd(e.target.value)}
                                                endAdornment={
                                                    <InputAdornment position="end" >
                                                        <IconButton
                                                            aria-label="toggle confirm password visibility"
                                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                            onMouseDown={(e) => e.preventDefault()}
                                                            edge="end"
                                                        >
                                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                    </Box>
                                    <Box padding={1}>
                                        <Grid container spacing={2}>
                                            <Grid item lg={6} md={6} sm={6} xs={6} xl={6}>
                                                <TextField label='First Name' placeholder='First Name' fullWidth required variant='standard' value={firstName} onChange={(e) => setFirstName(e.target.value)}></TextField>
                                            </Grid>
                                            <Grid item lg={6} md={6} sm={6} xs={6} xl={6}>
                                                <TextField label='Last Name' placeholder='Last Name' fullWidth required variant='standard' value={lastName} onChange={(e) => setLastName(e.target.value)}></TextField>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <Box padding={1}>
                                        {/* <TextField label='Day of Birth' placeholder='Day of Birth' fullWidth required variant='standard' value={dayOfBirth} onChange={(e) => setDayOfBirth(e.target.value)}></TextField> */}
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            <DatePicker
                                                inputFormat="dd/MM/yyyy"
                                                value={dayOfBirth}
                                                onChange={(newValue) => setDayOfBirth(newValue)}
                                                renderInput={(params) => 
                                                    <TextField 
                                                    {...params}
                                                    label='Day of Birth'
                                                    placeholder='Day of Birth'
                                                    fullWidth
                                                    required
                                                    variant='standard'
                                                />
                                                }
                                            ></DatePicker>
                                        </LocalizationProvider>
                                    </Box>
                                    <Box padding={1} textAlign={'center'}>
                                        <TextField label='Phone Number' placeholder='Phone Number' fullWidth required variant='standard' value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}></TextField>
                                    </Box>
                                </Box>
                                <Box padding={3} textAlign={'center'}>
                                    <Button variant="contained" sx={{ background: '#69CEE2', borderRadius: '8px' }} onClick={() => handleSignUp()}>Sign Up</Button>
                                </Box>

                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6} xl={6}

                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                sx={{
                                    backgroundColor: '#69CEE2',
                                    padding: 0,
                                }}
                            >
                                <img src={DiasecurWhiteLogo} alt='Diasecur Logo' style={{ width: 300, height: 'auto', objectFit: 'cover', padding: 10 }}></img>
                                <Typography padding={2} textAlign={'center'} color={'white'}>
                                    Already have an account?
                                </Typography>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',

                                }}>
                                    <Button variant='outlined' sx={{ color: 'white', borderColor: 'white', borderRadius: 10 }} onClick={() => navigator('/accounts/signin')}>Sign In</Button>

                                </Box>
                            </Grid>
                        </Grid>


                    </Card>
                </Grid>
            </Box>
            <Box>
                <Footer></Footer>
            </Box>

        </Box>
    )
}

export default SignUp