import React from 'react'
import "./Navbar.css"
import logoWeb from '../../assets/logo_v4.png'
const Navbar = () => {
  return (
    <div className='navbar'>
        <img src= {logoWeb} alt="" className='logo'/>
        <ul>
            <li>CALCULATE</li>
            <li>DIAMONDS CHECK</li>
            <li>APPRAISAL</li>
        </ul>
        <div>
            <ul>
                <li>VAULT</li>
                <li><button className='signin-button'>Sign in</button></li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar