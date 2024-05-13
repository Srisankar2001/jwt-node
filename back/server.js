const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')

const app = express()

// app.use(cors({
//     origin : ["http://localhost:3000/signup"],
//     methods : ["POST","GET"],
//     credentials : true
// }))
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ['GET','POST'],
    credentials : true
}))
app.use(express.json())
app.use(cookieParser())

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"20011112",
    database:"user"
})

db.connect(err => {
    if(err){
        console.log("Database Connection Failed")
    }else{
        console.log("Database Connection Success")
        app.listen(3001,()=>{
            console.log("Server Stared")
        })
    }
})

const secreat = "83cff2424bc5c1f1422ce560b6e2bc10cd8a23645c34c7ac475ef644c88f78c0"
app.post("/register",(req,res)=>{
    const { name , email , password } = req.body
    bcrypt.hash(password.toString(),10,(error,hash)=>{
        if(error){
            res.status(400).json({status:false,message:"Error in hashing password"})
        }else{
            const hashPassword = hash
            const sql = "INSERT INTO jwt_user(name,email,password) VALUES(?,?,?)"
            db.query(sql,[name,email,hashPassword],(error,result)=>{
                if(error){
                    res.status(500).json({status:false,message:"Error in database insert"})
                }else{
                    res.status(200).json({status:true,message:"Registerd Successfully"})
                }
            })
        }
    })
    
})

app.post("/signin",(req,res)=>{
    const { email , password } = req.body
    const sql = "SELECT * FROM jwt_user WHERE email = ?"
    db.query(sql,[email],(error,result)=>{
        if(error){
            res.status(500).json({status:false,message:"Email doesn't exist"})
        }else{
            if(result.length > 0){
                bcrypt.compare(password.toString(),result[0].password,(error,response)=>{
                    if(error){
                        res.status(500).json({status:false,message:"Password compare error"})
                    }else if(response){
                        const id = result[0].id
                        const name = result[0].name
                        const data = {id:id,name:name}
                        const token = jwt.sign(data,secreat,{expiresIn:'1d'})
                        res.cookie('token',token)
                        return res.status(200).json({status:true})
                    }else{
                        res.status(500).json({status:false,message:"Password is wrong"})
                    }
                })
            }else{
                res.status(500).json({status:false,message:"Server Error"})
            }
           
        }
    })
})

const verifyUser = (req,res,next) => {
    const token = req.cookies.token
    if(!token){
        return res.status(400).json({status:false,message:"You are not authendicated"})
    }else{
        jwt.verify(token,secreat , (err,decode)=>{
            if(err){
                return res.status(402).json({status:false,message:"Token decode error"})
            }else{
                req.name = decode.name,
                req.id = decode.id
                next()
            }
        })
    }
} 

app.get("/get",verifyUser,(req,res)=>{
    return res.status(200).json({status:true,data:{name:req.name,id:req.id}})
})

app.get("/logout",(req,res)=>{
    res.clearCookie('token')
    return res.json({status:true})
})