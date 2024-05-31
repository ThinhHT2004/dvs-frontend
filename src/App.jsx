import React from 'react'
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom'
import HomePage from './Components/homepage/HomePage'
import DiamondAppraisal from './Components/appraisal/DiamondAppraisal'
import Login from './Components/login/Login'
import SignUp from './Components/login/SignUp'
import ConsultingStaff_Home from './Components/staff/consulting_staff/ConsultingStaff_Home'
import ConsultingStaff_IncommingRequest from './Components/staff/consulting_staff/ConsultingStaff_IncommingRequest'
import Manager_Home from './Components/staff/manager/Manager_Home'
import Manager_PendingRequest from './Components/staff/manager/Manager_PendingRequest'

import ConsultingStaff_ManageRequest from './Components/staff/consulting_staff/ConsultingStaff_ManageRequest'


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
        <Route path='/valuation-staff/diamonds-appraisal' element={<ValuationStaff_DiamondsAppraisal></ValuationStaff_DiamondsAppraisal>}></Route>
        <Route path='/valuation-staff/home' element={<ValuationStaff_Home></ValuationStaff_Home>}></Route>
        <Route path='/manager/pending-request' element={<Manager_PendingRequest></Manager_PendingRequest>}></Route>
        <Route path='/consulting-staff/manage-request' element={<ConsultingStaff_ManageRequest></ConsultingStaff_ManageRequest>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App