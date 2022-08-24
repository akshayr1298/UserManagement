
import React, { useContext, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { userContext } from '../store/context';
import { useNavigate } from 'react-router-dom';

function AdminHome() {
  const [userData,setUserdata]= useState([])
  const {setUserDetails} = useContext(userContext)
  let navigate = useNavigate()
  const adminLogOut = ()=>{
    localStorage.removeItem('adtoken')
    navigate('/adminlogin')

  }
  

  const userDetails = async() => {
   
    const req = await fetch('http://localhost:1337/api/userData', {

    })
    const data = await req.json();
    
    if (data.status === 'ok') {
      setUserdata(data.userData)
    } else {
      setUserdata('no data found')
    }

  }

  useEffect(() => {
    userDetails()

  },[userData.name])

  async function handleDelete(id) {
    let response = window.confirm('are you sure to delete')
    if(response === true) {
      await fetch('http://localhost:1337/api/deleteUser',{
        method:'DELETE',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          id,
        })
      })
    }
    
    }

    function addUser(e){
      e.preventDefault()
      navigate('/adduser')
    }
    


  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Admin Pannel</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Button onClick={adminLogOut} variant="primary">Logout</Button>{' '}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className='mx-auto col-md-2 col-4 mb-3 mt-5'>
        <button className='btn btn-primary'onClick={(e) => addUser(e)} type='button'>Add user</button>
      </div>
      <Table striped bordered hover>  
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        
          {userData.map((item, index) => {
            return(
              <tr>
              <td>{index+1}</td>
              <td>{item.name} </td>
              <td>{item.email} </td>
              <td><button onClick={()=>{setUserDetails(item)
               navigate('/edituser')}}
              className='btn btn-primary'>Edit</button> </td>
              <td><button className='btn btn-danger' onClick={() => handleDelete(item._id)}>Delete</button></td>
             
            </tr>
            )
            
          })}
        </tbody>
      </Table>


    </div>
  )
}

export default AdminHome
