import React from 'react'
import './DiamondAppraisalBody.css'
import { Link } from '@mui/material'
import UserDiamondAppraisalBody from './UserDiamondAppraisalBody'

const DiamondAppraisalBody = () => {
  return (
    <div className='body'>
      <div className='body-container'>
        <div className='body-text'>
          <h1>REQUEST AN APPOINTMENT</h1>
          <p>You can request an appraisal appointment by submitting the form  below and we will promptly with my appointment availability.</p>
          <p>You can also email us directly at : <span style={{color: '#69CEE2'}}>diasecurappraiser@gmail.com</span></p>
          <p>You can also set up an appointment by calling us <br/>directly at : <span style={{color: '#69CEE2'}}>(+84)84913-5986</span></p>
        </div>
        <div className='body-text'>
            <UserDiamondAppraisalBody></UserDiamondAppraisalBody>
        </div>
      </div>
    </div>
  )
}

export default DiamondAppraisalBody