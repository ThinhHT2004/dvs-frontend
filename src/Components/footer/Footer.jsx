import { Box, Typography, Grid, Link, IconButton } from '@mui/material';
import logoWeb from '../../assets/logo_v4.png'
import './Footer.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import MapImg from '../../assets/Map.png'

const Footer = () => {
    return (
        <div style={{ marginTop: '45px' }}>
            <Box className="Footer" sx={{
                // backgroundColor: '#F8F8F8',
                padding: 3,
                marginTop: 'auto',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: "#F3F4F6",
                // backgroundImage: `url(${MapImg})`,
                // backgroundPosition: 'end',
                // backgroundSize: '',
                // backgroundRepeat: 'no-repeat'
            }}>
                <Box display='flex' justifyContent='flex-end' width='100%'>

                    <Grid container spacing={3} right={0}>
                        <Grid item xs={3} sx={{ marginBottom: '20px', position: 'relative', top: '-20px' }}>
                            <div>
                                <img src={logoWeb} alt="" className='logo' />
                                <Typography variant="subtitle1" sx={{color: '#989898'}}>
                                    The top diamond price calculator in Vietnam.
                                </Typography>
                                <div>
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
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="h6">FEATURES</Typography>
                            <ul>
                                <li>Price calculator</li>
                                <li>Price & Quality Check</li>
                                <li>Make an appraisal appointment</li>
                            </ul>
                        </Grid>
                        <Grid item xs={3} sx={{ backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                            <Typography variant="h6">MORE</Typography>
                            <ul>
                                <li>Guides</li>
                                <li>Blog</li>
                                <li>Local Jewelers</li>
                            </ul>
                        </Grid>
                        <Grid item xs={3} sx={{ backgroundImage: `url(${MapImg})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                            <Typography variant="h6">COMPANY</Typography>
                            <ul>
                                <li>About</li>
                                <li>FAQ</li>
                                <li>Privacy</li>
                            </ul>
                        </Grid>
                    </Grid>
                </Box>
                <Typography variant="body2" color="textSecondary" align="center">
                    {'© '}
                    {new Date().getFullYear()}
                    {' Discover, Inc. All rights reserved.'}
                </Typography>
            </Box>
        </div>
    );
};

export default Footer;


