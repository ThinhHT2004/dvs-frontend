import { Box, Typography, Grid, Link, IconButton, CardHeader, CardContent, List, ListItem } from '@mui/material';
import logoWeb from '../../assets/logo_v4.png'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import { FiberManualRecord } from '@mui/icons-material';
import testFooter from '../../assets/testFooter.png'
const Footer = () => {
    return (
        <Box
            overflow={'hidden'}
        >
            <Box sx={{
                padding: 3,
                marginTop: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#f5f5f5',
                backgroundImage: `url(${testFooter})`,
                backgroundSize: 'contain', // Changed from 'cover' to 'contain'
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '100%', // Ensure the Box takes the full width of its parent
            }}>
                <Box display='flex' justifyContent='flex-end' width='100%'>

                    <Grid container spacing={3} >
                        <Grid item lg={4.5} xl={4.5}
                            container
                            direction="column"
                            justifyContent="center"
                        >
                            <CardHeader
                                title={<img src={logoWeb} alt="" style={{ width: 170, height: 108.5, marginTop: -20, marginBottom: -20 }} />}
                                sx={{
                                    padding: 0,
                                }}
                            />
                            <CardContent
                                sx={{
                                    padding: 0,
                                }}
                            >
                                <Typography variant="h5" sx={{ color: '#989898' }}>
                                    The top diamond price calculator in Vietnam.
                                </Typography>
                                <Box>
                                    <Link href="https://www.facebook.com/" target="" rel="noopener noreferrer">
                                        <IconButton>
                                            <FacebookIcon />
                                        </IconButton>
                                    </Link>
                                    <Link href="https://www.instagram.com/" target="" rel="noopener noreferrer">
                                        <IconButton>
                                            <InstagramIcon />
                                        </IconButton>
                                    </Link>
                                    <Link href="https://www.x.com/" target="" rel="noopener noreferrer">
                                        <IconButton>
                                            <XIcon />
                                        </IconButton>
                                    </Link>
                                </Box>
                            </CardContent>
                        </Grid>
                        <Grid item lg={2.5} xl={2.5}
                            container
                            direction="column"
                            justifyContent="center"
                        >
                            <CardHeader
                                title="FEATURES"
                                titleTypographyProps={{ variant: 'h6' }}
                                sx={{
                                    padding: 0,
                                }}
                            />
                            <CardContent>
                                <Typography padding={1} color={'#989898'}>
                                    <FiberManualRecord sx={{ fontSize: 10 }} /> Price calculator
                                </Typography>
                                <Typography padding={1} color={'#989898'}>
                                    <FiberManualRecord sx={{ fontSize: 10 }} /> Price & Quality Check
                                </Typography>
                                <Typography padding={1} color={'#989898'}>
                                    <FiberManualRecord sx={{ fontSize: 10 }} /> Make an appraisal appointment
                                </Typography>
                            </CardContent>

                        </Grid>
                        <Grid item lg={2.5} xl={2.5}
                            container
                            direction="column"
                            justifyContent="center"
                        >
                            <CardHeader
                                title="MORE"
                                titleTypographyProps={{ variant: 'h6' }}
                                sx={{
                                    padding: 0,
                                }}
                            />
                            <CardContent>
                                <Typography padding={1} color={'#989898'}>
                                    <FiberManualRecord sx={{ fontSize: 10 }} /> Guides
                                </Typography>
                                <Typography padding={1} color={'#989898'}>
                                    <FiberManualRecord sx={{ fontSize: 10 }} /> Blogs
                                </Typography>
                                <Typography padding={1} color={'#989898'}>
                                    <FiberManualRecord sx={{ fontSize: 10 }} /> Local Jewelers
                                </Typography>
                            </CardContent>
                        </Grid>
                        <Grid item lg={2.5} xl={2.5}
                            container
                            direction="column"
                            justifyContent="center"
                        >
                            <CardHeader
                                title="COMPANY"
                                titleTypographyProps={{ variant: 'h6' }}
                                sx={{
                                    padding: 0,
                                }}
                            />
                            <CardContent>
                                <Typography padding={1} color={'#989898'}>
                                    <FiberManualRecord sx={{ fontSize: 10 }} /> About
                                </Typography>
                                <Typography padding={1} color={'#989898'}>
                                    <FiberManualRecord sx={{ fontSize: 10 }} /> FAQ
                                </Typography>
                                <Typography padding={1} color={'#989898'}>
                                    <FiberManualRecord sx={{ fontSize: 10 }} /> Privacy
                                </Typography>
                            </CardContent>

                        </Grid>
                    </Grid>
                </Box>

            </Box>
            <Box sx={{ backgroundColor: '#f5f5f5', padding: 2 }}>
                <Typography variant="body2" color="textSecondary" align="center">
                    {'© '}
                    {new Date().getFullYear()}
                    {' DiAsecur, Inc. All rights reserved.'}
                </Typography>
            </Box>
        </Box>
    );
};

export default Footer;


