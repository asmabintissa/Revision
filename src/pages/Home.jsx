import React from 'react'
import Navbar from '../navigation/navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const navigate=useNavigate()
  const handleLogout=()=>{
    axios.post('http://localhost:3300/logout',{withcredentials:true})
    .then((res)=>{
      sessionStorage.removeItem('isLoggedIn')
    navigate('/login',{replace:true})
    window.location.reload()
    })
    
  }
  return (
    <div>
      <Navbar/>
      <button className='logout_button ' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home