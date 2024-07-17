import React from 'react'
import { Button, Box, Typography } from '@mui/material';
import Model_Img from '../../assets/banner_model.jpg'
import { useSpring, animated } from 'react-spring';
import { useNavigate } from 'react-router-dom'

const Style = {
    Button: {
        backgroundColor: '#69CEE2',
        borderColor: '#C9C9C6',
        borderRadius: '8px',
    },
}

const Banner = () => {
    const navigator = useNavigate();
    const textProps = useSpring({
        from: { marginLeft: '0px' },
        to: { marginLeft: '80px' },
        delay: 200
    });
    const imgProps = useSpring({
        from: { marginLeft: '120%', },
        to: { marginLeft: '0%', },
        delay: 200,
    });

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#d9f2f2',
            position: 'relative',
            width: '100%',
        }}>
            <animated.div style={{...imgProps, width: '100%'}}>
                <img src={Model_Img} alt="" style={{ width: 1100, height: 550, float: 'right'}} />
            </animated.div>
            <Box sx={{
                display: 'flex',
                position: 'absolute',
            }}>
                <animated.div style={textProps} sx={Style.div}>
                    <Typography variant="h2" fontWeight={'bold'}>
                        Compare Top-Rated
                    </Typography>
                    <Typography variant="h3">
                        Jewelers & Save "Time & Money"
                    </Typography>
                    <Typography variant="h5"  color="#828282">
                        Navigate the diamond market effortlessly.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
                        <Button sx={Style.Button} variant="contained" onClick={() => navigator('/calculate')}>Calculate price</Button>
                        <Button sx={Style.Button} variant="contained" onClick={() => navigator('/diamonds-check')}>Check Diamonds</Button>
                    </Box>
                </animated.div>
            </Box>
        </Box>
    );
};

export default Banner;