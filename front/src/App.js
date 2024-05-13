import React from "react";
import { BrowserRouter as Router , Routes , Route } from "react-router-dom"
import Signin from "./component/signin";
import Signup from "./component/signup";
import Home from "./component/home";
function App(){
  return(
    <Router>
      <Routes>
        <Route path="/signin" element={<Signin/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </Router>
  )
}

export default App