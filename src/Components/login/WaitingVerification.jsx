import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Box, Grid, Card, CardHeader, Paper, TextField, Button } from '@mui/material'
import Footer from '../footer/Footer'

const WaitingVerification = () => {
  return (
<Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Box>
                <Navbar></Navbar>
            </Box>
            <Box
            marginTop={10}
            marginBottom={5}
            >
                <Grid container display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Card component={Paper} sx={{ width: 500, padding: 5, margin: 5 }} elevation={5}>
                        <CardHeader
                            title="Input Validation Code"
                            titleTypographyProps={{ variant: 'h4', align: 'center' }}
                        />
                        <Box
                        padding={3}
                        textAlign={'center'}
                        >
                            <TextField
                            fullWidth
                            required
                            inputProps={{
                                 style: { 
                                    textAlign: 'center', 
                                    fontSize: 20,
                                 } 
                                }}
                            value="dd9147e2-3e35-4501-b3e5-bcc76f62b0aa"
                            />
                        </Box>
                        <Box
                        padding={3} textAlign={'center'}
                        >
                            <Button
                            variant='contained'
                            >
                                Verify
                            </Button>
                        </Box>
                    </Card>
                </Grid>
            </Box>
            <Box>
                <Footer></Footer>
            </Box>

        </Box>
  )
}

export default WaitingVerification