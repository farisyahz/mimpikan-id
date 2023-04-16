import { serverTimestamp } from 'firebase/firestore'
import React, { useEffect } from 'react'

const Dream = ({children, avatar, username, dream, timestamp}) => {

  return (
    <div className='mb-3 p-5  shadow-md rounded-md bg-white '>
      <div className='flex gap-2 items-center'>
        <img src={avatar} className='w-8 h-8 rounded-full'/>
        <h2 className='font-bold text-base'>{username}</h2>
      </div>
      <div className='mt-2 sm:text-base text-sm'>
        <p>{dream}</p>
      </div>
      {children}
    </div>
  )
}

export default Dream