

export const baseUrl= (import.meta.env.VITE_ENV == "PROD") ? "https://notesappvk.onrender.com/" : "http://localhost:3001/"
//export const baseUrl="https://notesappvk.onrender.com/"
const API_URL={
    auth:baseUrl+"auth/loginUser", 
     registerUser:baseUrl+"auth/registerUser",
    refreshToken:baseUrl+"auth/authorize",
    getAllNotes:baseUrl+"crud/getAllNotes",
    postNote:baseUrl+"crud/postNote",
    updateNote:baseUrl+"crud/updateNote",
    deleteNote:baseUrl+"crud/deleteNote",
deletedNotes:baseUrl+"crud/getTrashNotes",
deleteTrashNote:baseUrl+"crud/deleteTrashNote",
restoreTrashNote:baseUrl+"crud/restoreTrashNote"
}
export default API_URL