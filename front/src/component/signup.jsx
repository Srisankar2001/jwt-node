import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/signup.css"
import SignupValidation from "../function/signupValidation";
function Signup(){
    const navigate = useNavigate()
    const [state,setState] = useState({
        name:"",
        email:"",
        password:"",
        cpassword:""
    })
    const [error,setError] = useState({
        name:"",
        email:"",
        password:"",
        cpassword:""
    })
    const handleChange = (e) => {
        setState(prev => ({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const validateError = SignupValidation(state)
        setError(validateError)
        if(Object.values(validateError).every(value => value === "")){
            const sendData = async() => {
                try{
                    const postData = {
                        name : state.name.trim(),
                        email : state.email.trim(),
                        password : state.password.trim()
                    }
                    await axios.post("http://localhost:3001/register",postData)
                    .then(result => {
                        console.log(result)
                        navigate("/signin")
                    })
                    .catch(error => {
                        console.log(error)
                    })
                }catch(error){
                    console.log(error)
                }
            }
            sendData()
        }
    }
    return(
        <div className="signup-container">
            <h1 className="signup-heading">signup</h1>
            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="signup-input-div">
                    <label htmlFor="name" className="signup-input-label">Name</label>
                    <input type="text" name="name" value={state.name} placeholder="Enter your name" onChange={handleChange} />
                    {error.name && <span className="signup-input-error">{error.name}</span>}
                </div>
                <div className="signup-input-div">
                    <label htmlFor="email" className="signup-input-label">Email</label>
                    <input type="text" name="email" value={state.email} placeholder="Enter your email" onChange={handleChange} />
                    {error.email && <span className="signup-input-error">{error.email}</span>}
                </div>
                <div className="signup-input-div">
                    <label htmlFor="password" className="signup-input-label">Password</label>
                    <input type="password" name="password" value={state.password} placeholder="Enter your password" onChange={handleChange} />
                    {error.password && <span className="signup-input-error">{error.password}</span>}
                </div>
                <div className="signup-input-div">
                    <label htmlFor="cpassword" className="signup-input-label">Confirm Password</label>
                    <input type="password" name="cpassword" value={state.cpassword} placeholder="Re-Enter your password" onChange={handleChange} />
                    {error.cpassword && <span className="signup-input-error">{error.cpassword}</span>}
                </div>
                <div className="signup-btn-div">
                    <input type="submit" value="Submit" className="signup-btn-submit"/>
                    <Link to="/signin">
                    <input type="button" value="Signin" className="signup-btn-signin"/>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Signup