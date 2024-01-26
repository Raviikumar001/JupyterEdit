
import React from 'react'
import SignInForm from '@/app/_components/signin/_signinForm'
import Link from 'next/link'
const Singin = () => {
  return (
    <div className='form-container w-full'>
    <h3 className='font-semibold text-2xl text-red-800 mt-10 text-left'>
      <Link href="/">
      Scrible Edit
      
      </Link>
      
      </h3>
    <p className='text-xl mt-3'>Sign In</p>
    <SignInForm />
   


  </div>
  )
}

export default Singin