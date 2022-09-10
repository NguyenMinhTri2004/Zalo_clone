import { useRouter } from 'next/router';
import React from 'react'
import { userInventedUser } from '../hooks/userInventedUser';
import { Chatroom } from '../types';

const ChatSelect = ({id ,  chatroomUsers}  : {id : string ;   chatroomUsers : Chatroom['users']}   ) => {

  const { inventedEmail , inventedUser} = userInventedUser(chatroomUsers)

  const router = useRouter()

  const selectChatRoom = () => {
      router.push(`/chatrooms/${id}`)
  }

  return (
       
    <div className="chatselect__content mb-5  hover:bg-slate-200 p-2 rounded-md"  onClick={() => selectChatRoom()}  >
        <div className="chatselect__content__item flex items-center gap-2">
            <div className="chatselect__content__img  w-10">
              {
                inventedUser?.photoURL ?  <img className = "rounded-full" src= {inventedUser.photoURL} alt="" /> : <img src= "./Img/zalo_sharelogo.png" alt="" /> 
              }
            </div>

            <div className="chatselect__content__info w-60">
            <h4>{inventedUser?.email ? inventedUser.email : "Ẩn danh"}</h4>
            </div>

            <div className="chatselect__content__time w-20">
            {/* <h4>{inventedUser?.lastSeen ? inventedUser.lastSeen : "Không rõ"}</h4> */}
            </div>
        </div>
</div>
  )
}

export default ChatSelect