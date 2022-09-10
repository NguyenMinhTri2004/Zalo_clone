import { collection, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase/firebase";
import { AppUser, Chatroom } from "../types/index";
import { getInventedEmail } from "../utils/getInventedEmail";
import {db}  from '../Firebase/firebase';
import {useCollection} from "react-firebase-hooks/firestore"

export const userInventedUser = (chatUsers : Chatroom['users']) => {

    const [loggedInUser , loading , error] = useAuthState(auth)

    const inventedEmail = getInventedEmail(chatUsers, loggedInUser)

    const queryGetInventedUser = query(collection(db , "users") , where ('email' , "=="  ,inventedEmail  ))

    const [inventedSnapShot,  __loading , __error] = useCollection(queryGetInventedUser)

    const inventedUser = inventedSnapShot?.docs[0]?.data() as AppUser | undefined

    return {
        inventedEmail,
        inventedUser
    }

}