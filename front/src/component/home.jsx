import React, { useEffect, useState } from "react";
import Axios  from "axios";
import { useNavigate } from "react-router-dom";

function Home(){
    Axios.defaults.withCredentials = true
    const navaigate = useNavigate()
    const [auth,setAuth] = useState(false)
    const [data,setData] = useState({
        name:"",
        id:""
    })
    useEffect(()=>{
        const fetchData = async() => {
            try{
                await Axios.get("http://localhost:3001/get")
                .then(res => {
                    if(res.data.status){
                        setAuth(true)
                        setData({id:res.data.data.id,name:res.data.data.name})
                    }else{
                        setAuth(false)
                        console.log("Error")
                        navaigate("/signin")
                    }
                })
                .catch(err => {
                    setAuth(false)
                    console.log("Error:"+err)
                    navaigate("/signin")
                })
            }catch(error){
                setAuth(false)
                console.log("Error")
                navaigate("/signin")
            }
        }
        fetchData()
    },[auth])
    const handleClick = () => {
        const fetchData = async() => {
            try{
                await Axios.get("http://localhost:3001/logout")
                .then(res => {
                    if(res.data.status){
                        setAuth(false)
                        navaigate("/signin")
                    }else{
                        setAuth(false)
                        navaigate("/signin")
                    }
                })
                .catch(err => {
                    setAuth(false)
                    navaigate("/signin")
                })
            }catch(error){
                setAuth(false)
                console.log("Error")
                navaigate("/signin")
            }
        }
        fetchData()
    }
    return(
        <div>
            <h1>Home</h1>
            <h3>id:{data.id}</h3>
            <h3>name:{data.name}</h3>
            <input type="button" value="Logout" onClick={handleClick} />
        </div>
    )
}

export default Home