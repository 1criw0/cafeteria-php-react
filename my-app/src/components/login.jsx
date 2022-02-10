import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import swal from 'sweetalert';
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if(email== ""||password ==""){
      swal({
        title: "Digite sus credenciales!",
        text: "por favor digite sus credenciales para logearse!",
        icon: "warning",
        timer:"2000"
      });
    }else{
    try {
      await AuthService.login(email, password).then(
        () => {
          swal({
            title: "Bienvenido!",
            text: "te logeaste exitosamente!",
            icon: "success",
            timer:"1200"
          });
          const timer = setTimeout(() => {
            navigate("/users");
          window.location.reload();
          }, 70000);
          return () => clearTimeout(timer);
          
        },
        (error) => {
          swal({
            title: "credenciales incorrectas!",
            text: "por favor comprueba tus datos e intenta nuevamente!",
            icon: "error",
            timer:"2000"
          });
          console.log(error);
        }
      );
    } catch (err) {

      console.log(err);
    }
    }
  };
    return (
     <div className="conterr">
          <form onSubmit={handleLogin}>
      <div className="login_class">
         <h2 className="activel"> sign in </h2>
         <br></br>
         <br></br>
          <input 
          type="email" 
          className="text" 
          name="username" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />

          <span className="span">username</span> 
          <br></br>
          <input 
          type="password" 
          className="text" name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <span className="span">password</span>
          <br></br>
          <button className="signin">
           Sign In
          </button>
      </div>
      </form>
     </div>
    )
  };
  export default Login;