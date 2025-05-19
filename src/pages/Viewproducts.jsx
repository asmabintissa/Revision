import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import {  useNavigate,Link  } from 'react-router-dom' 
const Viewproducts = () => {
    const [products,setProducts]=useState([])
    const navigate=useNavigate()
    const getProducts=()=>{
        axios.get('http://localhost:3300/selectproducts')
        .then((res=>{
            console.log('API RESPONSE',res.data);
            
            if(res.data.success){
            setProducts(res.data.products)
            
            }else{
                alert('Error fetching data',{replace:true})
            }

        }))
        .catch((err)=>{
            console.error('Error fetching products',err);
            
        })
        }
        useEffect(()=>{
            getProducts()
        },[])
        const deleteHandler=(id)=>{
            if(window.confirm('Are you sure you want to dlete the product')){
                axios.delete(`http://localhost:3300/product/${id}`)
                .then((res)=>{
                    if(res.data.success){
                        alert("Product deleted successfully")
                        getProducts()
                    }else{
                        alert('Error deleting the user')
                    }
                })
                .catch((err)=>{
                    console.error(('error occured while deleing the user'));
                    
                })
            }
            
        }
  return (
    <div className='table_container'>
        <h1>PRODUCTS IN THE STOCK</h1>
        <Link to='/product'><button className='addproduct-button'>+Add product</button></Link><br /><br />
        <br /><br />
        <table className='product-table'>
            <thead>
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Quantity</th>
            <th colSpan='2'>Action</th>
        </tr>
        </thead>
        <tbody>
        {
            products.map((product,index)=>(
            <tr key={index}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.quantity}</td>
            <td><button className='update-button'><a href="#" onClick={(e)=>{e.preventDefault(),navigate(`/product/${product.id}`)}}>Update</a></button></td>
            <td><button className='delete-button'><a href="" onClick={(e)=>{e.preventDefault();deleteHandler(product.id);}}>Delete</a></button></td>
        </tr>
        ))}
        </tbody>

        </table>
    </div>
  )
}

export default Viewproducts