"use client"
import Link from 'next/link'
import axios, { AxiosError } from 'axios';
import React,{useState,useEffect} from 'react'
import { useRouter } from 'next/navigation';
import { MessageInfo } from '../_HelperFunctions';

const SignInForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState<string>('');


    let navigate = useRouter();

    async function onSubmitForm(e: React.FormEvent<HTMLFormElement>) {

        try {
            e.preventDefault();
            if (!( email && password )) {
                setMessage('Fields are Empty')
                return;
            }
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/login`, {
             
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
            const err = error as AxiosError<{ message: string }>;
            if (err.response?.status === 401) {
              setMessage(err.response.data.message);
            }
          }
       
        
      

    }
    
    useEffect(() => {
        if (message) {
          setTimeout(() => {
            setMessage("")
            if(message == 'User Authenticated'){
              return navigate.push('/app')
            }
          }, 1000);
        }
      }, [message]);
        



      const setCredentials = ()=>
      {
        setEmail("dd");
        setPassword('jlkjlk')

      }


  return (
    <div className='md:w-[20%] sm:w-[100%]'>


            <form className='form' onSubmit={onSubmitForm} >
                <MessageInfo message={message} />
              

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
               
                <p onClick={setCredentials}className='text-blue-600'>
                  Dummy Login Credetials
                </p>
                <button type='submit' className='text-btn' >SIGN IN</button>
                
                
                







            </form>
            <p className='mt-3 mb-10'>Dont	&apos; have an account? {" "}
                <Link href="/accounts/signup" className='font-semibold'>
                    Sign Up</Link>

            </p>


        </div>
  )
}

export default SignInForm