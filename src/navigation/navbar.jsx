import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

const Navbar = () => {
  return (
    <div className='navbarContainer'>
        <div className='navbar'>
        <Link to='/Home'>Home</Link>
        <Link to='/About'>About</Link>
        <Link to='/Contact'>Contact</Link>
        <Link to='/Product'>Add product</Link>
        <Link to='/ViewProducts'>View product</Link>
        
    </div>
    </div>
  )
}

export default Navbar