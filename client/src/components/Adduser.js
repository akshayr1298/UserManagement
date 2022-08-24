

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AddUser() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()


    async function addUser(event) {
        event.preventDefault()

        const response = await fetch('http://localhost:1337/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        })


        const data = await response.json()
        if (data.status === 'ok') {
            alert("Successful")
            navigate('/adminhome')
        } else {
            alert("Email Already Exists")

        }

    }
    return (
        <div className="App">
            <div className="container mt-3">
                <h2 className='text-center'>Add New User</h2>
                <div className="row d-flex justify-content-center">
                    <div className="col-md-4">
                        <form id="loginform" onSubmit={addUser} >
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    value={name}
                                    type="text"
                                    className="form-control"
                                    id="EmailInput"
                                    name="EmailInput"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <small id="emailHelp" className="text-danger form-text">

                                </small>
                            </div>
                            <div className="form-group">
                                <label>Email address</label>
                                <input
                                    value={email}
                                    type="email"
                                    className="form-control"
                                    id="EmailInput"
                                    name="EmailInput"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <small id="emailHelp" className="text-danger form-text">

                                </small>
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    value={password}
                                    type="password"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <small id="passworderror" className="text-danger form-text">

                                </small>
                            </div>

                            <input type="submit" value='Submit' className="btn btn-primary mt-3" />

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddUser