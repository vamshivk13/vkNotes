import { IconButton } from '@mui/material';
import React, { useRef, useState ,useId, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/store';
import API_URL from '../api';
import styles from "./navbar.module.css"
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { Refresh } from '@mui/icons-material';
function NotesInput({socket}:any) {
    const [noteText,setNoteText]=useState("");
    const [title,setTitle]=useState("");
    const textAreaRef=useRef<any>(null);
    const [isModalVisible,setNotesModalVisible]=useState(false)
    const editNote:any=useSelector<any>((state)=>state.userReducer.noteToEdit)
    const userDetails:any=useSelector<any>((state)=>state.userReducer.userDetails)
    const url=API_URL.postNote
    const newNoteRef=useRef<any>(null);
    const dispatch=useDispatch();
    const id=useId();
    console.log("userDETAILS",userDetails);
  
  useEffect(()=>{
     socket.on("noteCreated",(noteData:any)=>{
      console.log("noteData",noteData)
      newNoteRef.current=noteData;
     })
     return ()=>{
      socket.emit("discardIfEmpty",newNoteRef.current)
     }
   },[socket])


 
  function openNotesModal(){
  socket?.emit("createNote",{ 
             note:"",
             noteTitle:"",
             userId:userDetails.id})
    setNotesModalVisible(true)
  }
  function handleTitle(e:any){
    setTitle(e.target.value)
     socket?.emit("updateNote",{
            id:newNoteRef.current?._id,
            note:noteText,
             noteTitle:e.target.value,
  })
  }
  function handleNoteInput(e:any){
 
textAreaRef.current.style.height="auto";
  textAreaRef.current.style.height=`${e.target.scrollHeight}px`;
  setNoteText(e.target.value)

  socket?.emit("updateNote",{
            id:newNoteRef.current?._id,
            note:e.target.value,
             noteTitle:title,
  })
  }


  function submitNote(){
    if(noteText=="")
    {
      socket?.emit("deleteNote",{id:newNoteRef.current?._id})
      setNotesModalVisible(false);
      return;
    }
    const sendData={
        url:url,
        noteData:{
             id:id,
             note:noteText,
             noteTitle:title,
             userId:userDetails.id
        }
    }
    if(newNoteRef.current){
       setNoteText("")
       setTitle("")
       setNotesModalVisible(false)
       dispatch(userActions.refreshAllNotes())
      return ;
    }
    dispatch(userActions.sendNotesToMdb(sendData))
    setNoteText("")
    setTitle("")
     setNotesModalVisible(false)
  }
function handleNoteInputClose(){
  if(noteText==""||title==""){
      socket?.emit("deleteNote",{id:newNoteRef.current?._id})
  }
   setNoteText("")
   setTitle("")
  setNotesModalVisible(false)
}
  return ( 
    <div >
   <div className={`${styles.noteContainer} `}>
      <div className={`${styles.inputTextContainer} ${editNote!=null?styles.backgroundopacity:""}`}>
          { !isModalVisible ?<div className={styles.inputAreaHeader} onClick={openNotesModal}><div style={{padding:5,fontSize:15,fontWeight:"bold"}}>type something...</div></div> 
          :
           <div className={styles.toTypeTextInput}>
            <input value={title} onChange={handleTitle} className={styles.inputTitle} placeholder="Title" type="text"></input>
             <textarea autoFocus={true} value={noteText} ref={textAreaRef}  placeholder='type something...' className={styles.textArea} onChange={handleNoteInput}></textarea>
        
             <div className={styles.buttonPosition}>
              <IconButton onClick={handleNoteInputClose}>
                <CloseIcon/>
              </IconButton>
              <IconButton onClick={submitNote}>
                <DoneIcon/>
              </IconButton>
             {/* <button type='button' >Close</button>
             <button type='button' >Done</button> */}
             </div>
           </div>
           }
        </div>
       </div>
        </div>
  )
}

export default NotesInput