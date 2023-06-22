import axios from "axios";
import React, { useCallback, useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../store/store";
import { Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";
// import AllNotes from "./AllNotes";

import NotesInput from "./NotesInput";
import styles from "./navbar.module.css"
import NotesInputEdit from "./NotesInputEdit";
import API_URL from "../api";
import SideBar from "../SideBar/SideBar";
import NotifyMessage from "../Notify/NotifyMessage";
import { io } from "socket.io-client";
import { baseUrl } from "../api";
const AllNotes = React.lazy(() => import("./AllNotes.js"));
function NotesPage() {
    const userData:any=useSelector<any>((state)=>state.userReducer.userDetails)
      const editNote:any=useSelector<any>((state)=>state.userReducer.noteToEdit)
       const [showAccount,setShowAccount]=useState(false)
    const isSideBarActive=useSelector((state:any)=>state.userReducer.isSideBarActive)
    const matchedNotes=useSelector((state:any)=>state.userReducer.matchedNotes)
    const trashNotes=useSelector((state:any)=>state.userReducer.trashNotes)
    const mode=useSelector((state:any)=>state.userReducer.mode)
    const [isAuthenticated,setIsAuthenticated]=useState<any>(false)
   console.log("editNote",editNote);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const refreshtoken = API_URL.refreshToken;
  const [socket,setSocket]=useState<any>(null)


   useEffect(()=>{
    setSocket(io(baseUrl))
   },[])

   useEffect(() => {
   async function authorize(){
    setIsAuthenticated(false)
    const token = localStorage.getItem("token");
    if(!token){
      navigate("login")
    }
    console.log("token---",token)
    await axios
      .get(refreshtoken, {
        headers: {
          Authorization: `Bearer ${token}`,
          Credentials: "include",
        },
      })
      .then((res) => {
        console.log("refresh", res);
        localStorage.setItem("userID",JSON.stringify(res.data.id))
        dispatch(userActions.setUser(res.data))
        setIsAuthenticated(true)
      })
      .catch((err) => {
        console.log("authorizeErr",err)
        navigate("login")
      });
    }
    authorize();
  }, []);
 



  function handleLogout(){
     localStorage.removeItem("token");
     localStorage.removeItem("userID");
     dispatch(userActions.setIsloggedIn(false))
     navigate("login")
  }
  function handleEditClose(){
    if( editNote!=null)
    {
    dispatch(userActions.setNotetoEdit(null))
    dispatch(userActions.refreshAllNotes())}
   //setShowAccount(false)
  }
 function toggleShowAccount(){
  setShowAccount((prev)=>!prev)
 }
  return (
    <>
  <div className={`${styles.fulllHieght} ${editNote!=null?styles.backgroundDark:""}`}>
    <NotifyMessage/>
    {isAuthenticated&&
    <div style={{minHeight:"100vh"}} onClick={handleEditClose}>
    <div >
   <NavBar socket={socket} setShowAccount={toggleShowAccount} showAccount={showAccount} handleLogout={handleLogout}/>
   <div className={styles.sideBarActive}>
   <SideBar onBackDropPress={()=>{dispatch(userActions.toggleSidebarActive())}} isActive={isSideBarActive}/>
   <div className={`${isSideBarActive&& styles.sidebarActiveScroll}`}>
    {mode=="All Notes"&&
    <>
     
   <NotesInput socket={socket}/>
   <Suspense fallback={ 
    <div style={{display:"flex", flex:1,height:"100%", justifyContent:"center",alignItems:"center"}}>
      loading
      <CircularProgress />
      </div>
   }>
   <AllNotes/>
   </Suspense>
   </>}
   {
    mode=="Search"&&
    <AllNotes dataItem={matchedNotes}/>
   }
   {
    mode=="Trash"&&
    <AllNotes dataItem={trashNotes}/>
   }
   </div>
   </div>
    </div >
   
    </div>
  }
   {
      editNote!=null&&<NotesInputEdit socket={socket} />
    }
  </div>
  </>);
}

export default NotesPage;
