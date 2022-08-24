
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Header() {
    let navigate = useNavigate()
    const logOut = ()=>{
        localStorage.removeItem('token')
        navigate('/login')
    }
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse d-flex justify-content-end me-5" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                            <button type="button" onClick={logOut} className="btn btn-primary">Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
