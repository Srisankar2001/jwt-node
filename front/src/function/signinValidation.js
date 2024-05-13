export default function SigninValidation(state){
    let error = {
        email : "",
        password : ""
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

    return error
}