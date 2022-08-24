
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
let navigate = useNavigate()
 

const loginSubmit = async (e)=>{
    e.preventDefault();
    let response = await fetch('http://localhost:1337/api/adminlogin',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    let data = await response.json()
    if(data.admin) {
        localStorage.setItem('token',data.adtoken)
        navigate('/adminhome')
    }else{
       alert('invalid user name or password')
    }
   
}

    return (
        <div className='container'>
            <Form className='' onSubmit={loginSubmit}>
                <Form.Group className="mb-3 col-md-4 col-xs-6 mx-auto mt-5" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(event)=>setEmail(event.target.value) }/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3 col-md-4 col-xs-6 mx-auto" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(event)=>setPassword(event.target.value) }/>

                </Form.Group>
                <div className='container'>
                <div className='row'>
               <Button className='mx-auto col-md-4 col-xs-5' variant="primary" type="submit">
                    Submit
                </Button>
               </div>
          
                </div>
           
            </Form>
        </div>
    )
}

export default AdminLogin
