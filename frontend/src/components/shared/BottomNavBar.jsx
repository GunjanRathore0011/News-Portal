import { useToast } from '@/hooks/use-toast'
import { signOutSuccess } from '@/redux/user/userSlice'
import { current } from '@reduxjs/toolkit'
import React, { useDebugValue } from 'react'
import { FaHome, FaSignOutAlt, FaUserAlt } from 'react-icons/fa'
import { IoIosCreate, IoIosDocument } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BottomNavBar = () => {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const { currentUser } = useSelector((state) => state.user);
    const API_BASE = import.meta.env.VITE_API_URL;

const signOutHandler = async () => {
    try {
        const res = await fetch(`${API_BASE}/user/signOut`, {
            method: "DELETE",
            credentials: "include", // Optional: include if using cookies
        });

        const data = await res.json();

        if (res.ok) {
            dispatch(signOutSuccess());
            toast({ title: data.message });
        } else {
            toast({ title: data.message });
        }
    } catch (error) {
        console.error("Error in signOut:", error);
    }
};


    return (
        <nav className='md:hidden fixed bottom-0 left-0 right-0 bg-slate-200 border-t border-gray-300 p-2 flex justify-around items-center'>

            <Link to='/dashboard?tab=profile' className='flex flex-col items-center text-slate-800' >
                <FaUserAlt size={20}></FaUserAlt>
                <span className='text-sm' >Profile</span>
            </Link>

            {currentUser && currentUser.isAdmin && (
                <Link to='/create-post' className='flex flex-col items-center text-slate-800' >
                    <IoIosCreate size={20}></IoIosCreate>
                    <span className='text-sm' >Create Post</span>
                </Link>
            )
            }

            {currentUser && currentUser.isAdmin && (
                <Link to='/dashboard?tab=posts' className='flex flex-col items-center text-slate-800' >
                    <IoIosDocument size={20}></IoIosDocument>
                    <span className='text-sm' >Post</span>
                </Link>
            )
            }

            <button className='flex flex-col items-center text-slate-800' onClick={signOutHandler}  >
                <FaSignOutAlt size={20}></FaSignOutAlt>
                <span className='text-sm'>Logout</span>
            </button>
        </nav>
    )
}

export default BottomNavBar