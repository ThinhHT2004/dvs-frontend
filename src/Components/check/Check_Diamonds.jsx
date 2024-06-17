import { Box } from '@mui/material'
import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../footer/Footer'

const Check_Diamonds = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Box>
            <Navbar></Navbar>
        </Box>
        <Box sx={{ flexGrow: 1}}>
            <h1>Diamond Check</h1>
        </Box>
        <Box>
            <Footer></Footer>
        </Box>
    </Box>
  )
}

export default Check_Diamonds