import React from 'react'
import "./Navbar.css"
import logoWeb from '../../assets/logo_v4.png'
import { useNavigate } from 'react-router-dom'
import { Button, Grid } from '@mui/material'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import UserComponent from './UserComponent'

const Navbar = () => {

  const navigator = useNavigate();
  return (
    <AppBar
      sx={{
        backgroundColor: 'white',
      }}
      position="static"
    >
      <Toolbar>
        <Grid container spacing={5}>
          <Grid item lg={3} xl={3} md={3} sm={3} xs={3}
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Button onClick={() => navigator('/')}><img src={logoWeb} alt="" style={{ width: 130, height: 68.5 }} />   </Button>
          </Grid>
          <Grid item lg={6} xl={6} md={6} sm={6} xs={6}
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid container
              spacing={-15}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item lg={4} xl={4} md={4} sm={4} xs={4}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Button sx={{ color: 'black' }} onClick={() => navigator('/calculate')}>Calculate</Button>
              </Grid>
              <Grid item lg={4} xl={4} md={4} sm={4} xs={4}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Button sx={{ color: 'black' }} onClick={() => navigator('/diamond-check')}>Diamond Check</Button>
              </Grid>
              <Grid item lg={4} xl={4} md={4} sm={4} xs={4}
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Button sx={{ color: 'black' }} onClick={() => navigator('/diamond-appraisal')}>Appraisal</Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={3} xl={3} md={3} sm={3} xs={3}
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box >
              <UserComponent></UserComponent>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar