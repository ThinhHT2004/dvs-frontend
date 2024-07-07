import React from 'react';
import { Box, Typography, Button, Card, Grid, CardHeader, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DiaIcon from '../../assets/DiaIcon.png';
import DoubleDiamond from '../../assets/DoubleDiamond.png';
import DiamondIcon from '@mui/icons-material/Diamond';
const Style = {
    img: {
        width: 'auto',
        height: '70px',
        position: 'absolute',
        top: '-3px',
        left: '15%',
        zIndex: 1,
    }
};

const Section = ({ icon, title, description }) => {
    return (
        <Card
        elevation={3}
        sx={{
            background: 'rgba(152, 152, 152, 0.1)',
            borderRadius: '10px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
        }}
        >
            <CardHeader
                title={
                    <Typography variant='h5'
                    sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                    }}
                    >
                        <img src={icon} alt={title} style={{ width: 'auto', height: '30px' , marginRight: 10}} /> {title} →
                    </Typography>
                }
              
            />
            <CardContent>
                <Typography>{description}</Typography>
            </CardContent>
        </Card>
    );
};

const Assistance = () => {
    const navigator = useNavigate();
    return (
        <Box>
            <CardHeader
                title={
                    <Typography variant='h4'>
                        How <span style={{ color: '#69CEE2' }}>DiAsecur</span> helps you buy & sell better
                    </Typography>
                }
            />
            <CardContent>
                <Grid container spacing={2}>
                    <Grid  item  xl={8} lg={8} md={12} container spacing={4} display={'flex'}>
                        <Grid item xl={6} lg={6} md={12} sx={{ display: 'flex'}}>
                            <Section
                                icon={DiaIcon}
                                title="Compare Stones"
                                description="Save diamonds to your Vault to compare side by side and manage price alerts."
                            />
                        </Grid>
                        <Grid item xl={6} lg={6} md={12} sx={{ display: 'flex'}}>
                            <Section
                                icon={DiaIcon}
                                title="Check For Red Flags"
                                description="Sometimes what looks like a great deal on paper is just too good to be true."
                            />
                        </Grid>
                        <Grid item xl={6} lg={6} md={12} sx={{ display: 'flex'}}>
                            <Section
                                icon={DiaIcon}
                                title="Find Great Deals"
                                description="We help you find underpriced, high quality stones. Our fair price estimate saves you time and money."
                            />
                        </Grid>
                        <Grid item xl={6} lg={6} md={12} sx={{ display: 'flex'}}>
                            <Section
                                icon={DiaIcon}
                                title="High precision calculator"
                                description="Estimate your diamond values based on various diamond prices from all over other websites."
                            />
                        </Grid>
                    </Grid>
                    <Grid item xl={4} lg={4} md={12}>
                        <Box padding={3}
                            sx={{ position: 'relative' }}>
                            <img src={DoubleDiamond} alt="Diamond Icon" style={Style.img} />
                            <Card
                                elevation={3}
                                sx={{
                                    background: 'white',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '10px',
                                }}>
                                <Typography variant="h3" sx={{ color: '#69CEE2', margin: 2 }}>Appraisal</Typography>
                                <Typography sx={{ fontSize: '23px', padding: 5 }}>We invite you to appraisal your diamonds by our expert diamond appraisers. Our professional appraiser is highly skilled and experienced, ensuring a thorough and accurate assessment of your diamond's value.</Typography>
                                <Button
                                    sx={{
                                        backgroundColor: '#69CEE2',
                                        borderColor: '#C9C9C6',
                                        borderRadius: '8px',
                                        fontSize: '20px',
                                        margin: 2
                                    }}
                                    variant="contained"
                                    onClick={() => navigator('/diamond-appraisal')}>Make an Appointment</Button>
                            </Card>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Box>
    )
};

export default Assistance;
