import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../Firebase/firebase'
import { Message } from '../types'

const Messages = ({message} : {message : Message} ) => {

  const [loggedInUser , loading , error] = useAuthState(auth)

  return (
  <>
        {
         
          loggedInUser?.email == message.user ? (
           
               <div>
                  <div className="bg-emerald-200 ml-auto p-3 rounded-3xl w-fit max-w-xs h-fit break-words mb-2">{message.text} 
                  </div>
                  <div className="w-full text-end  text-xs text-neutral-900" >{message.send_at}</div>
               </div>
          ) : (
                <div>
                  <div className="p-3 bg-slate-200 mr-auto rounded-3xl w-fit max-w-xs h-fit break-words mb-2" >{message.text}</div>
                  <span className = "mr-auto  text-xs text-neutral-900" >{message.send_at}</span>
                </div>
          )
        }
  </>
   
  )
}

export default Messages