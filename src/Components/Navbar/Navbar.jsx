import React from 'react'
import "./Navbar.css"
import logoWeb from '../../assets/logo_v4.png'
import { useNavigate } from 'react-router-dom'
import { Button, Link } from '@mui/material'

const Navbar = () => {
  
  const navigator = useNavigate();

  function signIn(){
    navigator('/accounts/signin')
  }



  return (
    <nav className='navbar'>
        <img src= {logoWeb} alt="" className='logo'/>
        <ul>
            <li>
              <Link href="/diamond-appraisal" underline='none' sx={{color: '#000'}}>Calculate</Link>
            </li>
            <li>
              <Link href="/diamond-appraisal" underline='none' sx={{color: '#000'}}>Diamond Check</Link>
            </li>
            <li>
              <Link href="/diamond-appraisal" underline='none' sx={{color: '#000'}}>Appraisal</Link>
            </li>
        </ul>
        
            <ul>
                <li>Vault</li>
                <li>
                  <Button 
                    variant="contained" 
                    onClick={() => signIn()}
                    sx={{
                      backgroundColor: '#69CEE2',
                      borderRadius: '8px',
                      textTransform: 'none',
                      marginRight: '30px'
                    }}
                    
                  >
                    Sign In
                  </Button>
                  </li>
            </ul>
  
    </nav>
  )
}

export default Navbar