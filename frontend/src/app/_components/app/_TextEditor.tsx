// @ts-nocheck
// Ignore all TypeScript errors in this file

'use client'
import React, { useEffect, useCallback,useState } from 'react'

import Quill from 'quill';
import "quill/dist/quill.snow.css";
import { io } from 'socket.io-client';
import { useParams } from 'next/navigation';
import axios from 'axios';

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



const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
  ]
  
const DOCUMENTSAVEINTERVAL = 2000;
const TextEditor = () => {
    const [socket,setSocket] = useState();
    const [quill, setQuill]= useState();
    const [document, setDocument] = useState<DocumentType>();
    let {id} = useParams();
    const [documentId, setDocumentId]=useState()
    console.log(documentId, "documenId");
    async function fetchDocument ()
    {

        try {
            
            const response =await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v1/api/get-documentById?id=${id}`);
            console.log(response);
            if(response.data)
            {
               setDocument(response.data.doc)  
               setDocumentId(response.data.doc._id)   
            }
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(()=> {
        const s = io(`${process.env.NEXT_PUBLIC_API_URL}`)
        setSocket(s);
        return()=> {
            s.disconnect()
        }
    },[])


    useEffect(() => {
        if (socket == null || quill == null) return

        socket.once("load-document", document => {
          quill.setContents(document)
          quill.enable()
        })
        if(documentId)
        socket.emit("get-document",documentId )
      }, [socket, quill, documentId])
    
      useEffect(() => {
        if (socket == null || quill == null) return
    
        const interval = setInterval(() => {
          socket.emit("save-document", quill.getContents(), {id : "kk"})
        }, DOCUMENTSAVEINTERVAL)
    
        return () => {
          clearInterval(interval)
        }
      }, [socket, quill])
    
      useEffect(() => {
        if (socket == null || quill == null) return
    
        const handler = delta => {
          quill.updateContents(delta)
        }
        socket.on("receive-changes", handler)
    
        return () => {
          socket.off("receive-changes", handler)
        }
      }, [socket, quill])
    
      useEffect(() => {
        if (socket == null || quill == null) return
    
        const handler = (delta, oldDelta, source) => {
          if (source !== "user") return
          socket.emit("send-changes", delta)
        }
        quill.on("text-change", handler)
    
        return () => {
          quill.off("text-change", handler)
        }
      }, [socket, quill])


  
      useEffect(()=> {
        fetchDocument()
      },[])


      const wrapperRef = useCallback((wrapper: HTMLDivElement | null)=> {
        if (wrapper == null) return
    
        wrapper.innerHTML = ""
        const { document } = window;
        const editor = document?.createElement("div")
        wrapper.append(editor)
        const q = new Quill(editor, {
          theme: "snow",
          modules: { toolbar: TOOLBAR_OPTIONS },
        
        })
        q.disable()
        q.setText('Loading....')
        setQuill(q);
      }, [])
      return <div id="container" ref={wrapperRef}></div>
}

export default TextEditor























