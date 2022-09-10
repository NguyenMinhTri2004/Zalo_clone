import { doc, getDoc, getDocs } from 'firebase/firestore'
import { GetServerSideProps } from 'next'
import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, db } from '../../Firebase/firebase'
import {Chatroom, Message} from "../../types/index"
import { getInventedEmail } from '../../utils/getInventedEmail'
import Slidebar from "../../Components/Slidebar"
import { genarateQueryGetMessages, transformMessage } from '../../utils/getMessagesinChatroom';
import ChatroomScreen from '../../Components/ChatroomScreen';

interface Props {
  chatroom: Chatroom
  messages : Message[]
}

const test = ( {chatroom , messages} : Props   ) => {

   const [loggedInUser , loading , error] = useAuthState(auth)

  return (
    <>
           {/* <Head>
                 <title>Chat với {getInventedEmail(chatroom.users , loggedInUser)}</title>
          </Head> */}
          <div className="chatroom__wrapper flex gap-5  ">
                
                  <Slidebar/>


                  <ChatroomScreen  chatroom = {chatroom} messages = {messages}   />
          </div>
          
    </>
        
     
  )
}


export const getServerSideProps: GetServerSideProps<Props , {id : string}> = async (context) => {

  const chatroomId = context.params?.id

  console.log(chatroomId)

  const chatroomRef = doc(db , 'chatrooms' , chatroomId as string)

  const chatroomSnapshot = await getDoc(chatroomRef)

  const queryMessages =  genarateQueryGetMessages(chatroomId)

  const messageSnapshot = await getDocs(queryMessages)

  const messages = messageSnapshot.docs.map(message => transformMessage(message))

    return {
      props: {
        chatroom :  chatroomSnapshot.data()  as Chatroom,
        messages 
      },
    }
}

export default test