import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/contact'
import  Product from './pages/Products'
import Viewproducts from './pages/Viewproducts'
import Updateproduct from './pages/updateproduct'
const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/Contact' element={<Contact/>}/>
        <Route path='/Product' element={<Product/>}/>
        <Route path='/Viewproducts' element={<Viewproducts/>}/>
        <Route path='/Updateproduct' element={<Updateproduct/>}/>
        <Route path="/product/:id" element={<Updateproduct />} />

      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App