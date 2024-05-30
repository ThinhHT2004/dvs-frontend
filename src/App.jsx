import React from 'react'
import {BrowserRouter, Route, Routes, } from 'react-router-dom'
import HomePage from './Components/homepage/HomePage'
import DiamondAppraisal from './Components/appraisal/DiamondAppraisal'
import Login from './Components/login/Login'
import SignUp from './Components/login/SignUp'
import ConsultingStaff_Home from './Components/staff/consulting_staff/ConsultingStaff_Home'
import ConsultingStaff_IncommingRequest from './Components/staff/consulting_staff/ConsultingStaff_IncommingRequest'
const App = () => {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage></HomePage>}></Route>
        <Route path='/diamond-appraisal' element={<DiamondAppraisal></DiamondAppraisal>}></Route>
        <Route path='/accounts/signin' element={<Login></Login>}></Route>
        <Route path='/accounts/signup' element={<SignUp></SignUp>}></Route>
        <Route path='/consulting-staff/home' element={<ConsultingStaff_Home></ConsultingStaff_Home>}></Route>
        <Route path='/consulting-staff/incomming-request' element={<ConsultingStaff_IncommingRequest></ConsultingStaff_IncommingRequest>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App