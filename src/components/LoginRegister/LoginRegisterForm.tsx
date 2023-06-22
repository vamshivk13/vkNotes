import React from 'react'
import {Link,Routes,Route} from "react-router-dom"
import LoginPage from './LoginPage'
import styles from "./login.module.css"
import RegisterPage from './RegisterPage'
import NotesPage from '../NotesPage/NotesPage'
function LoginRegisterForm() {
  return (
    <div className={styles.topContainer}>
    <div className={styles.toggleFormContainer}>
     <div className={styles.loginRegisterToggle} >
        <div className={styles.linkContainer}>
     <Link className={styles.link}to="login">Login</Link>
      </div>
      <div className={styles.linkContainer}>
     <Link  className={styles.link} to="register">Register</Link>
    </div>
     </div>
    <div className={styles.LoginRegisterForm}>
     </div>
     </div>
     </div>
  )
}

export default LoginRegisterForm