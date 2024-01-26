"use client";

import React from 'react'
// import {useUserContext} from '../_contexts/_userContext';
import {  useUserContext } from '../_contexts/_userContext';

const MainApp = () => {
  const userContext  = useUserContext()
  const { user, token } = userContext || { user: null, token: null };

  console.log(user, token);
  
  return (
    <div className='h-full'>
      
    </div>
  )
}

export default MainApp