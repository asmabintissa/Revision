const express = require('express')
const app = express()
const port = 3300
const mysql=require('mysql')
const cors=require('cors')
const session = require('express-session')
app.use(express.json())
app.use(cors({origin:'http://localhost:5173',
    credentials:true,
}))
app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:true,
    cookie:{
        secure:false,
        httpOnly:true,
        sameSite:'lax',
    }}))

const con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'manager'
})
con.connect((err)=>{
    if(err){
        console.log('db not connected');
    }
    else{
        console.log('db connected')
    }
})

// signup new user ..............

app.post('/signup',(req,res)=>{
    const {username,email,password}=req.body
    const sql="INSERT INTO users (`username`,`email`,`password`) VALUES(?,?,?)"
    con.query(sql,[username,email,password],(err,result)=>{
        if (err) {
            res.json('Failed to insert user',err)
        } else {
            res.json({message:'User signed up succesfully',result})
        }
    })
})
//login for authorisation......

app.post('/login',(req,res)=>{
    const {email,password}=req.body
    const sql="SELECT * FROM users WHERE email=? AND password=?"
    con.query(sql,[email,password],(err,result)=>{
          if(!email || !password){
            return res.json({message:'Please enter email and password',success:false})
        }
        if (err) {
           return console.error('Error selecting the User',err);
            
        } else {
            if(result <= 0){
                return res.json({message:'User not found',success:false})
                
            }else if(result[0]){
               return res.json({message:'Welcome user logged in successfully',success:true})
            }
        }
    })
})
//logout user...........
app.post('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            return res.json({message:'Error logging out',success:false})
        }else{
            res.clearCookie('connect.sid')
            return res.json({message:'User looged out successfully',success:true})
        }
    })
})
//insert a product...........
app.post('/insertproduct',(req,res)=>{
    const {name,quantity}=req.body
    const sql="INSERT INTO products (`name`,`quantity`) VALUES(?,?)"
    con.query(sql,[name,quantity],(err,result)=>{
        if(!name || !quantity){
            return res.json({message:'Enter Product name and Quantity',success:false})
        }
        if(err){
            return res.json({message:'Failed to insert product',success:false})
        }else{
            return res.json({message:'Product inserted successfully',success:true})
        }
    })
})

//selecting all products...........
app.get('/selectproducts',(req,res)=>{
    const sql="SELECT * FROM products"
    con.query(sql,(err,result)=>{
        if(err){
            console.error('Error selcting the products',err);
            return res.json({message:'Error selcting the products',success:false})
        }else{
            console.log('Data fetched successfully',result)
            res.json({
                message:'Data fetched successfully',
                success:true,
                products:result
            })
        }
    })
})
//updating a product select...........
app.get('/update/:id',(req,res)=>{
    const {id}=req.params
const sql="SELECT * FROM products WHERE id=?"
con.query(sql,[id],(err,result)=>{
    if(err){
        console.log('Error occured selecting the product',err)
        console.error('Error selecting the product',err)
        return res.json({message:'Error selecting the product',success:false})
        
    }
    if(result.length > 0){
        const row=result[0]
        const product={
            id:row.id,
            name:row.name,
            quantity: row.quantity,
            product:result
        }
        return res.json({
            message:'Product retrieved successfully',
            success:true,
            product
        })
    }else{
        return res.json({message:'Product not retrieved',success:false})
    }
})
})
//updating the product.........
app.put('/update/:id',(req,res)=>{
    const {id}=req.params
    const {name,quantity}=req.body
    const sql="UPDATE products SET name=?,quantity=? WHERE id=?"
    con.query(sql,[name,quantity,id],(err,result)=>{
        if(err){
            console.log('product not updated',err)
            return res.json({
                message:'Product not updted',
                success:false
            })
            }else{
                console.log('Product updated successfully');
                return res.json({
                    message:'Product updated successfully',
                    success:true,
                    result
                })
            }
    })
})
//deleting product ..............
app.delete('/product/:id',(req,res)=>{
    const {id}=req.params
    const sql="DELETE FROM products WHERE id=?"
    con.query(sql,[id],(err,result)=>{
        if(err){
            console.error('Faild to dlellte products',err)
            return res.json({message:'Failed to dlete products',success:false})
        
        }else{
            console.log('Product dleted sucessfully');
            return res.json({
                message:'Product successfully deleted',
                success:true,
                
            })
            
        }
    })
})

app.listen(port, () => console.log(` app listening on port ${port}!`))