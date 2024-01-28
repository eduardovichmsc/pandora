import { useState, useContext, useEffect } from "react"
import '../css/Login.css'
import googleLogo from '../assets/img/google.svg'
import { Context } from "../context";
import { useNavigate } from "react-router-dom";


export default function Login(){
   const { globalUsername, setGlobalUsername } = useContext(Context);

   const [showRegDiv, setShowRegDiv] = useState(false);

   const [loginUsername, setLoginUsername] = useState('');
   const [loginPassword, setLoginPassword] = useState('');

   const [regUsername, setRegUsername] = useState('');
   const [regPassword, setRegPassword] = useState('');
   
   const handleLogin = () => {
      fetch('http://localhost:5931/users/')
         .then(response=>{
            if(!response.ok){
               throw new Error(response.statusText);
            }
            return response.json();
         })
         .then(users=>users.find(user=>user['username']===loginUsername && user['password']===loginPassword))
         .then(response=>{
            localStorage.setItem('activeUser', response['username']);
            setGlobalUsername(response['username']);
         })
         .catch(error=>console.log(error))
   }

   const handleReg = () => {
      fetch('http://localhost:5931/users/')
      .then(response=>{
         if(!response.ok){
            throw new Error(response.statusText);
         }
         return response.json();
      })
      .then(users=>users.find(user=>user['username']===regUsername))
      .then(response=>{
         if(typeof(response) === "undefined"){
            console.log(response);
         } else {
            addNewUser();
            localStorage.setItem('activeUser', regUsername);
            setGlobalUsername(regUsername);
         }
      })
      .catch(error=>console.log(error))
      console.log(regUsername, regPassword);
   }

   const addNewUser = async () => {
      fetch('http://localhost:5931/users', {
            method: "POST",
            headers: {
               "Content-type": "application/json"
            },
            body: JSON.stringify({
               id: Date.now(),
               username: regUsername,
               password: regPassword,
               role: 'no'
            })
         })
   }
   
   return (
      <section className="container section">
         <div className="login-wrapper flex-col">



            <button
               className="login-warning flex justify-center"
               aria-label={showRegDiv ? 'Войти' : 'Зарегистрироваться'}
               onClick={()=>setShowRegDiv(!showRegDiv)}
            >
               {showRegDiv ? 'Уже есть аккаунт ?' : 'Зарегистрироваться'}
            </button>



            {!showRegDiv ? 
               <form action="" 
               id="loginForm" 
               className="login-form flex-col">   
                  <input 
                     type="text" 
                     placeholder="Имя пользователя" 
                     className="login-input login-username"
                     value={loginUsername}
                     onChange={(e)=>setLoginUsername(e.target.value)}
                  />
                  <input 
                     type="password" 
                     placeholder="Пароль" 
                     className="login-input login-password" 
                     value={loginPassword}
                     onChange={(e)=>setLoginPassword(e.target.value)}
                  />
                  <input 
                     type="submit" 
                     className="login-input login-submit"
                     value={'Войти'}
                     onClick={(e)=>{
                        e.preventDefault();
                        handleLogin()
                     }}
                  />
                  <button
                     type="submit" className="login-input login-google flex justify-center align-center"
                     >
                  <img 
                        src={googleLogo} 
                        className="google-logo login-google-logo" />
                  </button>
               </form>
            :  <form action="" 
                  id="loginForm" 
                  className="login-form flex-col">
                     
                  <input 
                     type="text" 
                     placeholder="Номер телефона" 
                     className="login-input login-password" 
                  />
                  <input 
                     type="text" 
                     placeholder="Имя пользователя" 
                     className="login-input login-username" 
                     value={regUsername}
                     onChange={(e)=>setRegUsername(e.target.value)}
                  />
                  <input
                     type="password"
                     placeholder="Пароль" 
                     className="login-input login-username" 
                     value={regPassword}
                     onChange={(e)=>setRegPassword(e.target.value)}
                  />
                  <button 
                     type="submit" 
                     className="login-input login-submit"
                     onClick={(e)=>{
                        e.preventDefault();
                        handleReg();
                     }}
                  >
                     Создать аккаунт
                  </button>
                  <button
                     type="submit" className="login-input login-google flex justify-center align-center"
                     onClick={(e)=>{
                        e.preventDefault();
                     }}>
                     <img 
                        src={googleLogo} 
                        className="google-logo login-google-logo" />
                  </button>
               </form>
            }


         </div>
      </section>
   );
}