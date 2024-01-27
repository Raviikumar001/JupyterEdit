









"use client";

import React, { useEffect, useState } from 'react'
// import {useUserContext} from '../_contexts/_userContext';
import {  useUserContext } from '../_contexts/_userContext';
import AppHeader from '../_components/app/_AppHeader';
import CreateDocument from '../_components/app/_createDocuments';
import RecentDocuments from '../_components/app/_RecentDocuments';
import { useRouter } from 'next/navigation';

interface User {
  name: string;
  email: string;
  registrationDate: string;
  _id: string;
}

interface Props {
  user: User | null;
}

const MainApp = () => {
  const userContext  = useUserContext()
  const { user } = userContext || { user: null };
  const [loggedUser, setLoggedUser] = useState<User | null>(null);

  let navigate = useRouter();

  useEffect(() => {
    navigate.refresh();
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      setLoggedUser(user);
    }
  }, [user]);
  console.log(loggedUser)
  return (
    <div className='h-full'>
    
     
    {loggedUser&&
    <>

    
    <AppHeader user={loggedUser} />
      <CreateDocument user={loggedUser} />
      <RecentDocuments user={loggedUser} />
     </>}
    

      
    </div>
  )
}

export default MainApp