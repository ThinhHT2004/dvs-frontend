import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Box, Grid, Paper, TextField , Button, Typography, Link } from '@mui/material'


const Login = () => {

    const paperStyle = {padding: 20, height: '70vh', width: 350, margin: "20px auto"}
  return (
    <div>

        <Navbar></Navbar>
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid alignContent={'center'} alignItems={'center'} textAlign={'center'} >
                    <Box mt={3}>
                        <h1>Sign In</h1>
                    </Box>
                    <Box mt={6}>
                    <TextField label='Username' placeholder='Username' fullWidth required variant='standard' margin='normal'></TextField>
                    </Box>
                    <Box>
                        <TextField label='Password' placeholder='Password' fullWidth required variant='standard' margin='normal'></TextField>
                    </Box>
                    <Box mt={3}>
                        <Button variant="contained" sx={{background: '#69CEE2', borderRadius: '8px'}}>Sign In</Button>
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