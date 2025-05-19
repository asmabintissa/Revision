import React from 'react'
import { useState,useEffect } from 'react'
import axios from 'axios'
import { useParams,useNavigate } from 'react-router-dom'

const Updateproduct = () => {
const {id}=useParams()
const [name,setName]=useState('')
const [quantity,setQuantity]=useState('')
const navigate=useNavigate()
useEffect(()=>{
    axios.get(`http://localhost:3300/update/${id}`)
    .then((res)=>{
        console.log('Data fetched',res.data);
        if(res.data.success){
            setName(res.data.product.name)
            setQuantity(res.data.product.quantity)
            console.log('Data fetched successfully',res.data.product);
            
        }else{
            alert('Error occured when selecting data')
        }
        
    })
    .catch((err)=>{
         console.log('Error fetching the data',err)
        console.error('Error fetching the data',err)
        
        
    })
},[id])
const handleUpdate=(e)=>{
    e.preventDefault()
    axios.put(`http://localhost:3300/update/${id}`,{name,quantity})
    .then((res)=>{
        console.log('Data updated product',res.data)
        if(res.data.success){
            alert('Product updated successfully')
            navigate('/viewproducts')
        }else{
            alert('Error updating the product')
        }
        
        
    })
}
    
  return (
    <div>
           <div className='signup_container'>
        <div className='addProduct'>
          <form onSubmit={handleUpdate}>
        <h1>Update</h1>
        <label htmlFor="email"> Name of product</label>
        <input type="text" placeholder='Enter your product name'value={name} onChange={(e)=>setName(e.target.value)}/>
        <label htmlFor="password">Quantity</label>
        <input type="number" placeholder='Enter your Quantity of product'value={quantity} onChange={(e)=>setQuantity(e.target.value)} /><br /><br /><br />
        <button type='submit'>Update product</button> 
        
        </form>
        </div>
    </div>
    </div>
  )
}

export default Updateproduct