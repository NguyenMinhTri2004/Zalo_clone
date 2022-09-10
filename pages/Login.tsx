import React from 'react'
import Head from 'next/head'
import {useSignInWithGoogle} from 'react-firebase-hooks/auth'
import {auth} from '../Firebase/firebase'
const Login = () => {


  const [signInWithGoogle , user , loading , error ] = useSignInWithGoogle(auth);

  const signIn = () => {
     signInWithGoogle()
  }
    
  return (
    
     <>

         <Head>
             <title>Đăng nhập</title>
         </Head>

         <div className="login  flex justify-center items-center h-screen w-screen bg-no-repeat bg-cover "  style = {{backgroundImage : "url('../Img/backgroundlogin.jpg')" }} >
            <div className="login__wrapper shadow-md w-96 h-96">
                <div className="login__title flex flex-col justify-center items-center gap-5">
                      <div className="login__title__logo  w-32 ">
                          <img src='./Img/zlogo.png' alt="" />
                      </div>

                      <div className="login__title__text  flex flex-col justify-center items-center mb-5  text-white ">
                           <h4>Đăng nhập tài khoản Zalo</h4>
                           <h4>để kết nối với ứng dụng Zalo Chat</h4>
                      </div>
                </div>

                <div className="login__form flex flex-col justify-center items-center bg-white  w-full  h-full  border-solid border-black border  gap-5">
                       <img  className = "w-32"  src="./Img/zalo_sharelogo.png" alt="" />
                       <span  onClick={() => signIn()}  className="bg-blue-500  py-5 px-8 cursor-pointer text-white " >Đăng nhập bằng google</span>
                </div>
            </div>
         </div>
     </>
     
  )
}

export default Login