import React,{useState,useRef, useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import styles from "./navbar.module.css"
import style from "./searchBar.module.css"
import SideBar from '../SideBar/SideBar'
import { userActions } from '../../store/store'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { Logout } from '@mui/icons-material'
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SyncIcon from '@mui/icons-material/Sync';
import { height } from '@mui/system'

function NavBar({handleLogout,showAccount,setShowAccount,socket}:any) {
    const [sidebarActive,setisSidebarActive]=useState<boolean>(false)
    const [isSearchBarOpen,setisSearchBarOpen]=useState<boolean>(false)
    const [searchText,setSearchText]=useState<string>("")
   const userDetails=useSelector((state:any)=>state.userReducer.userDetails)
   const [isUpdating,setIsUpdating]=useState<any>(true);
   const dispatch=useDispatch();
   useEffect(()=>{
      socket.on("updateStart",({updated}:any)=>{
       console.log("updateStatus",updated)
       setIsUpdating(updated)
      });
   },[])
 function handleMyNotes(){
    console.log("handleMyNotes")
 }
function handlePinnedNotes(){

}
function handleImportantNotes(){

}
function handleSearchText(e:any){
  const searchtext=e.target.value;
  dispatch(userActions.setSearchMatchNotes(searchtext));
   setSearchText(searchtext)
}
function handleOutOfFocus(){
   if(searchText==""){
    setSearchText("")
    dispatch(userActions.setSearchMatchNotes(""))
    dispatch(userActions.setCurrentMode("All Notes"))
    setisSearchBarOpen((prev)=>!prev)
  }
}
function setSearchBarOpen(){
  if(!isSearchBarOpen){
    dispatch(userActions.setCurrentMode("Search"))
  }
  else
  {
    if(searchText==""){
    setSearchText("")
    dispatch(userActions.setSearchMatchNotes(""))
    dispatch(userActions.setCurrentMode("All Notes"))
    }
  }
  setisSearchBarOpen((prev)=>!prev)
}
function openSideBAr(){
  setisSidebarActive((prev)=>!prev)
  dispatch(userActions.toggleSidebarActive())
}

  return (
    <> 
    <div className={styles.topContainer}>
    <div className={styles.notesDiv}>
    <div onClick={openSideBAr}>{!sidebarActive? <MenuIcon/>:<MenuBookIcon/>}</div>
   <div>Notes</div>
    </div>
    <div className={style.searchBar}>
    <div className={`${style.searchIconBar} ${isSearchBarOpen&&style.isActive}` }>
    {isSearchBarOpen&&<input value={searchText} onChange={handleSearchText} autoFocus={true} onBlur={handleOutOfFocus} type="text"></input>}
     <IconButton onClick={setSearchBarOpen}>
    <SearchIcon style={{height:20}}/>
    </IconButton>
    </div>
    </div>
     <SyncIcon className={`${!isUpdating?style.syncActive:style.syncInactive}`} />
     <div className={styles.allCategories}>
     <div className={styles.dropDownButton} onClick={setShowAccount}><Avatar></Avatar></div>
      {
      <div className={`${styles.dropdownMenu} ${showAccount&&styles.active}`}>
      <div className={styles.dropdownTop}> 
      <Avatar></Avatar>
      <div className={styles.dropdownTopText}>
        <div className={styles.userName}>{userDetails.name}</div>
        <div className={styles.userEmail}>{userDetails.email}</div>
        </div>
      </div>
      <ul onClick={handleLogout}>
      <Logout className={styles.logoutIcon}></Logout>
      <li>Logout</li>
      </ul>
  
      </div>
     }
     </div>
    </div>
    </>
  )
}

export default NavBar