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
import { setErrorMap } from 'zod'


const DashboardPosts = () => {

  const { currentUser } = useSelector((state) => state.user)

  const [userPosts, setUserPosts] = useState([])
  // console.log(userPosts)
  const [showMore,setShowMore]=useState(true)

  useEffect(() => {
    if (currentUser.isAdmin) fetchPosts();

  }, [currentUser])
  const fetchPosts = async () => {
    if (!currentUser || !currentUser.isAdmin) return;
    try {

      // console.log("yeh h current user ",currentUser)

      const res = await fetch(`/api/post/getPosts?userId=${currentUser._id}`)

      const data = await res.json()
      // console.log(data)
      // console.log(res)
      if (res.ok) {
        setUserPosts(data.posts)

        if(data.posts.length <6) {
          setShowMore(false)
        }
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  const handleShowMore=async()=>{
    const startIndex=userPosts.length

    try{
      const res=await fetch(`api/post/getPosts?userId=${currentUser._id}&startIndex=${startIndex}`)

      // console.log(startIndex)
      const data=await res.json()
      // console.log(data)
      if(res.ok){
        setUserPosts((prevPosts) => [...prevPosts, ...data.posts])

        if(data.posts.length < 6){
          setShowMore(false)
        }
        
      }
    }

    catch(error){
      console.log(error.message)
    }
  }

  return (
    <div > 
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
                <TableHead>Edit</TableHead>
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
                    <Button variant='ghost' className='text-red-500'>Delete</Button>
                  </TableCell>
                  <TableCell className="font-medium">
                    <Link to={`/update-post/${post._id}`}>
                      <Button variant='ghost' className='text-green-500 py-0'>Edit</Button>
                    </Link>
                  </TableCell>
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
        (<p>You have no posts yet!</p>)}
    </div>
  )
}

export default DashboardPosts