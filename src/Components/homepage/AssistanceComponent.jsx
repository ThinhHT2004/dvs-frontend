import React from 'react';
import { Box, Typography, Button, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import DiaIcon from '../../assets/DiaIcon.png'
import DoubleDiamond from '../../assets/DoubleDiamond.png'



const Style = {
    Button: {
        backgroundColor: '#69CEE2',
        border: '2px solid',
        borderColor: '#C9C9C6',
        borderRadius: '8px',
    },
    div: {
        marginLeft: '200px'
    },
    img: {
        width: 'auto',
        height: '70px',
        position: 'absolute',
        top: '83.5%',
        right: '30%',
        zIndex: 1,
    }
}

const Section = ({ icon, title, description }) => (
    <Box alignItems="left" margin={2}
        sx={{
            background: "rgba(152, 152, 152, 0.1)",
            borderRadius: '11px',
            width: '400px',
            height: '135px',
        }}>
        <div style={{ display: 'inline-flex', gap: '9px', marginLeft: '18px', marginTop: '15px' }}>
            <img src={icon} alt={title} style={{ width: 'auto', height: '30px' }} />
            <Typography variant="h5">{title} →</Typography>
        </div>
        <Typography sx={{ marginLeft: '47px', fontSize: '17px' }}>{description}</Typography>
    </Box>
);

const Assistance = () => {
    const navigator = useNavigate();
    return(
    <>
        <div style={{ marginTop: '50px', display: 'flex', gap: '8px' }}>
            <Typography sx={{ textAlign: 'left' }} variant="h4">How</Typography>
            <Typography sx={{ color: "#69CEE2" }} variant="h4">DiAsecur</Typography>
            <Typography variant="h4">helps you buy & sell better</Typography>
        </div>
        <Box></Box>
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>

            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="space-around" width="450px">
                <Section
                    icon={DiaIcon}
                    title="Compare Stones"
                    description="Save diamonds to your Vault to compare side by side and manage price alerts."
                />
                <Section
                    icon={DiaIcon}
                    title="Check For Red Flags"
                    description="Sometimes what looks like a great deal on paper is just too good to be true."
                />
            </Box>

            <Box display="flex" flexDirection="column" justifyContent="space-around" width="450px" sx={{ marginRight: '50px' }}>
                <Section
                    icon={DiaIcon}
                    title="Find Great Deals"
                    description="We help you find underpriced, high quality stones. Our fair price estimate saves you time and money."
                />
                <Section
                    icon={DiaIcon}
                    title="High precision calculator"
                    description="Estimate your diamond values based on various diamond prices from all over other websites."
                />
            </Box>
            <Box>
                <img src={DoubleDiamond} alt="Diamond Icon" style={Style.img} />
                <Box sx={{ width: '390px', marginRight: '200px', position: 'relative', paddingTop: '35px', paddingBottom:'20px' }}>

                    <Card sx={{ background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', paddingTop: '50px' }}>
                        <Typography variant="h3" sx={{ color: '#69CEE2', mt: -1}}>Appraisal</Typography>
                        <Typography sx={{ fontSize: '23px', mt: 2 }}>Make a request to appraisal your diamond by our professional diamond appraiser.</Typography>
                        <Button sx={Style.Button} variant="contained" onClick={()=> navigator('/diamond-appraisal')}>Make an Appointment</Button>
                    </Card>
                </Box>
            </Box>

        </div>
    </>
)};

export default Assistance;
