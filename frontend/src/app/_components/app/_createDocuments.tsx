import React from 'react'
import GoogleDocs from '../svgFiles'
import axios from 'axios'
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
  



const CreateDocument: React.FC<Props>  = ({user}) => {

    let navigate = useRouter();
    async function createDocument(e: React.MouseEvent<HTMLDivElement, MouseEvent>)
    {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/create-document?id=${user?._id}`,);
            console.log(response);
            if(response.status == 200)
            {
                
                navigate.push(`/app/document/${response?.data?.document.documentId}`)
            }
        } catch (error) {
            console.log(error);
        }
            
    }


    return (
        <div className='create-doc-div '>
                <h2 className='ml-[10%] mt-3 pt-3'>Start a new Document</h2>
          
            <div onClick={createDocument} className='h-[10rem] w-[10rem] border border-gray-200 rounded-md bg-white text-center mt-3 flex justify-center items-center ml-[10%] hover:border-blue-300'>
                <GoogleDocs />
            </div>

        </div>
    )
}

export default CreateDocument