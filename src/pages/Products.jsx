import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { use } from 'react'

const Products = () => {

  const [name,setName]=useState('')
  const [quantity,setQuantity]=useState('')
  const navigate=useNavigate()
  const handleProducts=(e)=>{
    e.preventDefault()
    axios.post('http://localhost:3300/insertproduct',{name,quantity})
    .then((res)=>{
      setName('')
      setQuantity('')
      alert('Product added successfully')
      navigate('/viewproducts')
      const {message,successs}=res.data
      if (successs){
        alert(message)
      }
    })
    .catch((err)=>{
      console.error('Error adding product',err)
      alert ('error insreting product');
      
    })
  }
  return (
    <div>
           <div className='signup_container'>
        <div className='addProduct'>
          <form onSubmit={handleProducts}>
        <h1>Insert Product</h1>
        <label htmlFor="email"> Name of product</label>
        <input type="text" placeholder='Enter your product name'value={name} onChange={(e)=>setName(e.target.value)}/>
        <label htmlFor="password">Quantity</label>
        <input type="number" placeholder='Enter your Quantity of product'value={quantity} onChange={(e)=>setQuantity(e.target.value)} /><br /><br /><br />
        <button type='submit'>Add product</button> 
        
        </form>
        </div>
    </div>
    </div>
  )
}

export default Products