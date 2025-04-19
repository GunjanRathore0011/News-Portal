import React, { use, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '../ui/button'
import { toast } from '@/hooks/use-toast'
import Comment from './Comment'


const CommentSection = (postId) => {
    const currentUser = useSelector((state) => state.user.currentUser)


    const [comment, setComment] = useState('')
    const [error, setError] = useState('')
    const [allComment, setAllComment] = useState([])


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (comment.length < 1) {
            setError('Comment cannot be empty')
            return
        }
        if (comment.length > 200) {
            toast({ title: "Comment cannot be more than 200 characters" })
            return
        }
        try {
            const res = await fetch('/api/comment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: comment,
                    postId: postId.postId,
                    userId: currentUser._id
                })
            })
            const data = await res.json()
            if (!res.ok) {
                setError(data.message)
                toast({ title: data.message, variant: "destructive" })
                return
            }
            else {
                setComment('')
                // console.log(data)
                setAllComment((prev) => [...prev, data.comment])
                toast({ title: "Comment added successfully", variant: "default" })
            }
        }
        catch (error) {
            console.log(error)
            toast({ title: "Something went wrong", variant: "destructive" })
        }
    }

    useEffect(() => {
        const getComments = async () => {
            try {
                const res = await fetch(`/api/comment/getPostComments/${postId.postId}`)

                if (res.ok) {
                    const data = await res.json()
                    setAllComment(data.comments)
                    // console.log(data.comments)
                }
            } catch (error) {
                console.log(error.message)
            }
        }

        getComments()
    }, [postId])

    return (
        <div className='max-w-3xl mx-auto w-full p-3'>
            {
                currentUser ? (
                    <>
                        <div className='flex items-center text-sm gap-1 my-5 text-gray-500'>
                            <p>Signed in as:</p>

                            <img
                                className='h-5 w-5 object-cover rounded-full'
                                src={currentUser?.profilePicture}
                                alt={currentUser?.username}
                            ></img>


                            <Link to={'/dashboard?tab=profile'}
                                className='text-sm text-blue-800 hover:underline'>
                                @{currentUser.userName}</Link>
                        </div>
                    </>

                ) : (
                    <>
                        <div className='text-sm text-gray-700 my-5 flex gap-1'>
                            You must be signed in to comment.
                            <Link to={"/sign-in"} className='text-blue-600 hover:underline' >Sign In</Link>
                        </div>
                    </>
                )
            }

            {
                currentUser && (
                    <form className='border-2 border-gray-400 rounded-md p-4' onSubmit={handleSubmit}>
                        <Textarea placeholder='Add a comment...' rows="3"
                            maxLength='200'
                            className='border border-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0'
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                        ></Textarea>

                        <div className="flex justify-between items-center mt-5">
                            <p className="text-gray-500 text-sm">
                                {200 - comment.length} characters remaining
                            </p>

                            <Button type="submit">Submit</Button>
                        </div>
                    </form>

                )
            }

{allComment.length === 0 ? (
        <p className="text-sm my-5">No comments yes!</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1 font-semibold">
            <p>Comments</p>

            <div className="border border-gray-400 py-1 px-2 rounded-sm">
              <p>{allComment.length}</p>
            </div>
          </div>

          {allComment.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
         
            />
          ))}
        </>
      )}

            </div>
        )
    }
    
    export default CommentSection