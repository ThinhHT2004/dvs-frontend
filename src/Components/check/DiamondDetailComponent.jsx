import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import Diamond_Proportions from '../../assets/Diamond_Proportions.png';
import ClarityTop from '../../assets/ClarityTop.png';
import ClarityBottom from '../../assets/ClarityBottom.png';
const DiamondDetails = () => {
    return (
        <Box sx={{ maxWidth: '100%', justifyContent: 'center', alignItems: 'center', }}>
            {/* <Paper elevation={3} sx={{ padding: 2 }}> */}
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', maxWidth: '100%' }}>
                Diamond Details
            </Typography>
            {/* </Paper> */}
            <Box sx={{ marginLeft: '18%', marginRight: '-14%' }}>
                <Grid container spacing={2} >
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography variant="h6" sx={{ backgroundColor: '#274472', color: '#fff', padding: 1 }}>
                                GIA REPORT DETAILS
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                                <Typography sx={{ color: 'rgba(107,114,128,255)' }}>Certificate Date</Typography>
                                <Typography><strong>19/2/2023</strong></Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                                <Typography sx={{ color: 'rgba(107,114,128,255)' }}>GIA Report Number</Typography>
                                <Typography><strong>2474506136</strong></Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                                <Typography sx={{ color: 'rgba(107,114,128,255)' }}>Origin</Typography>
                                <Typography><strong>Nature</strong></Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                                <Typography sx={{ color: 'rgba(107,114,128,255)' }}>Shape</Typography>
                                <Typography><strong>Round</strong></Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                                <Typography sx={{ color: 'rgba(107,114,128,255)' }}>Measurements</Typography>
                                <Typography><strong>6.66 - 6.63 x 4.14 mm</strong></Typography>
                            </Box>
                            <Typography variant="h6" sx={{ backgroundColor: '#274472', color: '#fff', padding: 1 }}>
                                GRADING RESULTS
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                                <Typography sx={{ color: 'rgba(107,114,128,255)' }}>Carat Weight</Typography>
                                <Typography><strong>1.14 carat</strong></Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                                <Typography sx={{ color: 'rgba(107,114,128,255)' }}>Color Grade</Typography>
                                <Typography><strong>G</strong></Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                                <Typography sx={{ color: 'rgba(107,114,128,255)' }}>Clarity Grade</Typography>
                                <Typography><strong>VS2</strong></Typography>
                            </Box>

                        {/*------------------------------- N/A -----------------------------------------*/}

                            {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                                <Typography sx={{ color: 'rgba(107,114,128,255)' }}>Cut Grade</Typography>
                                <Typography><strong>Excellent</strong></Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                                <Typography sx={{ color: 'rgba(107,114,128,255)' }}>Cut Score</Typography>
                                <Typography><strong>9.4</strong></Typography>
                            </Box> */}
                            <Typography variant="h6" sx={{ backgroundColor: '#274472', color: '#fff', padding: 1 }}>
                                ADDITIONAL GRADING INFORMATION
                            </Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                                <Typography sx={{ color: 'rgba(107,114,128,255)' }}>Polish</Typography>
                                <Typography><strong>Excellent</strong></Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                                <Typography sx={{ color: 'rgba(107,114,128,255)' }}>Symmetry</Typography>
                                <Typography><strong>Excellent</strong></Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                                <Typography sx={{ color: 'rgba(107,114,128,255)' }}>Fluorescence</Typography>
                                <Typography><strong>None</strong></Typography>
                            </Box>

                            {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                                <Typography sx={{ color: 'rgba(107,114,128,255)' }}>Clarity Characteristics</Typography>
                                <Typography><strong>Crystal, Feather, Needle, Pinpoint</strong></Typography>
                            </Box> */}

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                                <Typography sx={{ color: 'rgba(107,114,128,255)' }}>Inscription(s)</Typography>
                                <Typography><strong>GIA 2474506136</strong></Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                                <Typography sx={{ color: 'rgba(107,114,128,255)' }}>Comments</Typography>
                                <Typography><strong>Clouds are not shown.</strong></Typography>
                            </Box>

                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Typography variant="h6" sx={{ backgroundColor: '#274472', color: '#fff', padding: 1 }}>
                                PROPORTIONS
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                                <Typography sx={{ color: 'rgba(107,114,128,255)' }}>Table</Typography>
                                <Typography><strong>56%</strong></Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                                <Typography sx={{ color: 'rgba(107,114,128,255)' }}>Girdle</Typography>
                                <Typography><strong>Slight Thick</strong></Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                                <Typography sx={{ color: 'rgba(107,114,128,255)' }}>Depth</Typography>
                                <Typography><strong>62.3%</strong></Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                                <Typography sx={{ color: 'rgba(107,114,128,255)' }}>Culet</Typography>
                                <Typography><strong>None</strong></Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <img src={Diamond_Proportions} alt="Proportions" style={{ maxWidth: '90%' }} />
                            </Box>
                            <Typography variant="h6" sx={{ backgroundColor: '#274472', color: '#fff', padding: 1 }}>
                                CLARITY CHARACTERISTICS
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                <img src={ClarityTop} alt="Clarity Characteristic 1" style={{ maxWidth: '45%' }} />
                                <img src={ClarityBottom} alt="Clarity Characteristic 2" style={{ maxWidth: '45%' }} />
                            </Box>
                            {/* <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                <Typography sx={{ mr: 1 }}>🔴 Crystal</Typography>
                                <Typography sx={{ mr: 1 }}>🔴 Feather</Typography>
                                <Typography sx={{ mr: 1 }}>🔴 Needle</Typography>
                                <Typography>🔴 Pinpoint</Typography>
                            </Box> */}
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default DiamondDetails;
