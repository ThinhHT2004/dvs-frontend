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
    <div className='navbar'>
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
        <div>
            <ul>
                <li>VAULT</li>
                <li>
                  <Button variant="contained" sx={{background: '#69CEE2', borderRadius: '8px'}} onClick={() => signIn()}>
                    Sign In
                  </Button>
                  </li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar