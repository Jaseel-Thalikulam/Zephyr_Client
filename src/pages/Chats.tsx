import React, { useEffect } from 'react'
import axiosInstance from '../interceptor/interceptor'

function Chats(): JSX.Element  {
  useEffect(() => {
    axiosInstance.get('Chats')
  })
  return (
    <div>
      <h1>Chats</h1>
    </div>
  )
}

export default Chats
