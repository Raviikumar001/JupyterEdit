"use client"

import React from 'react'
import SignupForm from '@/app/_components/signup/_signupForm'
import Link from 'next/link'
const Signup = () => {
  return (
    <div className='form-container w-full'>
      <h3 className='font-semibold text-2xl text-red-800 mt-10 text-left'>
        <Link href="/">
        Scribble Edit
        </Link>
      </h3>
      <p className='text-xl mt-3'>Sign Up</p>
      <SignupForm />


    </div>
  )
}

export default Signup