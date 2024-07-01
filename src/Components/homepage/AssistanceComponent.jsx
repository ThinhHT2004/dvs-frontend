import React from 'react';
import { Box, Typography, Button, Card, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DiaIcon from '../../assets/DiaIcon.png';
import DoubleDiamond from '../../assets/DoubleDiamond.png';

const Style = {
    Button: {
        backgroundColor: '#69CEE2',
        border: '2px solid',
        borderColor: '#C9C9C6',
        borderRadius: '8px',
    },
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
    // const ref = useRef(null);
    // const [height, setHeight] = useState('auto');

    // useEffect(() => {
    //     if (ref.current) {
    //         const width = ref.current.offsetWidth;
    //         setHeight(`${width * 0.3}px`); // Set height to 75% of the width
    //     }
    // }, [ref.current?.offsetWidth]); // Update whenever the width changes

    return (
        <Box
            // ref={ref}
            sx={{
                background: "rgba(152, 152, 152, 0.1)",
                borderRadius: '11px',
                width: '100%',
                // height: height,
                display: 'flex',
                flexDirection: 'column',
                padding: '15px',
                boxSizing: 'border-box',
                overflow: 'hidden',
            }}>
            <Box sx={{
                display: 'inline-flex',
                gap: '9px',
                alignItems: 'center',
            }}>
                <img src={icon} alt={title} style={{ width: 'auto', height: '30px' }} />
                <Typography variant="h5">{title} →</Typography>
            </Box>
            <Typography sx={{
                fontSize: '17px',
                marginTop: '10px',
            }}>{description}</Typography>
        </Box>
    );
};

const Assistance = () => {
    const navigator = useNavigate();
    return (
        <Box sx={{
            width: '100%',
            marginTop: '65px',
            paddingLeft: '1%',
            paddingRight: '1%',
            boxSizing: 'border-box',
            overflowX: 'hidden',
        }}>
            <Box sx={{ display: 'flex', gap: '8px', paddingLeft: '3%', flexWrap: 'wrap' }}>
                <Typography sx={{ textAlign: 'left' }} variant="h4">How</Typography>
                <Typography sx={{ color: "#69CEE2" }} variant="h4">DiAsecur</Typography>
                <Typography variant="h4">helps you buy & sell better</Typography>
            </Box>
            <Grid container spacing={2} sx={{
                maxWidth: '100%',
                margin: '0 auto',
                alignItems: 'stretch',
                display: 'flex',
            }}>
                <Grid container item xs={12} md={8} sm={12} spacing={2} display={'flex'}>
                    <Grid item xs={12} md={6} sm={6} sx={{ display: 'flex', alignItems: 'stretch' }}>
                        <Section
                            icon={DiaIcon}
                            title="Compare Stones"
                            description="Save diamonds to your Vault to compare side by side and manage price alerts."
                        />
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} sx={{ display: 'flex', alignItems: 'stretch' }}>
                        <Section
                            icon={DiaIcon}
                            title="Check For Red Flags"
                            description="Sometimes what looks like a great deal on paper is just too good to be true."
                        />
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} sx={{ display: 'flex', alignItems: 'stretch' }}>
                        <Section
                            icon={DiaIcon}
                            title="Find Great Deals"
                            description="We help you find underpriced, high quality stones. Our fair price estimate saves you time and money."
                        />
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} sx={{ display: 'flex', alignItems: 'stretch' }}>
                        <Section
                            icon={DiaIcon}
                            title="High precision calculator"
                            description="Estimate your diamond values based on various diamond prices from all over other websites."
                        />
                    </Grid>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Box padding={3}
                        sx={{
                            width: '100%',
                            minHeight: '100%',
                            position: 'relative',
                            paddingTop: '35px',
                            paddingBottom: '20px',
                        }}>
                        <img src={DoubleDiamond} alt="Diamond Icon" style={Style.img} />
                        <Card
                            sx={{
                                background: 'white',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '20px',
                                paddingTop: '50px',
                                minHeight: '100%',
                            }}>
                            <Typography variant="h3" sx={{ color: '#69CEE2', mt: -1 }}>Appraisal</Typography>
                            <Typography sx={{ fontSize: '23px', mt: 2 }}>Make a request to appraisal your diamond by our professional diamond appraiser.</Typography>
                            <Button
                                sx={Style.Button}
                                variant="contained"
                                onClick={() => navigator('/diamond-appraisal')}>Make an Appointment</Button>
                        </Card>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
};

export default Assistance;
