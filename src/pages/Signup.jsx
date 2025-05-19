import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
const Signup = () => {
    const [username,setUsername]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPasword]=useState('')
    const navigate=useNavigate()
    const handleSignup=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:3300/signup',{username,email,password})
        .then((res)=>{
          console.log(res.data);
          
            setUsername('')
            setEmail('')
            setPasword('')
            alert('user inserted')
            navigate('/login')
        })
        .catch(err=>{ console.log('Error signing up',err);
        })
    }
  return (
    <div className='signup_container'>
        <div className='signup'>
          <form onSubmit={handleSignup}>
        <h1>Signup here</h1>
        <label htmlFor="username" >Username</label>
        <input type="text" placeholder='Enter your username' value={username} onChange={(e)=>setUsername(e.target.value)} />
        <label htmlFor="email">Email</label>
        <input type="email" placeholder='Enter your email' value={email} onChange={(e)=>setEmail(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" placeholder='password' value={password} onChange={(e)=>setPasword(e.target.value)} /><br /><br /><br />
        <button type='submit'>Signup</button> Don't have account <Link to='/Login'>login</Link>
        </form>
        </div>
    </div>
  )
}

export default Signup