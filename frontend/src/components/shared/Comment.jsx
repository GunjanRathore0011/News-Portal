import React, { use, useEffect, useState } from 'react'
import { toast } from '@/hooks/use-toast'
import { AiFillLike } from "react-icons/ai";

import moment from 'moment'
import { useSelector } from 'react-redux';

const Comment = ({ comment, onDelete }) => {
  const { currentUser } = useSelector((state) => state.user)
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
  }, [comment])

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/comment/deleteComment`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          commentId: comment._id,
          userId: currentUser._id
        })
      })
      const data = await res.json()
      if (res.ok) {
        toast({ title: "Comment deleted successfully", variant: "default" })
        if (onDelete) onDelete()

      } else {
        toast({ title: data.message, variant: "destructive" })
      }
    } catch (error) {
      console.log(error)
      toast({ title: "Something went wrong", variant: "destructive" })
    }
  }

  const handleEdit = async () => {

  }


  const handleLike = async () => {
    try {
      const res = await fetch(`/api/comment/likeComment`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          commentId: comment._id,
          userId: currentUser._id
        })
      })
      const data = await res.json()
      if (res.ok) {
        toast({ title: data.message , variant: "default" })
      } else {
        toast({ title: data.message, variant: "destructive" })
      }
    } catch (error) {
      console.log(error)
      toast({ title: "Something went wrong", variant: "destructive" })
    }
  }
  return (
    <div className='flex p-4 border-b border-slate-300 text-sm'>
      <div className='flex-shrink-0 mr-3'>
        <img src={user?.profilePic} alt={user.userName}
          className='w-10 h-10 rounded-full bg-gray-200' />
      </div>

      <div className='flex-1 '>
        <div className='flex items-center mb-1 ' >
          <span className='font-semibold mr-1 text-sm truncate' >
            {user ? `${user.userName}` : "Unknown"}
          </span>

          <span className='text-xs text-gray-500'>
            {moment(comment.createdAt).fromNow()}
          </span>

        </div>

        <p className='text-sm text-gray-700'>
          {comment.content}
        </p>

        <div className='flex justify-between items-center mt-4 text-gray-500 text-sm border-t border-slate-300 w-52 pt-2'>
          <button onClick={handleLike} >

            <AiFillLike className={
              `text-lg cursor-pointer hover:text-blue-500 transition-all duration-200 ease-in-out
                ${comment && comment.likes.includes(currentUser._id) ? 'text-blue-500' : 'text-gray-400'}`
            }></AiFillLike>

          </button>
          <p>Like</p>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete} >Delete</button>
        </div>
      </div>

    </div>
  )
}

export default Comment