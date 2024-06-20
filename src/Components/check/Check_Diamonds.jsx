import { Box, Card, CardContent, CardHeader, Grid, TextField, Typography, Paper } from '@mui/material'
import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../footer/Footer'
import background from '../../assets/diamondCheckBackground.png'
import Button from '@mui/material/Button'
import Imac from '../../assets/imac.png'
import exPic from '../../assets/examplediamondpic.png'

import Diamond_Proportions from '../../assets/Diamond_Proportions.png';
import exCla from '../../assets/exCla.jpg';

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
      symmetry: 'Excellent',
      culet: 'None',
      table: '57%',
      girdle: 'Medium',
      comments: 'good diamond',
      depth: '62.3%'
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
      symmetry: 'Very Good',
      culet: 'None',
      table: '75%',
      girdle: 'Slightly Thick',
      comments: 'good diamond',
      depth: '68.0%'
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
      symmetry: 'Good',
      culet: 'None',
      table: '53%',
      girdle: 'Thin to Thick',
      comments: 'good diamond',
      depth: '63.5%'
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
      symmetry: 'Very Good',
      culet: 'None',
      table: '65%',
      girdle: 'Slightly Thick to Thick',
      comments: 'good diamond',
      depth: '68.5%'
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
      symmetry: 'Excellent',
      culet: 'None',
      table: '58%',
      girdle: 'Medium to Slightly Thick',
      comments: 'good diamond',
      depth: '64.8%'
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
  if (diamondDetails === null) {
    return (
      <Box sx={{ flexGrow: 1, backgroundImage: `url(${background})`, backgroundSize: '100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', zIndex: 1 }}>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Box sx={{ textAlign: 'left' }}>
                <Typography variant='h2'>
                  Check any diamond's <span style={{ color: '#69CEE2' }}>price & quality</span>
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
    return (
      <Box >
        <Grid container spacing={2}>
          <Grid 
          item 
          xl={6} 
          md={12}
          container
                direction="column"
                justifyContent="center"
                alignItems="center"
          >
            <img src={exPic} alt="example diamond" style={{ width: '450px', height: '450px' , margin: 5}}/>
          </Grid>
          <Grid item xl={6} md={12}>
            <Card variant='outlined' sx={{ borderRadius: 0, border: 0, margin: 5, backgroundColor: '#F9FAFB' }}>
              <CardHeader 
              title={
                <Typography  variant="h3">
                  {`Certificate ID: ${diamondDetails.reportNumber}`}
                </Typography>
                } 
              />
              <CardContent>
                <Card sx={{margin: 2}}>
                  <CardContent>
                    <Grid 
                    container 
                    direction='row'
                    spacing={2}
                    sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                    >
                      <Grid item xl={3} md={3} sm={3} lg={3} xs={3}>                       
                        <Typography sx={{display: 'flex', justifyContent: 'center', alignItems: 'center' ,color:'#989898'}}>
                          Fair Price
                        </Typography>
                        <Typography sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        {diamondDetails.fairPrice}
                        </Typography>                       
                      </Grid>
                      <Grid item xl={3} md={3} sm={3} lg={3} xs={3}>
                        <Typography sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color:'#989898'}}>
                          Origin
                        </Typography>
                        <Typography sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        {diamondDetails.origin}
                        </Typography>
                      </Grid>
                      <Grid item xl={3} md={3} sm={3} lg={3} xs={3}>
                        <Typography sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color:'#989898'}}>
                          Cert Lab
                        </Typography>
                        <Typography sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        {diamondDetails.CertificateLab}
                        </Typography>
                      </Grid>
                      <Grid item xl={3} md={3} sm={3} lg={3} xs={3}>
                        <Typography sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color:'#989898'}}>
                          Cut Grade
                        </Typography>
                        <Typography sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        {diamondDetails.cutGrade}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                <Card sx={{margin: 2}}>
                  <CardContent >
                    <Grid container spacing={2}>
                      <Grid item xl={12} 
                      container 
                      direction='row'
                      spacing={2}
                      sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                      >
                        <Grid item xl={3}  md={3} sm={3} lg={3} xs={3}>
                          <Typography sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color:'#989898'}}>
                            Shape
                          </Typography>
                          <Typography sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                          {diamondDetails.shape}
                          </Typography>
                        </Grid>
                        <Grid item xl={3} md={3} sm={3} lg={3} xs={3}>
                          <Typography sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color:'#989898'}}>
                            Measurements
                          </Typography>
                          <Typography sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                          {diamondDetails.measurements}
                          </Typography>
                        </Grid>
                        <Grid item xl={3} md={3} sm={3} lg={3} xs={3}>
                          <Typography sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color:'#989898'}}>
                            Carat
                          </Typography>
                          <Typography sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                          {diamondDetails.caratWeight}
                          </Typography>
                        </Grid>
                        <Grid item xl={3}  md={3} sm={3} lg={3} xs={3}>
                          <Typography sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color:'#989898'}}>
                            Color
                          </Typography>
                          <Typography sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                          {diamondDetails.colorGrade}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item xl={12} 
                      container 
                      direction='row'
                      spacing={2}
                      sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                      >
                        <Grid item xl={3} md={3} sm={3} lg={3} xs={3}>
                          <Typography sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color:'#989898'}}>
                            Clarity
                          </Typography>
                          <Typography sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                          {diamondDetails.clarityGrade}
                          </Typography>
                        </Grid>
                        <Grid item xl={3} md={3} sm={3} lg={3} xs={3}>
                          <Typography sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color:'#989898'}}>
                            Polish
                          </Typography>
                          <Typography sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                          {diamondDetails.polish}
                          </Typography>
                        </Grid>
                        <Grid item xl={3} md={3} sm={3} lg={3} xs={3}>
                          <Typography sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color:'#989898'}}>
                            Fluorescence                                                  
                          </Typography>
                          <Typography sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                          {diamondDetails.fluorescence}
                          </Typography>
                        </Grid>
                        <Grid item xl={3} md={3} sm={3} lg={3} xs={3}>
                          <Typography sx={{display: 'flex', justifyContent: 'center', alignItems: 'center',color:'#989898'}}>
                            Symmetry
                          </Typography>
                          <Typography sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                          {diamondDetails.symmetry}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>

                  </CardContent>
                </Card>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , margin: 2}}>
                <Button
                  variant="contained"
                  href='/diamond-check'
                  sx={{
                    backgroundColor: "#69CEE2",
                    borderRadius: "8px",
                    textTransform: "none",
                    fontSize: '20px',                                   
                  }}
                >
                  Run another check
                </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box sx={{ justifyContent: 'center', alignItems: 'center' , padding: 5}}>
          <Typography variant="h4" sx={{ textAlign: 'center' , margin: 5}}>
            Diamond Details
          </Typography>
          <Box>
            
            <Grid container spacing={2} >
              <Grid item xl={6}>
                <Card sx={{height: '100%'}}>
                  <CardHeader 
                  title="CERTIFICATE DETAILS"
                  titleTypographyProps={{variant: 'h6'}}
                  sx={{ backgroundColor: '#274472', color: '#fff'}}
                  />
                  <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1}}>
                    <Typography sx={{ color: '#989898' }}>Certificate Date</Typography>
                    <Typography>{diamondDetails.certificateDate}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1}}>
                    <Typography sx={{ color: '#989898' }}>Certificate Number</Typography>
                    <Typography>{diamondDetails.reportNumber}</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1}}>
                    <Typography sx={{ color: '#989898' }}>Origin</Typography>
                    <Typography>{diamondDetails.origin}</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1}}>
                    <Typography sx={{ color: '#989898' }}>Shape</Typography>
                    <Typography>{diamondDetails.shape}</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1}}>
                    <Typography sx={{ color: '#989898' }}>Measurements</Typography>
                    <Typography>{diamondDetails.measurements}</Typography>
                  </Box>
                  </CardContent>
                  <CardHeader
                  title="CRADING RESULTS"
                  titleTypographyProps={{variant: 'h6'}}
                  sx={{ backgroundColor: '#274472', color: '#fff'}}
                  />
                  <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1}}>
                    <Typography sx={{ color: '#989898' }}>Carat Weight</Typography>
                    <Typography>{diamondDetails.caratWeight}</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1}}>
                    <Typography sx={{ color: '#989898' }}>Color Grade</Typography>
                    <Typography>{diamondDetails.colorGrade}</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1}}>
                    <Typography sx={{ color: '#989898' }}>Clarity Grade</Typography>
                    <Typography>{diamondDetails.clarityGrade}</Typography>
                  </Box>
                  </CardContent>

                  <CardHeader
                  title="ADDITIONAL GRADING INFORMATION"
                  titleTypographyProps={{variant: 'h6'}}
                  sx={{ backgroundColor: '#274472', color: '#fff'}}
                  />
                  <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1}}>
                    <Typography sx={{ color: '#989898' }}>Polish</Typography>
                    <Typography>{diamondDetails.polish}</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1}}>
                    <Typography sx={{ color: '#989898' }}>Symmetry</Typography>
                    <Typography>{diamondDetails.symmetry}</Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1}}>
                    <Typography sx={{ color: '#989898' }}>Fluorescence</Typography>
                    <Typography>{diamondDetails.fluorescence}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1}}>
                    <Typography sx={{ color: '#989898' }}>Comments</Typography>
                    <Typography>{diamondDetails.comments}</Typography>
                  </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xl={6}>
                <Card sx={{boxShadow: 1}}>
                <CardHeader
                  title="PROPORTIONS"
                  titleTypographyProps={{variant: 'h6'}}
                  sx={{ backgroundColor: '#274472', color: '#fff'}}
                  />
                  <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={Diamond_Proportions} alt="" style={{width:'450px', height: '270px'}} />
                  </Box>
                  <Grid container spacing={2} padding={1}>
                    <Grid item xl={3}>
                    <Box sx={{ display: 'flex' , justifyContent: 'center'}}>
                    <Typography sx={{ color: '#989898' }}>Table:</Typography>
                    <Typography>{diamondDetails.table}</Typography>
                  </Box>
                    </Grid>
                    <Grid item xl={3}>
                    <Box sx={{ display: 'flex' , justifyContent: 'center'}}>
                    <Typography sx={{ color: '#989898' }}>Girdle:</Typography>
                    <Typography>{diamondDetails.girdle}</Typography>
                  </Box>
                    </Grid>
                    <Grid item xl={3}>
                    <Box sx={{ display: 'flex' , justifyContent: 'center'}}>
                    <Typography sx={{ color: '#989898' }}>Depth:</Typography>
                    <Typography>{diamondDetails.depth}</Typography>
                  </Box>
                    </Grid>
                    <Grid item xl={3}>
                    <Box sx={{ display: 'flex' , justifyContent: 'center'}}>
                    <Typography sx={{ color: '#989898' }}>Culet:</Typography>
                    <Typography>{diamondDetails.culet}</Typography>
                  </Box>
                  
                    </Grid>
                    
                  </Grid>
                  </CardContent>
                  <CardHeader
                  title="CLARITY CHARACTERISTICS"
                  titleTypographyProps={{variant: 'h6'}}
                  sx={{ backgroundColor: '#274472', color: '#fff'}}
                  />
                  <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={exCla} alt="" style={{ width: '450px', height: '270px' }} />
                  </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
           
          </Box>
        </Box>
      </Box>

    );
  }
}

const Check_Diamonds = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box sx={{ flexGrow: 1, zIndex: 2 }}>
        <Navbar />
      </Box>
      <Box sx={{ flexGrow: 1, zIndex: 1 }}>
        {CheckDiamondBody()}
      </Box>
      <Box>
        <Footer/>
      </Box>
    </Box>
  )
}
export default Check_Diamonds
