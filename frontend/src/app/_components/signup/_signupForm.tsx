"use client"
import Link from 'next/link'
import axios, { AxiosError } from 'axios';
import React,{useState,useEffect} from 'react'
import { useRouter } from 'next/navigation';
import { MessageInfo } from '../_HelperFunctions';

const SignupForm = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState<string>('');


    let navigate = useRouter();

    async function onSubmitForm(e: React.FormEvent<HTMLFormElement>) {

        try {
            
            e.preventDefault();
            if (!(name && email && password && confirmPassword)) {
                setMessage('Fields are Empty')
                return;
            }else if(password !== confirmPassword)
            {
                setMessage('Passwords do not Match');
                return;
            }

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/register`, {
                name,
                email,
                password
    
            });
    
            console.log(response, "resonse")
            if (response.data) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                setMessage(response.data.message)
            }
            
        }
        catch (error: unknown) {
            console.log(error);
            const err = error as AxiosError<{ message: string }>;
            if (err.response?.status === 409) {
              setMessage(err.response.data.message);
            }
          }
       
        
      

    }
    
        
    useEffect(() => {
        if (message) {
          setTimeout(() => {
            setMessage("")
            if(message == 'User Created'){
              return navigate.push('/app')
            }
          }, 1000);
        }
      }, [message]);





  return (
    <div className='md:w-[20%] sm:w-[100%]'>


            <form className='form' onSubmit={onSubmitForm} >
                <MessageInfo message={message} />
                <label htmlFor='email' className='lablel-text' >Name</label><br />
                <input name='name' value={name}
                    onChange={(e) => setName(e.target.value)}
                    type='text' placeholder='Full Name' className='input-box' /><br />

                <label htmlFor='email' className='lablel-text' >Email</label><br />
                <input name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type='text' placeholder='Email' className='input-box ' /><br />

                <label htmlFor='password' className='lablel-text' >Password  </label><br />
                <input type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name='password' placeholder='Password' className='input-box ' /><br />

                <label htmlFor='password' className='lablel-text' >Password  </label><br />
                <input type='password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    name='password' placeholder='Confirm Password' className='input-box' /><br />

                <button type='submit' className='text-btn' >SIGN UP</button>
                
                
                







            </form>
            <p className='mt-3 mb-10'>Already have an account? {" "}
                <Link href="/accounts/signin" className='font-semibold'>
                    Sign In</Link>

            </p>


        </div>
  )
}

export default SignupForm