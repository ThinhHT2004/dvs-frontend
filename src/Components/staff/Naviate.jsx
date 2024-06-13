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
    case "Incomming Request":
      navigate("/consulting-staff/incomming-request");
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
    case "Home":
      navigate("/valuation-staff/home");
      break;
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
    case 'Home':
      navigate('/manager/home');
      break;
    case "Pending Request":
      navigate('/manager/pending-request');
      break;
    case 'Receipt':
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
    case 'Home':
      navigate('/vault/home');
      break;
    case 'Appointments':
      navigate('/vault/appointment');
      break;
    case 'Price Alert':
      navigate('/vault/price-alert');
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
  navigate("/");
}
