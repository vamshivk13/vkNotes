import axios from "axios";
import { createSlice,createAsyncThunk, configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import  sagaWatcher from "./sagaWatcher"
// export const fetchUserById = createAsyncThunk(
//   "users/fetchByIdStatus",
//   async () => {
//     try{
//    const res=await axios.get("https://jsonplaceholder.typicode.com/users");
//    console.log(res.data)
//    return res.data;
//     }
//     catch(err){
//       return err;
//     }
//   }
// );
interface state{
  userDetails:[],
  isLoggedIn:boolean,
  allNotes:[]
}


const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userDetails: [],
    isLoggedIn:false,
    allNotes:[],
    noteToEdit:null,
    isSideBarActive:false,
    mode:"All Notes",
    matchedNotes:[],
    notifyMessage:null,
    pinnedNotes:[],
    refresh:false,
  },

  reducers: {
    registerUser:(state,action)=>{
      
    },
    setUser:(state,action)=>{
      state.userDetails=action.payload;
    },
    setIsloggedIn:(state,action)=>{
     state.isLoggedIn=action.payload
    },
    authAddUser:(state,action)=>{
     
    },
    sendNotesToMdb:(state,action)=>{

    },
    sendUpdatedNotesToMdb:(state,action)=>{

    },
    addNotes:(state:any,action:any)=>{
      const data:any=action.payload;
      console.log("addedLive",data);
      state.allNotes=[action.payload,...state.allNotes]
    },
    setInitialNotes:(state:any,action:any)=>{
      state.allNotes=action.payload.reverse()
    },
    setNotetoEdit:(state:any,action:any)=>{
      state.noteToEdit=action.payload;
    },
    deleteCurrentNote:(state:any,action:any)=>{
      state.allNotes=state.allNotes.filter((item:any)=>{
        return item._id!=action.payload._id;
      })
    },
    deleteCurrentNotefromDb:(state,action)=>{
      
    },
    toggleSidebarActive:(state)=>{
       state.isSideBarActive=!state.isSideBarActive
    },
    setCurrentMode:(state,action:any)=>{
      state.mode=action.payload
    },
    setSearchMatchNotes:(state,action:any)=>{
      const searchString=action.payload;
      if(searchString.trim()==""){
        state.matchedNotes=[];
        return;
      }
      const matched=state.allNotes.filter((note:any)=>{
        const isNoteMatched=note.note.toLowerCase().includes(searchString.toLowerCase())
        const isNoteTitleMatched=note.noteTitle.toLowerCase().includes(searchString.toLowerCase())
        if(isNoteMatched||isNoteTitleMatched)
        {
          return true;
        }
        return false;
      })
      state.matchedNotes=[...matched]
    },
    setNotifyMessage:(state,action:any)=>{
      state.notifyMessage=action.payload
    },
    setPinnedNotes:(state:any,action:any)=>{
        state.allNotes=state.allNotes.filter((item:any)=>{  
        if(item._id==action.payload){
          state.pinnedNotes.push(item)
          return false;
        }
        return true;
    })
    },
    setTrashNotesInDB:(state:any,action:any)=>{
    
    },
    setTrashNotes:(state:any,action:any)=>{
      state.trashNotes=action.payload;
    },
    restoreTrashNote:(state:any,action:any)=>{
      
    },
    deleteTrashNoteFromDB:(state:any,action:any)=>{

    },
    deleteTrashNote:(state:any,action:any)=>{
      state.trashNotes=state.trashNotes.filter((note:any)=>note._id!=action.payload)
    },
    refreshAllNotes:(state:any)=>{
      state.refresh=!state.refresh
    }

  },
  // extraReducers: (builder:any) => {
  //   builder.addCase(fetchUserById.fulfilled, (state:any, action:any) => {
  //     console.log("responseER",action.payload)
  //     state.userDetails.push(action.payload);
  //   });
  //},
});
const saga =createSagaMiddleware();
const store= configureStore({
  reducer:{
    userReducer: userSlice.reducer
  },
  middleware:[saga]
})
saga.run(sagaWatcher)


export const userActions=userSlice.actions
export default store;