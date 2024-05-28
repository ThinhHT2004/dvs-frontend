import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { Box, Grid, Paper, TextField , Button, Typography, Link } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'sonner'



const SignUp = () => {
    const paperStyle = {padding: 20, height: '70vh', width: 350, margin: "20px auto", marginTop: '150px'}

    const navigator = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassowrd] = useState('');
  
    function handleSignUp(){
        axios
        .post("http://localhost:8080/api/accounts/signup", {username: username, password: password, confirmPassword: confirmPassword})
        .then(response => {
            console.log(response.data)
            if(response.data.status === true){
                navigator('/accounts/signin');
            }else{
                return toast.error(response.data.mess);
            }
        }
        )
        .catch(error => console.log(error))
    }
  
    return (
    
    <>
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
                    <Box>
                        <TextField label='Confirm Password' placeholder='Confirm Password' fullWidth required variant='standard' value={confirmPassword} margin='normal' onChange={(e) => setConfirmPassowrd(e.target.value)}></TextField>
                    </Box>
                    <Box mt={3}>
                        <Button variant="contained" sx={{background: '#69CEE2', borderRadius: '8px'}} onClick={() => handleSignUp()}>Sign Up</Button>
                    </Box>
                    
                    <Typography>
                        Already have account? <br />
                        <Link href="/accounts/signin" underline='none'>sign in</Link>
                    </Typography>
                </Grid>
            </Paper>
        </Grid>
    </>
  )
}

export default SignUp