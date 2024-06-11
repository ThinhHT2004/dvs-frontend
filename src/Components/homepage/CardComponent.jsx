import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import StarRateIcon from '@mui/icons-material/StarRate';

const ReviewCard = ({ title, rating, review, reviewer }) => (
  <Card style={{
    background: 'white',
    color: 'black',
    padding: '20px',
    borderRadius: '15px',
    width: '450px', height: '360px',
    display: 'inline-flex', flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    marginTop: '50px',
  }}>
    <CardContent >
      <Typography sx={{ fontSize: '20px' }} variant="h1" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', color: '#39d9b9' }}>
        {Array.from({ length: rating }, (_, i) => <StarRateIcon key={i} style={{ fontSize: '30px' }} />)}
      </Typography>
      <Typography variant="h4" component="h2" style={{ marginBottom: '10px' }}>
        {title}
      </Typography>
      <Typography sx={{ fontSize: '20px' }} variant="body2" component="p" style={{ marginBottom: '10px' }}>
        {review}
      </Typography>
    </CardContent>
    <Typography sx={{ fontSize: '20px', color: '#39d9b9', textAlign: 'right', marginBottom: 0 }} variant="body1" component="p" style={{ fontStyle: 'italic', alignSelf: 'flex-end' }}>
      - {reviewer}
    </Typography>
  </Card>
);



const Reviews = () => {
  return (
    <Grid display='flex' justifyContent="space-evenly">
      <Grid item xs={12} sm={6} md={4}>
        <ReviewCard
          title="Highly Recommend Di'Asecur"
          rating={5}
          review="I am VERY grateful to StoneAlgo for saving me from a would-be terrible purchase. Highly recommend!"
          reviewer="Alex B"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <ReviewCard
          title="Di'Asecur is a Tremendous Resource"
          rating={4}
          review="The cut score was a terrific way to hone in on the best candidates when faced with the overwhelming number of options available online."
          reviewer="Igor G"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <ReviewCard
          title="The Most Beautiful Diamond I've Ever Seen!"
          rating={5}
          review="By using the Di'Asecur calculator, I was able to find the best cut diamond at the best price. My diamond is breathtaking."
          reviewer="Kim V"
        />
      </Grid>
    </Grid>);
};
export default Reviews;