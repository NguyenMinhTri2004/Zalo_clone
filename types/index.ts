import { Timestamp } from "firebase/firestore"

export interface Chatroom {
    users: string[]
}

export interface AppUser {
    email: string
    lastOnline : Timestamp
    photoURL : string

}


export interface Message {
    id : string
    chatroom_id : string
    text: string
    send_at : string 
    user : string
}