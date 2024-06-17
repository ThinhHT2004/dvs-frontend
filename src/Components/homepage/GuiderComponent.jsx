import React from 'react'
import { Button, Box, Typography, Grid } from '@mui/material';
import Customer1 from '../../assets/Customer1.jpg'
import Customer2 from '../../assets/Customer2.jpg'
import Customer3 from '../../assets/Customer3.jpg'
import Customer4 from '../../assets/Customer4.jpg'

const Guider = () => {
  return (
    <Box
      style={{
        backgroundColor: '#69CEE2',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        padding: '20px',
        color: '#000',
        width: '55%',
        height: '90%',
        marginTop: '14%',
        marginBottom: '14%',
        marginLeft: '23%',
      }}
    >
      <Grid container spacing={1} alignItems="center" display="inline-flex">
        <div style={{
          position: 'absolute',
          display: 'flex',
          gap: '54%',
          marginBottom: '-20px',
          marginLeft: '-10px',
        }}>
          <Grid item xs={6} sm={1}>
            <Box display="flex" flexDirection="column" alignItems="center" sx={{ width: '200px' }}>
              <img
                src={Customer1}
                alt="Image 1"
                style={{ width: '160px', height: '145px', borderRadius: '30px', marginBottom: '10px', marginRight: '-7px' }}
              />
              <img
                src={Customer3}
                alt="Image 3"
                style={{ width: '175px', height: '150px', borderRadius: '30px', marginBottom: '10px', marginLeft: '-10px' }}
              />
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <img
                src={Customer2}
                alt="Image 2"
                style={{ width: '200px', height: '185px', borderRadius: '30px', marginTop: '-10px', marginBottom: '10px', marginRight: '-21px' }}
              />
              <img
                src={Customer4}
                alt="Image 4"
                style={{ width: '180px', height: '170px', borderRadius: '30px', marginBottom: '-10px', marginLeft: '-2px' }}
              />
            </Box>
          </Grid>
        </div>
        <Grid item xs={12} sm={6}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="right"
            style={{ height: '100%', width: '100%' }}
            marginLeft='99%'
          >
            <Typography variant="h6" align="center" gutterBottom style={{ color: 'white' }}>
              See how over 1 million diamond shoppers saved money on DiAsecur
            </Typography>
            <Button variant="contained" style={{
              backgroundColor: '#39D9B9',
              color: '#fff',
              border: '2px solid',
              borderColor: '#C9C9C6',
              borderRadius: '8px',
            }}>
              GET STARTED
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Guider