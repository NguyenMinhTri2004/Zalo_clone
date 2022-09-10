import { User } from "firebase/auth";
import { Chatroom } from "../types";

export const getInventedEmail = (chatUsers : Chatroom['users'] , loggedUser? : User | null)=> {
    return chatUsers.find(userEmail => userEmail !== loggedUser?.email)
}