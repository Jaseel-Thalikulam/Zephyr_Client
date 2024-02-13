import React, { useEffect } from 'react'
import  { axiosInstance } from '../interceptor/Interceptor';
 '../interceptor/Interceptor'


function Chats(): JSX.Element  {
  useEffect(() => {

       (async function fetchChats() {
         console.log("called",axiosInstance);
         
        const res = await axiosInstance.get('Chats')
      console.log(res);
      
       })();
 

  },[])
  return (
    <div>
      <h1>Chats</h1>
    </div>
  )
}

export default Chats
