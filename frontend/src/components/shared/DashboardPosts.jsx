import React, { useEffect, useState } from 'react'
import { set } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Button } from '../ui/button'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Link } from 'react-router-dom'

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
} from "@/components/ui/alert-dialog"


const DashboardPosts = () => {

  const { currentUser } = useSelector((state) => state.user)

  const [userPosts, setUserPosts] = useState([])
  // console.log(userPosts)
  const [showMore, setShowMore] = useState(true)
  const API_BASE = import.meta.env.VITE_API_URL;


  useEffect(() => {
    if (currentUser.isAdmin) fetchPosts();

  }, [currentUser])
  const fetchPosts = async () => {
    if (!currentUser || !currentUser.isAdmin) return;
    try {

      // console.log("yeh h current user ",currentUser)

      const res = await fetch(`${API_BASE}/post/getPosts?userId=${currentUser._id}`,{
        credentials: "include",
        method: "GET",
      })

      const data = await res.json()
      // console.log(data)
      // console.log(res)
      if (res.ok) {
        setUserPosts(data.posts)

        if (data.posts.length < 6) {
          setShowMore(false)
        }
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleShowMore = async () => {
    const startIndex = userPosts.length

    try {
      const res = await fetch(`${API_BASE}/post/getPosts?userId=${currentUser._id}&startIndex=${startIndex}`,{
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })

      // console.log(startIndex)
      const data = await res.json()
      // console.log(data)
      if (res.ok) {
        setUserPosts((prevPosts) => [...prevPosts, ...data.posts])

        if (data.posts.length < 6) {
          setShowMore(false)
        }

      }
    }

    catch (error) {
      console.log(error.message)
    }
  }

  const deleteHandler = async (postId) => {
    // console.log("Deleting post:", postId);

  // const token = localStorage.getItem("user"); // Retrieve token from local storage

    // console.log(token)
    try {
      const res = await fetch(`${API_BASE}/post/deletePost/${postId}`, { 
        method: "DELETE", 
        credentials: "include",
        headers: { "Content-Type": "application/json" }
      });
  
      const data = await res.json()
      // console.log(data)

      if (res.ok) {
        // console.log(data)
        setUserPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
      }
      else{
        console.log("delete noi hua")
      }
    }

    catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table>
            <TableCaption>A list of your published articles.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Date Updated</TableHead>
                <TableHead>Post Image</TableHead>
                <TableHead>Post Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Delete</TableHead>
                {/* <TableHead>Edit</TableHead> */}
              </TableRow> 
            </TableHeader>

            {userPosts.map((post) => (
              <TableBody>
                <TableRow key={post._id}>
                  <TableCell className="font-medium">{new Date(post.updatedAt).toLocaleDateString()}</TableCell>
                  <TableCell className="font-medium">{
                    <Link to={`/post/${post.slug}`}>
                      <img src={post.image} alt={post.title}
                        className='w-20 h-10 object-cover bg-gray-500'
                      ></img>
                    </Link>
                  }</TableCell>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell className="font-medium">{post.category}</TableCell>
                  <TableCell className="font-medium">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className=" text-red-500 hover:underline" >
                          Delete
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            post from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => { deleteHandler(post._id) }} className="bg-red-600">Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                  {/* <TableCell className="font-medium">
                    <Link to={`/update-post/${post._id}`}>
                      <button className=" text-green-500 hover:underline">
                        Edit
                      </button></Link>
                  </TableCell> */}
                </TableRow>
              </TableBody> 
            ))}

          </Table>
          {
            showMore && (
              <Button onClick={handleShowMore} className='text-blue-600 block mx-auto' variant='ghost'>Show More</Button>
            )
          }
        </>
      ) :
        (<p className='flex justify-center pt-9'>You have no posts yet!</p>)}
    </div>
  )
}

export default DashboardPosts