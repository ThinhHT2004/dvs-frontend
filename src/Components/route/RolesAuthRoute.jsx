import React from 'react'
import { Navigate, Route, useNavigate } from 'react-router-dom';

const RolesAuthRoute = ({element, allowedRoles}) => {
  
    const canAccess = allowedRoles.includes(sessionStorage.getItem("role")); 
    console.log(canAccess);
  
    return canAccess ? element : <Navigate to={'/access-denied'}></Navigate>; 
}

export default RolesAuthRoute