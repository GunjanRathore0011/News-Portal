import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOutSuccess } from '@/redux/user/userSlice';
import { useToast } from '@/hooks/use-toast';

const Header = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const API_BASE = import.meta.env.VITE_API_URL;


  const {toast}=useToast();
  const { currentUser } = useSelector((state) => state.user)

  const [searchTerm, setSearchTerm] = useState("")
  // console.log(searchTerm)

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    // console.log("URL params", urlParams)
    const searchTermFromUrl = urlParams.get("searchTerm")
    // console.log("Search term from URL", searchTermFromUrl)
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl)
    }
  }, [location.search])

  const signOutHandler = async () => {
    try {
      const res = await fetch(`${API_BASE}/user/signOut`, {
        method: "DELETE"
      })

      const data = await res.json();

      if (res.ok) {
        dispatch(signOutSuccess());
        toast({ title: data.message })
      }
      else {
        toast({ title: data.message });
      }
    }
    catch (error) {
      console.log("Error in signout", error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchTerm) {
      
      const urlParams = new URLSearchParams(location.search)
      urlParams.set("searchTerm", searchTerm)

      const searchQuery = urlParams.toString()
      navigate(`/search?${searchQuery}`)
      setSearchTerm("")
      // console.log(searchQuery)

    }
    else {
      toast({ title: "Please enter a search term" })
    }
  }

  return (
    <nav className='shadow-lg '>
      <div className='flex justify-around items-center p-4 max-w-screen-2xl'>
        <Link to={'/'}>
          <h1 className='flex flex-wrap font-bold text-xl sm:text-2xl'>
            <span className='text-slate-500'>Tech</span>
            <span className='text-slate-900'>Trendz</span>
          </h1>
        </Link>

        <form className='p-3 bg-slate-100 rounded-lg flex items-center' onSubmit={handleSubmit}>
          <input className='bg-transparent focus:outline-none w-16 sm:w-64'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type='text' placeholder='Search..'></input>
          <button className='text-slate-600'><FaSearch /></button>
        </form >

        <div className=' flex justify-between w-72 text-slate-700 flex-wrap'>
          <Link  to={'/'} className='hover:underline'>Home</Link>
          <Link to={'/about'} className='hover:underline'>About</Link>
          <Link to={'/search'} className='hover:underline'>News Articles</Link>
          <DropdownMenu>
          <DropdownMenuTrigger asChild className='cursor-pointer'>
            <div>
            <h3 to={'/fake-news'} className='hover:underline'>AI Tools</h3>

            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-20'>
            
            {/* <DropdownMenuSeparator className="bg-gray-400" /> */}
            
            <DropdownMenuItem className='font-semibold mt-2' >
            <Link to={'/fake-news'} className='hover:underline'>Fake News Detector</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className='font-semibold mt-2' >
            <Link to={'/summarize'} className='hover:underline'>Article Summarizer</Link>
            </DropdownMenuItem>
  
            </DropdownMenuContent>
        </DropdownMenu>
        </div>
        {currentUser ? (
          <DropdownMenu>
          <DropdownMenuTrigger asChild className='cursor-pointer'>
            <div>
              <img src={currentUser.profilePicture} alt='user photo'
                className='w-10 h-10 rounded-full'
              ></img>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-60'>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-400" />
            <DropdownMenuItem className='block font-semibold text-sm'>
              <div className='flex flex-col gap-1'>
                {/* <span>{currentUser.userName}</span> */}
                <span>{currentUser.email}</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className='font-semibold mt-2' >
              <Link to="/dashboard?tab=profile" >Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className='font-semibold mt-2 cursor-pointer' onClick={signOutHandler} >
              Sign Out
            </DropdownMenuItem>
  
            </DropdownMenuContent>
        </DropdownMenu>
        
        ):(
          <Link to={'/sign-in'}>
          <Button>Sign In</Button>
        </Link>
        )}
      </div>
    </nav>
  )
}

export default Header 