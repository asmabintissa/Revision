import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const Login = () => {
  const [email,setEmail]=useState('')
  const[password,setPasword]=useState('')
  const navigate=useNavigate()
  const handleLogin=(e)=>{
    e.preventDefault()
    axios.post('http://localhost:3300/login',{email,password})
    .then((res)=>{
      const {message,success}=res.data
      alert(message)
      if(success){
        navigate('/home')
      }
    })
    .catch((err)=>{
      console.log('error logging in',err);
      
    })
  }
  return (
    <div>
         <div className='signup_container'>
        <div className='signup'>
          <form onSubmit={handleLogin}>
        <h1>Login here</h1>
        <label htmlFor="email">Email</label>
        <input type="email" placeholder='Enter your Email'value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <label htmlFor="password">Password</label>
        <input type="password" placeholder='Enter your Password'value={password} onChange={(e)=>setPasword(e.target.value)} /><br /><br /><br />
        <button type='submit'>Login</button> Already have account <Link to='/signup'>Signup</Link> 
        </form>
        </div>
    </div>
    </div>
  )
}

export default Login