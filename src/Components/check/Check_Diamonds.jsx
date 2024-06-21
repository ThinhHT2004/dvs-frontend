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
import diamondDetails01 from '../../assets/diamondDetails01.png';
import diamondDetails02 from '../../assets/diamondDetails02.png';
import diamondCheckex from '../../assets/diamondCheckex.png';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
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
      <Box>
        <Box sx={{ position: 'relative' }}>
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundImage: `url(${background})`,
              backgroundSize: '100%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: 0.25,
              zIndex: -1
            }}
          />

          <Grid container spacing={2} >
            <Grid
              item
              xl={6}
              md={12}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Box
                sx={{
                  textAlign: 'left',
                  marginBottom: 15,
                  marginTop: 15,
                  marginLeft: 5,
                  marginRight: 5,
                }}
              >
                <Typography
                  variant='h2'
                  sx={{
                    fontSize: {
                      xs: '2.5rem',
                      sm: '2.5rem',
                      md: '3rem',
                      lg: '3.5rem',
                      xl: '4rem',
                    }
                  }}>
                  Check any diamond's <br /><span style={{ color: '#69CEE2' }}>price & quality</span>
                </Typography>
                <Typography color={'#989898'}>
                  Transact with confidence — get fair price, cut score, visual carat and more <span style={{ color: '#69CEE2', textDecoration: 'underline' }}>for free</span>
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
                  <Grid container direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}>
                    <Grid item xl={8}>
                      <TextField
                        placeholder="Enter Certificate ID"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        fullWidth
                        variant='outlined'
                        value={checkid}
                        onChange={(e) => setCheckid(e.target.value)}
                        sx={{ fontSize: "20px", '& fieldset': { borderRadius: 20 } }}

                      />
                    </Grid>
                    <Grid
                      item
                      xl={4}

                    >
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button
                          variant="contained"
                          type="submit"
                          sx={{
                            backgroundColor: "#69CEE2",
                            borderRadius: 20,
                            textTransform: "none",
                            fontSize: '20px',
                            display: 'flex', justifyContent: 'center', alignItems: 'center'
                          }}
                          onClick={CheckID}
                        >
                          Check
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>

                </Box>

              </Box>
            </Grid>
            <Grid item xl={6}
              md={12}
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
            >
              <img src={Imac} alt="imac" style={{ width: '400px', height: '320px' }} />
            </Grid>
          </Grid>

        </Box>
        <Box>
                <Box >
                  <Card variant='outlined' sx={{ borderRadius: 0, border: 0 }}>
                    <CardHeader
                      title=" Welcome to DiAsecur Diamonds Check"
                      titleTypographyProps={{ variant: 'h4' , color: '#69CEE2' , fontWeight: 'bold'}}
                    />
                    <CardContent>
                      <Typography>
                      We understand how important it is for you to have confidence in the quality and value of your diamond purchase. That's why we're here to provide you with comprehensive details about your diamond, ensuring transparency and peace of mind.
                      </Typography>
                      <Grid container spacing={2} marginTop={1}>

                        <Grid
                          item
                          xl={6}
                          md={12}
                        >
                          <Card variant='outlined' sx={{ borderRadius: 0, border: 0 }}>
                            <CardHeader
                              title="Fair Price and Origin"
                              titleTypographyProps={{fontWeight: 'bold'}}
                            />
                            <CardContent>

                              <Typography>
                              First, let’s talk about the fair price of this magnificent diamond. Valued at $12,000, this diamond offers not just beauty, but a great deal in terms of value. It is of natural origin, ensuring its authenticity and natural beauty, untouched by synthetic processes.
                              </Typography>
                              
                            </CardContent>
                          </Card>
                        </Grid>
                        <Grid
                          item
                          xl={6}
                          md={12}
                          container
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <img src={diamondCheckex} alt="" style={{ width: '400px', height: '250px' }}/>
                        </Grid>
                      </Grid>
                      <Grid container spacing={2} >
                        <Grid item md={12} xl={6}>
                          <Card variant='outlined' sx={{ borderRadius: 0, border: 0 }}>

                            <CardHeader
                              title="Certificate Details"
                              titleTypographyProps={{fontWeight: 'bold'}}
                            />
                            <CardContent>

                              <Typography>
                              Every diamond comes with a unique Certificate of Authenticity. This certificate contains crucial information about your diamond, such as:
                              </Typography>
                              <Typography><FiberManualRecordIcon sx={{fontSize: 'small'}}/> <span style={{fontWeight:'bold'}}>Certificate Date:</span> The date the certificate was issued.</Typography>
                              <Typography><FiberManualRecordIcon sx={{fontSize: 'small'}}/> <span style={{fontWeight:'bold'}}>Certificate Number:</span> A unique identifier for your diamond.</Typography>
                              <Typography><FiberManualRecordIcon sx={{fontSize: 'small'}}/> <span style={{fontWeight:'bold'}}>Origin:</span> The source of the diamond, indicating if it is natural or lab-grown.</Typography>
                              <Typography><FiberManualRecordIcon sx={{fontSize: 'small'}}/> <span style={{fontWeight:'bold'}}>Shape:</span> The cut or shape of the diamond (e.g., round, princess).</Typography>
                              <Typography><FiberManualRecordIcon sx={{fontSize: 'small'}}/> <span style={{fontWeight:'bold'}}>Measurements:</span> The dimensions of the diamond in millimeters.</Typography>

                            </CardContent>
                          </Card>
                          <Card variant='outlined' sx={{ borderRadius: 0, border: 0 }}>
                            <CardHeader
                              title="Grading Results"
                              titleTypographyProps={{fontWeight: 'bold'}}
                            />
                            <CardContent>
                              <Typography>
                              To ensure you understand the value and quality of your diamond, we provide detailed grading results:
                              </Typography>
                              <Typography><FiberManualRecordIcon sx={{fontSize: 'small'}}/> <span style={{fontWeight:'bold'}}>Carat Weight:</span> The weight of the diamond in carats.</Typography>
                              <Typography><FiberManualRecordIcon sx={{fontSize: 'small'}}/> <span style={{fontWeight:'bold'}}>Color Grade:</span> The color grade of the diamond, ranging from D (colorless) to Z (light yellow).</Typography>
                              <Typography><FiberManualRecordIcon sx={{fontSize: 'small'}}/> <span style={{fontWeight:'bold'}}>Clarity Grade:</span> The clarity grade of the diamond, ranging from Flawless to Included.</Typography>
                            </CardContent>
                          </Card>
                          <Card variant='outlined' sx={{ borderRadius: 0, border: 0 }}>
                            <CardHeader
                              title="Additional Grading Information"
                              titleTypographyProps={{fontWeight: 'bold'}}
                            />
                            <CardContent>

                              <Typography>
                              For further assurance, we include additional grading information:
                              </Typography>
                              <Typography><FiberManualRecordIcon sx={{fontSize: 'small'}}/> <span style={{fontWeight:'bold'}}>Polish:</span> The quality of the diamond's polish, ranging from Poor to Excellent.</Typography>
                              <Typography><FiberManualRecordIcon sx={{fontSize: 'small'}}/> <span style={{fontWeight:'bold'}}>Symmetry:</span> The quality of the diamond's symmetry, ranging from Poor to Excellent.</Typography>
                              <Typography><FiberManualRecordIcon sx={{fontSize: 'small'}}/> <span style={{fontWeight:'bold'}}>Fluorescence:</span> The presence or absence of fluorescence in the diamond.</Typography>
                              <Typography><FiberManualRecordIcon sx={{fontSize: 'small'}}/> <span style={{fontWeight:'bold'}}>Comments:</span> Any additional comments or observations about the diamond.</Typography> 

                            </CardContent>

                          </Card>
                        </Grid>
                        <Grid
                          item
                          md={12}
                          xl={6}
                          container
                          direction="column"
                          justifyContent="center"
                          alignItems="center">
                          <Box >
                            <img src={diamondDetails01} alt="" style={{ width: '600px', height: '450px' }} />
                          </Box>
                        </Grid>
                      </Grid>

                      <Grid container spacing={2} marginTop={1}>

                        <Grid
                          item
                          xl={6}
                          md={12}
                        >
                          <Card variant='outlined' sx={{ borderRadius: 0, border: 0 }}>
                            <CardHeader
                              title="Proportions"
                              titleTypographyProps={{fontWeight: 'bold'}}
                            />
                            <CardContent>

                              <Typography>
                              The proportions of your diamond play a significant role in its overall appearance and brilliance. This includes:
                              </Typography>
                              <Typography><FiberManualRecordIcon sx={{fontSize: 'small'}}/> <span style={{fontWeight:'bold'}}>Table:</span> The width of the diamond's table facet as a percentage of the diameter.</Typography>
                              <Typography><FiberManualRecordIcon sx={{fontSize: 'small'}}/> <span style={{fontWeight:'bold'}}>Girdle:</span> The thickness of the diamond's girdle (e.g., thin, medium).</Typography>
                              <Typography><FiberManualRecordIcon sx={{fontSize: 'small'}}/> <span style={{fontWeight:'bold'}}>Depth:</span> The depth of the diamond as a percentage of the diameter.</Typography>
                              <Typography><FiberManualRecordIcon sx={{fontSize: 'small'}}/> <span style={{fontWeight:'bold'}}>Culet:</span> The presence or absence of a culet on the diamond.</Typography>
                            </CardContent>
                          </Card>
                          <Card variant='outlined' sx={{ borderRadius: 0, border: 0 }}>
                            <CardHeader
                              title="Clarity Characteristics"
                              titleTypographyProps={{fontWeight: 'bold'}}
                            />
                            <CardContent>

                              <Typography>
                              Understanding the clarity characteristics of your diamond helps you appreciate its unique nature. We provide detailed diagrams showing the diamond’s internal and external features, ensuring you know exactly what makes your diamond special.
                              </Typography>

                            </CardContent>
                          </Card>
                          
                        </Grid>
                        <Grid
                          item
                          xl={6}
                          md={12}
                          container
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <img src={diamondDetails02} alt="" style={{ width: '600px', height: '450px' }}/>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Box>
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
            <img src={exPic} alt="example diamond" style={{ width: '450px', height: '450px', margin: 5 }} />
          </Grid>
          <Grid item xl={6} md={12}>
            <Card variant='outlined' sx={{ borderRadius: 0, border: 0, margin: 5, backgroundColor: '#F9FAFB' }}>
              <CardHeader
                title={
                  <Typography variant="h3">
                    {`Certificate ID: ${diamondDetails.reportNumber}`}
                  </Typography>
                }
              />
              <CardContent>
                <Card sx={{ margin: 2 }}>
                  <CardContent>
                    <Grid
                      container
                      direction='row'
                      spacing={2}
                      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                      <Grid item xl={3} md={3} sm={3} lg={3} xs={3}>
                        <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#989898' }}>
                          Fair Price
                        </Typography>
                        <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          {diamondDetails.fairPrice}
                        </Typography>
                      </Grid>
                      <Grid item xl={3} md={3} sm={3} lg={3} xs={3}>
                        <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#989898' }}>
                          Origin
                        </Typography>
                        <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          {diamondDetails.origin}
                        </Typography>
                      </Grid>
                      <Grid item xl={3} md={3} sm={3} lg={3} xs={3}>
                        <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#989898' }}>
                          Cert Lab
                        </Typography>
                        <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          {diamondDetails.CertificateLab}
                        </Typography>
                      </Grid>
                      <Grid item xl={3} md={3} sm={3} lg={3} xs={3}>
                        <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#989898' }}>
                          Cut Grade
                        </Typography>
                        <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          {diamondDetails.cutGrade}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                <Card sx={{ margin: 2 }}>
                  <CardContent >
                    <Grid container spacing={2}>
                      <Grid item xl={12}
                        container
                        direction='row'
                        spacing={2}
                        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        <Grid item xl={3} md={3} sm={3} lg={3} xs={3}>
                          <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#989898' }}>
                            Shape
                          </Typography>
                          <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {diamondDetails.shape}
                          </Typography>
                        </Grid>
                        <Grid item xl={3} md={3} sm={3} lg={3} xs={3}>
                          <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#989898' }}>
                            Measurements
                          </Typography>
                          <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {diamondDetails.measurements}
                          </Typography>
                        </Grid>
                        <Grid item xl={3} md={3} sm={3} lg={3} xs={3}>
                          <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#989898' }}>
                            Carat
                          </Typography>
                          <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {diamondDetails.caratWeight}
                          </Typography>
                        </Grid>
                        <Grid item xl={3} md={3} sm={3} lg={3} xs={3}>
                          <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#989898' }}>
                            Color
                          </Typography>
                          <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {diamondDetails.colorGrade}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item xl={12}
                        container
                        direction='row'
                        spacing={2}
                        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                      >
                        <Grid item xl={3} md={3} sm={3} lg={3} xs={3}>
                          <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#989898' }}>
                            Clarity
                          </Typography>
                          <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {diamondDetails.clarityGrade}
                          </Typography>
                        </Grid>
                        <Grid item xl={3} md={3} sm={3} lg={3} xs={3}>
                          <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#989898' }}>
                            Polish
                          </Typography>
                          <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {diamondDetails.polish}
                          </Typography>
                        </Grid>
                        <Grid item xl={3} md={3} sm={3} lg={3} xs={3}>
                          <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#989898' }}>
                            Fluorescence
                          </Typography>
                          <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {diamondDetails.fluorescence}
                          </Typography>
                        </Grid>
                        <Grid item xl={3} md={3} sm={3} lg={3} xs={3}>
                          <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#989898' }}>
                            Symmetry
                          </Typography>
                          <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {diamondDetails.symmetry}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>

                  </CardContent>
                </Card>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 2 }}>
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
        <Box sx={{ justifyContent: 'center', alignItems: 'center', padding: 5 }}>
          <Typography variant="h4" sx={{ textAlign: 'center', margin: 5 }}>
            Diamond Details
          </Typography>
          <Box>

            <Grid container spacing={2} >
              <Grid item xl={6}>
                <Card sx={{ height: '100%' }}>
                  <CardHeader
                    title="CERTIFICATE DETAILS"
                    titleTypographyProps={{ variant: 'h6' }}
                    sx={{ backgroundColor: '#274472', color: '#fff' }}
                  />
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1 }}>
                      <Typography sx={{ color: '#989898' }}>Certificate Date</Typography>
                      <Typography>{diamondDetails.certificateDate}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1 }}>
                      <Typography sx={{ color: '#989898' }}>Certificate Number</Typography>
                      <Typography>{diamondDetails.reportNumber}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1 }}>
                      <Typography sx={{ color: '#989898' }}>Origin</Typography>
                      <Typography>{diamondDetails.origin}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1 }}>
                      <Typography sx={{ color: '#989898' }}>Shape</Typography>
                      <Typography>{diamondDetails.shape}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1 }}>
                      <Typography sx={{ color: '#989898' }}>Measurements</Typography>
                      <Typography>{diamondDetails.measurements}</Typography>
                    </Box>
                  </CardContent>
                  <CardHeader
                    title="CRADING RESULTS"
                    titleTypographyProps={{ variant: 'h6' }}
                    sx={{ backgroundColor: '#274472', color: '#fff' }}
                  />
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1 }}>
                      <Typography sx={{ color: '#989898' }}>Carat Weight</Typography>
                      <Typography>{diamondDetails.caratWeight}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1 }}>
                      <Typography sx={{ color: '#989898' }}>Color Grade</Typography>
                      <Typography>{diamondDetails.colorGrade}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1 }}>
                      <Typography sx={{ color: '#989898' }}>Clarity Grade</Typography>
                      <Typography>{diamondDetails.clarityGrade}</Typography>
                    </Box>
                  </CardContent>

                  <CardHeader
                    title="ADDITIONAL GRADING INFORMATION"
                    titleTypographyProps={{ variant: 'h6' }}
                    sx={{ backgroundColor: '#274472', color: '#fff' }}
                  />
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1 }}>
                      <Typography sx={{ color: '#989898' }}>Polish</Typography>
                      <Typography>{diamondDetails.polish}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1 }}>
                      <Typography sx={{ color: '#989898' }}>Symmetry</Typography>
                      <Typography>{diamondDetails.symmetry}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1 }}>
                      <Typography sx={{ color: '#989898' }}>Fluorescence</Typography>
                      <Typography>{diamondDetails.fluorescence}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1 }}>
                      <Typography sx={{ color: '#989898' }}>Comments</Typography>
                      <Typography>{diamondDetails.comments}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xl={6}>
                <Card>
                  <CardHeader
                    title="PROPORTIONS"
                    titleTypographyProps={{ variant: 'h6' }}
                    sx={{ backgroundColor: '#274472', color: '#fff' }}
                  />
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <img src={Diamond_Proportions} alt="" style={{ width: '450px', height: '270px' }} />
                    </Box>
                    <Grid container spacing={2} padding={1}>
                      <Grid item xl={3}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <Typography sx={{ color: '#989898' }}>Table:</Typography>
                          <Typography>{diamondDetails.table}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xl={3}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <Typography sx={{ color: '#989898' }}>Girdle:</Typography>
                          <Typography>{diamondDetails.girdle}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xl={3}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <Typography sx={{ color: '#989898' }}>Depth:</Typography>
                          <Typography>{diamondDetails.depth}</Typography>
                        </Box>
                      </Grid>
                      <Grid item xl={3}>
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                          <Typography sx={{ color: '#989898' }}>Culet:</Typography>
                          <Typography>{diamondDetails.culet}</Typography>
                        </Box>

                      </Grid>

                    </Grid>
                  </CardContent>
                  <CardHeader
                    title="CLARITY CHARACTERISTICS"
                    titleTypographyProps={{ variant: 'h6' }}
                    sx={{ backgroundColor: '#274472', color: '#fff' }}
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
      <Box sx={{ zIndex: 2 }}>
        <Navbar />
      </Box>
      <Box sx={{ flexGrow: 1, zIndex: 1 }}>
        {CheckDiamondBody()}
      </Box>
      <Box>
        <Footer />
      </Box>
    </Box>
  )
}
export default Check_Diamonds
