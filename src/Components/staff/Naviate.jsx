import React from "react";

const Naviate = () => {
  return <div>Naviate</div>;
};

export default Naviate;

export const consulting_staff_navigator = (text, navigate) => {
  switch (text) {
    case "Home":
      navigate("/consulting-staff/home");
      break;
    case "Incoming Request":
      navigate("/consulting-staff/incoming-request");
      break;
    case "Request":
      navigate("/consulting-staff/request");
      break;
    case "Report":
      navigate("/consulting-staff/report");
      break;
    case "Form":
      navigate("/consulting-staff/form");
      break;
    case "Sign Out":
      handleSignOut(navigate);
      break;
    default:
      break;
  }
};

export const valuation_staff_navigator = (text, navigate) => {
  switch (text) {
    case "Diamonds Appraisal":
      navigate("/valuation-staff/diamonds-appraisal");
      break;
    case "Sign Out":
      handleSignOut(navigate);
      break;
    default:
      break;
  }
};

export const manager_navigator = (text, navigate) => {
  switch (text) {
    // case 'Home':
    //   navigate('/manager/home');
    //   break;
    case "Pending Request":
      navigate('/manager/pending-request');
      break;
    case 'Request':
      navigate('/manager/receipt');
      break;
    case 'Report':
      navigate('/manager/report');
      break;
    case "Sign Out":
      handleSignOut(navigate);
      break;
    default:
      break;
  }
};

export const vault_navigator = (text, navigate) => {
  switch (text) {
    case 'Vault':
      navigate('/vault');
      break;
    case 'Settings':
      navigate('/settings');
      break;
    case 'Calculate':
      navigate('/calculate');
      break;
    case 'Check Certificates':
      navigate('/certificates-check');
      break;
    case 'Diamonds Appraisal':
      navigate('/diamond-appraisal');
      break;
    case "Sign Out":
      handleSignOut(navigate);
      break;
    default:
      break;
  }
};
export const admin_navigator = (text, navigate) => {
  switch (text) {
    case 'Home':
      navigate('/admin/home');
      break;
    case 'Services':
      navigate('/admin/services');
      break;
    case 'Staffs':
      navigate('/admin/staffs');
      break;
    case 'Customers':
      navigate('/admin/customers');
      break;
    case "Sign Out":
      handleSignOut(navigate);
      break;
    default:
      break;
  }
};
function handleSignOut(navigate) {
  sessionStorage.clear();
  localStorage.clear();
  navigate("/");
}
