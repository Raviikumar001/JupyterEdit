"use client";

import React from 'react'
// import {useUserContext} from '../_contexts/_userContext';
import {  useUserContext } from '../_contexts/_userContext';
import AppHeader from '../_components/app/_AppHeader';
import CreateDocument from '../_components/app/_createDocuments';
import RecentDocuments from '../_components/app/_RecentDocuments';
const MainApp = () => {
  const userContext  = useUserContext()
  const { user, token } = userContext || { user: null, token: null };


  
  return (
    <div className='h-full'>
      <AppHeader user={user} />
      <CreateDocument user={user} />
      <RecentDocuments user={user} />
      
    </div>
  )
}

export default MainApp