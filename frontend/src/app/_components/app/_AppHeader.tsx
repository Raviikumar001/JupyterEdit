"use client";
import React from 'react';
import axios from 'axios';
import GoogleDocs, { UserAccount } from '../svgFiles';
import Link from 'next/link';
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


const AppHeader: React.FC<Props> = ({ user }) => {

  let navigate = useRouter();

  function logout()
  {  
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  setTimeout(()=>{
    return navigate.push('/')
  },1200)

  }
  return (
    <div className='flex items-center justify-between pl-20 pt-3 pr-20'>

      <div className='flex gap-2 items-center'>
        <GoogleDocs />
        <h2>Docs</h2>
      </div>

      <div className='flex gap-2 items-center'>
        {user?.name && (
          <div className='flex gap-2 p-2 items-center border-2 text-white bg-[#3147ff] rounded-md '>
            <UserAccount />
            <h2>{user.name}</h2>
          </div>
        )}
        <h2 onClick={logout} className='block text-center signup-btn   flex-shrink-0'><Link href='/accounts/signup'>Logout</Link></h2>
      </div>


    </div>
  )
}

export default AppHeader