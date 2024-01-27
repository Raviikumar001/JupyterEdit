"use client"
import React,{useEffect, useState} from 'react'
import GoogleDocs from '@/app/_components/svgFiles'
import TextEditor from '@/app/_components/app/_TextEditor'
import Link from 'next/link'
import axios from 'axios'
import { debounce } from "lodash"
import { useParams } from 'next/navigation';
type  DocumentType= {
  _id: string;
  creator: string;
  documentId: string;
  name: string;
  __v: number;
  data: {
      ops: { insert: string }[];
  };
}



const DocumentEdit = () => {
  const [document, setDocument] = useState<DocumentType>();
  const [docTitle, setDocTitle]= useState('');
  const debouncedUpdateTitle = debounce(updateTitle, 900);
  let {id} = useParams();
  async function fetchDocument ()
  {

      try {
          
          const response =await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/get-documentById?id=${id}`);
          console.log(response);
          if(response.data)
          {
             setDocument(response.data.doc)  
             console.log(response.data.doc.name)
             setDocTitle(response.data.doc.name)
          }
      } catch (error) {
          console.log(error);
      }
  }

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    setDocTitle(newTitle);
    // Call the debounced function after the user stops typing for 900 milliseconds
    debouncedUpdateTitle(newTitle);
  };
  

  const handleTitleBlur = () => {

    debouncedUpdateTitle.cancel();

    updateTitle(docTitle);
  };
  

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {

      debouncedUpdateTitle.cancel();
  
      updateTitle(docTitle);
    }
  };

  // Function to update the title (will be throttled)
  async function updateTitle(newTitle:string) {
    // Call your API to update the document title here
    console.log('Updating title:', newTitle);
    // Example: await yourApiCallToUpdateTitle(newTitle);
    const response = await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/update-doc-title`,{
      id,
      title:docTitle
    })
    console.log(response);
  }

  useEffect(()=> {
    fetchDocument();

  },[])


  return (
    <>
    <div className='h-[100%] '>
      <div className='flex justify-between p-5'>
        <div className=' flex'>
          <Link
           href="/app"
          >
          
          <GoogleDocs />
          </Link>
          {/* <input className='bg-[#f3f3f3] border focus:ring-blue-500 focus:border-blue-500'/> */}
          <input
  type="email"
  value={docTitle}
  onChange={handleTitleChange}
  onBlur={handleTitleBlur} // Call handleTitleBlur when the input field loses focus
  onKeyDown={handleKeyPress} // Call handleKeyPress when a key is pressed
  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
  placeholder="Document Title"
/>
        </div>
        <div>
          <button className='rounded-lg p-2 border-gray-200 bg-[#c2e7ff] '>
            <Link
            href="/app"
            >
            Dabshobard
            </Link>
            </button>
        </div>
      </div>


    </div>
    <div style={{width:"100%"}}>

      <TextEditor />
    </div>
    </>
  )
}

export default DocumentEdit