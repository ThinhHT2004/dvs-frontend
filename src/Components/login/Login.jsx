import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { Box, Grid, Paper, TextField, Button, Typography, Link, Card, CardHeader } from '@mui/material'
// import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import Footer from '../footer/Footer'
import { FormControl, InputLabel, Input, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import publicApi from '../../APIs/PublicApi'


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState('');

    const navigator = useNavigate();

    const paperStyle = { padding: 20, height: '70vh', width: 350, margin: "20px auto", marginTop: '150px' }

    function handleLogin() {
        if(username === '' || password === ''){
            toast.error("Username or Password must not be empty");
        }else{
            publicApi
            .post('/auth/authenticate', { username: username, password: password })
            .then(response => {
                localStorage.setItem("token", response.data.token);
                if (response.data.role === 'CUSTOMER') {
                    sessionStorage.setItem('username', username);
                    sessionStorage.setItem('customerId', response.data.id);
                    sessionStorage.setItem("role", response.data.role);
                    toast.success(response.data.mess);
                    setTimeout(() =>{
                        navigator('/');
                    }, 1000);
                } else if (response.data.role === 'CONSULTING_STAFF') {
                    sessionStorage.setItem("consultingStaffId", response.data.id);
                    sessionStorage.setItem("role", response.data.role);
                    toast.success(response.data.mess);
                    setTimeout(() =>{
                        navigator('/consulting-staff/home');
                    }, 1000)
                } else if (response.data.role === 'VALUATION_STAFF') {
                    sessionStorage.setItem("valuationStaffId", response.data.id);
                    sessionStorage.setItem("role", response.data.role);
                    toast.success(response.data.mess);
                    setTimeout(() =>{
                        navigator('/valuation-staff/diamonds-appraisal');
                    }, 1000)
                } else if (response.data.role === 'MANAGER') {
                    sessionStorage.setItem("managerId", response.data.id);
                    sessionStorage.setItem("role", response.data.role);
                    toast.success(response.data.mess);
                    setTimeout(() =>{
                        navigator('/manager/receipt');
                    }, 1000)
                } else if (response.data.role === 'ADMIN') {
                    sessionStorage.setItem("adminId", response.data.id);
                    sessionStorage.setItem("role", response.data.role);
                    toast.success(response.data.mess);
                    setTimeout(() =>{
                        navigator('/admin/home');
                    }, 1000)
                }
                else {
                    toast.error(response.data.mess);
                }
            }
            )
            .catch(error => toast.error(error));
        }
        
    }
    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Toaster position="top-center" richColors></Toaster>
            <Box>
                <Navbar></Navbar>
            </Box>
            <Box
                marginTop={10}
                marginBottom={5}
            >
                <Grid container display={'flex'} justifyContent={'center'} alignItems={'center'}>

                    <Card component={Paper} sx={{ width: 400, padding: 5, margin: 5 }} elevation={5}>
                        <CardHeader
                            title="Sign In"
                            titleTypographyProps={{ variant: 'h4', align: 'center' }}
                        />
                        <Box padding={1}>
                            <TextField label='Username' placeholder='Username' fullWidth required variant='standard' margin='normal' value={username} onChange={(e) => setUsername(e.target.value)}></TextField>
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
                        <Box padding={3} textAlign={'center'}>
                            <Button variant="contained" sx={{ background: '#69CEE2', borderRadius: '8px' }} onClick={() => handleLogin()} >Sign In</Button>
                        </Box>

                        <Typography padding={3} textAlign={'center'}>
                            Don't have an account? <Link href="/accounts/signup" underline='none'>Sign up</Link>
                        </Typography>

                        <Typography padding={3} textAlign={'center'} sx={{marginTop: '-35px'}}>
                            Forgot your password? <Link href="/accounts/resetpassword" underline='none'>Reset password</Link>
                        </Typography>


                    </Card>

                </Grid>
            </Box>
            <Box>
                <Footer></Footer>
            </Box>

        </Box>
    )
}

export default Login