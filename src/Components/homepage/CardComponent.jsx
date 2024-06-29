import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import StarRateIcon from '@mui/icons-material/StarRate';

const ReviewCard = ({ title, rating, review, reviewer }) => (
  <Card sx={{
    width: '100%',
    height: '100%',
    background: 'white',
    borderColor: 'black',
    borderRadius: '15px',
    boxShadow: '2.5px 4px 4px 2.5px rgba(0, 0, 0, 0.2)',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',


  }}>
    <CardContent>
      <Typography
        variant="h1"
        sx={{
          fontSize: '20px',
          display: 'flex',
          alignItems: 'center',
          marginBottom: '10px',
          color: '#39d9b9'
        }}>
        {Array.from({ length: rating }, (_, i) => <StarRateIcon key={i} style={{ fontSize: '30px' }} />)}
      </Typography>
      <Typography variant="h4" component="h2" sx={{ marginBottom: '10px' }}>
        {title}
      </Typography>
      <Typography sx={{ fontSize: '20px', marginBottom: '10px' }} variant="body2" component="p">
        {review}
      </Typography>
    </CardContent>
    <Typography
      variant="body1"
      component="p"
      sx={{
        fontSize: '20px',
        color: '#39d9b9',
        textAlign: 'right',
        marginBottom: 0,
        fontStyle: 'italic',
        alignSelf: 'flex-end'
      }} >
      - {reviewer}
    </Typography>
  </Card>
);

const Reviews = () => {
  return (
    <Box sx={{
      width: '100%',
      minHeight: '100%',
      height: '120%',
      marginTop: '65px',
      paddingLeft: '1%',
      paddingRight: '1%',
      boxSizing: 'border-box',
      overflowX: 'hidden',
      overflowY: 'auto',
    }}>
      <Grid container spacing={2}
        sx={{
          justifyContent: 'center',
          minHeight: '100%',
          paddingTop: '20px',
          paddingBottom: '20px'
        }}
      >
        <Grid item xs={12} sm={6} md={4} sx={{
          // display: 'flex',
        }}>
          <ReviewCard
            title="Highly Recommend Di'Asecur"
            rating={5}
            review="I am VERY grateful to StoneAlgo for saving me from a would-be terrible purchase. Highly recommend!"
            reviewer="Alex B"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{
          display: 'flex',
        }}>
          <ReviewCard
            title="Di'Asecur is a Tremendous Resource"
            rating={4}
            review="The cut score was a terrific way to hone in on the best candidates when faced with the overwhelming number of options available online."
            reviewer="Igor G"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{
          display: 'flex',
        }}>
          <ReviewCard
            title="The Most Beautiful Diamond I've Ever Seen!"
            rating={5}
            review="By using the Di'Asecur calculator, I was able to find the best cut diamond at the best price. My diamond is breathtaking."
            reviewer="Kim V"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Reviews;
