import React from 'react'
import {BrowserRouter, Route, Routes, } from 'react-router-dom'
import HomePage from './Components/homepage/HomePage'
import DiamondAppraisal from './Components/appraisal/DiamondAppraisal'
import Login from './Components/login/Login'
import SignUp from './Components/login/SignUp'
import ConsultingStaff_Home from './Components/staff/consulting_staff/ConsultingStaff_Home'
import ConsultingStaff_IncommingRequest from './Components/staff/consulting_staff/ConsultingStaff_IncommingRequest'
import Manager_Home from './Components/staff/manager/Manager_Home'
import Manager_PendingRequest from './Components/staff/manager/Manager_PendingRequest'
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
        <Route path='/manager/home' element={<Manager_Home></Manager_Home>}></Route>
        <Route path='/manager/pending-request' element={<Manager_PendingRequest></Manager_PendingRequest>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App