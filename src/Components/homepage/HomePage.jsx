import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Button, Box, Typography } from '@mui/material';
import Model_Img from '../../assets/banner_model.jpg'

const Style = {
  Button: {
    backgroundColor: '#69CEE2',
  }
}

const Banner = () => {
  return (
    <Box sx={{
      display: 'flex', flexDirection: 'row', alignItems: 'center',
      justifyContent: 'space-between', padding: 2,
      backgroundImage: 'linear-gradient(to left, #d9f2f2 , white)', color: 'black',
      width: 'auto', height: '500px'
    }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', }}>
        <Typography variant="h4" gutterBottom>
          Compare Top-Rated Jewelers & Save
        </Typography>
        <Typography variant="h6" gutterBottom color="#828282">
          Navigate the diamond market effortlessly.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
          <Button className={Style.Button} variant="contained">Calculate price</Button>
          <Button variant="contained">Check your diamond</Button>
        </Box>
      </Box>
      <img src={Model_Img} alt="Your description" style={{ width: 'auto', height: '500px' }} />
    </Box>
  );
};


const HomePage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Banner></Banner>
    </div>
  )
}

export default HomePage;