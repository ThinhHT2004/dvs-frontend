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
import ValuationStaff_Home from './Components/staff/valuation_staff/ValuationStaff_Home'
import ConsultingStaff_ManageRequest from './Components/staff/consulting_staff/ConsultingStaff_ManageRequest'
import ValuationStaff_DiamondsAppraisal from './Components/staff/valuation_staff/ValuationStaff_DiamondsAppraisal'
import Manager_ReceiptManagement from './Components/staff/manager/Manager_ReceiptManagement'
import Manager_ReportManagement from './Components/staff/manager/Manager_ReportManagement'
import ConsultingStaff_Report from './Components/staff/consulting_staff/ConsultingStaff_Report.jsx'
import ConsultingStaff_Form from './Components/staff/consulting_staff/ConsultingStaff_Form.jsx'
import { BadgeProvider } from './Components/staff/BadgeContext.jsx'
import StaffDrawer from './Components/staff/StaffDrawer.jsx'
const App = () => {
  
  return (
    <>
      <BadgeProvider>
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
          <Route path='/consulting-staff/request' element={<ConsultingStaff_ManageRequest></ConsultingStaff_ManageRequest>}></Route>
          <Route path='/manager/receipt' element={<Manager_ReceiptManagement></Manager_ReceiptManagement>}></Route>
          <Route path='/manager/report' element={<Manager_ReportManagement></Manager_ReportManagement>}></Route>
          <Route path='/consulting-staff/report' element={<ConsultingStaff_Report></ConsultingStaff_Report>}></Route>
          <Route path='/consulting-staff/form' element={<ConsultingStaff_Form></ConsultingStaff_Form>}></Route>
        </Routes>
        </BrowserRouter>
      </BadgeProvider>
    </>
  )
}

export default App