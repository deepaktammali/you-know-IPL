import React, {useState } from "react"
import axios from 'axios';
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";

export default function Home({user}) {

  const router = useRouter();

  if(user){
    router.push('/quiz');
    return null;
  }

  const [name,setName] = useState<string>("");  
  const { mutate } = useSWRConfig();
  
  const handleEnter = async ()=>{
   const response = await axios.post('/api/login',{name});
   if(response.status===201){
     await router.push('/quiz');
      mutate('/api/user');  
  }
   else{
     alert('Session creation failed please try again.');
   }
  }

  const handleInputChangeEvent = (event)=>{
    setName(event.target.value);
  }

  return (
    <div className="w-screen h-screen flex flex-col gap-2 items-center justify-center">
      <label htmlFor='name-input'>Enter your name</label>
      <input id='name-input' onChange={handleInputChangeEvent} value={name} className="border border-indigo-300 w-1/2 md:w-1/3 text-center "></input>
      <button onClick={handleEnter} className="bg-indigo-100 px-8 py-1 hover:bg-indigo-200">Enter</button>
    </div>
  );
}
