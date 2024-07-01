import React from 'react';
import { Button, Box, Typography, Grid } from '@mui/material';
import Customer1 from '../../assets/Customer1.jpg';
import Customer2 from '../../assets/Customer2.jpg';
import Customer3 from '../../assets/Customer3.jpg';
import Customer4 from '../../assets/Customer4.jpg';
import { useNavigate } from 'react-router-dom';

const Guider = () => {
    const navigator = useNavigate();
    return (
        <Box
            sx={{
            
                backgroundColor: { xs: 'transparent', md: '#69CEE2' },
                padding: { xs: '20px 0', md: '0' },
                textAlign: 'center',
                // padding: '20px',
                width: '55%',
                height: 'auto',
                marginTop: '14%',
                marginBottom: '14%',
                marginLeft: '23%',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '20px'
            }}
        >
            <Grid container spacing={2} style={{ flexGrow: 1 }}>
                <Grid item xs={12} md={5} container spacing={2} alignItems="center">
                    <Grid item xs={6} md={6}>
                        <img
                            src={Customer1}
                            alt="Customer 1"
                            style={{ width: '100%', borderRadius: '10px' }}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <img
                            src={Customer3}
                            alt="Customer 3"
                            style={{ width: '100%', borderRadius: '10px' }}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <img
                            src={Customer2}
                            alt="Customer 2"
                            style={{ width: '100%', borderRadius: '10px' }}
                        />
                    </Grid>
                    <Grid item xs={6} md={6}>
                        <img
                            src={Customer4}
                            alt="Customer 4"
                            style={{ width: '100%', borderRadius: '10px' }}
                        />
                    </Grid>
                </Grid>
                <Grid
                    item
                    xs={12}
                    md={7}
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        backgroundColor: '#69CEE2',
                    }}
                >
                    <Typography variant="h6" align="center" gutterBottom style={{ color: 'white' }}>
                        See how over 1 million diamond shoppers saved money on DiAsecur
                    </Typography>
                    <Button
                        variant="contained"
                        style={{
                            backgroundColor: '#39D9B9',
                            color: '#fff',
                            border: '2px solid',
                            borderColor: '#C9C9C6',
                            borderRadius: '8px',
                            marginTop: '10px'
                        }}
                        onClick={() => navigator('/calculate')}
                    >
                        GET STARTED
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Guider;
