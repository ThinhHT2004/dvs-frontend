import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import {BrowserRouter, Route, Routes, } from 'react-router-dom'
import HomePage from './Components/homepage/HomePage'
import DiamondAppraisal from './Components/appraisal/DiamondAppraisal'
import Login from './Components/login/Login'
import SignUp from './Components/login/SignUp'
const App = () => {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage></HomePage>}></Route>
        <Route path='/diamond-appraisal' element={<DiamondAppraisal></DiamondAppraisal>}></Route>
        <Route path='/accounts/signin' element={<Login></Login>}></Route>
        <Route path='/accounts/signup' element={<SignUp></SignUp>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App