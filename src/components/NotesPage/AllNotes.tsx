import React ,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import { userActions } from '../../store/store';
import styles from "./navbar.module.css"
import NoteItem from './NoteItem';
import API_URL from '../api';
import NoteItemMui from '../MaterialUi/NoteItemMui';
import SideBar from '../SideBar/SideBar';
import CircularProgress from '@mui/material/CircularProgress';
function AllNotes({dataItem}:any) {
  const allNotes:any=useSelector<any>((state)=>state.userReducer.allNotes);
    const pinnedNotes:any=useSelector<any>((state)=>state.userReducer.pinnedNotes);
   // const user:any=useSelector<any>((state)=>state.userReducer.userDetails);
  const userDetails:any=useSelector<any>((state)=>state.userReducer.userDetails)
    const refresh:any=useSelector<any>((state)=>state.userReducer.refresh)

console.log("MATCHED",dataItem);
  const dispatch=useDispatch();
     const [isNotesLoading,setIsNotesLoading]=useState(false);
    const allNoteUrl = API_URL.getAllNotes
    useEffect(()=>{
     
    async function getAllNotes(){
      try{
      //setIsNotesLoading(true);
      console.log("uiD",userDetails.id)
      const userID:any=localStorage.getItem("userID")
      console.log("storedUseriD",userID)
      const notes=await axios.post(allNoteUrl,{userId:JSON.parse(userID)})
      console.log("allNotesDetails",notes);
       //setIsNotesLoading(false);
      dispatch(userActions.setInitialNotes(notes.data));
     
      }
      catch(err){
        dispatch(userActions.setNotifyMessage({
      message:"Unable to fetch Notes"
      }))
      }
    
    }
    getAllNotes();

   },[userDetails,refresh])
   useEffect(()=>{
    console.log("allNotes_progress",allNotes);
    if(allNotes.length==0)
    setIsNotesLoading(true);
    else
    setIsNotesLoading(false)
   },[allNotes])
  return (
    
    <div className={styles.topNoteContainer}>
     
      {pinnedNotes.length!=0&&<><div className={styles.headerTitle}>Pinned</div>
      <div className={styles.pinnedNoteContainer}>
      {pinnedNotes?.map((item:any)=>{
        return <NoteItem key={item._id}  dataItem={item}/>
      })}
      </div>
      </>}
       {pinnedNotes.length!=0&&<div className={styles.headerTitle}>Others</div>}
      <div  className={styles.allNoteContainer}>
     {(isNotesLoading) && <CircularProgress size={40} color="secondary"/>}
      {dataItem!=undefined? dataItem.map((item:any)=>{
        return <NoteItem key={item._id}  dataItem={item}/>
      
      }):allNotes.map((item:any)=>{
      
        return <NoteItem key={item._id}  dataItem={item}/>
      
      })}
        </div>
    </div>
   
  )
}

export default AllNotes