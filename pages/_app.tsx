import axios from 'axios';
import { useRouter } from 'next/router';
import React,{ useCallback, useState } from 'react';
import 'tailwindcss/tailwind.css'
import useUser from '../hooks/useUser';


function MyApp({ Component, pageProps }) {

  const router = useRouter();

  const {isError,isLoading,user} = useUser();

  if(isLoading){
    return (
      <div className="w-screen h-screen flex items-center justify-center text-xl">Loading...</div>
    )
  }
  else if(isError){
    return (
      <div className="w-screen h-screen flex items-center justify-center text-xl">Error Loading..Please retry again</div>
    )
  }
  return <Component user={user} {...pageProps} />
}

export default MyApp
