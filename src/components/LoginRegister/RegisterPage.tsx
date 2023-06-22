import React,{useState} from 'react'
import styles from "./form.module.css"
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store/store';
import {Link} from "react-router-dom"
import API_URL from '../api';
import Modal from '../Modal/Modal';
function RegisterPage() {
  const url=API_URL.registerUser
   const dispatch=useDispatch<any>();

  const [email,setEmail]=useState<string>("");
  const[name,setName]=useState<string>("");
  const [password,setPassword]=useState<string>("");
  const [cnfpassword,setCnfPassword]=useState<string>("");
  const [error,setError]=useState<any>(null);
  function handleEmailInput(e:any){
   setEmail(e.target.value);
  }
  function handlePasswordInput(e:any){
   setPassword(e.target.value);
  }
  function handleCnfPasswordInput(e:any){
   setCnfPassword(e.target.value);
  }
  function handleNameInput(e:any){
   setName(e.target.value);
  }
  async function handleRegister(){
    if(password!=cnfpassword)
    {
      setError({
        isVisible:true,
        title:"Error",
        message:"passwords does not match"
        
      })
      return;
    }
    const payload={url:url,
      userData:{name:name,email:email,password:password}
    }
  dispatch(userActions.registerUser(payload))
  }
  function setIsVisible(){
    setError(null)
  }
  return(
    <div className={styles.topContainer}>
    <form className={styles.form}>
      <h1>Register</h1>
      <div className={styles.inputElement}>
        <label htmlFor='name'>Name</label>
        <input value={name} placeholder='name' onChange={handleNameInput} type="text" id='name'></input>
      </div>
      <div className={styles.inputElement}>
        <label htmlFor='email'>Email</label>
        <input value={email} placeholder='email' onChange={handleEmailInput} type="text" id='email'></input>
      </div>
       <div className={styles.inputElement}>
        <label htmlFor='password'>Password</label>
        <input value={password} placeholder='password' onChange={handlePasswordInput} type="text" id='password'></input>
      </div>
       <div className={styles.inputElement}>
        <label htmlFor='cnfPassword'>Password</label>
        <input value={cnfpassword} placeholder='confirm password' onChange={handleCnfPasswordInput} type="text" id='cnfPassword'></input>
      </div>
      <button className={styles.buttonStyle} onClick={handleRegister} type='button'>register</button>
      <div className={styles.link}>
       <Link to="/login">
         Have an Account?
       </Link> 
       </div>
     </form>
     <Modal error={error} setIsVisible={setIsVisible}></Modal>
    </div>)
  
}

export default RegisterPage


// <div className={styles.loginForm}> 
//     <div className={styles.inputElements}>
//      <input className={styles.textInput} type="text" placeholder='name' onChange={handleNameInput}></input>
//       <input className={styles.textInput} type="text" placeholder='email' onChange={handleEmailInput}></input>
//        <input className={styles.textInput} type="password" placeholder='password' onChange={handlePasswordInput}></input> 
//        <input className={styles.textInput} type="password" placeholder='confirm password' onChange={handleCnfPasswordInput}></input> 
//        </div>
//        <button className={styles.submitButton} type="button" onClick={handleRegister}>Register</button>
//        <div className={styles.link}>
//         <Link to="/login">
//          Already a User? sign In !
//        </Link>
//        </div>
//       </div>