

import './Login.css'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"

function LoginUser() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [emailerr, setEmailerr] = useState('')
  const [passworderr, setPassworderr] = useState('')

  let navigate = useNavigate();
 async function loginUser(event){
  event.preventDefault()

  if (!email) {
    setEmailerr("Email is required")
    return false
  }
  if (!password) {
    setPassworderr("Password is required")
    return false
  }
   const response = await fetch('http://localhost:1337/api/login',{
      method:"POST", 
      headers:{
        'Content-Type':'application/json',

      },
      body:JSON.stringify({
        email,
        password
      }),
    })
    const data = await response.json()

    if(data.user){
      localStorage.setItem('token',data.user)
      alert("Login successful")
      navigate('/')
    }else{
      alert("Please check your username and password")
    }
    console.log(data);
  }
  return (
    <div className="loginForm">
     
     <form onSubmit={loginUser} className='logregisterform' action="">
     <h2>Login Here</h2>
     <small className='text-danger'> {emailerr}</small>
      <input className='loginform' value={email} onChange = {(e)=>{
        setEmailerr('')
        setEmail(e.target.value)}} type="email" placeholder='Email'/> <br />
        <small className='text-danger'> {passworderr}</small>
      <input className='loginform' value={password} onChange = {(e)=>{
        setPassworderr('')
        setPassword(e.target.value)}} type="password" placeholder='Password'/> <br />
      <input className='logbtn' type="submit" value = "Login"/>
     </form>
    </div>
  );
}

export default LoginUser;
