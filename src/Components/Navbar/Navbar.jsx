import {useState, useEffect} from 'react'
import "./Navbar.css"
import logoWeb from '../../assets/logo_v4.png'

import { useNavigate } from 'react-router-dom'
import { Button, Icon, Link} from '@mui/material'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import Container from '@mui/material/Container';

import { CenterFocusStrong } from '@mui/icons-material'
import UserComponent from './UserComponent'

const Navbar = () => {
  
  const navigator = useNavigate();

  const pages = ['Calculate', 'Diamond Check', 'Appraisal'];
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  const [anchorElNav, setAnchorElNav] = useState(null);




  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  

  return (
    <AppBar position="static" sx={{backgroundColor: '#fff'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Button onClick={() => navigator('/')}><img src={logoWeb} alt="" className='logo'/>   </Button>       
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} justifyContent={'center'}>
            <Button sx={{ my: 2, display: 'block', color: 'black'}}>Calculate</Button>
            <Button sx={{ my: 2, display: 'block', color: 'black'}}>Diamond Check</Button>
            <Button sx={{ my: 2, display: 'block', color: 'black'}} onClick={()=> navigator('/diamond-appraisal')}>Appraisal</Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <UserComponent></UserComponent>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar