// import React,{useState} from 'react'
// import { useNavigate } from 'react-router-dom';
// import './AdminLogin.css'


// function AdminLogin() {
//     let navigate = useNavigate()
//     const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [passwordError, setpasswordError] = useState("");
//   const [emailError, setemailError] = useState("");


//   const handleValidation = (event) => {
//     let formIsValid = true;

//     if (!email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
//       formIsValid = false;
//       setemailError("Email Not Valid");
//       return false;
//     } else {
//       setemailError("");
//       formIsValid = true;
//     }

//     // if (!password.match(/^[a-zA-Z]{3,22}$/)) {
//     //   formIsValid = false;
//     //   setpasswordError(
//     //     "Only Letters and length must best min 3 Chracters and Max 22 Chracters"
//     //   );
//     //   return false;
//     // } else {
//     //   setpasswordError("");
//     //   formIsValid = true;
//     // }

//     return formIsValid;
//   };

//   const loginSubmit = async (e) => {
//     e.preventDefault();
//     handleValidation();
//     let response = await fetch('http://localhost:1300/api/adminLogin', {
//         method: 'POST',
//         headers:{
//             'Content-Type':'application/json'
//         },
//         body: JSON.stringify({
//             email,
//             password,
//         })
//     })

//     let data =await response.json()
//     if(data.admin) {
//         localStorage.setItem('token',data.token)
//         navigate('/adminHome')
//     }else{
//        alert('invalid user name or password')
//     }
//   };
//   return (
//     <div>
//         <div className="row d-flex justify-content-center">
//           <div className="col-md-4">
//             <form id="loginform" onSubmit={loginSubmit}>
//               <div className="form-group">
//                 <label>Email address</label>
//                 <input
//                   type="email"
//                   className="form-control"
//                   id="EmailInput"
//                   name="EmailInput"
//                   aria-describedby="emailHelp"
//                   placeholder="Enter email"
//                   onChange={(event) => setEmail(event.target.value)}
//                 />
//                 <small id="emailHelp" className="text-danger form-text">
//                   {emailError}
//                 </small>
//               </div>
//               <div className="form-group">
//                 <label>Password</label>
//                 <input
//                   type="password"
//                   className="form-control"
//                   id="exampleInputPassword1"
//                   placeholder="Password"
//                   onChange={(event) => setPassword(event.target.value)}
//                 />
//                 <small id="passworderror" className="text-danger form-text">
//                   {passwordError}
//                 </small>
//               </div>
//               <div className="form-group form-check">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   id="exampleCheck1"
//                 />
//                 <label className="form-check-label">Check me out</label>
//               </div>
//               <button type="submit" className="btn btn-primary">
//                 Submit
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//   )
// }

// export default AdminLogin


import React,{useEffect, useState, useContext} from 'react'
import {Table} from 'react-bootstrap'
import { isExpired, decodeToken } from 'react-jwt';
import { useNavigate } from 'react-router-dom';
import {userContext} from '../../store/userContext'

function AdminHome() {
    const {setUserDetails} = useContext(userContext)
    const [userData, setUserData] = useState([])
let navigate = useNavigate()
    async function manageHome() {
        const req = await fetch('http://localhost:1300/api/userData', {
          headers: {
            'x-access-token': localStorage.getItem('token'),
          },
        });
    
        const data = await req.json();
        if (data.status === 'ok') {
            setUserData(data.userData)
        } else {
            setUserData('no user fount')
        }
      }
      useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          const user = decodeToken(token);
          if (!user) {
            localStorage.removeItem('token');
            navigate('/');
          } else {
            manageHome();
          }
        }
      }, [userData]);
     async function handleDelete(id) {
      let response = window.confirm('are you sure to delete')
      if(response === true) {
        await fetch('http://localhost:1300/api/deleteUser',{
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

      function manageAdd(e) {
        e.preventDefault()
        navigate('/addUser')
      }
  return (
    <div className='row'>
      <div className='mx-auto col-md-2 col-4 mb-2'>
        <button className='btn btn-primary' type='button' onClick={(e) => manageAdd(e)}>Add user</button>
      </div>
      <Table striped bordered hover>
  <thead>
    <tr>
      <th>#</th>
      <th>First Name</th>
      <th>Email</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
  </thead>
  <tbody>
  {userData.map((item, index) => (

    <tr>
      <td>{index+1}</td>
      <td>{item.name}</td>
      <td>{item.email}</td>
      <td><button onClick={() => {
        setUserDetails(item)
        navigate('/EditUser')}} className='btn btn-success'>Edit</button></td>
      <td><button className='btn btn-danger' onClick={() => handleDelete(item._id)}>Delete</button></td>
    </tr>

  ))}
    </tbody>
  
</Table>
    </div>
  )
}

export default AdminHome