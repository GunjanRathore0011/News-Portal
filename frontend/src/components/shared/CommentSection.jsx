import React, { use, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '../ui/button'


const CommentSection = () => {
    const currentUser = useSelector((state) => state.user.currentUser)

    const [comment, setComment] = useState('')
    const [error, setError] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (comment.length < 1) {
            setError('Comment cannot be empty')
            return
        }
    }

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
        </div>
    )
}

export default CommentSection