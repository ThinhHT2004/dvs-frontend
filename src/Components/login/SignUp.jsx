import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { Box, Grid, Paper, TextField, Button, Typography, Link, CardHeader, Card } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import Footer from '../footer/Footer'
import { FormControl, InputLabel, Input, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';



const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigator = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassowrd] = useState('');
    
    function handleSignUp() {
        axios
            .post("https://dvs-backend-production.up.railway.app/api/accounts/signup", { username: username, password: password, confirmPassword: confirmPassword })
            .then(response => {
                console.log(response.data)
                if (response.data.status === true) {
                    navigator('/accounts/signin');
                } else {
                    return toast.error(response.data.mess);
                }
            }
            )
            .catch(error => console.log(error))
    }

    return (


        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Toaster position="top-center" richColors></Toaster>
            <Box>
                <Navbar></Navbar>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container display={'flex'} justifyContent={'center'} alignItems={'center'}>

                    <Card component={Paper} sx={{ width: 400, padding: 5, margin: 5 }} elevation={5}>
                        <CardHeader
                            title="Sign Up"
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
                        <Box padding={1}>
                        <FormControl
                                fullWidth
                                required
                                variant='standard'
                                margin='normal'
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
                        <Box padding={3} textAlign={'center'}>
                            <Button variant="contained" sx={{ background: '#69CEE2', borderRadius: '8px' }} onClick={() => handleSignUp()}>Sign Up</Button>
                        </Box>
                        <Typography padding={3} textAlign={'center'}>
                            Already have account? <Link href="/accounts/signin" underline='none'>Sign in</Link>
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

export default SignUp