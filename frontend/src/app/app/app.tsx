









"use client";

import React, { useEffect } from 'react'
// import {useUserContext} from '../_contexts/_userContext';
import {  useUserContext } from '../_contexts/_userContext';
import AppHeader from '../_components/app/_AppHeader';
import CreateDocument from '../_components/app/_createDocuments';
import RecentDocuments from '../_components/app/_RecentDocuments';
import { useRouter } from 'next/navigation';
const MainApp = () => {
  const userContext  = useUserContext()
  const { user, token } = userContext || { user: null, token: null };

  let navigate = useRouter();
  
  useEffect(()=> {

  },[user])
  return (
    <div className='h-full'>
    
     
    {user&&
    <>

    
    <AppHeader user={user} />
      <CreateDocument user={user} />
      <RecentDocuments user={user} />
     </>}
    

      
    </div>
  )
}

export default MainApp