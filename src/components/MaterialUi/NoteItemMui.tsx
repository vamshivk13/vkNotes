import React from 'react'
import { Card,CardContent, Typography ,CardHeader, Divider} from '@mui/material'
import styles from "../Notespage/navbar.module.css"
// const useStyles:any=makeStyles({
//     noteItem:{
//             wordWrap:"break-word",
//     whiteSpace:"wrap",
//     wordBreak:"breakWord",
//     width:150,
//     height:150,
//     textOverflow:"ellipsis",
//     overflow:"hidden",
//     backgroundColor:"red"
//     }
// //       word-wrap: break-word;
// // white-space: wrap;
// // word-break: break-word;

// //   width: 150px;
// //   height: 150px;
// //  line-height: 25px;
// //  text-overflow: ellipsis;
// //  overflow: hidden;

// })
function NoteItemMui({dataItem}:any) {
  //const styles=useStyles()

  return (

    <Card sx={{margin:1, width:200,height:250,}}>
        <CardHeader className={styles.cardNote} sx={{height:40,p:2}}
          subheader={dataItem.noteTitle}
          subheaderTypographyProps={{fontSize:19,whiteSpace:"nowrap",textOverflow:"ellipsis", overflow:"hidden",width:200}}
        >  
        </CardHeader>
        <Divider/>
        <CardContent sx={{height:160}} >
            <Typography sx={{ wordWrap:"break-word", lineHeight:1,textOverflow:"ellipsis", overflow:"hidden"}} component={"div"}>{dataItem.note}</Typography>
        </CardContent>
     </Card>
  )
}

export default NoteItemMui