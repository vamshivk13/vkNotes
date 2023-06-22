import React ,{useEffect, useState} from 'react'
import styles from "./form.module.css"
import axios from 'axios'
import {useSelector, useDispatch}  from 'react-redux'
import { userActions } from '../../store/store';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import API_URL from '../api';
import NotifyMessage from '../Notify/NotifyMessage';
import LinearProgress from '@mui/material/LinearProgress';
function LoginPage() {
  const [email,setEmail]=useState<string>("");
  const [password,setPassword]=useState<string>("");
  const [isLoading,setIsloading]=useState(false);
  const url=API_URL.auth
  const navigate=useNavigate();
  const userDetails=useSelector<any>((state)=>state.userReducer.userDetails)
   const isLoggedIn=useSelector<any>((state)=>state.userReducer.isLoggedIn)
  const dispatch=useDispatch<any>();
  function handleEmailInput(e:any){
   setEmail(e.target.value);
  }
  function handlePasswordInput(e:any){
   setPassword(e.target.value);
  }
  async function handleLogin(e:any){
    e.preventDefault()
    setIsloading(true);
   console.log(email,password)
   const loginObj={url,userData:{
    email,password
   }}
   dispatch(userActions.authAddUser(loginObj))
   //setIsloading(false);
  }

  useEffect(()=>{
   if(isLoggedIn)
   {
    navigate("/")
   }
  },[isLoggedIn])
 
  
  return (
    <div className={styles.topContainer}>
       <NotifyMessage/>
     <form className={styles.form}>
             {isLoading && <LinearProgress color='success'/>}
      <h1>Login</h1>
      <div className={styles.inputElement}>
        <label htmlFor='email'>Email</label>
        <input value={email} placeholder='email'  onChange={handleEmailInput} type="text" id='email'></input>
      </div>
       <div className={styles.inputElement}>
        <label htmlFor='password'>Password</label>
        <input value={password} placeholder='password' onChange={handlePasswordInput} type="password" id='password'></input>
      </div>
      <button type='submit' className={styles.buttonStyle} onClick={handleLogin}>login</button>
      <div className={styles.link}>
       <Link to="/register">
         Create an Account
       </Link> 
       </div>
     </form>
     </div>
  )
}

export default LoginPage
//  <div className={styles.topContainer}>
//     <form className={styles.loginForm}>
//       <div className={styles.inputElements}>
//       <input  className={styles.textInput} type="text" placeholder='email' onChange={handleEmailInput}></input>
//        <input className={styles.textInput} type="password" placeholder='password' onChange={handlePasswordInput}></input> 
//        </div>
//        <button className={styles.submitButton}  type="button" onClick={handleLogin}>Login</button>
//       <div className={styles.link}>
//       <Link to="/register">
//         New User? sign Up !
//        </Link> 
//        </div>
//     </form>
//     </div>