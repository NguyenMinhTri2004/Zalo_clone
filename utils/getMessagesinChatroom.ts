import { DocumentData, query, QueryDocumentSnapshot, Timestamp, where } from "firebase/firestore"
import {collection , orderBy } from "firebase/firestore"
import {db} from "../Firebase/firebase"
import { Message } from "../types"

export const genarateQueryGetMessages = (chatroomid? : string) => {
  return (

      query (
         collection(db , 'messages'),
         where ('chatroom_id' , '==' , chatroomid),
         orderBy('send_at' , 'asc')
   
      )
  )
}


export const transformMessage = (message : QueryDocumentSnapshot<DocumentData>) => ({
    id : message.id,
    ...message.data(),
    send_at : message.data().send_at ? covertFirestoreTimestampToString((message.data().send_at  as Timestamp )) : null
}) as Message

export const covertFirestoreTimestampToString = (timestamp : Timestamp) => new Date(timestamp.toDate().getTime()).toLocaleString()