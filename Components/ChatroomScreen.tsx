import { serverTimestamp, setDoc , doc, addDoc , collection } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { KeyboardEventHandler, MouseEventHandler, useRef, useState , useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth , db } from '../Firebase/firebase';
import { userInventedUser } from '../hooks/userInventedUser';
import { Chatroom, Message } from '../types';
import { genarateQueryGetMessages, transformMessage ,covertFirestoreTimestampToString  } from '../utils/getMessagesinChatroom';
import Messages from './Messages';

const ChatroomScreen = ({chatroom , messages}  : {chatroom : Chatroom ; messages : Message[]}) => {

  

 const chatroomUsers = chatroom.users 

 const { inventedEmail , inventedUser} = userInventedUser(chatroomUsers)

 const router = useRouter()

 const chatroomId = router.query.id

 const queryMessages =  genarateQueryGetMessages(chatroomId  as string)

 const [loggedInUser , loading , error] = useAuthState(auth)

 useEffect(() => {
    refBottomchat.current.scrollIntoView({
        behavior: "smooth",
      });
 }, [])

 const [messageSnapshot , messagesLoading , __error] = useCollection(queryMessages)

 const shownMessages = () => {

  if(messagesLoading){
    return (
        messages.map((message, index) => (
           <Messages  key = {message.id} message={message} />
        ))
    )
  }else {
      return (
          messageSnapshot?.docs.map((message, index) =>  <Messages  key = {message.id} message={ transformMessage( message)} /> )
      )
  }

 }

 const [message , setMessage] = useState("")

 const addNewMessageAndUpdateLastSeen = async () => {

   await setDoc(
      doc(db , 'users' , loggedInUser?.email  as string),
      {
         lastSeen: serverTimestamp()
      },
      {
        merge : true
      }
   )

   await addDoc(collection(db , "messages"), {
       chatroom_id : chatroomId,
       send_at : serverTimestamp(),
       text : message,
       user : loggedInUser?.email,
   })

   setMessage("")
    
 }

 const refBottomchat =  useRef(null);

 const sendMessageOnEnter: KeyboardEventHandler<HTMLInputElement> = event => {
    if(event.key === "Enter"){
        event.preventDefault()
        if(!message) return
        addNewMessageAndUpdateLastSeen()
        refBottomchat.current.scrollIntoView({
            behavior: "smooth",
          });

    }
 }


 const sendMessageOnClick: MouseEventHandler <HTMLButtonElement> = event => {
      event.preventDefault()
       if(!message) return
       addNewMessageAndUpdateLastSeen()
       refBottomchat.current.scrollIntoView({
        behavior: "smooth",
      });
 }



  return (
       <>
       <div className="chatroomscreen_wrappe p-5 w-screen flex flex-col h-screen gap-2">
           <div className="chatroomscreen__top pl-1 ">
                  <div className="chatroomscreen__top__user flex justify-between items-center">
                       <div className="chatroomscreen__top__user__left  flex gap-5 justify-between items-center   ">
                             <div className="chatroomscreen__top__user__left__avt w-50">
                                 <img className="rounded-full w-14 "  src= {inventedUser?.photoURL} alt="" />
                             </div>

                             <div className="chatroomscreen__top__user__left__info">
                                  <h1 className='font-medium'><strong>{inventedEmail}</strong></h1>
                                  <div className ="flex items-center gap-3 text-sm">
                                       <p className=''>
                                          {   inventedUser && (
                                              <span>
                                                 Last online:{' '}
                                                 {covertFirestoreTimestampToString(inventedUser?.lastOnline)}
                                              </span>
                                          )
                                          }
                                        </p> 
                                       <i className='bx bxs-chevrons-right cursor-pointer'></i> 
                                  </div>
                             </div>
                       </div>

                       <div className="chatroomscreen__top__user__right flex gap-5 cursor-pointer text-xl">
                             <div className="chatroomscreen__top__user__right__icon">
                                    <i className='bx bx-user-plus'></i>
                             </div>

                             <div className="chatroomscreen__top__user__right__icon">
                                   <i className='bx bx-search'></i>
                             </div>

                             <div className="chatroomscreen__top__user__right__icon">
                                  <i className='bx bx-video'></i>
                             </div>
                       </div>
                  </div>

                

           </div>

           <div className="chatroomscreen__middle bg-slate-400 h-3/4 items-end justify-end">
               <div className="wrapper p-10 flex flex-col gap-10 overflow-y-scroll  h-full">
                       {shownMessages()}
                      
               <div className="mb-3" ref = {refBottomchat} ></div>
               </div>
           </div>

           <div className="chatroomscreen__bottom  px-1 flex flex-col text-xl cursor-pointer  "  >
                <div className="chatroomscreen__bottom__icon   flex justify-between items-start mb-2 w-2/4">
                    <div className="chatroomscreen__bottom__icon__item">
                        <i className='bx bx-sticker'></i>
                    </div>

                    <div className="chatroomscreen__bottom__icon__item">
                        <i className='bx bx-image-add'></i>
                    </div>

                    <div className="chatroomscreen__bottom__icon__item">
                        <i className='bx bxs-file-import'></i>
                    </div>

                    <div className="chatroomscreen__bottom__icon__item">
                        <i className='bx bx-screenshot' ></i>
                    </div>

                    <div className="chatroomscreen__bottom__icon__item">
                        <i className='bx bx-info-circle' ></i>
                    </div>

                    <div className="chatroomscreen__bottom__icon__item">
                        <i className='bx bx-time-five'></i>
                    </div>

                    <div className="chatroomscreen__bottom__icon__item">
                        <i className='bx bx-task' ></i>
                    </div>

                    <div className="chatroomscreen__bottom__icon__item">
                        <i className='bx bx-message-dots'></i>
                    </div>

                    <div className="chatroomscreen__bottom__icon__item">
                        <i className='bx bx-party'></i>
                    </div>

                    <div className="chatroomscreen__bottom__icon__item">
                        <i className='bx bx-dots-horizontal-rounded'></i>
                    </div>
            
                </div>

                <div className="chatroomscreen__bottom__input  flex justify-between items-start ">
                    <input placeholder =  {`Nhập @, tin nhắn với ${inventedEmail} `}  className = "p-3 w-5/6  outline-none  border-0 text-sm  bg-slate-200 rounded-3xl " value = {message} type="text" onChange={(e) => setMessage(e.target.value) } onKeyDown = {sendMessageOnEnter} />
                    <button className = "bg-blue-500 p-2 text-white w-32 rounded-3xl  " onClick={sendMessageOnClick} >Gửi</button>
                </div>
           </div>
          
       </div>
       </>
  )
}

export default ChatroomScreen