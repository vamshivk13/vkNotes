import React, { useEffect ,useState} from 'react'
import styles from "./notify.module.css"
import {useDispatch,useSelector} from "react-redux"
import { userActions } from '../../store/store'
function NotifyMessage() {
  const notifyMessage=useSelector((state:any)=>state.userReducer.notifyMessage)
  const [notify,setNotify]=useState<boolean>(false)
  const dispatch=useDispatch()
  useEffect(()=>{
      if(notifyMessage!=null)
      {
        setNotify(true)
        setTimeout(()=>{
            setNotify(false);
            dispatch(userActions.setNotifyMessage(null))
        },3000)
      }
  },[notifyMessage])
  return (
    <div className={`${styles.notifyMessage} ${notify&&styles.notify}`}>{notifyMessage&&notifyMessage.message}</div>
  )
}

export default NotifyMessage