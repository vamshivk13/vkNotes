import React from 'react'
import styles from "./modal.module.css"
function Modal({error,setIsVisible}:any) {
if(!error?.isVisible)
{
    return <></>
}
else
  return (
    <>
    <div className={styles.background}></div>
    <div className={styles.modalContainer}>
        <div className={styles.modal}>
           <h3>{error?.title}</h3>
           <p>{error?.message}</p>
           <button onClick={setIsVisible}>ok</button>
        </div>
    </div>
    
    </>
  )
}

export default Modal