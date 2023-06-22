import { CircularProgress, IconButton } from '@mui/material';
import React, { useRef, useState ,useId, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/store';
import LinearProgress from '@mui/material/LinearProgress';
import API_URL from '../api';
import styles from "./navbar.module.css"
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
function NotesInput({initalNotes,socket}:any) {
    const [noteText,setNoteText]=useState(initalNotes);
    const [title,setTitle]=useState("")
    const [isEditLoading,setIsEditLoading]=useState(false);
    const textAreaRef=useRef<any>(null);
    const [isModalVisible,setNotesModalVisible]=useState(false)
    const [beforeEditNote,setBeforeEditNote]=useState(null);
    const editNote:any=useSelector<any>((state)=>state.userReducer.noteToEdit)
    const userDetails:any=useSelector<any>((state)=>state.userReducer.userDetails)
    const mode:any=useSelector<any>((state)=>state.userReducer.mode)
    const url=API_URL.updateNote
    const urldel=API_URL.deleteNote
    const dispatch=useDispatch();
    const id=useId();
    console.log("userDETAILS",userDetails);

  function handleTitle(e:any){
    setTitle(e.target.value)
    socket?.emit("updateNote",{
            id:editNote._id,
            note:noteText,
             noteTitle:e.target.value,
  })
  }
 
  function handleNoteInput(e:any){

textAreaRef.current.style.height="auto";
  textAreaRef.current.style.height=`${e.target.scrollHeight}px`;
 
  setNoteText(e.target.value)

   socket?.emit("updateNote",{
            id:editNote._id,
            note:e.target.value,
             noteTitle:title,
  })
  
  }
 useEffect(()=>{
  textAreaRef.current.style.height="auto";
  textAreaRef.current.style.height=`${textAreaRef.current.scrollHeight}px`;
 })

  useEffect(()=>{
   setNoteText(editNote.note)
   setTitle(editNote.noteTitle)
   setBeforeEditNote(editNote.note);
  },[editNote])

  function submitNote(){
    setIsEditLoading(true);
    const sendData={
        url:url,
        noteData:{
             id:editNote._id,
             note:noteText,
             noteTitle:title,
             beforeNote:beforeEditNote,
             userId:userDetails.id
        }
    }
    dispatch(userActions.deleteCurrentNote(editNote))
    dispatch(userActions.sendUpdatedNotesToMdb(sendData))
   //dispatch(userActions.setNotetoEdit(null))
    setNotesModalVisible(false);

  }
  function deleteNote(){
    const sendData={
      url:urldel,
      dataObj:{
        id:editNote._id
      }
    }
    dispatch(userActions.deleteCurrentNotefromDb(sendData))
    dispatch(userActions.setNotifyMessage({
      message:"Note Trashed Successfully"
     }))
    dispatch(userActions.deleteCurrentNote(editNote))
       dispatch(userActions.setNotetoEdit(null))
  }
  function copyContent(){
     navigator.clipboard.writeText(noteText)
     dispatch(userActions.setNotifyMessage({
      message:"Copied Successfully"
     }))
  }
function handleClose(){
  //dispatch(userActions.refreshAllNotes()) //new
  dispatch(userActions.setNotetoEdit(null))
}
function pinNote(){
  dispatch(userActions.setPinnedNotes(editNote._id))
}
function deleteTrashNote(){
  dispatch(userActions.deleteTrashNote(editNote._id))
  dispatch(userActions.deleteTrashNoteFromDB({id:editNote._id}))
 dispatch(userActions.setNotifyMessage({
      message:"Note Permenantly Deleted"
     }))   
    dispatch(userActions.setNotetoEdit(null))   
}
function restoreNote(){
  dispatch(userActions.deleteTrashNote(editNote._id))
  dispatch(userActions.restoreTrashNote({id:editNote._id}))
  dispatch(userActions.setNotifyMessage({
      message:"Restored Successfully"
     }))
  dispatch(userActions.setNotetoEdit(null))  
}
  return ( 
   
   <div className={styles.editnoteContainer}> 
      <div className={styles.inputTextContainer}> 
           <div className={styles.toTypeTextInput}>
                {isEditLoading && <LinearProgress/>} 
            <input onChange={handleTitle} value={title} className={styles.inputTitle} placeholder="Title" type="text"></input>
             {/* <div className={styles.inputElement}> */}
             <textarea value={noteText} autoFocus={true}  ref={textAreaRef}  placeholder='type something...' className={styles.textArea} onChange={handleNoteInput}></textarea>
             {/* </div> */}
             <div className={styles.buttonPosition}>
              <IconButton onClick={handleClose}>
                <CloseIcon/>
              </IconButton>
              {mode!="Trash"&& <IconButton onClick={submitNote}>
                <DoneIcon/>
              </IconButton>}
              {mode!="Trash"&&<IconButton onClick={deleteNote}>
               <DeleteIcon/>
              </IconButton>}
              <IconButton onClick={copyContent}>
              <ContentCopyIcon/>
              </IconButton>
              {
                mode=="Trash"&& <IconButton onClick={restoreNote}>
              <RestoreFromTrashIcon/>
              </IconButton>
              }
               {
                mode=="Trash"&& <IconButton onClick={deleteTrashNote}>
              <DeleteForeverIcon/>
              </IconButton>
              }

             
              
             {/* <button type='button' onClick={handleClose}>Close</button>
             <button type='button' onClick={submitNote}>Done</button>*/}
             {/* <button type="button" onClick={pinNote}>Pin</button>  */}
             {/* <button type="button" onClick={restoreNote}>restore</button>  */}
             </div>
           </div>    
        </div>
        </div>
  )
}

export default NotesInput