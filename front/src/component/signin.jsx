import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import "../style/signin.css"
import SigninValidation from "../function/signinValidation";
function Signin(){
    Axios.defaults.withCredentials = true
    const navigate = useNavigate()
    const [state,setState] = useState({
        email:"",
        password:""
    })
    const [error,setError] = useState({
        email:"",
        password:""
    })
    const handleChange = (e) => {
        setState(prev => ({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const validateError = SigninValidation(state)
        setError(validateError)
        if(validateError.email === "" && validateError.password === ""){
            const sendData = async() => {
                try{
                    const postData = {
                        email : state.email.trim(),
                        password : state.password.trim()
                    }
                    await Axios.post("http://localhost:3001/signin",postData)
                    .then(result => {
                        console.log(result)
                        navigate("/")
                    })
                    .catch(error => {
                        console.log(error)
                    })
                }catch(error){
                    console.log(error)
                }
            }
            sendData()
            setState({
                email:"",
                password:""
            })
        }
    }
    return(
        <div className="signin-container">
            <h1 className="signin-heading">Signin</h1>
            <form className="signin-form" onSubmit={handleSubmit}>
                <div className="signin-input-div">
                    <label htmlFor="email" className="signin-input-label">Email</label>
                    <input type="text" name="email" value={state.email} placeholder="Enter your email" onChange={handleChange} />
                    {error.email && <span className="signin-input-error">{error.email}</span>}
                </div>
                <div className="signin-input-div">
                    <label htmlFor="password" className="signin-input-label">Password</label>
                    <input type="password" name="password" value={state.password} placeholder="Enter your password" onChange={handleChange} />
                    {error.password && <span className="signin-input-error">{error.password}</span>}
                </div>
                <div className="signin-btn-div">
                    <input type="submit" value="Submit" className="signin-btn-submit"/>
                    <Link to="/signup">
                    <input type="button" value="Signup" className="signin-btn-signup"/>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Signin