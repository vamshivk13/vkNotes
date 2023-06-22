import React from 'react'
import styles from "./sidebar.module.css"
import { useSelector,useDispatch } from 'react-redux'
import { userActions } from '../../store/store'
function SideBar({isActive,onBackDropPress}:any) {
  const mode=useSelector((state:any)=>state.userReducer.mode)
  const userDetails:any=useSelector<any>((state)=>state.userReducer.userDetails)
  const dispatch=useDispatch()
  function handleTrash(){
    const userID:any=localStorage.getItem("userID")
    dispatch(userActions.setCurrentMode("Trash"))
    dispatch(userActions.setTrashNotes([]))
    dispatch(userActions.setTrashNotesInDB({userId:JSON.parse(userID)}))
  }
  function handleAllNotes(){
      dispatch(userActions.setCurrentMode("All Notes"))
  }

  return (
    <>
    {/* <div onClick={()=>alert("clicked")} className={`${isActive&&styles.sidebarbackdrop}`}></div> */}
    <div className={`${styles.sideBar} ${isActive&&styles.sideBarActive}`}>  
        <ul>
        <li className={`${mode=="All Notes"&&styles.activeTab}`} onClick={handleAllNotes}>All Notes</li>
        <li  className={`${mode=="Trash"&&styles.activeTab}`} onClick={handleTrash}>Trash</li>
      </ul>    
    </div>
    </>
  )
}

export default SideBar