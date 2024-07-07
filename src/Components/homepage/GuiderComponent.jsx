import React, { useState } from 'react';
import { Button, Box, Typography, Grid, IconButton, Card } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import Customer1 from '../../assets/Customer1.jpg';
import Customer2 from '../../assets/Customer2.jpg';
import Customer3 from '../../assets/Customer3.jpg';
import Customer4 from '../../assets/Customer4.jpg';
import Customer5 from '../../assets/Customer5.jpg';
import Customer6 from '../../assets/Customer6.jpg';
import { useNavigate } from 'react-router-dom';

const Guider = () => {
    const navigator = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [Customer1, Customer2, Customer3, Customer4, Customer5, Customer6];

    const handlePrevClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 3 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 3 ? 0 : prevIndex + 1));
    };

    return (
        <Box>
            <Grid container spacing={0} alignItems="center" justifyContent="center">
                <Grid item xl={8} lg={8} md={12} container>
                    <Grid item xl={1} lg={1} md={1}
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <IconButton onClick={handlePrevClick}>
                            <ArrowBack />
                        </IconButton>
                    </Grid>
                    <Grid item xl={10} lg={10} md={10} container spacing={2}>
                        {images.slice(currentIndex, currentIndex + 3).map((image, index) => (
                            <Grid item xl={4} lg={4} md={4} key={index}
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <img
                                    src={image}
                                    alt={`Customer ${currentIndex + index + 1}`}
                                    style={{ width: '100%', borderRadius: '10px' }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                    <Grid item xl={1} lg={1} md={1}
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <IconButton onClick={handleNextClick}>
                            <ArrowForward />
                        </IconButton>
                    </Grid>
                </Grid>
                <Grid
                    item
                    xl={4} lg={4} md={12}
                    container
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        padding: { xs: '20px', md: '40px' },
                        textAlign: 'center',
                    }}
                >   
                    <Typography variant="h4" align="left">
                        See how over 1 million diamond shoppers saved money on <span style={{color: "#69CEE2"}}>DiAsecur</span>
                    </Typography>
                    <Button
                    
                        variant="contained"
                        style={{
                            backgroundColor: '#69CEE2',
                            color: '#fff',
                            borderRadius: '8px',
                            margin: 10,
                            fontSize: '20px',
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
