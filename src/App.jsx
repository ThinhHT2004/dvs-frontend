import React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./Components/homepage/HomePage";
import DiamondAppraisal from "./Components/appraisal/DiamondAppraisal";
import Login from "./Components/login/Login";
import SignUp from "./Components/login/SignUp";
import ConsultingStaff_Home from "./Components/staff/consulting_staff/ConsultingStaff_Home";
import ConsultingStaff_IncommingRequest from "./Components/staff/consulting_staff/ConsultingStaff_IncommingRequest";
import Manager_Home from "./Components/staff/manager/Manager_Home";
import Manager_PendingRequest from "./Components/staff/manager/Manager_PendingRequest";
// import ValuationStaff_Home from "./Components/staff/valuation_staff/ValuationStaff_Home";
import ConsultingStaff_ManageRequest from "./Components/staff/consulting_staff/ConsultingStaff_ManageRequest";
import ValuationStaff_DiamondsAppraisal from "./Components/staff/valuation_staff/ValuationStaff_DiamondsAppraisal";
import Manager_ReceiptManagement from "./Components/staff/manager/Manager_ReceiptManagement";
import Manager_ReportManagement from "./Components/staff/manager/Manager_ReportManagement";
import ConsultingStaff_Report from "./Components/staff/consulting_staff/ConsultingStaff_Report.jsx";
import ConsultingStaff_Form from "./Components/staff/consulting_staff/ConsultingStaff_Form.jsx";
// import Vault_Home from "./Components/vault/Vault_Home.jsx";
import Vault_Appointment from "./Components/vault/Vault_Appointment.jsx";
import Vault_PriceAlert from "./Components/vault/Vault_PriceAlert.jsx";
import Vault_Settings from "./Components/vault/Vault_Settings.jsx";
import Calculate from "./Components/calculate/Calculate.jsx";
import Check_Diamonds from "./Components/check/Check_Diamonds.jsx";
import Check_DiamondsDetails from "./Components/check/Check_DiamondsDetails.jsx";
import { RequestsProvider } from "./Components/staff/consulting_staff/RequestContext.jsx";
import Admin_Home from "./Components/staff/admin/Admin_Home";
import Admin_Services from "./Components/staff/admin/Admin_Services";
import Admin_Accounts from "./Components/staff/admin/Admin_Accounts";
import AccessDenied from "./Components/exception/AccessDenied.jsx";
import RolesAuthRoute from "./Components/route/RolesAuthRoute.jsx";
import { ro } from "date-fns/locale";
const App = () => {
  const roles = {
    ADMIN: "ADMIN",
    CONSULTING_STAFF: "CONSULTING_STAFF",
    VALUATION_STAFF: "VALUATION_STAFF",
    MANAGER: "MANAGER",
    CUSTOMER: "CUSTOMER",
  };
  return (
    <>
      <RequestsProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Site */}
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/calculate" element={<Calculate></Calculate>}></Route>
            <Route
              path="/certificates-check"
              element={<Check_Diamonds></Check_Diamonds>}
            ></Route>
            <Route
              path="/diamond-appraisal"
              element={<DiamondAppraisal></DiamondAppraisal>}
            ></Route>
            <Route path="/accounts/signin" element={<Login></Login>}></Route>
            <Route path="/accounts/signup" element={<SignUp></SignUp>}></Route>
            <Route
              path="/certificates-check/:id"
              element={<Check_DiamondsDetails></Check_DiamondsDetails>}
            ></Route>
            <Route
              path="/access-denied"
              element={<AccessDenied></AccessDenied>}
            ></Route>

            {/* Admin Site */}
            <Route
              path="/admin/home"
              element={
                <RolesAuthRoute
                  element={<Admin_Home></Admin_Home>}
                  allowedRoles={[roles.ADMIN]}
                ></RolesAuthRoute>
              }
            ></Route>
            <Route
              path="/admin/services"
              element={
                <RolesAuthRoute
                  element={<Admin_Services></Admin_Services>}
                  allowedRoles={[roles.ADMIN]}
                ></RolesAuthRoute>
              }
            ></Route>
            <Route
              path="/admin/accounts"
              element={
                <RolesAuthRoute
                  element={<Admin_Accounts></Admin_Accounts>}
                  allowedRoles={[roles.ADMIN]}
                ></RolesAuthRoute>
              }
            ></Route>
            {/* Consulting Staff Site */}
            <Route
              path="/consulting-staff/home"
              element={
                <RolesAuthRoute
                  element={<ConsultingStaff_Home></ConsultingStaff_Home>}
                  allowedRoles={[roles.CONSULTING_STAFF]}
                ></RolesAuthRoute>
              }
            ></Route>
            <Route
              path="/consulting-staff/incomming-request"
              element={
                <RolesAuthRoute
                  element={
                    <ConsultingStaff_IncommingRequest></ConsultingStaff_IncommingRequest>
                  }
                  allowedRoles={[roles.CONSULTING_STAFF]}
                ></RolesAuthRoute>
              }
            ></Route>
            <Route
              path="/consulting-staff/request"
              element={
                <RolesAuthRoute
                  element={
                    <ConsultingStaff_ManageRequest></ConsultingStaff_ManageRequest>
                  }
                  allowedRoles={[roles.CONSULTING_STAFF]}
                ></RolesAuthRoute>
              }
            ></Route>
            <Route
              path="/consulting-staff/report"
              element={
                <RolesAuthRoute
                  element={<ConsultingStaff_Report></ConsultingStaff_Report>}
                  allowedRoles={[roles.CONSULTING_STAFF]}
                ></RolesAuthRoute>
              }
            ></Route>
            <Route
              path="/consulting-staff/form"
              element={
                <RolesAuthRoute
                  element={<ConsultingStaff_Form></ConsultingStaff_Form>}
                  allowedRoles={[roles.CONSULTING_STAFF]}
                ></RolesAuthRoute>
              }
            ></Route>

            {/* Valuation Staff Site */}
            <Route
              path="/valuation-staff/diamonds-appraisal"
              element={
                <RolesAuthRoute
                  element={
                    <ValuationStaff_DiamondsAppraisal></ValuationStaff_DiamondsAppraisal>
                  }
                  allowedRoles={[roles.VALUATION_STAFF]}
                ></RolesAuthRoute>
              }
            ></Route>
            {/* <Route
              path="/valuation-staff/home"
              element={
                <RolesAuthRoute
                  element={<ValuationStaff_Home></ValuationStaff_Home>}
                  allowedRoles={[roles.VALUATION_STAFF]}
                ></RolesAuthRoute>
              }
            ></Route> */}

            {/* Manager Site */}
            <Route
              path="/manager/home"
              element={
                <RolesAuthRoute
                  element={<Manager_Home></Manager_Home>}
                  allowedRoles={[roles.MANAGER]}
                ></RolesAuthRoute>
              }
            ></Route>
            <Route
              path="/manager/pending-request"
              element={
                <RolesAuthRoute
                  element={<Manager_PendingRequest></Manager_PendingRequest>}
                  allowedRoles={[roles.MANAGER]}
                ></RolesAuthRoute>
              }
            ></Route>
            <Route
              path="/manager/receipt"
              element={
                <RolesAuthRoute
                  element={
                    <Manager_ReceiptManagement></Manager_ReceiptManagement>
                  }
                  allowedRoles={[roles.MANAGER]}
                ></RolesAuthRoute>
              }
            ></Route>
            <Route
              path="/manager/report"
              element={
                <RolesAuthRoute
                  element={
                    <Manager_ReportManagement></Manager_ReportManagement>
                  }
                  allowedRoles={[roles.MANAGER]}
                ></RolesAuthRoute>
              }
            ></Route>

            {/* Customer Site */}
            {/* <Route
              path="/vault/home"
              element={
                <RolesAuthRoute
                  element={<Vault_Home></Vault_Home>}
                  allowedRoles={[roles.CUSTOMER]}
                ></RolesAuthRoute>
              }
            ></Route> */}
            <Route
              path="/vault"
              element={
                <RolesAuthRoute
                  element={<Vault_Appointment></Vault_Appointment>}
                  allowedRoles={[roles.CUSTOMER]}
                ></RolesAuthRoute>
              }
            ></Route>
            {/* <Route
              path="/vault/price-alert"
              element={
                <RolesAuthRoute
                  element={<Vault_PriceAlert></Vault_PriceAlert>}
                  allowedRoles={[roles.CUSTOMER]}
                ></RolesAuthRoute>
              }
            ></Route> */}
            <Route
              path="/settings"
              element={
                <RolesAuthRoute
                  element={<Vault_Settings></Vault_Settings>}
                  allowedRoles={[roles.CUSTOMER]}
                ></RolesAuthRoute>
              }
            ></Route>
            
          </Routes>
        </BrowserRouter>
      </RequestsProvider>
    </>
  );
};

export default App;
