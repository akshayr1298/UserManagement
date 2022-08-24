
import React from "react";
import {BrowserRouter,Routes,Route}  from  'react-router-dom'
import AdminLogin from "./pages/AdminLogin";
import AdminHome from "./pages/AdminHome";
import Home from "./pages/Home";
import LoginUser from "./pages/Login";
import SignupUser from "./pages/Signup";
import EditUserPage from "./pages/EditUser";
import Data from "./store/context";
import AdduserPage from "./pages/Adduser";

const App = ()=>{
  return(
    <div>
    <Data>
    <BrowserRouter>
       <Routes>
     
        <Route path ='/login'  element = {<LoginUser/>}/>
        <Route path ="/signup" element = {<SignupUser/>}/>   
        <Route path ="/" element = {<Home/>} />
        <Route path="/adminhome" element = {<AdminHome/>} />
        <Route path = '/adminlogin' element = {<AdminLogin/>} />
        <Route path ='/edituser' element = {<EditUserPage/>} />
        <Route path = '/adduser' element = {<AdduserPage/>} />
      </Routes>
      </BrowserRouter>

    </Data>
    
     
  </div>
    
  )
}

export default App