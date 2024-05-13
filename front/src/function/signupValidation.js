export default function SignupValidation(state){
    let error = {
        name:"",
        email : "",
        password : "",
        cpassword :""
    }

    if(state.name.trim() === ""){
        error.name = "Name field is empty"
    }else if(!(/^[a-zA-Z0-9-_]{2,}$/.test(state.name.trim()))){
        error.name = "Invalid name"
    }else{
        error.name = ""
    }

    if(state.email.trim() === ""){
        error.email = "Email field is empty"
    }else if(!(/^[a-zA-Z0-9]{2,}@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,}$/.test(state.email.trim()))){
        error.email = "Invalid email"
    }else{
        error.email = ""
    }

    if(state.password === ""){
        error.password = "Password field is empty"
    }else{
        error.password = ""
    }

    if(state.cpassword === ""){
        error.cpassword = "Confirm Password field is empty"
    }else if(state.password.trim() !== state.cpassword.trim()){
        error.cpassword = "Password and Confirm password must be same"
    }else{
        error.cpassword = ""
    }

    return error
}