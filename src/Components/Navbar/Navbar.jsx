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
        <Link href="/"><img src= {logoWeb} alt="" className='logo'/></Link>
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
        
            
                  <Button 
                    variant="contained" 
                    onClick={() => signIn()}
                    sx={{
                      backgroundColor: '#69CEE2',
                      borderRadius: '8px',
                      textTransform: 'none',
                      padding: '6px 16px',
                      marginRight: '30px',
                      marginLeft: '42.71px',
                      textAlign: 'center'
                    }}
                  >
                    Sign In
                  </Button>
                  
  
    </nav>
  )
}

export default Navbar