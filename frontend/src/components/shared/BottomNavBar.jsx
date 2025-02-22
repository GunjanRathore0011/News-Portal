import { useToast } from '@/hooks/use-toast'
import { signOutSuccess } from '@/redux/user/userSlice'
import React, { useDebugValue } from 'react'
import { FaHome, FaSignOutAlt, FaUserAlt } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const BottomNavBar = () => {
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
        <nav className='md:hidden fixed bottom-0 left-0 right-0 bg-slate-200 border-t border-gray-300 p-2 flex justify-around items-center'>

            <Link to='/' className='flex flex-col items-center text-slate-800' >
                <FaHome size={20}></FaHome>
                <span className='text-xs'>Home</span>
            </Link>

            <Link to='/dashboard?tab=profile' className='flex flex-col items-center text-slate-800' >
                <FaUserAlt size={20}></FaUserAlt>
                <span className='text-sm' >Profile</span>
            </Link>

            <button className='flex flex-col items-center text-slate-800'onClick={signOutHandler}  >
                <FaSignOutAlt size={20}></FaSignOutAlt>
                <span  className='text-sm'>Logout</span>
            </button>
        </nav>
    )
}

export default BottomNavBar