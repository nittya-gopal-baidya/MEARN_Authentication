import React from 'react'
import {useRef,useState} from "react"
import { useNavigate } from 'react-router-dom'

const VerifyEmail=()=> {
const [code,setCode]=useState(["","","","","",""])
const inputRefs=useRef([]);//keep track of input references 
const navigate=useNavigate();
const handleChange=(index,value)=>{}
const handleKeyDown=(index,e)=>{}
  return (
    <div className='max-w-md  bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
    overflow-hidden'>
       <div className="p-8 bg-gray-900 rounded-xl w-96">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-emerald-500 text-transparent bg-clip-text">
          Verify Email
        </h2>
        <p className='text-center text-gray-300 mb-6'>Enter 6-digit code sent to your registered email address </p>
        <form className='space-y-6'>
            <div className='flex justify-between'>

            </div>

        </form>
        </div>
     
    </div>
  )
}

export default VerifyEmail
