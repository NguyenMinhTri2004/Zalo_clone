import React, { useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../Firebase/firebase';
import Button from '@mui/material/Button';
import Dialog  from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import  DialogTitle  from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useAuthState } from 'react-firebase-hooks/auth'
import * as EmailValidator from 'email-validator'
import { addDoc, query, where } from 'firebase/firestore'
import {db}  from '../Firebase/firebase'
import { collection  } from 'firebase/firestore'
import {useCollection} from "react-firebase-hooks/firestore"
import {Chatroom} from "../types/index"
import ChatSelect from "./ChatSelect"
import { useRouter } from 'next/router'

 const Slidebar = () => {

  const router = useRouter()

 const logout = async  ()   => {
       await signOut(auth)
       router.push('./login')
 }

 const [loggedInUser , loading , error] = useAuthState(auth)

 const [open , setOpen] = useState(false)

 const [invetedEmail , setInvetedEmail] = useState("")

 const toogleOpenModal = (isOpen : boolean) => {
      setOpen(isOpen)

      if(!isOpen){
              setInvetedEmail("")
      }
      

 }

 const invitedSelf = invetedEmail === loggedInUser?.email

 const createChat = async () => {

       if(!invitedSelf && EmailValidator.validate(invetedEmail)  && !isChatRoomExits()){
              await addDoc(collection(db , "chatrooms"), { 
                 users : [loggedInUser?.email , invetedEmail]
              })

       }
       toogleOpenModal(false)
 } 

 const queryGetAllChatRoomLoggedUser = query(collection(db , "chatrooms") , where("users" , "array-contains" , loggedInUser?.email))

 const [chatroomSnapshot , __loading , __error] = useCollection(queryGetAllChatRoomLoggedUser)


 const isChatRoomExits = () => {
       return chatroomSnapshot?.docs.find(chatroom => (chatroom.data() as Chatroom).users.includes(invetedEmail))
 }



  return (

       <div>

              <div className="sliderbar w-100 cursor-pointer  flex h-screen">
                     <div className="sliderbar__left w-20  bg-blue-400 flex flex-col justify-between items-center text-3xl  text-white p-5  hidden sm:block" >
                            <div className="sliderbar__left__top flex flex-col gap-5 items-center justify-center "    >
                                   <div className="sliderbar__left__top__avt w-14 ">
                                   <img className = "rounded-full" src = {loggedInUser?.photoURL || ""} alt="" />
                                   </div>
                                   <div className="sliderbar__left__top__icon  ">
                                          <i className ='bx bx-message-rounded-dots'></i>
                                   </div>

                                   <div className="sliderbar__left__top__icon">
                                          <i className ='bx bxs-user-account'></i>
                                   </div>

                                   <div className="sliderbar__left__top__icon">
                                   <i className ='bx bx-check-square'></i>
                                   </div>
                            </div>

                            <div className="sliderbar__left__bottom flex flex-col gap-5   ">
                            <div className="sliderbar__left__bottom__icon">
                                   <i className ='bx bx-cloud' ></i>
                            </div>

                            <div className="sliderbar__left__bottom__icon">
                                   <i className ='bx bxs-briefcase'></i>
                                   </div>

                                   <div  onClick={() => logout()}  className="sliderbar__left__bottom__icon">
                                   <i className ='bx bxs-brightness'></i>
                                   </div>
                            </div>
                     </div>
                     <div className="slider__right w-96 flex-col gap-10 p-5  border  border-solid  border-neutral-200 hidden lg:block"  >
                            <div className="sliderbar__top  flex justify-between items-center mb-5 ">
                                   <div className="sliderbar__top__search  relative ">
                                          <input className="bg-slate-200 rounded-3xl px-8 py-2 outline-0 border-none " placeholder="Tìm kiếm"  type="text"/>
                                          <i className='bx bx-search absolute left-2.5 top-3.5 '></i>
                                   </div>
                                   <div  onClick={() => toogleOpenModal(true)}  className="sliderbar__top__icon">
                                                 <i className='bx bx-user-plus'></i>
                                   </div>

                                   <div className="sliderbar__top__icon">
                                                 <i className='bx bx-group'></i>
                                   </div>
                            </div>

                            <div className="sliderbar__bottom  flex   justify-between items-center mb-5 pb-2  border-b border-solid  border-neutral-200 ">
                                   <div className="slider__bottom__left flex   justify-between  ">
                                          <div className="slider__bottom__left__item">
                                                 <h4 className="mr-3" >Tất cả</h4>
                                          </div>

                                          <div className="slider__bottom__left__item">
                                                 <h4>Chưa đọc</h4>
                                          </div>
                                   </div>

                                   <div className="slider__bottom__right  flex   justify-between items-center">
                                          <div className="slider__bottom__right__item flex   justify-between  items-center">
                                                 <h4 className='' >Phân loại</h4>
                                                 <i className='bx bx-chevron-down'></i>
                                          </div>

                                          <div className="slider__bottom__right__item">
                                                 <i className='bx bx-dots-horizontal-rounded' ></i>
                                          </div>
                                   </div>
                            </div>

                            {
                                   chatroomSnapshot?.docs.map(chatroom => (
                                          <ChatSelect
                                               key = {chatroom.id}
                                               id = {chatroom.id}
                                               chatroomUsers = {(chatroom.data() as Chatroom).users}
                                          />
                                   ))
                            }

                     </div>
              </div>

              <Dialog open={open} onClose={() => toogleOpenModal(false)}>
                     <DialogTitle>Cuộc trò chuyện</DialogTitle>
                      <DialogContent>
                         <DialogContentText>
                               Vui lòng nhập tài khoản của người bạn muốn chat
                        </DialogContentText>
                        
                            <TextField
                                   autoFocus
                                   label="Email Address"
                                   type="email"
                                   fullWidth
                                   variant="standard"
                                   value = {invetedEmail}
                                   onChange = {e => {setInvetedEmail(e.target.value)}}
                            />
                    </DialogContent>
                    
                     <DialogActions>
                            <Button onClick={() => toogleOpenModal(false)}>Cancel</Button>
                            <Button disabled={!invetedEmail}  onClick={() => createChat()}>Create</Button>
                     </DialogActions>
              </Dialog>
      
       </div>
      
  )
 }


export default Slidebar

