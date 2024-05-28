import React from 'react'
import "./Navbar.css"
import logoWeb from '../../assets/logo_v4.png'
import { useNavigate } from 'react-router-dom'
import { Button, Link } from '@mui/material'
import UserComponent from './UserComponent'

const Navbar = () => {
  
  const navigator = useNavigate();

  

  const username = sessionStorage.getItem('username');

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
        
            <ul>
                <li>Vault</li>
                <li>
                  <UserComponent></UserComponent>
                  </li>
            </ul>
  
    </nav>
  )
}

export default Navbar