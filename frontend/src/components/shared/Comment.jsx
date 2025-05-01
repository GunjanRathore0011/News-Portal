import React, { use, useEffect, useState } from 'react'
import { toast } from '@/hooks/use-toast'
import { AiFillLike } from "react-icons/ai";

import moment from 'moment'
import { useSelector } from 'react-redux';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

const Comment = ({ comment, onDelete ,onEdit, onLike}) => {
  const { currentUser } = useSelector((state) => state.user)
  const [user, setUser] = useState({})
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(comment.content)
  const API_BASE = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getUser = async () => {
      // console.log("function called")
      try {
        const res = await fetch(`${API_BASE}/user/getUser/${comment.userId}`,{
          credentials: "include",
        })

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

  const handleEdit = () => {
    setIsEditing(true)
    setEditedContent(comment.content)
  }

  const handleSave = async () => {
    console.log(editedContent)

    try{
      if (!currentUser) {
                navigate("/sign-in")
                return
              }
      
            const res = await fetch(`${API_BASE}/comment/editComment`, {
              method: 'PUT',
              credentials: "include",
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                commentId: comment._id,
                userId: currentUser._id,
                content: editedContent
              })
            })
            const data = await res.json()
            if (res.ok) {
              setIsEditing(false)
              onEdit()
              toast({ title: data.message , variant: "default" })
            } else {
              toast({ title: data.message, variant: "destructive" })
            }
   
    }
    catch(error){
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

        {isEditing ? (
          <>
            <Textarea
              className="mb-2"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />

            <div className="flex justify-end gap-2 text-sm">
              <Button
                type="button"
                className="bg-green-600"
                onClick={handleSave}
              >
                Save
              </Button>

              <Button
                type="button"
                className="hover:border-red-500 hover:text-red-500"
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-slate-600 pb-2">{comment.content}</p>

            <div className="flex items-center pt-2 text-sm border-t border-slate-300 max-w-fit gap-2">
              <button
                type="button"
                onClick={() => onLike(comment._id)}
                className={`text-gray-400 hover:text-blue-500 ${
                  currentUser &&
                  comment.likes.includes(currentUser._id) &&
                  "!text-blue-600"
                }`}
              >
                <AiFillLike className="text-lg" />
              </button>

              <p className="text-gray-400">
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    " " +
                    (comment.numberOfLikes === 1 ? "like" : "likes")}
              </p>

              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <>
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="text-gray-400 hover:text-green-600"
                    >
                      Edit
                    </button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <span className="text-gray-400 hover:text-red-600 cursor-pointer">
                          Delete
                        </span>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>

                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your comment and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-600"
                            onClick={() => onDelete(comment._id)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </>
                )}
            </div>
          </>
        )}      </div>

    </div>
  )
}

export default Comment