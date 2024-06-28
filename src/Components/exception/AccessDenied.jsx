import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'

import denied from '../../assets/accessdenied03.png'
const AccessDenied = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        alignItems: "center",
      }}
    >
      <img src={denied} alt="" style={{ width: '45%', height: '45%' }} />
      <Box textAlign={'center'}>
        <Typography variant="h2" padding={2} fontWeight={'bold'}>We are sorry...</Typography>
        <Typography variant="h6" >The page you're trying to access has restricted access.</Typography>
        <Typography variant="h6" >Please contact your administrator for more information.</Typography>
        <Button variant="contained" sx={{ backgroundColor: '#30D5C8', borderRadius: 3, width: 150, margin: 2 , fontSize: 20}} href="/">GO BACK</Button>
      </Box>



      



    </Box>
  )
}

export default AccessDenied