
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {decodeToken} from 'react-jwt'
import './Home.css'
const Home = ()=>{
    let navigate = useNavigate()
    const [quote,setQuote] = useState('')
    const [tempQuote,setTemQuote] = useState('')


    async function manageHome(){
        const req = await fetch('http://localhost:1337/api/quote',{
            headers:{
                'x-access-token':localStorage.getItem('token')
            },
        })

        const data = await req.json()
        console.log(data);
        if(data.status === 'ok'){
           setQuote(data.qoute) 
        }else{
            alert(data.error)
        }
        
    }
    useEffect(()=>{
         
        const token = localStorage.getItem('token')
        if(token){
            const user = decodeToken(token)
            if(!user){
                localStorage.removeItem('token')
                navigate('/login')
            }else{
                manageHome()
            }
        }
     
    },[])

    async function updateQuote(event){
        event.preventDefault()
        const req = await fetch('http://localhost:1337/api/quote',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                'x-access-token':localStorage.getItem('token')
            },
            body:JSON.stringify({
                qoute:tempQuote,
            })
        })

        const data = await req.json()
        console.log(data);
        if(data.status === 'ok'){
           setQuote(tempQuote) 
           setTemQuote('')
        }else{
            alert(data.error)
        }
        
        

    }

    return (
        <div className='qouteDiv'>
            <h2>Quote of the day: {quote || 'No qoute found'} </h2>
            <form onSubmit={updateQuote}>
              <input className='inputQoute' type="text" placeholder='Quote' value={tempQuote}
               onChange={(e)=>setTemQuote(e.target.value)}/>
              <input className='qoutebtn' type="submit" value = "Update quote"/>


            </form> 

        </div>

    )
 
}

export default Home