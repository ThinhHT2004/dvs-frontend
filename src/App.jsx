import React from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
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
import Vault_Home from './Components/vault/Vault_Home.jsx'
import Vault_Appointment from './Components/vault/Vault_Appointment.jsx'
import Vault_PriceAlert from './Components/vault/Vault_PriceAlert.jsx'
import Calculate from './Components/calculate/Calculate.jsx'
import Check_Diamonds from './Components/check/Check_Diamonds.jsx'
import Check_DiamondsDetails from './Components/check/Check_DiamondsDetails.jsx'
import { RequestsProvider } from './Components/staff/consulting_staff/RequestContext.jsx'
import Admin_Home from './Components/staff/admin/Admin_Home'
import Admin_Services from './Components/staff/admin/Admin_Services'
const App = () => {
  return (
    <>
      <RequestsProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage></HomePage>}></Route>
            <Route path='/calculate' element={<Calculate></Calculate>}></Route>
            <Route path='/diamond-check' element={<Check_Diamonds></Check_Diamonds>}></Route>
            <Route path='/admin/home' element={<Admin_Home></Admin_Home>}></Route>
            <Route path='/admin/services' element={<Admin_Services></Admin_Services>}></Route>
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
            <Route path='/vault/home' element={<Vault_Home></Vault_Home>}></Route>
            <Route path='/vault/appointment' element={<Vault_Appointment></Vault_Appointment>}></Route>
            <Route path='/vault/price-alert' element={<Vault_PriceAlert></Vault_PriceAlert>}></Route>
            <Route path='/diamond-check/:id' element={<Check_DiamondsDetails></Check_DiamondsDetails>}></Route>
          </Routes>
        </BrowserRouter>
      </RequestsProvider>
    </>
  )
}

export default App