import React from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import { Button } from '../ui/button';


const Header = () => {
  return (
    <nav className='shadow-lg '>
      <div className='flex justify-around items-center p-4 max-w-screen-2xl'>
        <Link to={'/'}>
          <h1 className='flex flex-wrap font-bold text-xl sm:text-2xl'>
            <span className='text-slate-500'>Tech</span>
            <span className='text-slate-900'>Trendz</span>
          </h1>
        </Link>

        <form className='p-3 bg-slate-100 rounded-lg flex items-center'>
          <input className='bg-transparent focus:outline-none w-24 sm:w-64' type='text' placeholder='Search..'></input>
          <button className='text-slate-600'><FaSearch /></button>
        </form >

        <div className=' flex justify-between w-56 text-slate-700 flex-wrap'>
          <Link  to={'/'} className='hover:underline'>Home</Link>
          <Link to={'/about'} className='hover:underline'>About</Link>
          <Link to={'/news'} className='hover:underline'>News Articles</Link>
        </div>
        <Link to={'/sign-in'}>
          <Button>Sign In</Button>
        </Link>
      </div>
    </nav>
  )
}

export default Header