import React from 'react'
import Navbar from '../Navbar/Navbar'
import Reviews from './CardComponent.jsx';
import Assistance from './AssistanceComponent.jsx';
import Footer from '../footer/Footer.jsx'
import Banner from './BannerComponent.jsx'
import Guider from './GuiderComponent.jsx'
import { Box } from '@mui/material';

const HomePage = () => {
  console.log(localStorage.getItem('token'));
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box>
        <Navbar />
      </Box>
      <Box
      marginTop={5}
      marginBottom={5}
      >
        <Box>
          <Banner></Banner>
        </Box>
        <Box padding={5}>
          <Assistance></Assistance>
        </Box>
        <Box padding={5}>
          <Reviews></Reviews>
        </Box>
        <Box padding={5}>
          <Guider></Guider>
        </Box>
      </Box>
      <Box>
        <Footer />
      </Box>
    </Box>
  )
}

export default HomePage;


