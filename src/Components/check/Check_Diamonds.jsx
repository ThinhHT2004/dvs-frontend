import { Box, Card, CardContent, CardHeader, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../footer/Footer'
import background from '../../assets/diamondCheckBackground.png'
import Button from '@mui/material/Button'
import Imac from '../../assets/imac.png'
import exPic from '../../assets/examplediamondpic.png'
import DiamondDetails from './DiamondDetailComponent.jsx'
const CheckDiamondBody = () => {
  const [checkid, setCheckid] = useState('');
  const [diamondDetails, setDiamondDetails] = useState(null);

  const diamonds = [
    {
      CertificateLab: 'DIA',
      origin: 'Natural',
      reportNumber: '1122334455',
      certificateDate: '2023-06-01',
      fairPrice: '$12,000',
      shape: 'Round',
      measurements: '6.5 x 6.5 x 4.0 mm',
      caratWeight: '1.00 ct',
      colorGrade: 'D',
      clarityGrade: 'VVS1',
      cutGrade: 'Excellent',
      polish: 'Excellent',
      fluorescence: 'None',
      symmetry: 'Excellent'
    },
    {
      CertificateLab: 'DIA',
      origin: 'Natural',
      reportNumber: '2233445566',
      certificateDate: '2023-07-15',
      fairPrice: '$9,500',
      shape: 'Princess',
      measurements: '5.5 x 5.5 x 4.2 mm',
      caratWeight: '1.02 ct',
      colorGrade: 'E',
      clarityGrade: 'VS1',
      cutGrade: 'Very Good',
      polish: 'Very Good',
      fluorescence: 'Faint',
      symmetry: 'Very Good'
    },
    {
      CertificateLab: 'DIA',
      origin: 'Lab Grown',
      reportNumber: '3344556677',
      certificateDate: '2023-08-20',
      fairPrice: '$8,200',
      shape: 'Oval',
      measurements: '7.0 x 5.0 x 3.5 mm',
      caratWeight: '1.15 ct',
      colorGrade: 'F',
      clarityGrade: 'SI1',
      cutGrade: 'Good',
      polish: 'Good',
      fluorescence: 'Medium',
      symmetry: 'Good'
    },
    {
      CertificateLab: 'DIA',
      origin: 'Lab Grown',
      reportNumber: '4455667788',
      certificateDate: '2023-09-10',
      fairPrice: '$11,000',
      shape: 'Emerald',
      measurements: '6.0 x 4.5 x 3.0 mm',
      caratWeight: '1.20 ct',
      colorGrade: 'G',
      clarityGrade: 'VS2',
      cutGrade: 'Very Good',
      polish: 'Excellent',
      fluorescence: 'None',
      symmetry: 'Very Good'
    },
    {
      CertificateLab: 'DIA',
      origin: 'Natural',
      reportNumber: '5566778899',
      certificateDate: '2023-10-05',
      fairPrice: '$10,500',
      shape: 'Cushion',
      measurements: '5.8 x 5.8 x 4.0 mm',
      caratWeight: '1.10 ct',
      colorGrade: 'H',
      clarityGrade: 'VVS2',
      cutGrade: 'Excellent',
      polish: 'Excellent',
      fluorescence: 'None',
      symmetry: 'Excellent'
    }
  ];

  const getDiamondData = (id) => {
    const diamond = diamonds.find(diamond => diamond.reportNumber === id);
    return diamond;
  }

  const CheckID = () => {
    const diamond = getDiamondData(checkid);
    setDiamondDetails(diamond);
  }
  if(diamondDetails=== null){
  return (
    <Box sx={{ flexGrow: 1, backgroundImage: `url(${background})`, backgroundSize: '100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', zIndex: 1 }}>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ textAlign: 'left' }}>
              <Typography variant='h2'>
                Check any diamond's price & quality
              </Typography>
              <Typography>
                Transact with confidence — get fair price, cut score, visual carat and more for free
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TextField
                  placeholder="Enter Certificate ID"
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  fullWidth
                  value={checkid}
                  onChange={(e) => setCheckid(e.target.value)}
                  sx={{ backgroundColor: "#fff", fontSize: "20px", borderRadius: '4px' }}
                />
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    backgroundColor: "#69CEE2",
                    borderRadius: "8px",
                    textTransform: "none",
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                  onClick={CheckID}
                >
                  Check
                </Button>
              </Box>
              
            </Box>
          </Grid>
          <Grid item xs={6}>
            <img src={Imac} alt="imac" style={{ width: '100%', height: 'auto' }} />
          </Grid>
        </Grid>
      </Box>
    </Box>

  )
} else {
  return(
    <Box sx={{ flexGrow: 1, zIndex: 1 }}>
      <Grid container spacing={2}>
      <Grid item xs={6}>
        <img src={exPic} alt="example diamond" style={{ width: '100%', height: 'auto' }} />
      </Grid>
      <Grid item xs={6}>
          <Card>
        <CardHeader title={`Certificate ID: ${diamondDetails.reportNumber}`} />
        <CardContent>
          <Card>
            <CardContent>
              <Typography variant="h6">Fair Price: {diamondDetails.fairPrice}</Typography>
              <Typography variant="h6">Origin: {diamondDetails.origin}</Typography>
              <Typography variant="h6">Cert Lab: {diamondDetails.CertificateLab}</Typography>
              <Typography variant="h6">Cut Grade: {diamondDetails.cutGrade}</Typography>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <Typography variant="h6">Shape: {diamondDetails.shape}</Typography>
              <Typography variant="h6">Measurements: {diamondDetails.measurements}</Typography>
              <Typography variant="h6">Carat: {diamondDetails.caratWeight}</Typography>
              <Typography variant="h6">Color: {diamondDetails.colorGrade}</Typography>
              <Typography variant="h6">Clarity: {diamondDetails.clarityGrade}</Typography>
              <Typography variant="h6">Polish: {diamondDetails.polish}</Typography>
              <Typography variant="h6">Fluorescence: {diamondDetails.fluorescence}</Typography>
              <Typography variant="h6">Symmetry: {diamondDetails.symmetry}</Typography>
            </CardContent>
          </Card>
          <Button
           variant="contained"
          href='/diamond-check'
          sx={{
            backgroundColor: "#69CEE2",
            borderRadius: "8px",
            textTransform: "none",
            
          }}
          >
            Run another check
          </Button>
        </CardContent>
        </Card>
      </Grid>
      </Grid>
    </Box>
  )
}
}

const Check_Diamonds = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', zIndex: 2 }}>
      <Box>
        <Navbar />
      </Box>
      <Box>
        {CheckDiamondBody()}
      </Box>
      <DiamondDetails></DiamondDetails>
      <Box>
        <Footer />
      </Box>
    </Box>
  )
}
export default Check_Diamonds
