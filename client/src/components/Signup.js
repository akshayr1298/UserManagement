
import './Signup.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function SignupUser() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nameerr, setNameerr] = useState('')
  const [emailerr, setEmailerr] = useState('')
  const [passworderr, setPassworderr] = useState('')

  const navigate = useNavigate()
  async function signupUser(event) {
    event.preventDefault()

    if (!name) {
      setNameerr("Name is required")
      return false
    }
    if (!email) {
      setEmailerr("Email is required")
      return false
    }
    if (!password) {
      setPassworderr("Password is required")
      return false
    }
    const response = await fetch('http://localhost:1337/api/signup', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({
        name,
        email,
        password
      }),
    })
    const data = await response.json()
    console.log(data);
    if (data.status === 'ok') {
      navigate('/login')
    }
  }
  return (
    <div className="signupForm">

      <form onSubmit={signupUser} className='registerform' action="">
        <h3>Signup</h3>
        <small className='text-danger'> {nameerr}</small>
        <input className='signupform' value={name} onChange={(e) => {
          setNameerr('')
          setName(e.target.value)
        }} type="text" placeholder='Name' /> <br />
        <small className='text-danger'> {emailerr}</small>
        <input className='signupform' value={email} onChange={(e) => {
          setEmailerr('')
          setEmail(e.target.value)
        }} type="email" placeholder='Email' /> <br />
        <small className='text-danger'> {passworderr}</small>
        <input className='signupform' value={password} onChange={(e) => {
          setPassworderr('')
          setPassword(e.target.value)
        }} type="password" placeholder='Password' /> <br />
        <input className='regbtn' type="submit" value="Register" />
      </form>
    </div>
  );
}

export default SignupUser;
