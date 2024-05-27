import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Box, Grid, Paper, TextField , Button, Typography, Link } from '@mui/material'
const SignUp = () => {
    const paperStyle = {padding: 20, height: '70vh', width: 350, margin: "20px auto", marginTop: '150px'}
  return (
    
    <>
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
                    <Box>
                        <TextField label='Confirm Password' placeholder='Confirm Password' fullWidth required variant='standard' margin='normal'></TextField>
                    </Box>
                    <Box mt={3}>
                        <Button variant="contained" sx={{background: '#69CEE2', borderRadius: '8px'}}>Sign Up</Button>
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