import React from 'react';
import { setDoc , doc, serverTimestamp } from 'firebase/firestore';
import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase/firebase';
import '../public/boxicons-2.0.7/css/boxicons.min.css';
import Login from './Login';
import {db} from "../Firebase/firebase";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [loggedInUser , loading , _error] = useAuthState(auth)

  
  useEffect(() => {
     const SetUser = async () => {
        try {
            await setDoc(
              doc(db , 'users' ,loggedInUser?.email as string),

              {
                  email : loggedInUser?.email,
                  lastOnline : serverTimestamp(),
                  photoURL : loggedInUser?.photoURL,
              },
              {
                merge : true,
              }
            )
        }catch(err) {
           console.log(err)
        }
     }
     if(loggedInUser){
        SetUser()
     }
  }, [loggedInUser])


  if(loading){
   return <h1>loadiNG....</h1>
  }  

  if(!loggedInUser){
     return  <Login/> 
  } 
  
  return <Component {...pageProps } />
}

export default MyApp