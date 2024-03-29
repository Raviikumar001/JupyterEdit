
"use client"
import axios from 'axios';

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import GoogleDocs, {Delete} from '../svgFiles';
import Link from 'next/link';
interface User {
  name: string;
  email: string;
  registrationDate: string;
  _id: string;
}

interface Props {
  user: User | null;
}

type Document = {
  _id: string;
  creator: string;
  documentId: string;
  name: string;
  body:object
  __v: number;
};


const RecentDocuments : React.FC<Props>  = ({user}) => {

  const [document, setDocument] =useState<Document[]>([]);
  let navigate = useRouter();
  async function getDocument()
  {
     
      try {

        console.log(user)
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/get-documents?id=${user&& user?._id}`);
          console.log(response);

        if(response.data)
        { 
          let array = response.data.documents.reverse()
          setDocument(array);
        }
      } catch (error) {
          console.log(error);
      }
          
  }

  async function deleteDocument(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) {
    try {
      e.preventDefault(); // Prevent the default action of the button click
      e.stopPropagation(); // Stop the event from propagating further
  
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/delete-document?id=${id}`);
      console.log(response);
  
      if (response.status === 200) {
        let updatedArray = document.filter((item) => item._id !== id);
        setDocument(updatedArray);
      }
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(()=>{
    if(user)
    {
      getDocument();

    }
  },[user])


  return (
    <div className='ml-[10%] mt-3'
    >
      
      Recent Documents

      <div className='flex gap-3'>
  {document.map((item) => (
    <Link href={`/app/document/${item.documentId}`}>
    <div className='document-layout' key={item._id}>
      <GoogleDocs />
      <div className='document-content flex gap-2 items-center'>
  {/* Your document content */}
  <p className='text-sm font-medium' title={item.name.length > 10 ? item.name : undefined}>
    {item.name.length > 10 ? `${item.name.slice(0, 12)}...` : item.name}
  </p>
  {/* Add other document details here */}
 <button title="delete" onClick={(e)=> deleteDocument(e,item._id)}>
 <Delete />
   </button> 
   
   </div>

     
    </div>
    
    </Link>
  ))}
</div>

     

  </div>
  )
}

export default RecentDocuments