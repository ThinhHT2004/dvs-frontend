import React from 'react';
import { Card, CardContent, Typography, Grid, Box, CardHeader } from '@mui/material';
import StarRateIcon from '@mui/icons-material/StarRate';

const ReviewCard = ({ title, rating, review, reviewer }) => (
  <Card sx={{
    background: 'white',
    borderRadius: '10px',
  }}>
    <CardHeader
    title={
      <Box>
        <Typography
        variant="h1"
        sx={{
          fontSize: '20px',
          display: 'flex',
          alignItems: 'center',
          marginBottom: '10px',
          color: '#39d9b9'
        }}
      >
        {Array.from({ length: rating }, (_, i) => <StarRateIcon key={i} style={{ fontSize: '30px' }} />)}
      </Typography>
            <Typography variant="h4" >
        {title}
      </Typography>
      </Box>
    }
    />
    <CardContent>
      <Typography  variant="h5" component="p">
        {review}
      </Typography>
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
    </CardContent>
    
  </Card>
);

const Reviews = () => {
  return (
    <Box>
      <Grid container spacing={2}
        sx={{
          justifyContent: 'center',
          minHeight: '100%',
          paddingTop: '20px',
          paddingBottom: '20px'
        }}
      >
        <Grid item xs={12} sm={6} md={4} sx={{
          display: 'flex',
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
