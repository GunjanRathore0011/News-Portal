import React from 'react'
import { FaSignOutAlt, FaUserAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { useToast } from '@/hooks/use-toast'
import { signOutSuccess } from '@/redux/user/userSlice'

import { IoIosCreate } from "react-icons/io";

const DashboardSideBar = () => {
  const {currentUser}=useSelector((state)=>state.user)

  const dispatch=useDispatch();
  const {toast}=useToast();

  const signOutHandler = async () => {
    try {
      const res = await fetch("/api/user/signOut", {
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


  return (
    
    <aside className='h-screen w-64 bg-slate-200 text-slate-800 flex flex-col'>
      {/* logo header */}
      <div className='p-4 flex items-center justify-center bg-slate-200'>
        <h1 className='text-2xl font-bold'>Dashboard</h1>
      </div>

      {/* Navigation Links */}
      <nav className='flex-1 p-4'>
        <ul className='space-y-2'>
          <li>
            <Link to={"/dashboard?tab=profile"} className="flex items-center p-2 hover:bg-slate-300 cursor-pointer rounded" >
              <FaUserAlt className='mr-3'></FaUserAlt>
              <span>Profile</span>
            </Link>
          </li>

          {(currentUser ) && (
            <li>
              <Link to={"/create-post"} className="flex items-center p-2 hover:bg-slate-300 rounded" >
                <IoIosCreate className='mr-3'></IoIosCreate>
                <span>Create Post</span>
              </Link>
            </li>
          )}

        </ul>

        <div className='p-4 border-t border-gray-700 ' >

          <button onClick={signOutHandler} className='flex items-center w-full p-2 hover:bg-slate-300 rounded' >
            <FaSignOutAlt className='mr-3'></FaSignOutAlt>
            <span >LogOut</span>
          </button>
        </div>
      </nav>
    </aside>
  )
}

export default DashboardSideBar