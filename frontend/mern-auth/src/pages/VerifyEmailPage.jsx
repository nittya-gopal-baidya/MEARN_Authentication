import {useState,useRef, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
const VerifyEmailPage=()=>{
  const [code,setCode]=useState(["","","","","",""]);
  const inputRefs=useRef([]);
  const navigate=useNavigate();
  const handleChange=(index,value)=>{
    const newCode=[...code];
    //handle pasted content
    if(value.length>1){
      const pastedCode=value.slice(0,6).split("");
      for (let i=0;i<6;i++){
        newCode[i]=pastedCode[i]||"";

      }
      setCode(newCode);
      //Focus on the last non-empty input or the first empty one
      const lastFilledIndex=newCode.findLastIndex((digit)=>digit!=="");
      const focusIndex=lastFilledIndex<5?lastFilledIndex+1:5;
      inputRefs.current[focusIndex].focus();
    }
    else{
      newCode[index]=value;
      setCode(newCode);
      //move focus to the next input field if value is entered 
      if(value && index<5){
        inputRefs.current[index+1].focus();
      }
    }
  };
  const handleKeyDown=(index,e)=>{
    if(e.key==="Backspace" && !code[index] && index>0){
      inputRefs.current[index-1].focus();
    }
  };
  const isLoading=true;
   const handleSubmit=(e)=>{
    e.preventDefault();//doesn't refresh the page
    const verificationCode=code.join("");
    console.log(`Verification code submitted ${verificationCode}`);
   }
  //Auto submit when all fields are filled
    useEffect(()=>{
    if(code.every(digit=> digit!== '')){
     handleSubmit(new Event('submit'));
     }
   },[code])
  return (
<div className='max-w-md w-full gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
  <div className='bg-gray-800 bg-opacity-50 backdrop-filter p-6 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-md'>
    <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-emerald-500 text-transparent bg-clip-text'>
      Verify Email
    </h2>
    <p className='text-center text-gray-300 mb-6'>Enter the 6 digit code sent to registred email address</p>
    <form  onClick={handleSubmit} className='space-y-6'>
      <div className='flex justify-between'>
         {code.map((digit,index)=>(
          <input
          key={index}
          ref={(el)=>(inputRefs.current[index]=el)}
          type='text'
          maxLength='6'
          value={digit}
          onChange={(e)=>handleChange(index,e.target.value)}
          onKeyDown={(e)=>handleKeyDown(index,e)}
          className='w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-500 rounded-lg focus:border-blue-500 focus:outline-none'

          
          />
        ))}    
      </div>
       <button type='submit'
       disabled={isLoading|| code.some((digit)=>!digit)}
       className='w-full bg-gradient-to-r from-blue-500 to-emerald-600 text-white font-bold py-3 px-4
       rounded-lg shadow-lg hover:from-blue-600 hover:to-emerald-700 focus:outline-none focus:ring-2
       focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50
       '
       >
        {isLoading?"Verifying. . ":"Verify Email"}
       </button>
    </form>


  </div>

</div>
  );
return 
};
export default VerifyEmailPage