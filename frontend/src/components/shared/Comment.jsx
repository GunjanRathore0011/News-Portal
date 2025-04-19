import React, { use, useEffect, useState } from 'react'
import moment from 'moment'

const Comment = ({comment}) => {

const [user, setUser] = useState({})
  
    useEffect(() => {
      const getUser = async () => {
        // console.log("function called")
        try {
          const res = await fetch(`/api/user/getUser/${comment.userId}`)

          if (res.ok) {
              const data = await res.json()
              // console.log(data)
              setUser(data)
          }
      } catch (error) {
          console.log(error.message)
      }
      }

      getUser()
    },[comment])

  return (
    <div className='flex p-4 border-b border-slate-300 text-sm'>
      <div className='flex-shrink-0 mr-3'>
        <img src={user?.profilePic} alt={user.userName} 
        className='w-10 h-10 rounded-full bg-gray-200' />
      </div>

      <div className='flex-1 '>
        <div className='flex items-center mb-1 ' >
          <span className='font-semibold mr-1 text-sm truncate' >
            {user? `${user.userName}`:"Unknown"}
          </span>

          <span className='text-xs text-gray-500'>
            {moment(comment.createdAt).fromNow()}
          </span>

        </div>

        <p className='text-sm text-gray-700'>
          {comment.content} 
        </p>        
      </div>

    </div>
  )
}

export default Comment