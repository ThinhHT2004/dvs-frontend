import React from 'react'
import { Button, Box, Typography } from '@mui/material';
import Model_Img from '../../assets/banner_model.jpg'
import { useSpring, animated } from 'react-spring';
import { useNavigate } from 'react-router-dom'

const Style = {
    Button: {
        backgroundColor: '#69CEE2',
        border: '2px solid',
        borderColor: '#C9C9C6',
        borderRadius: '8px',
    },
    div: {
        marginLeft: '200px'
    },
    img: {
        width: 'auto', height: '500px', position: 'absolute', right: 0,
    }
}

const Banner = () => {
    const navigator = useNavigate();
    const textProps = useSpring({ from: { marginLeft: -500 }, to: { marginLeft: 200 }, delay: 200 });
    const imgProps = useSpring({
        from: { marginRight: '-1000px', width: 'auto', height: '500px' },
        to: { marginRight: 0, width: 'auto', height: '500px' },
        delay: 500,
    });

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 2,
            backgroundImage: 'linear-gradient(to left, #d9f2f2 , white)',
            color: 'black',
            width: 'auto',
            height: '500px',
            position: 'relative'
        }}>
            <animated.div style={imgProps}>
                <img src={Model_Img} alt="Your description" style={Style.img} />
            </animated.div>

            <Box sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                position: 'absolute',
                left: 0,
                padding: 2,
            }}>
                <animated.div style={textProps} sx={Style.div}>
                    <Typography variant="h4" fontSize="40px">
                        Compare Top-Rated
                    </Typography>
                    <Typography variant="h4" fontSize="40px">
                        Jewelers & Save "Time & Money"
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
                        <Button sx={Style.Button} variant="contained" onClick={() => navigator('/calculate')}>Calculate price</Button>
                        <Button sx={Style.Button} variant="contained" onClick={() => navigator('/diamond-check')}>Check your diamond</Button>
                    </Box>
                </animated.div>
            </Box>
        </Box>
    );
};

export default Banner;