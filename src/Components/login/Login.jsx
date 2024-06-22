import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { Box, Grid, Paper, TextField , Button, Typography, Link } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'sonner'


const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState('');

    const navigator = useNavigate();

    const paperStyle = {padding: 20, height: '70vh', width: 350, margin: "20px auto", marginTop: '150px'}

    function handleLogin(){
        axios
        .post('https://dvs-backend-production.up.railway.app/api/auth/login', {username: username, password: password})
        .then(response => {
            console.log(response.data)
            if(response.data.role === 'CUSTOMER'){
                sessionStorage.setItem('username', username);
                sessionStorage.setItem('customerId', response.data.id);       
                navigator('/');
                toast.success(response.data.mess);
            }else if(response.data.role === 'CONSULTING_STAFF'){
                sessionStorage.setItem("consultingStaffId", response.data.id);
                toast.success(response.data.mess);
                navigator('/consulting-staff/home');
            }else if(response.data.role === 'VALUATION_STAFF'){
                sessionStorage.setItem("valuationStaffId", response.data.id);
                toast.success(response.data.mess);
                navigator('/valuation-staff/home');
            }else if(response.data.role === 'MANAGER'){
                sessionStorage.setItem("managerId", response.data.id);
                toast.success(response.data.mess);
                navigator('/manager/home');
            }
            else{
                toast.error(response.data.mess);
            }
        }        
        )
        .catch(error => toast.error(response));
    }
  return (
    <div>
        <Toaster position="top-center" richColors></Toaster>
        <Navbar></Navbar>
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid alignContent={'center'} alignItems={'center'} textAlign={'center'} >
                    <Box mt={3}>
                        <h1>Sign In</h1>
                    </Box>
                    <Box mt={6}>
                    <TextField label='Username' placeholder='Username' fullWidth required variant='standard' margin='normal' value={username} onChange={(e) => setUsername(e.target.value)}></TextField>
                    </Box>
                    <Box>
                        <TextField label='Password' placeholder='Password' fullWidth required variant='standard' margin='normal' value={password} onChange={(e) => setPassword(e.target.value)}></TextField>
                    </Box>
                    <Box mt={3}>
                        <Button variant="contained" sx={{background: '#69CEE2', borderRadius: '8px'}} onClick={() => handleLogin()}>Sign In</Button>
                    </Box>

                    <Typography>
                        Don't have an account? <br />
                        <Link href="/accounts/signup" underline='none'>sign up</Link>
                    </Typography>
                </Grid>
                
            </Paper>
        </Grid>        
    </div>
  )
}

export default Login