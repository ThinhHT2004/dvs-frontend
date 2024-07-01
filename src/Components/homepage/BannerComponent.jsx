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
    img: {
        width: 'auto',
        maxHeight: '500px',
        marginTop: '5px',
    }
}

const Banner = () => {
    const navigator = useNavigate();
    const textProps = useSpring({
        from: { marginLeft: '-500px' },
        to: { marginLeft: '200px' },
        delay: 200
    });
    const imgProps = useSpring({
        from: { marginLeft: '120%', },
        to: { marginLeft: '32.65%', },
        delay: 200,
    });

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 2,
            backgroundImage: 'linear-gradient(to left, #d9f2f2 , white)',
            width: 'auto',
            maxHeight: '500px',
            position: 'relative'
        }}>
            <animated.div style={imgProps}>
                <img src={Model_Img} alt="An image with a model wearing diamond jewelry" style={Style.img} />
            </animated.div>
            <Box sx={{
                display: 'flex',
                // flexDirection: 'column',
                // alignItems: 'center',
                // justifyContent: 'center',
                position: 'absolute',
            }}>
                <animated.div style={textProps} sx={Style.div}>
                    <Typography variant="h4" fontSize="40px">
                        Compare Top-Rated
                    </Typography>
                    <Typography variant="h4" fontSize="40px">
                        Jewelers & Save "Time & Money"
                    </Typography>
                    <Typography variant="h5" gutterBottom color="#828282">
                        Navigate the diamond market effortlessly.
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